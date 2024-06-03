import userIcon from "../assets/icons/user.svg"

function Pill() {
    return ( 
        <>

        {/* si la persona no esta logeada el componente en su estado inicial se debe de renderizar con el icono y las ocpiones para registrarse y para ingresar */}

        <div className=" bg-[#484596] h-14 rounded-s-full">
            <div className="flex pr-6 pl-2 items-center justify-center h-full text-white">
                <img src={userIcon} alt="" />
                <a href="#" className=" mx-3">Registro</a>
                <span className=" font-bold">|</span>
                <a href="#" className=" mx-3">Acceso</a>
            </div>
        </div>
        </>
     );
}

export default Pill;