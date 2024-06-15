import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import { useNavigate } from "react-router-dom";

function Register() {

  const goLogin = useNavigate()

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    cedula: "",
    tipoUsuario: "estudiante",
    terminos: false,
    contrasena: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terminos) {
      alert("Debe aceptar los términos y condiciones.");
      return;
    }

    const estudiante = {
      id: parseInt(formData.cedula),
      nombre: formData.nombre,
      apellido: formData.apellido,
      telefono: formData.telefono,
      email: formData.correo,
      contrasena: formData.contrasena,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/register_estudiantes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(estudiante),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        goLogin("/SignIn")
      } else {
        alert(data.detail);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al registrar el estudiante.");
    }
  };

  return (
    <div className="main-content">
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className=" w-1/2 mx-auto mt-4">
        <p className=" text-center text-[68px] font-semibold text-[var(--secondary-color)]">
          REGISTRARSE
        </p>
        <form
          onSubmit={handleSubmit}
          className=" w-full grid grid-cols-1 md:grid-cols-2 my-5 gap-y-5 gap-x-10"
        >
          <div>
            <label htmlFor="nombre" className="text-[var(--secondary-color)]">
              Nombre:
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="apellido" className="text-[var(--secondary-color)]">
              Apellido:
            </label>
            <input
              type="text"
              name="apellido"
              id="apellido"
              required
              value={formData.apellido}
              onChange={handleChange}
              className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="correo" className="text-[var(--secondary-color)]">
              Correo:
            </label>
            <input
              type="email"
              name="correo"
              id="correo"
              required
              value={formData.correo}
              onChange={handleChange}
              className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="cedula" className="text-[var(--secondary-color)]">
              Cedula:
            </label>
            <input
              type="number"
              name="cedula"
              id="cedula"
              required
              value={formData.cedula}
              onChange={handleChange}
              className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="telefono" className="text-[var(--secondary-color)]">
              Telefono:
            </label>
            <input
              type="number"
              name="telefono"
              id="telefono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="contrasena"
              className="text-[var(--secondary-color)]"
            >
              Contraseña:
            </label>
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              required
              className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
              value={formData.contrasena}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tipo-usuario" className="mr-3">
              Estudiante:
            </label>
            <input
              type="radio"
              name="tipo-usuario"
              id="estudiante"
              className=""
              required
              value="estudiante"
              checked={formData.tipoUsuario === "estudiante"}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              className=" mr-3"
              checked={formData.terminos}
              onChange={handleChange}
            />
            <label
              htmlFor="terminos"
              className="text-[var(--secondary-color)] font-medium"
            >
              Aceptar terminos y condiciones
            </label>
          </div>  
          <div className="text-center">
            <button
              type="submit"
              className=" mb-6 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
