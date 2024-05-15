
class pedido:

    def __init__(self, id_usuario, titulo_libro, codigo_libro, id_pedido, cantidad, fecha):
        self._id_usuario = id_usuario
        self._titulo_libro = titulo_libro
        self._codigo_libro = codigo_libro
        self._id_pedido = id_pedido
        self._cantidad = cantidad
        self._fecha = fecha

    @property
    def id_usuario(self):
        return self._id_usuario

    @id_usuario.setter
    def id_usuario(self, id_usuario):
        self._id_usuario = id_usuario

    @property
    def titulo_libro(self):
        return self._titulo_libro

    @titulo_libro.setter
    def titulo_libro(self, titulo_libro):
        self._titulo_libro = titulo_libro

    @property
    def codigo_libro(self):
        return self._codigo_libro

    @codigo_libro.setter
    def codigo_libro(self, codigo_libro):
        self._codigo_libro = codigo_libro

    @property
    def id_pedido(self):
        return self._id_pedido

    @id_pedido.setter
    def id_pedido(self, id_pedido):
        self._id_pedido = id_pedido

    @property
    def cantidad(self):
        return self._cantidad

    @cantidad.setter
    def cantidad(self, cantidad):
        self._cantidad = cantidad

    @property
    def fecha(self):
        return self._fecha

    @fecha.setter
    def fecha(self, fecha):
        self._fecha = fecha




