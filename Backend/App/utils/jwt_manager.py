from fastapi import HTTPException
import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone

#Configuracion del jwt

SECRET_KEY = "MY_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE = 30

#contexto para manejar las contraseñas con bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#verificar contraseña en texto plano
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

#encriptar contraseña
def encrypt_password(password: str) -> str:
    return pwd_context.hash(password)

#crear token de acceso
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    #recibimos la informacion del usuario para crear el token
    to_encode = data.copy()
    #agregamos la fecha de expiracion del token
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    #agregamos la fecha de expiracion al diccionario para codificarlo en el token
    to_encode.update({"exp": expire})
    #codificamos el diccionario en un token jwt utilizando la clave secreta y el algoritmo de encriptacion HS256
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    #retornamos el token jwt
    return encoded_jwt

#verificar y decodificar un jwt
def verify_token_access(token: str):
    try:
        #decodificar el token
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        #retornamos la informacion del usuario del token
        return decoded_token
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="El token ha expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

