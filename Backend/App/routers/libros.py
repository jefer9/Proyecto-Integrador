from fastapi import APIRouter, HTTPException, Path, Body
from models.libro import Libro
from config.ConexionDB import ConexionBD

router = APIRouter(prefix="/libros", tags=['libro'])

#metodo para traer todos los libros de la bd
@router.get('/', response_model=list[Libro], status_code=200)
def get_libros():
    db = ConexionBD()
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
@router.get("/{id}", response_model=Libro, status_code=200)
def buscar_libro(id: int = Path(..., ge=1, le=2000)) -> Libro:
    db = ConexionBD()
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

#metodo para eliminar libro
@router.delete("/{id}", response_model=dict)
def eliminar_libro(id: int = Path(..., ge=1, le=2000)) -> dict:
    db = ConexionBD()
    db.connect()

    try:
        #verificamos si el libro existe
        select_query = "SELECT * FROM Libros WHERE id_libro = %s"
        select_values = (id,)
        result = db.execute_query(select_query, select_values)
        if not result:
            raise HTTPException(status_code=404, detail="Libro no encontrado")
        #eliminamos el libro
        delete_query = "DELETE FROM LibroS WHERE id_libro = %s"
        delete_values = (id,)
        db.execute_query(delete_query, delete_values)
    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))
    db.disconnect()

    return {"message": "Libro eliminado exitosamente"}

#metodo para editar un libro
@router.put("/{id}", response_model=dict, status_code=200)
def editar_libro(id: int = Path(..., ge=1, le=2000), libro: Libro = Body(...)):
    try:
        db = ConexionBD()
        db.connect()
        #verificamos si el libro existe
        query = "SELECT * FROM Libro WHERE id_libro = %s"
        values = (id,)
        result = db.execute_query(query, values)

        if not result:
            raise HTTPException(status_code=404, detail="Libro no encontrado")
        
        #actualizamos los datos del libro
        update_query = """
            UPDATE Libros
            SET titulo = %s, autor = %s, sinopsis = %s, genero = %s, stock = %s, año_creacion = %s, image_path = %s
            WHERE id_libro = %s
            """
        update_values = (libro.titulo, libro.autor, libro.sinopsis, libro.genero, libro.stock, libro.añoCreacion, libro.image, id)
        db.execute_query(update_query, update_values)

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=f"Error al conectar con la base de datos: {str(e)}")
    
    db.disconnect()
    return {"message": "libro actualizado exitosamente"}

#metodo para agregar un libro
@router.post("/", response_model=dict, status_code=201)
def crear_libro(libro: Libro) -> dict:
    db = ConexionBD()
    db.connect()

    try:
        query = "INSERT INTO libros (titulo, autor, sinopsis, genero, stock, año_creacion, image_path) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (libro.titulo, libro.autor, libro.sinopsis, libro.genero, libro.stock, libro.añoCreacion, libro.image_path)
        db.execute_query(query, values)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()

    return {"message": "Libro creado exitosamente"}












