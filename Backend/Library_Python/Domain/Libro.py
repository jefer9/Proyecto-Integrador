from Backend.Library_Python.Domain.ConexionBD import ConexionBD
class Libro:
    def __init__(self,  id_libro=None, titulo=None, autor=None, editorial=None, genero=None, stock=None):
        self._id_libro = id_libro
        self._titulo = titulo
        self._autor = autor
        self._editorial = editorial
        self._genero = genero
        self._stock = stock

    @property
    def id_libro(self):
        return self._id_libro

    @id_libro.setter
    def id_libro(self, id_libro):
        self._id_libro = id_libro

    @property
    def titulo(self):
        return self._titulo

    @titulo.setter
    def titulo(self, titulo):
        self._titulo = titulo

    @property
    def autor(self):
        return self._autor

    @autor.setter
    def autor(self, autor):
        self._autor = autor

    @property
    def editorial(self):
        return self._editorial

    @editorial.setter
    def editorial(self, editorial):
        self._editorial = editorial

    @property
    def genero(self):
        return self._genero

    @genero.setter
    def genero(self, genero):
        self._genero = genero

    @property
    def stock(self):
        return self._stock

    @stock.setter
    def stock(self, stock):
        self._stock = stock

    def crear_libro(self):
        print("\n\tIngresar el libro\n")
        print("Ingresa los siguientes datos:")
        self._id_libro = input("Ingresa Id Libro: ")
        self._titulo = input("Ingresa el título: ")
        self._autor = input("Ingresa el autor: ")
        self._editorial = input("Ingresa el editorial: ")
        self._genero = input("Ingresa género: ")
        self._stock = input("Ingresa stock: ")

        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()
            query = "INSERT INTO libros (id_libro, titulo, autor, editorial, genero, stock) VALUES (%s, %s, %s, %s, %s, %s)"
            values = (self._id_libro, self._titulo, self._autor, self._editorial, self._genero, self._stock)
            db.execute_query(query, values)
            print("Libro agregado exitosamente")
        except Exception as e:
            print("Error al agregar libro:", e)
        finally:
            db.disconnect()

    def editar_libro(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            id = input("\nIngresa el ID del Libro que deseas modificar: ")

            query_select = "SELECT * FROM Libros WHERE id_libro = %s"
            values_select = (id,)
            result_select = db.execute_query(query_select, values_select)

            if result_select:
                print("\nIngresa los nuevos datos:")

                nuevo_id = input("Nuevo id: ")
                nuevo_titulo = input("Nuevo titulo: ")
                nuevo_autor = input("Nuevo autor: ")
                nuevo_editorial = input("Nuevo editorial: ")
                nuevo_genero = input("Nuevo genero: ")
                nuevo_stock = input("Nuevo stock: ")

                # Verifica si los datos no están vacíos antes de actualizarlos
                if nuevo_id:
                    query_update_id = "UPDATE Libros SET id_libro = %s WHERE id_libro = %s"
                    values_update_id = (nuevo_id, id)
                    db.execute_query(query_update_id, values_update_id)
                    id = nuevo_id

                if nuevo_titulo:
                    query_update_titulo = "UPDATE Libros SET titulo = %s WHERE id_libro = %s"
                    values_update_titulo = (nuevo_titulo, id)
                    db.execute_query(query_update_titulo, values_update_titulo)

                if nuevo_autor:
                    query_update_autor = "UPDATE Libros SET autor = %s WHERE id_libro = %s"
                    values_update_autor = (nuevo_autor, id)
                    db.execute_query(query_update_autor, values_update_autor)

                if nuevo_editorial:
                    query_update_editorial = "UPDATE Libros SET editorial = %s WHERE id_libro = %s"
                    values_update_editorial = (nuevo_editorial, id)
                    db.execute_query(query_update_editorial, values_update_editorial)

                if nuevo_genero:
                    query_update_genero = "UPDATE Libros SET genero = %s WHERE id_libro = %s"
                    values_update_genero = (nuevo_genero, id)
                    db.execute_query(query_update_genero, values_update_genero)

                if nuevo_stock:
                    query_update_stock = "UPDATE Libros SET stock = %s WHERE id_libro = %s"
                    values_update_stock = (nuevo_stock, id)
                    db.execute_query(query_update_stock, values_update_stock)

                print("\n\tLibro actualizado exitosamente")
            else:
                print("\n\tID no encontrado")

        except Exception as e:
            print("\n\tError al modificar la persona:", e)

        finally:
            db.disconnect()

    def buscar_libro(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            id = input("\nIngresa el ID del libro que deseas buscar: ")

            query = "SELECT * FROM Libros WHERE id_libro = %s"
            values = (id,)
            result = db.execute_query(query, values)

            if result:
                print("\n\tLibro  encontrado exitosamente!")
                for row in result:
                    print(f"Id: {row[0]}\n"
                          f"Nombre: {row[1]}\n"
                          f"Autor: {row[2]}\n"
                          f"Editorial: {row[3]}\n"
                          f"Genero: {row[4]}\n"
                          f"Stock: {row[5]}")  # Imprime cada fila de datos
            else:
                print("\n\tLibro no encontrado")

        except Exception as e:
            print("\n\tError al buscar el libro:", e)
        finally:
            db.disconnect()

    # -------------------------------------------------------------------------------------------------
    def eliminar_libro(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            while True:

                id = input("Ingresa el ID del libro que desea eliminar que deseas eliminar: ")

                query = "SELECT * FROM Libros WHERE id_libro = %s"
                values = (id,)
                result = db.execute_query(query, values)

                if result:
                    confirmacion = input("¿Estás seguro de que deseas eliminar el libro? (S/N): ")
                    if confirmacion.upper() == "S":
                        query = "DELETE FROM Libros WHERE id_libro = %s"
                        values = (id,)
                        db.execute_query(query, values)
                        print("Libro eliminado exitosamente")
                        return True

                    else:
                        print("Operación cancelada")
                else:
                    print("ID no encontrado")

        except Exception as e:
            print("Error al eliminar el libro:", e)
        finally:
            db.disconnect()


