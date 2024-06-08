import { Link } from "react-router-dom";

function LibroPortada({ libro }) {
  return (
    <div className=" text-center flex flex-col">
      <Link to={"/Book/" + libro.id}>
        <img src={libro.imagen_portada} alt={libro.titulo} className=" hover:scale-105 transition" />
      </Link>
      <Link to={"/Book/" + libro.id}>
        <p className="mt-2 text-[var(--secondary-color)]">{libro.titulo}</p>
      </Link>
    </div>
  );
}

export default LibroPortada;
