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

  const closeMenu = () => {
    setIsOpen(false);
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
          <img
            src={menu}
            alt=""
            className=" sm:hidden cursor-pointer z-40"
            onClick={handleClick}
          />
        </div>
        {/* menu de escritorio */}
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

        {/* menu mobile */}
        <div className="flex relative h-full sm:hidden">
          <ul
            className={`
              flex flex-col justify-start items-center
              text-white bg-[var(--secondary-color-transparent)]
              h-screen w-3/4
              fixed left-0 top-0
              pt-28 space-y-4 z-20
              transition-transform transform duration-500 ease-in-out
              ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <li>
              <Link to="/" className="link-underline" onClick={closeMenu}>
                INICIO
              </Link>
            </li>
            <li>
              <Link to="/Galery" className="link-underline" onClick={closeMenu}>
                GALERÍA
              </Link>
            </li>
            <li>
              <Link
                to="/Contacto"
                className="link-underline"
                onClick={closeMenu}
              >
                CONTACTO
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
