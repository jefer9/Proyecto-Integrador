from typing import Optional
from pydantic import BaseModel


class Usuario(BaseModel):
    id: Optional[int] = None
    nombre: str
    apellido: str
    telefono: int
    email: str
    contrasena: str
    tipo: str