from fastapi import FastAPI, HTTPException, Path, Body
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, datetime_parse
from typing import Optional, List
from ConexionDB import ConexionBD
from datetime import datetime, date

app = FastAPI()
app.title = "Atena"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todas las cabeceras
)
#montar la carpeta con las imagenes de los libros como archivos estaticos
app.mount("/libros_imagen", StaticFiles(directory="libros_imagen"), name="libros_imagen")

@app.get('/', tags=['libros'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')

class Libro(BaseModel):
    id: Optional[int] = None
    titulo: str
    autor: str
    sinopsis: str
    genero: str
    añoCreacion: int
    stock: Optional[int] = None
    image_path: str

class Estudiante(BaseModel):
    id: int #el id del estudiante sera la cedula ingresada al registrarse
    nombre: str
    apellido: str
    telefono: int
    email: str
    contrasena: str

class Pedido(BaseModel):
    id: int
    id_usuario: int
    id_libro: int
    titulo_libro: str
    cantidad: int
    fecha: date

#metodo para traer todos los libros de la bd
@app.get('/libros', tags=['libros'], response_model=list[Libro], status_code=200)
def get_libros():
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    db.connect()

    query = "SELECT * FROM Libros"
    result = db.execute_query(query)

    db.disconnect()

    libros = []
    for row in result:
        libro = Libro(
            id=row[0],
            titulo=row[1],
            autor=row[2],
            sinopsis=row[3],
            genero=row[4],
            stock=row[5],
            image_path=row[6],
            añoCreacion=row[7]
        )
        libros.append(libro)
    
    return libros

# metodo para buscar libro por id
@app.get('/libros/{id}', tags=['libros'], response_model=Libro, status_code=200)
def buscar_libro(id: int = Path(..., ge=1, le=2000)) -> Libro:
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    db.connect()

    query = "SELECT * FROM Libros WHERE id_libro = %s"
    values = (id,)
    result = db.execute_query(query, values)

    db.disconnect()

    if result:
        row = result[0]
        libro = Libro(
            id=row[0],
            titulo=row[1],
            autor=row[2],
            sinopsis=row[3],
            genero=row[4],
            stock=row[5],
            image_path=row[6], 
            añoCreacion=row[7],
        )
        return libro
    else:
        raise HTTPException(status_code=404, detail="Libro no encontrado")

#metodo para crear libro
@app.post('/libros', tags=['libros'], response_model=dict, status_code=201)
def crear_libro(libro: Libro) -> dict:
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    db.connect()

    try:
        query = "INSERT INTO libros (id_libro, titulo, autor, sinopsis, genero, stock, año_creacion, image_path) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        values = (libro.id, libro.titulo, libro.autor, libro.sinopsis, libro.genero, libro.stock, libro.añoCreacion, libro.image)
        db.execute_query(query, values)
    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))

    db.disconnect()

    return {"message": "Libro agregado exitosamente"}

#metodo para eliminar un libro
@app.delete('/libros/{id}', tags=['libros'], response_model=dict)
def eliminar_libro(id: int = Path(..., ge=1, le=2000)) -> dict:
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    db.connect()

    try:
        # Verificar si el libro existe
        select_query = "SELECT * FROM Libros WHERE id_libro = %s"
        select_values = (id,)
        result = db.execute_query(select_query, select_values)

        if not result:
            raise HTTPException(status_code=404, detail="Libro no encontrado")

        # Eliminar el libro
        delete_query = "DELETE FROM Libros WHERE id_libro = %s"
        delete_values = (id,)
        db.execute_query(delete_query, delete_values)

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))

    db.disconnect()

    return {"message": "Libro eliminado exitosamente"}

#metodo para editar un libro
@app.put('/libros/{id}', tags=['libros'], response_model=dict, status_code=200)
def actualizar_libro(id: int = Path(..., ge=1, le=2000), libro: Libro = Body(...)):
    try:
        db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
        db.connect()

        # Verificar si el libro existe
        query = "SELECT * FROM Libros WHERE id_libro = %s"
        values = (id,)
        result = db.execute_query(query, values)

        if not result:
            db.disconnect()
            raise HTTPException(status_code=404, detail="Libro no encontrado")

        # Actualizar el libro
        update_query = """
            UPDATE Libros 
            SET titulo = %s, autor = %s, sinopsis = %s, genero = %s, stock = %s, año_creacion = %s, image_path = %s
            WHERE id_libro = %s
        """
        update_values = (libro.titulo, libro.autor, libro.sinopsis, libro.genero, libro.stock, libro.añoCreacion, libro.image, id)
        db.execute_query(update_query, update_values)

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))

    db.disconnect()
    return {"message": "Libro actualizado exitosamente"}


#metodo para reservar un libro
@app.post('/libros/{id}/reservar', tags=['libros'], response_model=dict, status_code=201)
def reservar_libro(
    id: int = Path(..., ge=1, le=2000), estudiante: Estudiante = Body(...)) -> dict:
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    db.connect()

    try:
        query = "SELECT * FROM Libros WHERE id_libro = %s"
        values = (id,)
        result = db.execute_query(query, values)
        if not result:
            raise HTTPException(status_code=404, detail="Libro no encontrado")

        row = result[0]
        libro = Libro(
            id=row[0],
            titulo=row[1],
            autor=row[2],
            sinopsis=row[3],
            genero=row[4],
            stock=row[5],
            image_path=row[6],
            añoCreacion=row[7]
        )

        # Verificar si el libro tiene stock disponible
        if libro.stock is None or libro.stock <= 0:
            raise HTTPException(status_code=400, detail="No hay stock disponible para el libro")

        # Insertar la reserva en la tabla de pedidos
        query = "INSERT INTO pedidos (id_usuario, id_libro, titulo_libro, cantidad, fecha) VALUES (%s, %s, %s, %s, %s)"
        fecha_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        values = (estudiante.id, libro.id, libro.titulo, 1, fecha_actual)
        db.execute_query(query, values)

        # Actualizar el stock del libro
        update_query = "UPDATE Libros SET stock = stock - 1 WHERE id_libro = %s"
        update_values = (id,)
        db.execute_query(update_query, update_values)

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()

    return {"message": "Libro reservado exitosamente"}

#registro de estudiantes
@app.post('/register_estudiantes', tags=['estudiantes'], response_model=dict, status_code=200)
def registro_estudiante(estudiante: Estudiante) -> dict:
    try:
        db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
        db.connect()

        query = "INSERT INTO estudiantes (id_estudiante, nombre_estudiante, apellido_estudiante, telefono_estudiante, email_estudiante, contrasena_estudiante) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (estudiante.id, estudiante.nombre, estudiante.apellido, estudiante.telefono, estudiante.email,
                  estudiante.contrasena)

        db.execute_query(query, values)
        db.disconnect()
        return {"message": "Estudiante registrado exitosamente"}
    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail="Error al registrar usuario")
    finally:
        db.disconnect()

class Usuario(BaseModel):
    email: str
    contrasena: str

#login de usuarios
@app.post('/login', tags=['login'])
def login(usuario: Usuario):
    try:
        db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
        db.connect()

        query = (
            "SELECT 'estudiante' AS tipo, email_estudiante AS email, contrasena_estudiante AS contrasena "
            "FROM estudiantes WHERE email_estudiante = %s AND contrasena_estudiante = %s "
            "UNION ALL "
            "SELECT 'docente' AS tipo, email_docente AS email, contrasena_docente AS contrasena "
            "FROM docentes WHERE email_docente = %s AND contrasena_docente = %s "
            "UNION ALL "
            "SELECT 'bibliotecario' AS tipo, email_bibliotecario AS email, contrasena_bibliotecario AS contrasena "
            "FROM bibliotecario WHERE email_bibliotecario = %s AND contrasena_bibliotecario = %s"
        )

        values = (usuario.email, usuario.contrasena, usuario.email, usuario.contrasena, usuario.email, usuario.contrasena)
        result = db.execute_query(query, values)

        if result:
            for row in result:
                tipo = row[0]
                email_usuario = row[1]
                contrasena_usuario = row[2]

                if tipo == 'bibliotecario' and email_usuario == "b" and contrasena_usuario == '123':
                    return {"message": "credenciales correctas bienvenido"}

                elif tipo == 'docente' and email_usuario == usuario.email and contrasena_usuario == usuario.contrasena:
                    return {"message": "credenciales correctas bienvenido"}

                elif tipo == 'estudiante' and email_usuario == usuario.email and contrasena_usuario == usuario.contrasena:
                    return {"message": "credenciales correctas bienvenido"}
        else:
            return {"message": "usuario y/o contraseña incorrecta"}

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()

#metodo para obtener todos los estudiantes de la bd
@app.get('/estudiantes', tags=['estudiantes'], response_model=List[Estudiante], status_code=200)
def get_estudiantes():
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    db.connect()

    query = "SELECT * FROM estudiantes"
    result = db.execute_query(query)

    db.disconnect()
    estudiantes = []
    for row in result:
        estudiante = Estudiante(
            id=row[0],
            nombre=row[1],
            apellido=row[2],
            telefono=row[3],
            email=row[4],
            contrasena=row[5]
        )
        estudiantes.append(estudiante)
    
    return estudiantes

#visualizar los pedidos
@app.get('/pedidos', tags=['pedidos'], response_model=List[Pedido], status_code=200)
def visualizar_pedidos() -> List[Pedido]:
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    try:
        db.connect()
        query = "SELECT * FROM pedidos"
        result = db.execute_query(query)
        pedidos = []
        for row in result:
            pedido = Pedido(
                id=row[0],
                id_usuario=row[1],
                id_libro=row[2],
                titulo_libro=row[3],
                cantidad=row[4],
                fecha=row[5]
            )
            pedidos.append(pedido)
        return pedidos
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()

#visualizar pedido por id
@app.get('/pedidos/{id}', tags=['pedidos'], response_model=Pedido, status_code=200)
def visualizar_pedido(id: int) -> Pedido:
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    try:
        db.connect()

        query = "SELECT id_pedido, id_usuario, id_libro, titulo_libro, cantidad, fecha FROM pedidos WHERE id_pedido = %s"
        values = (id,)
        result = db.execute_query(query, values)

        if result:
            row = result[0]
            pedido = Pedido(
                id=row[0],
                id_usuario=row[1],
                id_libro=row[2],
                titulo_libro=row[3],
                cantidad=row[4],
                fecha=row[5]
            )
            return pedido
        else:
            raise HTTPException(status_code=404, detail="Pedido no encontrado")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()



