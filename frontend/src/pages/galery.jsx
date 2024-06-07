import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import librosFondoGaleria from "../../public/FONDOS2/libros-fondo2.webp";
import "../styles/App.css"

function Galery() {
  return (
    <div>
      <div className=" w-full flex items-center justify-between">
        {/* barra de navegacion y componente para el login y el registro */}
        <Nav />
        <Pill />
      </div>
      <div className="mt-20 w-11/12 mx-auto">
          <figure className=" w-full">
            <img src={librosFondoGaleria} alt="libros-fondo-galeria" className=" absolute libros-fondo-galeria" />
          </figure>
        <div className=" z-10 flex justify-center items-center flex-col">

          <input type="text" placeholder="Buscar" />
          <h1>GALERÍA</h1>
          <p>
            Explora tu biblioteca digital repelta de infinitas posibilidades
            para expandir
          </p>
          <p>tus horizontes y enriquecer tu mente</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Galery;
