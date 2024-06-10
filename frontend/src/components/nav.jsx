import { Link } from "react-router-dom";
import logoAthena from "../assets/logo-athena.svg";
import "../styles/App.css"

function Nav() {
  return (
    <>
      <nav className=" flex justify-evenly w-2/4 font-roboto ml-5 h-full items-center">
        <div className="bg-[var(--secondary-color)] w-24 h-full flex items-center justify-center">
          <img src={logoAthena} alt="logo-athena" className=" w-20 h-20 mt-5" />
        </div>
        <ul className="flex gap-8 pt-2 text-[var(--secondary-color)]">
          <li>
            <Link
              to="/"
              className="link-underline"
            >
              INICIO
            </Link>
          </li>
          <li>
            <Link
              to="/Galery"
              className="link-underline"
            >
              GALERÍA
            </Link>
          </li>
          <li>
            <Link
              href=""
              className="link-underline"
            >
              CONTACTO
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
