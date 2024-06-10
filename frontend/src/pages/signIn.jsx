import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import signIn from "../../public/FONDOS2/signIn.webp";
import logoAthena from "../assets/logo-athena.svg";
import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div>
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="w-2/3 mx-auto my-5">
        <div className="grid md:grid-cols-2 gap-x-5 mb-16">
          <img src={signIn} alt="" />
          <div className="flex flex-col items-center justify-around ">
            <p className="text-[var(--secondary-color)] text-5xl font-semibold">
              INGRESAR
            </p>
            <form action="" className="w-full">
              <div>
                <label
                  htmlFor="correo"
                  className="text-[var(--secondary-color)]"
                >
                  Correo:
                </label>
                <input
                  type="email"
                  name="correo"
                  id="correo"
                  className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400 mb-4"
                />
              </div>
              <div>
                <label
                  htmlFor="cedula"
                  className="text-[var(--secondary-color)] "
                >
                  Cedula:
                </label>
                <input
                  type="text"
                  name="cedula"
                  id="cedula"
                  className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                />
              </div>
            </form>
            <div className="text-center">
              <button className=" mb-6 mt-3 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg">
                Ingresar
              </button>
            </div>
            <div className="flex flex-col items-center">
              <p>¿No tienes una cuenta?</p>
              <Link
                to="/Register"
                className="text-[var(--primary-color)] font-semibold"
              >
                Registrate aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SignIn;
