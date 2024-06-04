import Footer from "../components/footer";
import Nav from "../components/nav";
import Pill from "../components/pill";
import "../styles/App.css";

function Home() {
  return (
    <>
      <div className="layout-main h-screen w-screen pt-14">
        <div className=" w-full flex items-center">
          {/* barra de navegacion y componente para el login y el registro */}
          <Nav />
          <Pill />
        </div>
        <div className=" w-2/3 m-auto mt-20 flex flex-col font-roboto">
          <div className=" ">
            <p className=" text-[62px] font-semibold h-14 text-[var(--secondary-color)]">TU BIBLIOTECA</p>
            <p className=" text-[100px] font-black tracking-high text-[var(--primary-color)]">DIGITAL</p>
            <p className=" text-2xl font-light w-[500px]">
              Sumérgete en un vasto océano de conocimiento con un solo click
            </p>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
}

export default Home;
