/* hecho por jaider*/
import React from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import "../styles/contacto.css";
import Pill from "../components/pill";
import Fondo from "../../public/FONDOS2/Fondos2_Mesa de trabajo 1 copia 3.svg";

const Contacto = () => {
  return (
    <div>
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="">
        <div className=" w-1/2 mr-auto pr-4 pl-24  flex flex-col justify-start items-start">
          <h1 className="text-[var(--secondary-color)] text-[72px] font-semibold mt-8 uppercase">
            Contacto
          </h1>
          <span className="text-3xl font-bold text-[var(--secondary-color)]">
            - - - - - - - - - - -
          </span>
          <p className=" font-medium pr-48 w-3/4">
            Para nosotros es muy importante saber tus necesidades
          </p>
          <div className="flex items-center mb-2 mx-2 w-1/2 gap-2">
            <input
              type="text"
              className="block w-1/2 mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              placeholder="Nombre:"
            />
            <input
              type="email"
              className="block w-1/2 mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              placeholder="Email"
            />
          </div>
          <div className="mb-2 w-full mx-5">
            <textarea
              className="border-4 border-[var(--secondary-color)] rounded-lg p-2 w-2/5 text-black"
              placeholder="Tu mensaje:"
              rows="4"
            />
          </div>
          <div className="flex justify-start my-5">
            <button className="bg-[var(--secondary-color)] text-white rounded-full p-2 w-40 hover:bg-[var(--primary-color)] focus:outline-none focus:ring focus:ring-purple-300">
              Enviar
            </button>
          </div>
        </div>
        <div className="">
          <img
            className="fondo absolute bottom-0 right-0 z-40"
            src={Fondo}
            alt="Fondo"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacto;
