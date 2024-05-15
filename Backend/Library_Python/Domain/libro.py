
class libro:

    def __init__(self, titulo, autor, editorial, id_libro, genero, stock):
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
