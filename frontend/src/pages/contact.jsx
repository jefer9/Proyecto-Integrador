import React from 'react';
import Footer from "../components/footer";
import Nav from "../components/nav";
import "../styles/contacto.css";
import Pill from "../components/pill";
import Fondo from "../../public/FONDOS2/Fondos2_Mesa de trabajo 1 copia 3.svg";

const Contacto = () => {
    return (
        <div>
            <div className="w-full flex items-center justify-between">
                {/* barra de navegacion y componente para el login y el registro */}
                <Nav />
                <Pill />
            </div>
            <div className="container mx-auto px-4">
                {/* Título de la página */}
                <h1 className="text-purple-800 text-6xl font-bold mx-2 mt-12 uppercase">Contacto</h1>
                <p className="mt-20 mb-8 mx-2 font-bold ">Para nosotros es muy importante saber tus necesidades</p>
                {/* Formulario de contacto */}
                <div className="flex items-center space-x-2 mb-2 mx-2">
                    <input
                        type="text"
                        className="border-4 border-purple-800 rounded-full p-2 text-black w-1/1"
                        placeholder="Nombre:"
                    />
                    <input
                        type="email"
                        className="border-4 border-purple-800 rounded-full p-2 text-black w-1/1"
                        placeholder="Email"
                    />
                </div>
                <div className="mb-2 w-full mx-5">
                    <textarea
                        className="border-4 border-purple-800 rounded-lg p-2 w-2/5 text-black"
                        placeholder="Tu mensaje:"
                        rows="4"
                    />
                </div>
                <div className="flex justify-start my-5">
                    <button
                        className="bg-purple-600 text-white rounded-full p-2 w-40 hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300"
                    >
                        Enviar
                    </button>
                </div>
            </div>
            {/* Imagen pegada en la esquina inferior derecha sobre el Footer */}
            <div className="relative">
                <img className='fondo absolute bottom-0 right-0 z-40' src={Fondo} alt="Fondo" />
                <Footer />
            </div>
        </div>
    );
};

export default Contacto;