import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import portadaLibros from "../assets/libros.json";
import "../styles/App.css";
import LibroPortada from "../components/libroPortada";
import { useState } from "react";

function Galery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(portadaLibros);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredBooks(portadaLibros);
    } else {
      const filtered = portadaLibros.filter((libro) =>
        libro.titulo.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  return (
    <div className="main-content">
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="mt-4 w-11/12 mx-auto min-h-full">
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col w-full items-center">
            <p className=" text-[72px] font-semibold text-[var(--secondary-color)]">
              GALERÍA
            </p>
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Buscar:"
              className="w-[300px]  md:w-[400px] block mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
          </div>

          {/* portadas con todos los libros */}
          <div className="flex flex-wrap gap-x-7 gap-y-5 justify-center my-10 flex-1">
            {
              filteredBooks.length > 0 ? (
                filteredBooks.map((libro, index) => (
                  <LibroPortada libro={libro} key={index}/>
                ))
              ) : (
                <p>No existe ningun libro con ese titulo</p>
              )
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Galery;
