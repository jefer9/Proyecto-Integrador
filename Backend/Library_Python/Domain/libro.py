import ConexionBD
class Libro:
    def __init__(self, titulo=None, autor=None, editorial=None, id_libro=None, genero=None, stock=None):
        self._titulo = titulo
        self._autor = autor
        self._editorial = editorial
        self._id_libro = id_libro
        self._genero = genero
        self._stock = stock

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
    def id_libro(self):
        return self._id_libro

    @id_libro.setter
    def id_libro(self, id_libro):
        self._id_libro = id_libro

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
        print("Ingresar el libro")
        print("Ingresa los siguientes datos:")
        self._titulo = input("Ingresa el título: ")
        self._autor = input("Ingresa el autor: ")
        self._editorial = input("Ingresa el editorial: ")
        self._id_libro = input("Ingresa Id Libro: ")
        self._genero = input("Ingresa género: ")
        self._stock = input("Ingresa stock: ")

        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()
            query = "INSERT INTO libros (titulo, autor, editorial, id_libro, genero, stock) VALUES (%s, %s, %s, %s, %s, %s)"
            values = (self._titulo, self._autor, self._editorial, self._id_libro, self._genero, self._stock)
            db.execute_query(query, values)
            print("Libro agregado exitosamente")
        except Exception as e:
            print("Error al agregar libro:", e)
        finally:
            db.disconnect


libro1 = Libro()
libro1.crear_libro()



