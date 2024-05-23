from Backend.Library_Python.Domain import Lector

class Estudiante(Lector):

    def __init__(self, nombre, direccion, telefono, id_estudiante):
        super.__init__(nombre, direccion, telefono)
        self._id_estudiante = id_estudiante

    @property
    def id_estudiante(self):
        return self._id_estudiante

    @id_estudiante.setter
    def id_estudiante(self, id_estudiante):
        self._id_estudiante = id_estudiante

    # los metodos de reservar y entregar ya los hereda de lector



