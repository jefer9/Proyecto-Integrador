
class bibliotecario:

    def __init__(self, id_personal):
        self._id_personal = id_personal

    @property
    def id_personal(self):
        return self._id_personal

    @id_personal.setter
    def id_personal(self, id_personal):
        self._id_personal = id_personal






