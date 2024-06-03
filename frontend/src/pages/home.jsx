import Nav from "../components/nav";
import Pill from "../components/pill";
import '../styles/App.css'

function Home() {
    return ( 
        <>
        <div className="layout-main h-screen w-screen pt-14">
            <div className=" w-full flex items-center">
            <Nav/>
            <Pill/>
            </div>
        </div>
        </>
     );
}

export default Home;