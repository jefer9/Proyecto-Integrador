class lector:

    def __init__(self, nombre, direccion, telefono):
        self.nombre = nombre
        self.direccion = direccion
        self.telefono = telefono

    @property
    def nombre(self):
        return self.nombre

    @nombre.setter
    def nombre(self, nombre):
        self.nombre = nombre

    @property
    def direccion(self):
        return self.direccion

    @direccion.setter
    def direccion(self, direccion):
        self.direccion = direccion

    @property
    def telefono(self):
        return self.telefono

    @telefono.setter
    def telefono(self, telefono):
        self.telefono = telefono

    #metodos

    def reservar(self):
        print("pedido reservado exitosamente")

    def entregar(self):
        print("pedido entregado exitosamente")
