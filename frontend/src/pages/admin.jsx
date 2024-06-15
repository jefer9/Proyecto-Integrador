import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";

function Admin() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:8000/libros");
        if (!response.ok) {
          throw new Error("Error en la peticion ");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("error obteniendo los libros", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className=" min-h-screen flex flex-col">
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="flex flex-col font-roboto w-2/4 mx-auto mt-5">
        <div className="flex flex-row gap-5 items-center">
          <button className="bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg">
            Agregar
          </button>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Buscar:"
            className="block w-full mt-2 px-3 py-1 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
          />
        </div>

        <div className=" w-full my-8 ">
          <table className="table-auto w-full ">
            <thead className=" bg-[var(--secondary-color)] text-white">
              <tr className="">
                <th className=" text-center">id</th>
                <th className=" text-center">Título</th>
                <th className=" text-center">Stock</th>
                <th className=" text-center"></th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr className=" border-b" key={index}>
                  <td className="p-2">{book.id}</td>
                  <td className=" text-center">{book.titulo}</td>
                  <td className=" text-center">{book.stock}</td>
                  <td className="text-[var(--primary-color)] font-semibold cursor-pointer">
                    Ver+
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
