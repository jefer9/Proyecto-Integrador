import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ModalDelete({ book, closeModal }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/libros/delete/${book.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Error al eliminar el libro");
        alert("Error al eliminar el libro");
        return;
      }

      Swal.fire({
        title: "Libro eliminado",
        text: "El libro ha sido eliminado correctamente",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        closeModal();
        navigate("/Galery");
      });
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      alert("Ocurrió un error al intentar eliminar el libro");
    }
  };

  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 bg-[var(--bg-transparent)] flex justify-center items-center z-20">
        <div className="bg-white p-5 rounded-lg max-w-[500px] shadow-lg relative z-30">
          <p className="font-semibold text-[var(--primary-color)]">
            ¿Estas seguro que quieres eliminar el libro?
          </p>
          <div className="w-full flex justify-evenly mt-5 text-white ">
            <button
              className="bg-[var(--secondary-color)] hover:bg-[var(--hover-color)] py-3 px-5 rounded-lg"
              onClick={handleDelete}
            >
              Aceptar
            </button>
            <button
              className="bg-[var(--secondary-color)] hover:bg-[var(--hover-color)] py-3 px-5 rounded-lg"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDelete;
