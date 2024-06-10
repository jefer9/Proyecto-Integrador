import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";

function Register() {
  return (
    <div>
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className=" w-1/2 mx-auto mt-5">
        <p className=" text-center text-[72px] font-semibold text-[var(--secondary-color)]">
          REGISTRARSE
        </p>
        <form
          action=""
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
              className="block w-full mt-2 px-3 py-2 border-b-2 border-0
              focus:border-[var(--secondary-color)] focus:outline-none border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="tipo-usuario" className="mr-3">Estudiante:</label>
            <input
              type="radio"
              name="tipo-usuario"
              id="estudiante"
              className=""
            />
          </div>
          <div>
            <label htmlFor="tipo-usuario" className="mr-3">Docente:</label>
            <input type="radio" name="tipo-usuario" id="docente" className="" />
          </div>
          <div>
            <input 
            type="checkbox" 
            name="terminos" 
            id="terminos" 
            className=" mr-3" />
            <label htmlFor="terminos" className="text-[var(--secondary-color)] font-medium">Aceptar terminos y condiciones</label>
          </div>
        </form>
        <div className="text-center">
          <button className=" mb-6 bg-[var(--secondary-color)] hover:bg-[var(--primary-color)] text-white py-3 px-5 rounded-lg">
            Registrarse
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
