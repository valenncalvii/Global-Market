import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Main from "./components/Main"; 
import DetailsProduct from './components/DetailsProduct';

function App() {
  return (
    <Router>
      <Header showCategories={window.location.pathname === '/products'} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Main />} /> 
        <Route path="/detailsproduct/:id" element={<DetailsProduct />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

