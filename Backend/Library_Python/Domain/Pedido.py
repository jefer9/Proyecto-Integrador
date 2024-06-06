from Backend.Library_Python.Domain.ConexionBD import ConexionBD
class Pedido:

    def __init__(self, id_pedido, id_usuario, id_libro, titulo, cantidad, fecha):
        self._id_pedido = id_pedido
        self._id_usuario = id_usuario
        self._id_libro = id_libro # Modificar en la base de datos
        self._titulo = titulo
        self._cantidad = cantidad
        self._fecha = fecha

    @property
    def id_pedido(self):
        return self._id_pedido

    @id_pedido.setter
    def id_pedido(self, id_pedido):
        self._id_pedido = id_pedido

    @property
    def id_usuario(self):
        return self._id_usuario

    @id_usuario.setter
    def id_usuario(self, id_usuario):
        self._id_usuario = id_usuario

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

    def visualizar_pedidos(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            print("Pedidos pendientes por entregar")

            query = "SELECT * FROM pedidos"

            result = db.execute_query(query)

            if result:
                print("\n\t\tPedidos pendientes\n")
                for row in result:
                    print(f"ID pedido: {row[0]} ID usuario: {row[1]} ID libro: {row[2]} Titulo libro: {row[3]} Cantidad: {row[4]} Fecha pedido: {row[5]} ")
        except Exception as e:
            print("Error al encontrar los pedidos", e)
        finally:
            db.disconnect()







