import mysql.connector

class ConexionBD:
    def __init__(self):
        self.host = "localhost"
        self.port = "3306"
        self.user = "root"
        self.passwd = ""
        self.database = "biblioteca"
        self.connection = None

    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                port=self.port,
                user=self.user,
                passwd=self.passwd,
                database=self.database
            )
        except mysql.connector.Error as err:
            print("Error al conectar a la base de datos:", err)

    def disconnect(self):
        if self.connection:
            self.connection.close()

    def execute_query(self, query, params=None):
        cursor = self.connection.cursor(buffered=True)
        try:
            cursor.execute(query, params)
            self.connection.commit()
            if query.lower().startswith('select'):
                result = cursor.fetchall()
                return result
        except mysql.connector.Error as err:
            print("Error al ejecutar la consulta:", err)
            return None
        finally:
            cursor.close()