from Backend.Library_Python.Domain.Lector import Lector


class Interface:

    while True:
        opc = int(input("\nBienvenido a tu biblioteca virtual\n"
                           "\n\t---------------\n"
                           "1. Registrarse\n"
                           "2. Iniciar sesion\n"
                           "3. Salir. "))

        if opc == 1:
            lector = Lector(None,None,None,None,None,None)
            lector.registro_usuario()
        elif opc == 2:
            lector2 = Lector(None, None, None, None, None, None)
            tipo_usuario = lector2.autenticar_login()
        elif opc == 3:
            print("\n\tGracias por visitarnos, hasta pronto!")
            break
        else:
            print("\n\tIngresa una opcion valida")