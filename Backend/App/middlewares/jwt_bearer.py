from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from utils.jwt_manager import verify_token_access

oauth_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_active_user(token: str = Depends(oauth_scheme)):
    try:
        #verificamos el token de acceso
        payload = verify_token_access(token)
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token invalido o expirado")




