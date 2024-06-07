import Home from "./pages/home";
import Galery from "./pages/galery";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Galery" element={<Galery/>}/>
      </Routes>
    </>
  );
}

export default App;
