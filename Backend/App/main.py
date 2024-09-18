from fastapi import FastAPI, HTTPException, Path, Body
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, datetime_parse
from typing import Optional, List
from config.ConexionDB import ConexionBD
from datetime import datetime, date
from routers import libros, pedidos

app = FastAPI()
app.title = "Athena"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todas las cabeceras
)
#montar la carpeta con las imagenes de los libros como archivos estaticos
app.mount("/libros_imagen", StaticFiles(directory="libros_imagen"), name="libros_imagen")

# incluir routers
app.include_router(libros.router)
app.include_router(pedidos.router)

@app.get('/home', tags=['Root'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')


class Estudiante(BaseModel):
    id: int
    nombre: str
    apellido: str
    telefono: int
    email: str
    contrasena: str

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
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()


class Usuario(BaseModel):
    email: str
    contrasena: str

# funcion para logear al usuario
@app.post('/login', tags=['login'])
def login(usuario: Usuario):
    try:
        db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
        db.connect()

        query = (
            "SELECT 'estudiante' AS tipo, email_estudiante AS email, contrasena_estudiante AS contrasena, nombre_estudiante AS nombre "
            "FROM estudiantes WHERE email_estudiante = %s AND contrasena_estudiante = %s "
            "UNION ALL "
            "SELECT 'docente' AS tipo, email_docente AS email, contrasena_docente AS contrasena, nombre_docente AS nombre "
            "FROM docentes WHERE email_docente = %s AND contrasena_docente = %s "
            "UNION ALL "
            "SELECT 'bibliotecario' AS tipo, email_bibliotecario AS email, contrasena_bibliotecario AS contrasena, nombre_bibliotecario AS nombre "
            "FROM bibliotecario WHERE email_bibliotecario = %s AND contrasena_bibliotecario = %s"
        )

        values = (usuario.email, usuario.contrasena, usuario.email, usuario.contrasena, usuario.email, usuario.contrasena)
        result = db.execute_query(query, values)

        if result:
            for row in result:
                row = result[0]
                tipo = row[0]
                email_usuario = row[1]
                contrasena_usuario = row[2]
                nombre_usuario = row[3]

                if tipo == 'bibliotecario' and email_usuario == "b" and contrasena_usuario == '123':
                    return {"message": "credenciales correctas bienvenido", "usuario": {"tipo": tipo, "email": email_usuario, "nombre": nombre_usuario}}

                return {"message": "credenciales correctas bienvenido", "usuario": {"tipo": tipo, "email": email_usuario, "nombre": nombre_usuario}}
        else:
            return {"message": "usuario y/o contraseña incorrecta"}

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail="error en la conexion")
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

