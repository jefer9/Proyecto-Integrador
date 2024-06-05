from Backend.Library_Python.Domain.Lector import Lector

class Docente(Lector):

    def __init__(self, id, nombre, apellido, telefono, email, contrasena):
        super().__init__(id, nombre, apellido, telefono, email, contrasena)
        self._id_docente = id

    @property
    def id_docente(self):
        return self._id_docente

    @id_docente.setter
    def id_docente(self, id_docente):
        self._id_docente = id_docente

    #los metodos de reservar y entregar Docente

    def menu_docente(self):
        while True:
            opc = int(input("\nBienvenido docente\n"
                            "\n\tElige una opcion \n"
                            "1. Visualizar libros\n"
                            "2. reservar libros\n"
                            "3. Salir\n"))
            if opc == 1:
                lector = Lector(None, None, None, None, None, None)
                lector.visualizar_libros()
            elif opc == 2:
                print("Rerservar libros")
            elif opc == 3:
                break
            else:
                print("Ingrese la opcion valida")
                continue




