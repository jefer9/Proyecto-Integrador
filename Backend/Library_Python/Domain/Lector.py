from Backend.Library_Python.Domain.ConexionBD import ConexionBD

class Lector:

    def __init__(self, id, nombre, apellido, telefono, email, contrasena):
        self._id = id
        self._nombre = nombre
        self._apellido = apellido
        self._telefono = telefono
        self._email = email
        self.contrasena = contrasena

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, id):
        self._id = id

    @property
    def nombre(self):
        return self._nombre

    @nombre.setter
    def nombre(self, nombre):
        self._nombre = nombre

    @property
    def apellido(self):
        return self._apellido

    @apellido.setter
    def apellido(self, apellido):
        self._apellido = apellido

    @property
    def telefono(self):
        return self._telefono

    @telefono.setter
    def telefono(self, telefono):
        self._telefono = telefono

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, email):
        self._email = email

    @property
    def contrasena(self):
        return self._contrasena

    @contrasena.setter
    def contrasena(self, contrasena):
        self._contrasena = contrasena

    #metodos
    def registro_usuario(self):
        while True:
            print("\n\tFORMULARIO DE REGISTRO")
            print("\nIngresa los siguientes datos ")

            self._id = input("Documento de identidad: ")
            self._nombre = input("Nombre: ")
            self._apellido = input("Apellido: ")
            self._telefono = input("Telefono: ")
            self._correo = input("Correo: ")
            self._contrasena = input("Contraseña: ")

            if self._id != "" and self._nombre != "" and self._apellido != "" and self._correo != "" and self._telefono != "" and self._contrasena != "":

                opc = int(input("\nRegistrar como: "
                                "\n1 Estudiante "
                                "\n2 Docente: "))
                try:
                    db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
                    db.connect()
                    if opc == 1:
                        query = "INSERT INTO estudiantes (id_estudiante, nombre_estudiante, apellido_estudiante, telefono_estudiante, email_estudiante, contraseña_estudiante) VALUES (%s, %s, %s, %s, %s, %s)"
                    elif opc == 2:
                        query = "INSERT INTO docentes (id_docente, nombre_docente, apellido_docente, telefono_docente, email_docente, contraseña_docente) VALUES (%s, %s, %s, %s, %s, %s)"
                    values = (
                        self._id, self._nombre, self._apellido, self._telefono, self._correo, self._contrasena)
                    db.execute_query(query, values)
                    db.connection.commit()  # Confirmar la transacción
                    print("\n\tUsuario agregado exitosamente")
                except Exception as e:
                    print("\n\tError al agregar Usuario:", e)
                finally:
                    db.disconnect()
                    break
            else:
                print("\n\tDebe completar todos los campos")


    # -----------------------------------------------------------------------------

    # def reservar(self):
    #     print("pedido reservado exitosamente")
    #
    # def entregar(self):
    #     print("pedido entregado exitosamente")
