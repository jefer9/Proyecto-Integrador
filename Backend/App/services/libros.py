import shutil
from fastapi import HTTPException, UploadFile
from models.libro import Libro


class libros_service():

    def __init__(self, db)  -> None:
        self.db = db

    def get_libros(self):
        query = "SELECT * from libros"
        result = self.db.execute_query(query)

        libros = [Libro(
        id=row[0],
            titulo=row[1],
            autor=row[2],
            sinopsis=row[3],
            genero=row[4],
            añoCreacion=row[5],
            stock=row[6],
            image_path=row[7],
    ) for row in result]
        return libros
    
    def buscar_libro(self, id):

        query = "SELECT * FROM libros WHERE id_libro = ?"
        values = (id,)
        result = self.db.execute_query(query, values)

        if result: 
            row = result[0]
            libro = Libro(
                id=row[0],
                titulo=row[1],
                autor=row[2],
                sinopsis=row[3],
                genero=row[4],
                añoCreacion=row[5],
                stock=row[6],
                image_path=row[7], 
            )
            return libro
        else:
            raise HTTPException(status_code=404, detail="libro no encontrado")

    def eliminar_libro(self,id):
        
        libro = self.buscar_libro(id)

        if not libro:
            raise HTTPException(status_code=404, detail="Libro no encontrado")
        else:
            query = "DELETE FROM libros WHERE id_libro = ?"
            values = (id,)
            self.db.execute_query(query, values)
        
        return

    def editar_libro(self, id, libro_data: Libro):
        try:
            libro = self.buscar_libro(id)
            if not libro:
                raise HTTPException(status_code=404, detail="Libro no encontrado")
            
            query = """
                UPDATE libros SET titulo=?, autor=?, sinopsis=?, genero=?, año_creacion=?, stock=?, image_path=?
                WHERE id_libro=?
            """
            values = (
                libro_data.titulo, libro_data.autor, libro_data.sinopsis,
                libro_data.genero, libro_data.añoCreacion, libro_data.stock, 
                libro_data.image_path, id
            )
            self.db.execute_query(query, values)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        return {"message": "Libro actualizado exitosamente"}

    def crear_libro(self, titulo: str, autor:str, sinopsis: str, genero: str, añoCreacion: int, stock: int, imagen:UploadFile):
        try:
            # guardamos la imagen en la carpeta de libros
            image_path = f"libros_imagen/{imagen.filename}"
            with open(image_path, "wb") as buffer:
                shutil.copyfileobj(imagen.file, buffer)
        
            query = """
                INSERT INTO libros (titulo, autor, sinopsis, genero, stock, año_creacion, image_path)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """
            values = (titulo, autor, sinopsis, genero, stock, añoCreacion, image_path)
            self.db.execute_query(query, values)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        return {"message": "Libro creado exitosamente"}






