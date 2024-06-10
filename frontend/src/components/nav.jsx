// import "../styles/App.css"
import { Link } from "react-router-dom";
// import logoAthena from "../../public/FONDOS2/fondo-athenas2.webp"
import logoAthena from "../assets/logo-athena.svg";

function Nav() {
  return (
    <>
      <nav className=" flex justify-evenly w-2/4 font-roboto ml-5 h-full items-center">
        <div className="bg-[var(--secondary-color)] w-24 h-full flex items-center justify-center">
          <img src={logoAthena} alt="logo-athena" className=" w-20 h-20 mt-5" />
        </div>
        <ul className="flex gap-8 pt-2">
          <Link to="/">INICIO</Link>
          <Link to="/Galery">GALERÍA</Link>
          <Link href="">CONTACTO</Link>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
