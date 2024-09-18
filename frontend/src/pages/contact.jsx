/* hecho por jaider*/
import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import Fondo from "../../public/FONDOS2/Fondos2_Mesa de trabajo 1 copia 3.svg";

const Contacto = () => {
  return (
    <>
      <div className="main-content">
        <div className=" w-full flex items-center justify-between md:h-32 mt-4 sm:mt-0">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2">
          <div className=" w-3/4 mx-auto flex flex-col text-center items-center">
            <h1 className="text-[var(--secondary-color)] text-[42px] sm:text-[48px] lg:text-[56px] font-semibold mt-4 uppercase h-10 sm:h-16 lg:h-20">
              Contacto
            </h1>
            <span className="text-3xl font-bold text-[var(--secondary-color)]">
              - - - - - - - - - - -
            </span>
            <p className=" font-medium text-gray-600 w-3/4 md:w-full">
              Para nosotros es muy importante saber tus necesidades
            </p>
            <div className="flex flex-col md:flex-row w-full items-center gap-2">
              <input
                type="text"
                className="block mt-2 px-3 py-2 border-b-2 border-0 md:w-full
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                placeholder="Nombre:"
              />
              <input
                type="email"
                className="block mt-2 px-3 py-2 border-b-2 border-0 md:w-full
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                placeholder="Email"
              />
            </div>
            <div className="mb-2 w-full mx-5">
              <textarea
                className="border-2 focus:outline-none focus:border-[var(--secondary-color)] md:w-4/5 w-3/4 h-24 md:h-20 rounded-md p-2 mt-6 text-gray-500 "
                placeholder="Escribenos:"
                rows="4"
              />
            </div>
            <div className="flex justify-start my-5 md:my-2">
              <button className="bg-[var(--secondary-color)] text-white rounded-full p-2 w-40 hover:bg-[var(--primary-color)]">
                Enviar
              </button>
            </div>
          </div>
          <div className="relative w-full h-full lg:pl-10">
            <img
              className=" hidden md:block absolute w-[362px] h-[350px] lg:w-[480px] lg:h-fit right-0 -bottom-[25%] lg:-bottom-[100px]"
              src={Fondo}
              alt="Fondo"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contacto;
