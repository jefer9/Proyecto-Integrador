from Backend.Library_Python.Domain import Lector

class Docente(Lector):

    def __init__(self, nombre, direccion, telefono, id_docente):
        super.__init__(nombre, direccion, telefono)
        self._id_docente = id_docente

    @property
    def id_docente(self):
        return self._id_docente

    @id_docente.setter
    def id_docente(self, id_docente):
        self._id_docente = id_docente

    #los metodos de reservar y entregar ya los hereda de lector






