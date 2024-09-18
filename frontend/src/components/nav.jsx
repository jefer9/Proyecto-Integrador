import { Link } from "react-router-dom";
import logoAthena from "../assets/logo-athena.svg";
import menu from "../assets/icons/menu.svg";
import "../styles/App.css";
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className=" flex justify-evenly w-2/4 font-roboto ml-12 h-full items-center sm:gap-2">
        <div className="bg-white sm:bg-[var(--secondary-color)] w-24 h-full flex items-center sm:justify-center">
          <img
            src={logoAthena}
            alt="logo-athena"
            className="max-w-16 max-h-16  md:w-20 md:h-20 my-4 md:my-2 hidden sm:block"
          />
          <img src={menu} alt="" className=" sm:hidden" onClick={handleClick}/>
        </div>
        <ul className="sm:flex gap-8 pt-2 text-[var(--secondary-color)] hidden">
          <li>
            <Link to="/" className="link-underline">
              INICIO
            </Link>
          </li>
          <li>
            <Link to="/Galery" className="link-underline">
              GALERÍA
            </Link>
          </li>
          <li>
            <Link to="/Contacto" className="link-underline">
              CONTACTO
            </Link>
          </li>
        </ul>

        {isOpen ? (
          <div className="flex flex-col fixed top-0 left-0 py-5">
            <ul className="flex flex-col text-[var(--secondary-color)]">
              <li>
                <Link to="/" className="link-underline">
                  INICIO
                </Link>
              </li>
              <li>
                <Link to="/Galery" className="link-underline">
                  GALERÍA
                </Link>
              </li>
              <li>
                <Link to="/Contacto" className="link-underline">
                  CONTACTO
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </nav>
    </>
  );
}

export default Nav;
