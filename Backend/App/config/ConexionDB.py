import pyodbc

class ConexionBD:
    def __init__(self):
        self.server = "david"
        self.database = "biblioteca"
        self.trusted_connection = "yes"
        self.connection = None

    def connect(self):
        try:
            self.connection = pyodbc.connect(
                f"DRIVER={{ODBC Driver 18 for SQL Server}};"
                f"SERVER={self.server};"
                f"DATABASE={self.database};"
                f"Trusted_Connection={self.trusted_connection};"
                "Encrypt=no;"
                "TrustServerCertificate=yes;"
            )
            print("Conexión exitosa a la base de datos")
        except pyodbc.Error as err:
            print("Error al conectar a la base de datos:", err)
            self.connection = None

    def disconnect(self):
        if self.connection:
            self.connection.close()

    def execute_query(self, query, params=None):
        if not self.connection:
            print("No hay conexión a la base de datos.")
            return None

        cursor = None
        try:
            cursor = self.connection.cursor()
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)

            # Solo usar fetchall si es una consulta SELECT
            if query.strip().lower().startswith('select'):
                result = cursor.fetchall()
                return result

            self.connection.commit()
            return None
        except pyodbc.Error as err:
            print("Error al ejecutar la consulta:", err)
            return None
        finally:
            if cursor:
                cursor.close()