import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import signIn from "../../public/FONDOS2/signIn.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

function SignIn() {
  //creamos un objeto para el estado de los inputs del form
  const [formdata, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const goHome = useNavigate();

  //funcion para escuchar los cambios de los inputs del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //funcion para enviar el formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    //creamos un objeto FormData para enviar los datos
    const formData = new FormData();
    formData.append("username", formdata.correo);
    formData.append("password", formdata.contrasena);

    //comprobamos si los campos estan vacios
    if (!formdata.correo || !formdata.contrasena) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son obligatorios.",
      })
      return;
    } else {
      try {
        //si los campos no son vacios hacemos la peticion para el login con los valores ingresados en el form
        const response = await fetch("http://localhost:8000/usuarios/login", {
          method: "POST",
          body: formData,
        });
        //guardamos la respuesta del endpoint login en la variable "data"
        const data = await response.json();
        //si la respuesta es correcta creamos
        if (response.ok) {
          // console.log(data);
          //guardamos el token en el local storage
          localStorage.setItem("token", data.access_token);
          // hacemos una peticion a la api para traer la informacion del usuario ingresado, usando el token de acceso
          const userResponse = await fetch(
            "http://localhost:8000/usuarios/me",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${data.access_token}`,
              },
            }
          );
          //guardamos la respuesta del enpoint para traer la informacion del usuario en la variable "userData"
          const userData = await userResponse.json();
          //si la respuesta es ok
          if (userResponse.ok) {
            //guardamos la informacion del usuario en el localStorage
            localStorage.setItem("user", JSON.stringify(userData));
            //validamos si el usuarios es admin

            Swal.fire({
              title: "Correcto",
              text: "Login exitoso",
              icon: "success",
              allowOutsideClick: false,
            }).then(() => {
              // console.log(userData);
              //despues de que la alerta desaparezca se ejecutan las demas acciones
              if (userData.tipo_usuario === "administrador") {
                goHome("/Admin");
              } else {
                goHome("/");
              }
              //recargamos la pagina despues del login exitoso
              window.location.reload();
            });
          } else {
            alert("Error al obtener datos del usuario");
          }
        } else {
          //si el login no es exitoso mostraos una alerta de sweetalet2
          Swal.fire({
            title: "Error",
            text: "Usuario o contraseña incorrecta",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Hubo un error al iniciar sesión.");
      }
    }
  };

  return (
    <>
      <div className="main-content">
        <div className=" w-full flex items-center justify-between mt-4 md:h-32 md:mt-0">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />
        </div>
        <div className="w-2/3 mx-auto mt-8">
          <div className="grid sm:grid-cols-2 gap-x-5 md:gap-x-10">
            <img
              src={signIn}
              alt=""
              className=" h-[280px] md:w-[400px] md:h-[330px] hidden sm:block"
            />
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
