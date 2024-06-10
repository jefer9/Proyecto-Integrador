import { Link } from "react-router-dom";
import userIcon from "../assets/icons/user.svg"

function Pill() {
    return ( 
        <>

        {/*
        - si la persona no esta logeada el componente en su estado inicial se debe de renderizar con el icono y las ocpiones para registrarse y para ingresar
        
        -pero si la persona si esta logeada el componente solo debe de mostrar el nombre del usuario que esta logeado esto se logra con el localStorage y la bd
        */}

        <div className=" bg-[var(--secondary-color)] h-14 rounded-s-full">
            <div className="flex pr-6 pl-2 items-center justify-center h-full text-white font-roboto">
                <img src={userIcon} alt="" />
                <Link to="/Register" className=" mx-3">Registro</Link>
                <span className=" font-bold">|</span>
                <a href="#" className=" mx-3">Acceso</a>
            </div>
        </div>
        </>
     );
}

export default Pill;