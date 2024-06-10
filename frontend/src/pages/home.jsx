import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import fondoLibros from "../../public/FONDOS2/libros-fondo.webp"
import gafas from "../../public/FONDOS2/gafas.webp"
import "../styles/App.css";

function Home() {
  return (
    <>
      <div className=" min-h-screen flex flex-col">
        <div className=" w-full flex items-center justify-between h-32">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />  
        </div>
        <div className="mt-8 flex-grow flex font-roboto w-3/4 mx-auto">
          <div className=" ">
            <p className="text-[48px] md:text-[62px] font-semibold h-14 text-[var(--secondary-color)]">TU BIBLIOTECA</p>
            <p className="text-[70px] md:text-[100px] font-black tracking-high text-[var(--primary-color)] h-32">DIGITAL</p>
            <p className=" text-lg font-light w-4/5">
              Sumérgete en un vasto océano de conocimiento con un solo click
            </p>
          </div>
          <img src={fondoLibros} alt="" className=" z-10 absolute  right-0 bottom-10 fondo-libros"/>
          <img src={gafas} alt="" className=" z-10 absolute left-16 bottom-12 gafas-img"/>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
