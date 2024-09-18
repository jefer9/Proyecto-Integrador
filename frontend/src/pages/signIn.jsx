import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import signIn from "../../public/FONDOS2/signIn.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignIn() {
  const [formdata, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const goHome = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario = {
      email: formdata.correo,
      contrasena: formdata.contrasena,
    };

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        if (data.usuario) {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          goHome("/");
        }
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al iniciar sesión.");
    }
  };

  return (
    <>
    
    <div className="main-content">
      <div className=" w-full flex items-center justify-between mt-4 md:h-32 sm:mt-0 ">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="w-2/3 mx-auto mt-8">
        <div className="grid sm:grid-cols-2 gap-x-5 md:gap-x-10">
          <img src={signIn} alt="" className=" h-[280px] md:w-[400px] md:h-[330px] hidden sm:block"/>
          <div className="flex flex-col items-center justify-around ">
            <p className="text-[var(--secondary-color)] text-start text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              INGRESAR
            </p>
            <form onSubmit={handleSubmit} className="w-full">
              <div>
                <label
                  htmlFor="correo"
                  className="text-[var(--secondary-color)] font-semibold"
                >
                  Correo:
                </label>
                <input
                  type="email"
                  name="correo"
                  id="correo"
                  value={formdata.correo}
                  onChange={handleChange}
                  className="block w-full mt-2 px-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400 mb-4"
                />
              </div>
              <div>
                <label
                  htmlFor="contrasena"
                  className="text-[var(--secondary-color)] font-semibold"
                >
                  Contraseña:
                </label>
                <input
                  type="password"
                  name="contrasena"
                  id="contrasena"
                  value={formdata.contrasena}
                  onChange={handleChange}
                  className="block w-full mt-2 px-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className=" my-8 md:my-6  bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg"
                >
                  Ingresar
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center">
              <p>¿No tienes una cuenta?</p>
              <Link
                to="/Register"
                className="text-[var(--primary-color)] text-lg font-semibold italic"
              >
                Registrate aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Footer />
  </>
  );
}

export default SignIn;
