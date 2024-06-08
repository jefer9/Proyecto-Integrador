import Home from "./pages/home";
import Galery from "./pages/galery";
import { Route, Router, Routes } from "react-router-dom";
import Book from "./pages/Book";
import ScrollToTop from "./components/scrollToTop";

function App() {
  return (
    <>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Galery" element={<Galery />} />
          <Route path="/Book/:id" element={<Book />} />
        </Routes>
    </>
  );
}

export default App;
