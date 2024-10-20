import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main"; // Importa tu componente Main

function App() {
  return (
    <Router>
      <Header showCategories={window.location.pathname === '/products'} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Main />} /> {/* Página de productos */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

