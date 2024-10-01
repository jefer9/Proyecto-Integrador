import { useNavigate, useParams } from "react-router-dom";
import Nav from "../components/nav";
import Pill from "../components/pill";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Swal from "sweetalert2";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [libro, setLibro] = useState({
    titulo: "",
    sinopsis: "",
    autor: "",
    añoCreacion: "",
    genero: "",
    imagen: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [modal, setModal] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:8000/libros/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Libro no encontrado");
        }
        return response.json();
      })
      .then((data) => {
        setLibro(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setLibro({ ...libro, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/libros/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(libro),
      });
      if (!response.ok) {
        throw new Error("Error al editar el libro");
      }
      Swal.fire({
        title: "Libro actualizado exitosamente",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => {
        navigate(`/Galery/Book/${id}`);
      })
    } catch (error) {
      console.error("Error al editar el libro", error);
      Swal.fire({
        title: "Error al editar el libro",
        text: "Ocurrió un error al intentar editar el libro",
        icon: "error",
      })
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="main-content">
        <div className=" w-full flex items-center justify-between md:h-32 mt-4 md:mt-0">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />
        </div>
        <div className="w-2/3 md:w-4/5 mx-auto my-5">
          <p className="font-bold text-2xl text-[var(--secondary-color)] text-center">
            Editar Libro
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-y-4 gap-x-8"
          >
            <div>
              <label className="text-[var(--secondary-color)] font-semibold">
                Título:
              </label>
              <input
                type="text"
                name="titulo"
                value={libro.titulo}
                onChange={handleChange}
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                required
              />
            </div>

            <div>
              <label className="text-[var(--secondary-color)] font-semibold">
                Autor:
              </label>
              <input
                type="text"
                name="autor"
                value={libro.autor}
                onChange={handleChange}
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                required
              />
            </div>

            <div className="flex flex-row md:items-end gap-4 md:justify-around text-center">
              <div className="flex items-center md:gap-5">
                <label className="text-[var(--secondary-color)] font-semibold">
                  Año de Creación:
                </label>
                <input
                  type="number"
                  name="añoCreacion"
                  value={libro.añoCreacion}
                  onChange={handleChange}
                  className="block p-1 border-b-2 border-0 w-12
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                  required
                />
              </div>
              <div className="flex items-center md:gap-5">
                <label className="text-[var(--secondary-color)] font-semibold">
                  Stock:
                </label>
                <input
                  type="number"
                  name="stock"
                  value={libro.stock}
                  onChange={handleChange}
                  className="block w-12 p-1 pl-3 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[var(--secondary-color)] font-semibold">
                Género:
              </label>
              <input
                type="text"
                name="genero"
                value={libro.genero}
                onChange={handleChange}
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="text-[var(--secondary-color)] font-semibold">
                Sinopsis:
              </label>
              <textarea
                name="sinopsis"
                value={libro.sinopsis}
                onChange={handleChange}
                className="border-2 focus:outline-none focus:border-[var(--secondary-color)] w-full h-32 rounded-md p-2 mt-4 text-gray-500"
                required
              ></textarea>
            </div>

            <div className="flex flex-col w-full">
              <label className="text-[var(--secondary-color)] font-semibold">
                Escoge una imagen:
              </label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>

            <button
              type="submit"
              className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-2 px-4 rounded md:col-span-2 mt-4"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default EditBook;
