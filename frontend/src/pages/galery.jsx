import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import filter from "../assets/icons/filter.svg";
import "../styles/App.css";
import LibroPortada from "../components/libroPortada";
import { useEffect, useState } from "react";

function Galery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectGen, setSelectGen] = useState("");

  useEffect(() => {
    // Función para obtener los libros desde la API
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8000/libros");
        if (!response.ok) {
          throw new Error("Error en la respuesta", response.statusCode);
        }
        const data = await response.json();
        //guardamos la respuesta de la API en las variables de estado para renderizar los libros
        setBooks(data);
        setFilteredBooks(data);
        // console.log(data);
      } catch (error) {
        console.error("error al obtener los libros:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    //creamos una variable para identificar el termino ingresado y compararlo con los libros
    const term = event.target.value;
    setSearchTerm(term);
    filterBooks(term, selectGen);

    // if (term.trim() === "") {
    //   //si el input de busqueda es igual a vacio se renderizan todos los libros
    //   setFilteredBooks(books);
    // } else {
    //   //si el input de busqueda no es vacio se filtran los libros por el titulo y se renderizan los resultados
    //   const filtered = books.filter((libro) =>
    //     libro.titulo.toLowerCase().includes(term.toLowerCase())
    //   );
    //   setFilteredBooks(filtered);
    // }
  };

  const handleGenFilter = (gen) => {
    setSelectGen(gen);
    filterBooks(searchTerm, gen);
    setIsFilterOpen(false);
  };

  //
  const filterBooks = (term, gen) => {
    let filtered = books;

    if (term.trim() !== "") {
      filtered = filtered.filter((libro) =>
        libro.titulo.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (gen !== "") {
      filtered = filtered.filter((libro) => libro.genero === gen);
    }
    setFilteredBooks(filtered);
  };

  return (
    <>
    
    <div className="main-content">
      <div className=" w-full flex items-center justify-between md:h-32 mt-4 md:mt-0 ">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="mt-4 md:mt-12 w-[90%] md:w-[85%] lg:w-[80%] mx-auto min-h-full">
        <div className="grid grid-cols-1 md:grid-cols-4">
          <aside className="flex flex-col w-full items-center md:items-start md:gap-y-4 relative">
            <p className=" text-[42px] font-semibold text-[var(--secondary-color)]">
              GALERÍA
            </p>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                onChange={handleSearch}
                placeholder="Buscar:"
                className="block md:mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              />
              <img
                src={filter}
                alt="icon filter"
                className=" cursor-pointer md:hidden h-7"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
            <div className="hidden md:flex flex-col w-full">
              <p className="font-semibold text-lg text-[var(--primary-color)] mb-4">
                Generos:
              </p>
              {/* filtros en escritorio */}
              <ul className="flex flex-col gap-2">
                <li
                  className={`cursor-pointer ${
                    selectGen === ""
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("")}
                >
                  Todos
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Ficcion"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Ficcion")}
                >
                  Ficcion
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Matemáticas"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Matemáticas")}
                >
                  Matemáticas
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Realismo mágico"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Realismo mágico")}
                >
                  Realismo mágico
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Aventura"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Aventura")}
                >
                  Aventura
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Novela psicológica"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Novela psicológica")}
                >
                  Novela psicológica
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Filosofía"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Filosofía")}
                >
                  Filosofía
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Novela de formación"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Novela de formación")}
                >
                  Novela de formación
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Existencialismo"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Existencialismo")}
                >
                  Existencialismo
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Poesía épica"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Poesía épica")}
                >
                  Poesía épica
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Ciencia"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Ciencia")}
                >
                  Ciencia
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Ensayo"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Ensayo")}
                >
                  Ensayo
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Novela"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Novela")}
                >
                  Novela
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Épica"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Épica")}
                >
                  Épica
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Autobiografía"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Autobiografía")}
                >
                  Autobiografía
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Novela corta"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Novela corta")}
                >
                  Novela corta
                </li>
                <li
                  className={`cursor-pointer ${
                    selectGen === "Tragedia"
                      ? "font-bold text-[var(--secondary-color)]"
                      : ""
                  }`}
                  onClick={() => handleGenFilter("Tragedia")}
                >
                  Tragedia
                </li>
              </ul>
            </div>

            {/* filtros en mobile */}
            {isFilterOpen && (
              <div className="md:hidden absolute bg-white p-4 shadow-2xl rounded-md z-10 top-28 left-[54%] h-52 overflow-auto">
                <ul className="flex flex-col gap-2">
                  <li
                    className={`cursor-pointer ${
                      selectGen === ""
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("")}
                  >
                    Todos
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Ficcion"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Ficcion")}
                  >
                    Ficcion
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Matemáticas"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Matemáticas")}
                  >
                    Matemáticas
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Realismo mágico"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Realismo mágico")}
                  >
                    Realismo mágico
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Aventura"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Aventura")}
                  >
                    Aventura
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Novela psicológica"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Novela psicológica")}
                  >
                    Novela psicológica
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Filosofía"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Filosofía")}
                  >
                    Filosofía
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Novela de formación"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Novela de formación")}
                  >
                    Novela de formación
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Existencialismo"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Existencialismo")}
                  >
                    Existencialismo
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Poesía épica"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Poesía épica")}
                  >
                    Poesía épica
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Ciencia"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Ciencia")}
                  >
                    Ciencia
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Ensayo"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Ensayo")}
                  >
                    Ensayo
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Novela"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Novela")}
                  >
                    Novela
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Épica"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Épica")}
                  >
                    Épica
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Autobiografía"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Autobiografía")}
                  >
                    Autobiografía
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Novela corta"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Novela corta")}
                  >
                    Novela corta
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectGen === "Tragedia"
                        ? "font-bold text-[var(--secondary-color)]"
                        : ""
                    }`}
                    onClick={() => handleGenFilter("Tragedia")}
                  >
                    Tragedia
                  </li>
                </ul>
              </div>
            )}
          </aside>

          {/* portadas con todos los libros */}
          <div className="flex flex-wrap gap-x-4 gap-y-5 justify-evenly my-10 md:ml-5 flex-1 col-span-3">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((libro, index) => (
                <LibroPortada libro={libro} key={index} />
              ))
            ) : (
              <p className="font-semibold text-lg text-[var(--primary-color)]">Nada por aqui...</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </>
  );
}

export default Galery;
