from Backend.Library_Python.Domain.Libro import Libro
from Backend.Library_Python.Domain.Pedido import Pedido
class Bibliotecario():

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

    # FORMULARIO ***************************************************************
    def formulario(self):
        from Backend.Library_Python.Domain.Lector import Lector
        lector = Lector(None, None, None, None, None, None)
        while True:
            opc = int(input("\nBienvenido administrador\n"
                            "\n\tElige una opcion\n"
                            "1. Gestion usuarios\n"
                            "2. Gestion libros\n"
                            "3. Lista de usuarios\n"
                            "4. Lista de libros\n"
                            "5. Visualizar pedidos\n"
                            "6. Salir. "))
            if opc == 1:
                while True:
                    opc = int(input("\nGestion de usuarios\n"
                                    "\n\tElige una opcion\n"
                                    "1. Crear\n"
                                    "2. Editar\n"
                                    "3. Buscar\n"
                                    "4. Eliminar\n"
                                    "5. Salir. "))
                    if opc == 1:
                        # lector = Lector(None, None, None, None, None, None)
                        lector.registro_usuario()
                    elif opc == 2:
                        # lector = Lector(None, None, None, None, None, None)
                        lector.editar_usuario()
                    elif opc == 3:
                        # lector3 = Lector(None, None, None, None, None, None)
                        lector.buscar_usuario()
                    elif opc == 4:
                        # lector4 = Lector(None, None, None, None, None, None)
                        lector.eliminar_usuario()
                    elif opc == 5:
                        print("\n\tGracias por visitarnos, hasta pronto!")
                        break
                    else:
                        print("\n\tIngresa una opcion valida")
            elif opc == 2:
                while True:
                    opc = int(input("\nGestion de libros\n"
                                    "\n\tElige una opcion\n"
                                    "1. Crear\n"
                                    "2. Editar\n"
                                    "3. Buscar\n"
                                    "4. Eliminar\n"
                                    "5. Salir. "))
                    if opc == 1:
                        libro = Libro(None, None, None, None, None, None)
                        libro.crear_libro()
                    elif opc == 2:
                        libro2 = Libro(None, None, None, None, None, None)
                        libro2.editar_libro()
                    elif opc == 3:
                        libro3 = Libro(None, None, None, None, None, None)
                        libro3.buscar_libro()
                    elif opc == 4:
                        libro4 = Libro(None, None, None, None, None, None)
                        libro4.eliminar_libro()
                    elif opc == 5:
                        print("\n\tGracias por visitarnos, hasta pronto!")
                        break
                    else:
                        print("\n\tIngresa una opcion valida")
            elif opc == 3:
                lector = Lector(None, None, None, None, None, None)
                lector.lista_usuarios()
            elif opc == 4:
                lector1 = Lector(None, None, None, None, None, None)
                lector1.lista_libros()
            elif opc == 5:
                pedido = Pedido(None, None, None, None, None, None)
                pedido.visualizar_pedidos()
            elif opc == 6:
                print("\n\tGracias por visitarnos, hasta pronto!")
                break
            else:
                print("\n\tIngresa una opcion valida")