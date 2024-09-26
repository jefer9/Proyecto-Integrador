from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from models.usuario import Usuario
from config.ConexionDB import ConexionBD
from utils.jwt_manager import verify_password, create_access_token, encrypt_password
from middlewares.jwt_bearer import get_current_active_user

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

#registro de usuarios
@router.post('/registro_usuario', response_model=dict, status_code=200)
def registro_usuarios(usuario: Usuario) -> dict:
    try:
        db = ConexionBD()
        db.connect()

        #encriptar la contraseña
        hashed_password = encrypt_password(usuario.contrasena)

        query = "INSERT INTO usuarios (id_usuario, nombre_usuario, apellido_usuario, telefono, email, contrasena, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)"
        values = (usuario.id, usuario.nombre, usuario.apellido, usuario.telefono, usuario.email,
                  hashed_password, usuario.tipo)
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

#login de usuarios
@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        #nos conectamos con la bd
        db = ConexionBD()
        db.connect()
        #creamos la query
        query = "SELECT nombre_usuario,apellido_usuario, tipo, email, contrasena, telefono from usuarios WHERE email = ?"
        #ejecutamos la query y obtenemos el resultado
        result = db.execute_query(query, (form_data.username))
        #si el resultado es correcto guardamos los datos en una lista
        if result:
            nommbre_usuario,apellido_usuario,tipo, email, hashed_contrasena, telefono = result[0]
            #llamamos la funciona para verificar la contraseña 
            if not verify_password(form_data.password, hashed_contrasena):
                raise HTTPException(status_code=400, detail="Credenciales incorrectas")
            
            #si la verificacion es correcta creamos un token de acceso y pasamos el email, el tipo de usuario, el telefono y el nombre de usuario
            acces_token = create_access_token(data={
                "sub": email, 
                "user_name": nommbre_usuario,
                "last_name": apellido_usuario,
                "tipo_usuario": tipo, 
                "telefone": telefono,
                })
            #retornamos el token de acceso y el tipo de token
            return {"access_token": acces_token, "token_type": "bearer"}
        else:
            raise HTTPException(status_code=400, detail="Email no encontrado")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.disconnect()

#obtener la informacion del usuario autenticado
@router.get("/me")
async def get_user(current_user: dict = Depends(get_current_active_user)):
    #esta funcion depende si el token de acceso es correcto, traera la informacion del usuario verificado
    return {
        "email": current_user.get("sub"),
        "nombre_usuario": current_user.get("user_name"),
        "apellido_usuario": current_user.get("last_name"),
        "tipo_usuario": current_user.get("tipo_usuario"),
        "telefono": current_user.get("telefone")
    }



