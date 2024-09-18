from typing import Optional
from pydantic import BaseModel

class Libro(BaseModel):
    id: Optional[int] = None
    titulo: str
    autor: str
    sinopsis: str
    genero: str
    añoCreacion: int
    stock: Optional[int] = None
    image_path: str