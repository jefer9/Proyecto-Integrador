import { Link } from "react-router-dom";

function LibroPortada({ libro }) {

  const imageUrl = `http://localhost:8000${libro.image_path}`

  return (
    <div className=" text-center flex flex-col">
      <Link to={"/Book/" + libro.id}>
        <img
          src={imageUrl}
          alt={libro.titulo}
          className=" hover:scale-105 transition h-[300px] w-[200px]"
        />
      </Link>
      <Link to={"/Book/" + libro.id}>
        <p className="mt-2 text-[var(--secondary-color)]">{libro.titulo}</p>
      </Link>
    </div>
  );
}

export default LibroPortada;
