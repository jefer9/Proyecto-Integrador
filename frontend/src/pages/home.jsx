import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import fondoLibros from "../../public/FONDOS2/libros-fondo.webp";
import gafas from "../../public/FONDOS2/gafas.webp";
import "../styles/App.css";

function Home() {
  return (
    <>
      <div className=" main-content flex flex-col">
        <div className=" w-full flex items-center justify-between md:h-32 mt-4 sm:mt-0">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />
        </div>
        <div className="mt-16 sm:mt-12 md:mt-4 flex-grow flex font-roboto w-3/4 mx-auto">
          <div className=" ">
            <p className="text-[38px] sm:text-[50px] md:text-[60px] font-semibold md:h-14 text-[var(--secondary-color)]">
              TU BIBLIOTECA
            </p>
            <p className="text-[50px] sm:text-[70px] md:text-[80px] font-black tracking-high text-[var(--primary-color)] md:h-32">
              DIGITAL
            </p>
            <p className=" text-lg font-light md:w-3/4">
              Sumérgete en un vasto océano de conocimiento con un solo click
            </p>
          </div>
          <img
            src={fondoLibros}
            alt=""
            className=" z-10 absolute  right-0 bottom-12 fondo-libros"
          />
          <img
            src={gafas}
            alt=""
            className=" z-10 absolute left-12 bottom-10 gafas-img"
          />
        </div>
      <Footer />
      </div>
    </>
  );
}

export default Home;
