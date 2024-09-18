import { useParams } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import { useEffect, useState } from "react";

function Book() {
  let { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  const imageUrl = `http://localhost:8000${libro.image_path}`;

  return (
    <div className="main-content">
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="flex flex-col mb-10">
        <div className="my-5 md:w-3/4 mx-auto min-h-full">
          <div className="flex flex-col md:flex-row items-center gap-x-12 gap-y-5 h-full my-auto">
            <div className=" w-3/4">
              <img
                src={imageUrl}
                alt={libro.titulo}
                className="mt-4 mx-auto h-[300px] w-[250px] md:h-[400px] md:w-[300px]"
              />
            </div>
            <div className="mx-auto w-3/4 md:w-2/3">
              <h1 className="text-[28px] md:text-[36px] font-bold text-[var(--secondary-color)] text-start mb-4 md:mb-6">
                {libro.titulo}
              </h1>
              <p className="text-lg font-light text-gray-500/70">{libro.sinopsis}</p>
              <p className="mt-2 text-[var(--primary-color)]">
                <strong>Autor: </strong>
                {libro.autor}
              </p>
              <p className="mt-2 text-[var(--primary-color)]">
                <strong>Año de Creación: </strong>
                {libro.añoCreacion}
              </p>
              <p className="mt-2 text-[var(--primary-color)]">
                <strong>Género: </strong>
                {libro.genero}
              </p>
              <button className="mt-5 md:mt-10 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg w-full">
                Reservar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Book;
