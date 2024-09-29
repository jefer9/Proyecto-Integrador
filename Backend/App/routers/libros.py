import shutil
from fastapi import APIRouter, File, Form, HTTPException, Path, Body, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models.libro import Libro
from config.ConexionDB import ConexionBD
from services.libros import libros_service

router = APIRouter(prefix="/libros", tags=['libro'])

#metodo para traer todos los libros de la bd
@router.get('/', response_model=list[Libro], status_code=200)
def get_libros():
    db = ConexionBD()
    db.connect()
    result = libros_service(db).get_libros()
    db.disconnect()
    return JSONResponse(status_code = 200, content=jsonable_encoder(result))

# metodo para buscar libro por id
@router.get("/{id}", response_model=Libro, status_code=200)
def buscar_libro(id: int = Path(..., ge=1, le=2000)) -> Libro:
    db = ConexionBD()
    db.connect()

    result = libros_service(db).buscar_libro(id)
    db.disconnect()
    return JSONResponse(content=jsonable_encoder(result), status_code=200)

#----------------------------
#Estas funciones solo las hace el administrador
#----------------------------        

#metodo para eliminar libro
@router.delete("/delete/{id}", response_model=dict)
def eliminar_libro(id: int = Path(..., ge=1, le=2000)) -> dict:
    db = ConexionBD()
    db.connect()
    libros_service(db).eliminar_libro(id)
    db.disconnect()
    return JSONResponse(status_code=200, content={"message": "Libro eliminado exitosamente"})

#metodo para editar un libro
@router.put("/edit/{id}", response_model=dict, status_code=200)
def editar_libro(id: int = Path(..., ge=1, le=2000), libro: Libro = Body(...)):
    db = ConexionBD()
    db.connect()
    libros_service(db).editar_libro(id, libro)
    db.disconnect()
    return JSONResponse(status_code=200, content={"message": "Libro editado exitosamente"})

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
        # Llamar al servicio para crear el libro
        result = libros_service(db).crear_libro(titulo, autor, sinopsis, genero, añoCreacion, stock, imagen)
        db.disconnect()
        return result
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)












