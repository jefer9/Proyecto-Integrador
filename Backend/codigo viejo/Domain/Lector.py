from Backend.Library_Python.Domain.Bibliotecario import Bibliotecario
from Backend.Library_Python.Domain.ConexionBD import ConexionBD
import datetime

class Lector():

    def __init__(self, id, nombre, apellido, telefono, email, contrasena):
        self._id = id
        self._nombre = nombre
        self._apellido = apellido
        self._telefono = telefono
        self._email = email
        self._contrasena = contrasena

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

    # REGISTRO DE USUARIOS  **********************************
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
                        query = "INSERT INTO estudiantes (id_estudiante, nombre_estudiante, apellido_estudiante, telefono_estudiante, email_estudiante, contrasena_estudiante) VALUES (%s, %s, %s, %s, %s, %s)"
                    elif opc == 2:
                        query = "INSERT INTO docentes (id_docente, nombre_docente, apellido_docente, telefono_docente, email_docente, contrasena_docente) VALUES (%s, %s, %s, %s, %s, %s)"
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

    # LOGIN *************************************************
    def autenticar_login(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            while True:
                try:
                    usuario = int(input("\nIngresa el numero de documento: "))
                except ValueError:
                    print("El número de documento debe ser un entero.")
                    continue
                contrasena = input("Ingresa la contraseña: ")

                query = (
                    "SELECT 'estudiante' AS tipo, id_estudiante AS id, contrasena_estudiante AS contrasena "
                    "FROM estudiantes WHERE id_estudiante = %s AND contrasena_estudiante = %s "
                    "UNION ALL "
                    "SELECT 'docente' AS tipo, id_docente AS id, contrasena_docente AS contrasena "
                    "FROM docentes WHERE id_docente = %s AND contrasena_docente = %s "
                    "UNION ALL "
                    "SELECT 'bibliotecario' AS tipo, id_bibliotecario AS id, contrasena_bibliotecario AS contrasena "
                    "FROM bibliotecario WHERE id_bibliotecario = %s AND contrasena_bibliotecario = %s"
                )

                values = (usuario, contrasena, usuario, contrasena, usuario, contrasena)
                result = db.execute_query(query, values)

                if result:
                    for row in result:
                        tipo = row[0]
                        id_usuario = row[1]
                        contrasena_usuario = row[2]

                        if tipo == 'bibliotecario' and id_usuario == 123 and contrasena_usuario == '123':
                            bibliotecario = Bibliotecario(id_usuario, None, None, None, None, contrasena_usuario)
                            bibliotecario.formulario()
                            return 'bibliotecario'
                        elif tipo == 'docente' and id_usuario == usuario and contrasena_usuario == contrasena:
                            from Backend.Library_Python.Domain.Docente import Docente
                            docente = Docente(None,None,None,None,None,None)
                            docente.menu_docente()
                            return 'docente'
                        elif tipo == 'estudiante' and id_usuario == usuario and contrasena_usuario == contrasena:
                            from Backend.Library_Python.Domain.Estudiante import Estudiante
                            estudiante = Estudiante(usuario, None, None, None, None, contrasena)
                            estudiante.menu_estudiante()
                            return 'estudiante'
                    print("¡Bienvenido a la biblioteca!")
                else:
                    print("Usuario y/o contraseña incorrecta")

        except Exception as e:
            print("Error en la autenticación:", e)
        finally:
            db.disconnect()

    # RESERVAR LIBROS **********************************
    def reservar_libro(self):
        print("\n\tIngresar los datos del libro que deseas reservar\n")

        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            self._id_usuario = input("Usuario: ")
            self._id_libro = input("Id Libro: ")
            self._titulo = input("Título: ")
            self._cantidad = int(input("Cantidad: "))
            self._fecha = datetime.date.today().strftime('%Y-%m-%d')  # Fecha actual

            # Determinar el tipo de usuario
            query_tipo_usuario = (
                "SELECT 'estudiante' AS tipo FROM estudiantes WHERE id_estudiante = %s "
                "UNION ALL "
                "SELECT 'docente' AS tipo FROM docentes WHERE id_docente = %s"
            )
            values_tipo_usuario = (self._id_usuario, self._id_usuario)
            result_tipo_usuario = db.execute_query(query_tipo_usuario, values_tipo_usuario)

            if not result_tipo_usuario:
                print("Usuario no encontrado.")
                return

            tipo_usuario = result_tipo_usuario[0][0]

            # Verificar la cantidad total de libros reservados por el usuario
            query_libros_reservados = "SELECT SUM(cantidad) FROM pedidos WHERE id_usuario = %s"
            values_libros_reservados = (self._id_usuario,)
            result_libros_reservados = db.execute_query(query_libros_reservados, values_libros_reservados)

            libros_reservados = result_libros_reservados[0][0] or 0

            if (tipo_usuario == 'estudiante' and libros_reservados + self._cantidad > 3) or (tipo_usuario == 'docente' and libros_reservados + self._cantidad > 30):
                print(f"El {tipo_usuario} no puede reservar más de {3 if tipo_usuario == 'estudiante' else 30} libros.")
                return

            # Verificar si el libro tiene suficiente stock
            query_check_stock = "SELECT stock FROM libros WHERE id_libro = %s"
            values_check_stock = (self._id_libro,)
            result = db.execute_query(query_check_stock, values_check_stock)

            if not result or result[0][0] < self._cantidad:
                print("No hay suficiente stock para este libro.")
                return

            # Insertar el pedido en la tabla pedidos
            query_insert_pedido = "INSERT INTO pedidos (id_usuario, id_libro, titulo_libro, cantidad, fecha) VALUES (%s, %s, %s, %s, %s)"
            values_insert_pedido = (self._id_usuario, self._id_libro, self._titulo, self._cantidad, self._fecha)
            db.execute_query(query_insert_pedido, values_insert_pedido)

            # Restar la cantidad del stock en la tabla libros
            query_update_stock = "UPDATE libros SET stock = stock - %s WHERE id_libro = %s"
            values_update_stock = (self._cantidad, self._id_libro)
            db.execute_query(query_update_stock, values_update_stock)

            db.connection.commit()  # Confirmar la transacción
            print("\n\tPedido reservado exitosamente")

        except Exception as e:
            print("\nError al reservar el libro:", e)
        finally:
            db.disconnect()

    # ENTREGAR LIBROS **********************************
    def entregar_libro(self):
        print("\n\tIngresa los datos del libro que deseas entregar\n")

        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            self._id_usuario = input("Usuario: ")
            self._id_libro = input("Id Libro: ")
            self._cantidad = int(input("Cantidad: "))

            # Verificar la cantidad total de libros reservados por el usuario
            query_libros_reservados = "SELECT cantidad FROM pedidos WHERE id_usuario = %s AND id_libro = %s"
            values_libros_reservados = (self._id_usuario, self._id_libro)
            result_libros_reservados = db.execute_query(query_libros_reservados, values_libros_reservados)

            if not result_libros_reservados:
                print(f"No hay reservas de libros con el ID {self._id_libro} para el usuario {self._id_usuario}.")
                return

            libros_reservados = result_libros_reservados[0][0]

            if libros_reservados < self._cantidad:
                print(f"No puedes devolver más libros de los que tienes reservados. Libros reservados: {libros_reservados}")
                return

            # Actualizar y sumar la cantidad del stock en la tabla libros
            query_update_stock = "UPDATE libros SET stock = stock + %s WHERE id_libro = %s"
            values_update_stock = (self._cantidad, self._id_libro)
            db.execute_query(query_update_stock, values_update_stock)

            # Actualizar la cantidad de libros reservados en la tabla pedidos
            nueva_cantidad_reservada = libros_reservados - self._cantidad
            if nueva_cantidad_reservada > 0:
                query_update_pedido = "UPDATE pedidos SET cantidad = %s WHERE id_usuario = %s AND id_libro = %s"
                values_update_pedido = (nueva_cantidad_reservada, self._id_usuario, self._id_libro)
                db.execute_query(query_update_pedido, values_update_pedido)
            else:
                query_delete_pedido = "DELETE FROM pedidos WHERE id_usuario = %s AND id_libro = %s"
                values_delete_pedido = (self._id_usuario, self._id_libro)
                db.execute_query(query_delete_pedido, values_delete_pedido)

            db.connection.commit()  # Confirmar la transacción

            libros_pendientes = max(nueva_cantidad_reservada, 0)

            if libros_pendientes > 0:
                print(f"Aún tienes {libros_pendientes} libro(s) pendientes por entregar")
            else:
                print("\n\tLibro(s) entregado(s) exitosamente")

        except Exception as e:
            print("\nError al entregar el libro:", e)
        finally:
            db.disconnect()

    # CRUD USUARIO **********************************************
    def editar_usuario(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            id = input("\nIngresa el ID del usuario que deseas modificar: ")

            query_select = "SELECT * FROM estudiantes WHERE id_estudiante = %s UNION SELECT * FROM docentes WHERE id_docente = %s"
            values_select = (id, id)
            result_select = db.execute_query(query_select, values_select)

            if result_select:
                print("\nIngresa los nuevos datos:")

                nuevo_nombre = input("Nuevo nombre: ")
                nuevo_apellido = input("Nuevo apellido: ")
                nuevo_telefono = input("Nuevo telefono: ")
                nuevo_email = input("Nuevo email: ")
                nueva_contrasena = input("Nueva contraseña: ")

                if nuevo_nombre:
                    query_update = "UPDATE estudiantes SET nombre_estudiante = %s WHERE id_estudiante = %s UNION ALL UPDATE docentes SET nombre_docente = %s WHERE id_docente = %s"
                    values_update = (nuevo_nombre, id, nuevo_nombre, id)
                    db.execute_query(query_update, values_update)
                if nuevo_apellido:
                    query_update = "UPDATE estudiantes SET apellido_estudiante = %s WHERE id_estudiante = %s UNION ALL UPDATE docentes SET apellido_docente = %s WHERE id_docente = %s"
                    values_update = (nuevo_apellido, id, nuevo_apellido, id)
                    db.execute_query(query_update, values_update)
                if nuevo_telefono:
                    query_update = "UPDATE estudiantes SET telefono_estudiante = %s WHERE id_estudiante = %s UNION ALL UPDATE docentes SET telefono_docente = %s WHERE id_docente = %s"
                    values_update = (nuevo_telefono, id, nuevo_telefono, id)
                    db.execute_query(query_update, values_update)
                if nuevo_email:
                    query_update = "UPDATE estudiantes SET email_estudiante = %s WHERE id_estudiante = %s UNION ALL UPDATE docentes SET email_docente = %s WHERE id_docente = %s"
                    values_update = (nuevo_email, id, nuevo_email, id)
                    db.execute_query(query_update, values_update)
                if nueva_contrasena:
                    query_update = "UPDATE estudiantes SET contrasena_estudiante = %s WHERE id_estudiante = %s UNION ALL UPDATE docentes SET contrasena_docente = %s WHERE id_docente = %s"
                    values_update = (nueva_contrasena, id, nueva_contrasena, id)
                    db.execute_query(query_update, values_update)

                db.connection.commit()
                print("\n\tUsuario actualizado exitosamente")
            else:
                print("\n\tID no encontrado")

        except Exception as e:
            print("\n\tError al modificar el usuario:", e)
        finally:
            db.disconnect()

    def buscar_usuario(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            id = input("\nIngresa el ID del usuario que deseas buscar: ")

            query = "SELECT * FROM estudiantes WHERE id_estudiante = %s UNION SELECT * FROM docentes WHERE id_docente = %s"
            values = (id, id)
            result = db.execute_query(query, values)

            if result:
                print("\n\tUsuario encontrado exitosamente!")
                for row in result:
                    print(f"ID: {row[0]}\n"
                          f"Nombre: {row[1]}\n"
                          f"Apellido: {row[2]}\n"
                          f"Telefono: {row[3]}\n"
                          f"Email: {row[4]}")
            else:
                print("\n\tUsuario no encontrado")

        except Exception as e:
            print("\n\tError al buscar el usuario:", e)
        finally:
            db.disconnect()

    def eliminar_usuario(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            while True:
                id = input("Ingresa el ID del usuario que deseas eliminar: ")

                query = "SELECT * FROM estudiantes WHERE id_estudiante = %s UNION SELECT * FROM docentes WHERE id_docente = %s"
                values = (id, id)
                result = db.execute_query(query, values)

                if result:
                    confirmacion = input("¿Estás seguro de que deseas eliminar el usuario? (S/N): ")
                    if confirmacion.upper() == "S":
                        query = "DELETE FROM estudiantes WHERE id_estudiante = %s UNION ALL DELETE FROM docentes WHERE id_docente = %s"
                        values = (id, id)
                        db.execute_query(query, values)
                        db.connection.commit()
                        print("Usuario eliminado exitosamente")
                        return True
                    else:
                        print("Operación cancelada")
                else:
                    print("ID no encontrado")

        except Exception as e:
            print("Error al eliminar el usuario:", e)
        finally:
            db.disconnect()

    # LISTAR USUARIOS **********************************
    def lista_usuarios(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            query = "SELECT id_estudiante, nombre_estudiante, apellido_estudiante, telefono_estudiante, email_estudiante, 'Estudiante' AS tipo FROM estudiantes UNION SELECT id_docente, nombre_docente, apellido_docente, telefono_docente, email_docente, 'Docente' AS tipo FROM docentes"

            result = db.execute_query(query)

            if result:
                print("\n\t\tUsuarios registrados\n")
                for row in result:
                    print(
                        f" -{row[5]} ID: {row[0]} Nombre: {row[1]} Apellido: {row[2]} Telefono: {row[3]} Email: {row[4]}")
                    print("\t")
        except Exception as e:
            print("\nError al encontrar usuarios", e)
        finally:
            db.disconnect()

    # LISTAR LIBROS **********************************
    def lista_libros(self):
        try:
            db = ConexionBD(host="localhost", port="3306", user="root", passwd="", database="biblioteca")
            db.connect()

            query = "SELECT * FROM Libros"

            result = db.execute_query(query)

            if result:
                print("\n\t\tLibros disponibles\n")
                for row in result:
                    print(
                        f"ID: {row[0]} Titulo: {row[1]} Autor: {row[2]} Editorial: {row[3]} Genero: {row[4]} Cantidad disponible: {row[5]}")
                    print("\t")
        except Exception as e:
            print("\nerror al encontrar los libros", e)

        finally:
            db.disconnect()