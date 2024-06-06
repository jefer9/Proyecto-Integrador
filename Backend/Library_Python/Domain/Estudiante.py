from Backend.Library_Python.Domain.Lector import Lector

class Estudiante(Lector):

    def __init__(self, id, nombre, apellido, telefono, email, contrasena):
        super().__init__(id, nombre, apellido, telefono, email, contrasena)
        self._id_estudiante = id

    @property
    def id_estudiante(self):
        return self._id_estudiante

    @id_estudiante.setter
    def id_estudiante(self, id_estudiante):
        self._id_estudiante = id_estudiante

    # los metodos de reservar y entregar ya los hereda de lector

    def menu_estudiante(self):
        while True:
            opc = int(input("\n\tBienvenido estudiante\n"
                            "\nRecuerda que puedes reservar hasta 3 libros\n"
                            "\nElige una opcion\n"
                            "1. Visualizar libros\n"
                            "2. reservar libros\n"
                            "3. Salir: "))
            if opc == 1:
                lector = Lector(None,None,None,None,None,None)
                lector.visualizar_libros()
            elif opc == 2:
                estudiante = Lector(None,None,None,None,None,None)
                estudiante.reservar_libro()

            elif opc == 3:
                break
            else:
                print("Ingrese la opcion valida")
                continue



