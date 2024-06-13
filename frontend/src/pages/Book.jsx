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
      <div className="flex flex-col min-h-[75vh]">
        <div className="my-5 w-2/3 mx-auto min-h-full">
          <div className="flex gap-5 h-full my-auto">
            <div className=" w-1/3">
              <img
                src={imageUrl}
                alt={libro.titulo}
                className="mt-4 h-[400px] w-[300px]"
              />
            </div>
            <div className="mx-auto w-2/3">
              <h1 className="text-[48px] font-semibold text-[var(--secondary-color)] text-start mb-8">
                {libro.titulo}
              </h1>
              <p className="text-lg font-light">{libro.sinopsis}</p>
              <p className="mt-2">
                <strong>Autor: </strong>
                {libro.autor}
              </p>
              <p className="mt-2">
                <strong>Año de Creación: </strong>
                {libro.añoCreacion}
              </p>
              <p className="mt-2">
                <strong>Género: </strong>
                {libro.genero}
              </p>
              <button className="mt-10 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg">
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
