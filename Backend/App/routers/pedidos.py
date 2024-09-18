from datetime import datetime
from typing import List
from fastapi import Body, FastAPI, HTTPException, APIRouter, Path
from models.pedido import Pedido
from models.estudiante import Estudiante
from models.libro import Libro
from config.ConexionDB import ConexionBD

router = APIRouter(prefix="/pedidos", tags=["pedidos"])


# Este endpoint permite reservar un libro para un estudiante
@router.post('/reservar/{id}', response_model=dict, status_code=201)
def reservar_libro(
    id: int = Path(..., ge=1, le=2000), estudiante: Estudiante = Body(...)
    ) -> dict:

    db = ConexionBD()
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

# funcion para visualizar todos los Pedidos
@router.get('/', response_model=List[Pedido], status_code=200)
def visualizar_pedidos() -> List[Pedido]:
    db = ConexionBD()
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

# buscar pedido por id
@router.get('/{id}', response_model=Pedido, status_code=200)
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







