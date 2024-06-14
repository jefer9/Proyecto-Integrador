import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/icons/user.svg";
import { useEffect, useState } from "react";

function Pill() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const loggedUser = localStorage.getItem("usuario");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const goHome = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    goHome("/");
  };

  return (
    <>
      <div className="bg-[var(--secondary-color)] h-14 rounded-s-full" >
        <div className="flex pr-6 pl-2 items-center justify-center h-full text-white font-roboto cursor-pointer" onClick={handleMenuToggle}>
          {user ? (
            <div className="flex items-center">
              <span className="mx-12 uppercase">{user.nombre}</span>
              {menuOpen && (
                <div className="absolute right-1 mt-[105px] w-40 bg-[var(--secondary-color)] text-white shadow-lg z-10">
                  {/* <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-[var(--hover-color)]"
                  >
                    Perfil
                  </Link> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--hover-color)]"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <img src={userIcon} alt="User Icon" />
              <Link to="/Register" className="mx-3">
                Registro
              </Link>
              <span className="font-bold">|</span>
              <Link to="/SignIn" className="mx-3">
                Acceso
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Pill;
