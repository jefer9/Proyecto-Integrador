import { Link, useNavigate } from "react-router-dom";
import userIcon from "../assets/icons/user.svg";
import { useEffect, useState } from "react";

function Pill() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const goHome = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    goHome("/");
    window.location.reload();
  };

  return (
    <>
      <div className="bg-[var(--secondary-color)] h-14 pl-3 rounded-s-full min-w-fit xsm:min-w-[300px] sm:min-w-[250px] md:min-w-[200px] lg:min-w-[300px] z-10">
        <div
          className="flex items-center justify-center h-full text-white font-roboto cursor-pointer"
          onClick={handleMenuToggle}
        >
          {user ? (
            <div className="flex items-center">
              <span className="mx-12 uppercase">{user.nombre_usuario}</span>
              {menuOpen && (
                <div className="absolute right-1 xsm:right-5 md:right-6 mt-[140px] w-40 bg-[var(--secondary-color)] text-white shadow-lg z-10 ">
                  <Link
                    to="/Profile"
                    className="block px-4 py-2 hover:bg-[var(--hover-color)]"
                  >
                    Perfil
                  </Link>
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
