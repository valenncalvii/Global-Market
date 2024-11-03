import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import DetailsProduct from "./components/DetailsProduct";
import Cart from "./components/Cart";

function App() {
  return (
    
    <Router>
      <Header showCategories={window.location.pathname === "/"} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detailsproduct/:id" element={<DetailsProduct />}></Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App;
