import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import "../styles/App.css";
import LibroPortada from "../components/libroPortada";
import { useEffect, useState } from "react";

function Galery() {

  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    // Función para obtener los libros desde la API
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8000/libros"); // Asegúrate de usar la URL correcta de tu API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((libro) =>
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
            {filteredBooks.length > 0 ? (
              filteredBooks.map((libro, index) => (
                <LibroPortada libro={libro} key={index} />
              ))
            ) : (
              <p>No existe ningun libro con ese titulo</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Galery;
