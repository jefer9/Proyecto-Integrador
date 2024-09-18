from pydantic import BaseModel


class Estudiante(BaseModel):
    id: int
    nombre: str
    apellido: str
    telefono: int
    email: str
    contrasena: str