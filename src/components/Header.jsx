import logo from "../assets/logo.png";
import "../css/Header.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; 

export default function Header() {

  const { cart } = useCart();

  // Calcular la cantidad total de productos en el carrito
  const totalQuantity = cart.reduce((acc, product) => acc + (product.cantidad || 1), 0);
  return (
    <header className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Global Market</h1>
      </div>
      
        <nav className="navbar">
          <ul className="nav-links">
           
            <li>
               <Link to={"/"}>Inicio </Link>
            </li>
           
            <li>
             <Link to={"/login"}>Ingresar</Link>
            </li>
            <li>
              <Link to={"/cart"}><span className="material-symbols-outlined">shopping_cart</span> 
              {totalQuantity > 0 && <label>{totalQuantity}</label>}
              </Link>
            </li>
          </ul>
        </nav>
      
    </header>
  );
}
