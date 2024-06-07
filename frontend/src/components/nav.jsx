// import "../styles/App.css"
import { Link } from "react-router-dom";
import logoAthena from "../../public/FONDOS2/fondo-athenas2.webp"


function Nav() {
  return (
    <>
      <nav className=" flex justify-evenly w-2/4 font-roboto ml-5">
        <img src={logoAthena} alt="logo-athena" />
        <ul className="flex gap-8 pt-16">
        <Link to="/">INICIO</Link>
        <Link to="/Galery">GALERÍA</Link>
        <Link href="">CONTACTO</Link>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
