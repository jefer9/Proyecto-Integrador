import shutil
from fastapi import APIRouter, File, Form, HTTPException, Path, Body, UploadFile
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

    libros = [Libro(
        id=row[0],
            titulo=row[1],
            autor=row[2],
            sinopsis=row[3],
            genero=row[4],
            añoCreacion=row[5],
            stock=row[6],
            image_path=row[7],
    ) for row in result]
    
    
    return libros

# metodo para buscar libro por id
@router.get("/{id}", response_model=Libro, status_code=200)
def buscar_libro(id: int = Path(..., ge=1, le=2000)) -> Libro:
    db = ConexionBD()
    db.connect()

    query = "SELECT * FROM Libros WHERE id_libro = ?"
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
            añoCreacion=row[5],
            stock=row[6],
            image_path=row[7], 
        )
        return libro
    else:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    

#----------------------------
#Estas funciones solo las hace el administrador
#----------------------------        

#metodo para eliminar libro
@router.delete("/delete/{id}", response_model=dict)
def eliminar_libro(id: int = Path(..., ge=1, le=2000)) -> dict:
    db = ConexionBD()
    db.connect()

    try:
        #verificamos si el libro existe
        select_query = "SELECT * FROM libros WHERE id_libro = ?"
        select_values = (id,)
        result = db.execute_query(select_query, select_values)
        if not result:
            raise HTTPException(status_code=404, detail="Libro no encontrado")
        #eliminamos el libro
        delete_query = "DELETE FROM LibroS WHERE id_libro = ?"
        delete_values = (id,)
        db.execute_query(delete_query, delete_values)
    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))
    db.disconnect()

    return {"message": "Libro eliminado exitosamente"}

#metodo para editar un libro
@router.put("/edit/{id}", response_model=dict, status_code=200)
def editar_libro(id: int = Path(..., ge=1, le=2000), libro: Libro = Body(...)):
    try:
        db = ConexionBD()
        db.connect()
        #verificamos si el libro existe
        query = "SELECT * FROM Libro WHERE id_libro = ?"
        values = (id,)
        result = db.execute_query(query, values)

        if not result:
            raise HTTPException(status_code=404, detail="Libro no encontrado")
        
        #actualizamos los datos del libro
        update_query = """
            UPDATE Libros
            SET titulo = ?, autor = ?, sinopsis = ?, genero = ?, stock = ?, año_creacion = ?, image_path = ?
            WHERE id_libro = ?
            """
        update_values = (libro.titulo, libro.autor, libro.sinopsis, libro.genero, libro.stock, libro.añoCreacion, libro.image, id)
        db.execute_query(update_query, update_values)

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=f"Error al conectar con la base de datos: {str(e)}")
    
    db.disconnect()
    return {"message": "libro actualizado exitosamente"}

#metodo para agregar un libro
@router.post("/save", response_model=dict, status_code=201)
async def crear_libro(
    titulo: str = Form(...),
    autor: str = Form(...),
    sinopsis: str = Form(...),
    genero: str = Form(...),
    añoCreacion: int = Form(...),
    stock: int = Form(...),
    imagen: UploadFile = File(...)
):
    db = ConexionBD()
    db.connect()

    try:
        # guardamos la imagen en la carpeta de libros
        image_path = f"libros_imagen/{imagen.filename}"
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(imagen.file, buffer)

        # Inserta los datos en la base de datos
        query = """
            INSERT INTO libros (titulo, autor, sinopsis, genero, stock, año_creacion, image_path)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """
        values = (titulo, autor, sinopsis, genero, stock, añoCreacion, image_path)
        db.execute_query(query, values)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()

    return {"message": "Libro creado exitosamente"}












