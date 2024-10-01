import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";

function Profile() {
  const userData = JSON.parse(localStorage.getItem("user")) || [];

  return (
    <div className="main-content">
      <div className=" w-full flex items-center justify-between md:h-32 mt-4 md:mt-0">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="mt-8 font-roboto w-2/3 sm:w-3/4 mx-auto h-[95%] sm:h-[80%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full text-gray-500/80 gap-y-5 gap-x-5 sm:text-center">
          <h2 className="text-3xl text-[var(--secondary-color)] sm:col-span-2 my-4 text-center">Perfil</h2>
          <div>
            <p className="font-semibold text-gray-700">Nombre:</p>
            <p>{userData.nombre_usuario}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Apellido:</p>
            <p>{userData.apellido_usuario}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Correo electrónico:</p>
            <p>{userData.email}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Telefono: </p>
            <p>{userData.telefono}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Tipo de usuario:</p>
            <p>{userData.tipo_usuario}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Reservas:</p>
            <p>0</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
