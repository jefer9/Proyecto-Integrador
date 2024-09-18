from datetime import date
from pydantic import BaseModel

class Pedido(BaseModel):
    id: int
    id_usuario: int
    id_libro: int
    titulo_libro: str
    cantidad: int
    fecha: date