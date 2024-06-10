import Home from "./pages/home";
import Galery from "./pages/galery";
import { Route, Routes } from "react-router-dom";
import Book from "./pages/Book";
import ScrollToTop from "./components/scrollToTop";
import Register from "./pages/register";

function App() {
  return (
    <>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Galery" element={<Galery />} />
          <Route path="/Book/:id" element={<Book />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
    </>
  );
}

export default App;
