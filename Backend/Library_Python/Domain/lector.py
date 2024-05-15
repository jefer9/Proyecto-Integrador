class lector:

    def __init__(self, nombre, direccion, telefono):
        self._nombre = nombre
        self._direccion = direccion
        self._telefono = telefono

    @property
    def nombre(self):
        return self._nombre

    @nombre.setter
    def nombre(self, nombre):
        self._nombre = nombre

    @property
    def direccion(self):
        return self._direccion

    @direccion.setter
    def direccion(self, direccion):
        self._direccion = direccion

    @property
    def telefono(self):
        return self._telefono

    @telefono.setter
    def telefono(self, telefono):
        self._telefono = telefono

    #metodos

    def reservar(self):
        print("pedido reservado exitosamente")

    def entregar(self):
        print("pedido entregado exitosamente")
