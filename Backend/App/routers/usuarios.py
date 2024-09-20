from typing import List, Optional
from fastapi import APIRouter, HTTPException
from models.usuario import Usuario
from config.ConexionDB import ConexionBD

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

#registro de usuarios
@router.post('/registro_usuario', response_model=dict, status_code=200)
def registro_usuarios(usuario: Usuario) -> dict:
    try:
        db = ConexionBD()
        db.connect()

        query = "INSERT INTO usuarios (id_usuario, nombre_usuario, apellido_usuario, telefono, email, contrasena, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)"
        values = (usuario.id, usuario.nombre, usuario.apellido, usuario.telefono, usuario.email,
                  usuario.contrasena, usuario.tipo)
        db.execute_query(query, values)
        return {"message": "Estudiante registrado exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        db.disconnect()

#mostrar todos los usuarios
@router.get('/', response_model=List[Usuario], status_code=200)
def get_usuarios(tipo: str = None):  # Se puede pasar el tipo de usuario como filtro
    db = ConexionBD()
    db.connect()

    if tipo:
        query = "SELECT * from usuarios WHERE tipo = ?"
        values = (tipo,)
    else:
        query = "SELECT * FROM usuarios"
        values = None

    result = db.execute_query(query, values)
    db.disconnect()

    if result is None:
        raise HTTPException(status_code=404, detail="no se encontraron usuarios")
    
    usuarios = [Usuario(id=row[0], nombre=row[1], apellido=row[2], telefono=row[3], email=row[4], contrasena=row[5], tipo=row[6]) for row in result]

    return usuarios







