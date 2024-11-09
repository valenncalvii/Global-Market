import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main";
import DetailsProduct from "./components/DetailsProduct";
import Cart from "./components/Cart";
import "./css/Header.css";
function App() {
  return (
    <div className="app-container">
      <Router>
        <Header className="header" showCategories={window.location.pathname === "/"} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/detailsproduct/:id"
              element={<DetailsProduct />}
            ></Route>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </Router>
      <Footer className="footer" />
    </div>
  );
}

export default App;
