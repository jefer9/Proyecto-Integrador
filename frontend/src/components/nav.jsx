import { Link } from "react-router-dom";
import logoAthena from "../assets/logo-athena.svg";
import menu from "../assets/icons/menu.svg";
import "../styles/App.css";
import { useEffect, useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Obtener el tipo de usuario actual
  useEffect(() => {
    const stored_user = JSON.parse(localStorage.getItem("user"));
    if (stored_user && stored_user.tipo_usuario === "administrador") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <>
      <nav className=" flex justify-evenly w-2/4 lg:w-2/3 font-roboto ml-12 h-full items-center sm:gap-4">
        <div className="bg-white md:bg-[var(--secondary-color)] w-24 h-full flex items-center sm:justify-center">
          <img
            src={logoAthena}
            alt="logo-athena"
            className="max-w-16 max-h-16  md:w-20 md:h-20 my-4 md:my-2 mx-3 hidden md:block"
          />
          <img
            src={menu}
            alt=""
            className=" md:hidden cursor-pointer z-40"
            onClick={handleClick}
          />
        </div>
        {/* menu de escritorio */}
        <ul className="md:flex gap-8 pt-2 text-[var(--secondary-color)] hidden">
          <li>
            <Link to="/" className="
            ">
              INICIO
            </Link>
          </li>
          <li>
            <Link to="/Galery" className="
            ">
              GALERÍA
            </Link>
          </li>
          <li>
            <Link to="/Contacto" className="
            ">
              CONTACTO
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/Admin" className="
              ">
                ADMINISTRACIÓN
              </Link>
            </li>
          )}
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
              <Link to="/" className="
              " onClick={closeMenu}>
                INICIO
              </Link>
            </li>
            <li>
              <Link to="/Galery" className="
              " onClick={closeMenu}>
                GALERÍA
              </Link>
            </li>
            <li>
              <Link
                to="/Contacto"
                className="
                "
                onClick={closeMenu}
              >
                CONTACTO
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link to="/Admin" className="
                ">
                  ADMINISTRACIÓN
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Nav;
