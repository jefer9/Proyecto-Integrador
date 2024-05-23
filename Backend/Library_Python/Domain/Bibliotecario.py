
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
        int(input("\nBienvenido administrador\n"
                    "\n\t---------------\n"
                    "1. Crear\n"
                    "2. Editar\n"
                    "3. Actualizar\n"
                    "4. Eliminar\n"
                    "5. Salir. "))
        opc = int(input("Elige una opción: "))






