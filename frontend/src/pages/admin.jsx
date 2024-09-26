import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import { Link } from "react-router-dom";

function Admin() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectBook, setSelectBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8000/libros");
        if (!response.ok) {
          throw new Error("Error en la peticion ");
        }
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("error obteniendo los libros", error);
      }
    };
    fetchBooks();
  }, []);

  // funcion para buscar libros segun su titulo
  const handleSearch = (event) => {
    const term = event.target.value;
    console.log(term);
    filterBooks(term);
  };

  // funcion para filtrar los libros segun si titulo
  const filterBooks = (term) => {
    if (term.trim() != "") {
      const filtered = filteredBooks.filter((libro) =>
        libro.titulo.toLowerCase().includes(term.toLowerCase())
      );
      setBooks(filtered);
    } else {
      setBooks(filteredBooks);
    }
  };

  //funcion para abrir el modal con el libro seleccionado
  // const openModal = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/libros/${id}`);
  //     if (!response.ok) {
  //       throw new Error("Libro no encontrado");
  //     }
  //     const book = await response.json();
  //     setSelectBook(book);
  //     setModalOpen(true);
  //   } catch (error) {
  //     console.error("Error al obtener el libro", error);
  //   }
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  //   setSelectBook(null);
  // };

  return (
    <>
      <div className="main-content">
        <div className=" w-full flex items-center justify-between md:h-32 mt-4 md:mt-0">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />
        </div>
        <div className="flex flex-col font-roboto w-4/5 md:w-2/4 mx-auto mt-10 min-h-full">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <input
              onChange={handleSearch}
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Buscar:"
              className="block w-full mt-2 px-3 py-1 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
            <button className="w-full md:w-3/12 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-2 px-3 md:py-3 md:px-5 rounded-lg">
              <Link to={"/AddBook"}>Agregar</Link>
            </button>
          </div>

          <div className=" w-full md:my-8 my-4 ">
            <table className="table-auto w-full ">
              <thead className=" bg-[var(--secondary-color)] text-white">
                <tr className="text-center ">
                  <th className=" py-2">id</th>
                  <th className="">Título</th>
                  <th className="">Stock</th>
                  <th className=""></th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <tr className=" border-b text-center" key={index}>
                      <td className="p-2">{book.id}</td>
                      <td className=" text-gray-500/90">{book.titulo}</td>
                      <td className="text-gray-500/90">{book.stock}</td>
                      <Link to={"/Galery/Book/" + book.id}>
                        <td className="text-[var(--primary-color)] font-semibold cursor-pointer pt-2">
                          ver+
                        </td>
                      </Link>
                    </tr>
                  ))
                ) : (
                  <p>No existen libros con ese nombre</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
      {/* {modalOpen && selectBook && (
        <ModalBook book={selectBook} closeModal={closeModal} />
      )} */}
    </>
  );
}

export default Admin;
