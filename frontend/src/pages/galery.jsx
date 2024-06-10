import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import portadaLibros from "../assets/libros.json";
import "../styles/App.css";
import LibroPortada from "../components/libroPortada";

function Galery() {
  return (
    <div>
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="mt-4 w-11/12 mx-auto">
        <div className="flex justify-center items-center flex-col">
          <div className="flex flex-col w-full items-center">
            <p className=" text-[72px] font-semibold text-[var(--secondary-color)]">
              GALERÍA
            </p>
            <input
              type="text"
              placeholder="Buscar:"
              className="w-[300px]  md:w-[400px] px-5 py-2 rounded-3xl 
              text-[var(--secondary-color)] 
              border-2 border-[var(--secondary-color)]
              dark:![var(--secondary-color)] dark:placeholder:!text-[var(--secondary-color)] 
              outline-none"
            />
          </div>

          {/* portadas con todos los libros */}
          <div className="flex flex-wrap gap-x-7 gap-y-5 justify-center my-10">
            {portadaLibros.map((libro, index) => (
              <LibroPortada libro={libro} key={index}/>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Galery;
