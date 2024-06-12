from fastapi import FastAPI, HTTPException, Path, Body
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import Optional
from ConexionDB import ConexionBD

app = FastAPI()
app.title = "Atena"


@app.get('/', tags=['libros'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')


class Libro(BaseModel):
    id: Optional[int] = None
    titulo: str
    autor: str
    editorial: str
    genero: str
    stock: int


@app.get('/libros/{id}', tags=['libros'], response_model=Libro)
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
            editorial=row[3],
            genero=row[4],
            stock=row[5]
        )
        return libro
    else:
        raise HTTPException(status_code=404, detail="Libro no encontrado")


@app.post('/libros', tags=['libros'], response_model=dict, status_code=201)
def crear_libro(libro: Libro) -> dict:
    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
    db.connect()

    try:
        query = "INSERT INTO libros (id_libro, titulo, autor, editorial, genero, stock) VALUES (%s, %s, %s, %s, %s, %s)"
        values = (libro.id, libro.titulo, libro.autor, libro.editorial, libro.genero, libro.stock)
        db.execute_query(query, values)
    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))

    db.disconnect()

    return {"message": "Libro agregado exitosamente"}


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
            SET titulo = %s, autor = %s, editorial = %s, genero = %s, stock = %s 
            WHERE id_libro = %s
        """
        update_values = (libro.titulo, libro.autor, libro.editorial, libro.genero, libro.stock, id)
        db.execute_query(update_query, update_values)

    except Exception as e:
        db.disconnect()
        raise HTTPException(status_code=400, detail=str(e))

    db.disconnect()
    return {"message": "Libro actualizado exitosamente"}