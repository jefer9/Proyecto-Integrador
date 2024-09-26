from fastapi import FastAPI, HTTPException, Path, Body
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routers import libros, pedidos, usuarios

app = FastAPI()
app.title = "Athena"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas las orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todas las cabeceras
)
#montar la carpeta con las imagenes de los libros como archivos estaticos
app.mount("/libros_imagen", StaticFiles(directory="libros_imagen"), name="libros_imagen")

# incluir routers
app.include_router(libros.router)
app.include_router(pedidos.router)
app.include_router(usuarios.router)

@app.get('/', tags=['Root'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')
