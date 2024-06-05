from Backend.Library_Python.Domain.Libro import Libro
class Bibliotecario:

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

    def Crud(self):

        while True:
            opc = int(input("\nBienvenido administrador\n"
                            "\n\tElige una opcion\n"
                            "1. Crear\n"
                            "2. Editar\n"
                            "3. Buscar\n"
                            "4. Eliminar\n"
                            "5. Salir. "))

            if opc == 1:
                libro = Libro(None, None, None, None, None, None)
                libro.crear_libro()

            if opc == 2:
                libro2 = Libro(None, None, None, None, None, None)
                libro2.editar_libro()

            if opc == 3:
                libro3 = Libro(None, None, None, None, None, None)
                libro3.buscar_libro()
            if opc == 4:
                libro4 = Libro(None, None, None, None, None, None)
                libro4.eliminar_libro()
            if opc == 5:
                print("\n\tGracias por visitarnos\n")
                break













