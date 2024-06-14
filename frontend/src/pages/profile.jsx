import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";

function Profile() {
  return (
    <div className=" min-h-screen flex flex-col">
      <div className=" w-full flex items-center justify-between h-32">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="mt-8 flex-grow flex font-roboto w-2/3 mx-auto">
        <div className=" ">
          <p>Perfil</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
