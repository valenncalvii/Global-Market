import logo from "../assets/logo.png";
import "../styles/Header.css";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
export default function Header() {
  const { cart } = useCart();
  const { user } = useAuth();
  console.log("usuario" + user);
  // Calcular la cantidad total de productos en el carrito
  const totalQuantity = cart.reduce(
    (acc, product) => acc + (product.cantidad || 1),
    0
  );
  return (
    <header className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1 className="centered">Global Market</h1>
      </div>

      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <Link to={"/"}>Inicio </Link>
          </li>

          <li>
            {!user ? (
              <Link to={"/login"}>Ingresar</Link>
            ) : (
              <Link to={"/account"}>
                <span className="material-symbols-rounded">person</span>
              </Link>
            )}
          </li>
          <li>
            <Link to={"/cart"}>
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalQuantity > 0 && <label>{totalQuantity}</label>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
