import Home from "./pages/home";
import Galery from "./pages/galery";
import { Route, Routes } from "react-router-dom";
import Book from "./pages/Book";
import ScrollToTop from "./components/scrollToTop";
import Register from "./pages/register";
import SignIn from "./pages/signIn";
import Contacto from "./pages/contact";
import Profile from "./pages/profile";
import Admin from "./pages/admin";
import ProtectedRoute from "./components/protectedRoute";

function App() {

  const stored_users = JSON.parse(localStorage.getItem("user"))
  const isAdmin = stored_users && stored_users.tipo_usuario === "administrador"
  console.log(isAdmin);

  return (
    <>
        <ScrollToTop/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Galery" element={<Galery />} />
          <Route path="/Galery/Book/:id" element={<Book />} />
          <Route path="/Contacto" element={<Contacto />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Profile" element={<Profile />} />
          <Route
          path="/Admin"
          element={
            <ProtectedRoute isAllowed={isAdmin}>
              <Admin />
            </ProtectedRoute>
          }
        />
        </Routes>
    </>
  );
}

export default App;
