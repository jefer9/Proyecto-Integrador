import { useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AddBook() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    sinopsis: "",
    genero: "",
    stock: "",
    añoCreacion: "",
    imagen: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //creamos un objeto FormData para enviar los datos y la imagen
    const data = new FormData();
    data.append("titulo", formData.titulo);
    data.append("autor", formData.autor);
    data.append("sinopsis", formData.sinopsis);
    data.append("genero", formData.genero);
    data.append("stock", formData.stock);
    data.append("añoCreacion", formData.añoCreacion);
    data.append("imagen", formData.imagen);

    if (
      !formData.titulo ||
      !formData.autor ||
      !formData.sinopsis ||
      !formData.genero ||
      !formData.stock ||
      !formData.añoCreacion ||
      !formData.imagen
    ) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
        icon: "error",
      });
      return;
    } else {
      //realizamos la solicitud
      try {
        const response = await fetch("http://localhost:8000/libros/save", {
          method: "POST",
          body: data,
        });

        const result = await response.json();

        if (response.ok) {
          Swal.fire({
            title: "Exito",
            text: "Libro agregado exitosamente",
            icon: "success",
          }).then(() => {
            navigate("/admin"); //redireccionamos a la lista de libros
          });
        } else {
          Swal.fire({
            title: "Error",
            text: result.response,
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error al agregar el libro", error);
      }
    }
  };

  return (
    <>
      <div className="main-content">
        <div className=" w-full flex items-center justify-between md:h-32 mt-4 md:mt-0">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />
        </div>
        <div className="w-2/3 md:w-4/5 mx-auto mt-5">
          <p className=" font-bold text-2xl text-[var(--secondary-color)] text-center">
            Agregar un nuevo libro
          </p>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 md:grid-cols-2 my-5 gap-y-4 gap-x-12"
          >
            <div>
              <label
                htmlFor="titulo"
                className="text-[var(--secondary-color)] font-semibold"
              >
                Titulo:
              </label>
              <input
                value={formData.titulo}
                onChange={handleInputChange}
                name="titulo"
                type="text"
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="autor"
                className="text-[var(--secondary-color)] font-semibold"
              >
                Autor:
              </label>
              <input
                name="autor"
                value={formData.autor}
                onChange={handleInputChange}
                type="text"
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="genero"
                className="text-[var(--secondary-color)] font-semibold"
              >
                Genero:
              </label>
              <input
                name="genero"
                value={formData.genero}
                onChange={handleInputChange}
                type="text"
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="año de creacion"
                className="text-[var(--secondary-color)] font-semibold"
              >
                Año de creacion:
              </label>
              <input
                name="añoCreacion"
                value={formData.añoCreacion}
                onChange={handleInputChange}
                type="number"
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="text-[var(--secondary-color)] font-semibold"
              >
                Stock:
              </label>
              <input
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                type="number"
                className="block w-full mt-1 px-2 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="sinopsis"
                className="text-[var(--secondary-color)] font-semibold"
              >
                Sinopsis:
              </label>
              <textarea
                value={formData.sinopsis}
                onChange={handleInputChange}
                name="sinopsis"
                id="sinopsis"
                className="border-2 focus:outline-none focus:border-[var(--secondary-color)] md:w-4/5 w-3/4 h-24 md:h-20 rounded-md p-2 mt-6 text-gray-500 "
                placeholder="Escribe algo..."
              />
            </div>
            <div>
              <label
                htmlFor="imagen de portada"
                className="text-[var(--secondary-color)] font-semibold"
              >
                imagen de portada:
              </label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="text-center md:col-span-2 mt-2">
              <button
                type="submit"
                className=" mb-6 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AddBook;
