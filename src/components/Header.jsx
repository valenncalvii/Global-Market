import React from "react";
import logo from "../components/logo.jpg"
export default function Header() {
  return (
    <header className="header-container">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt={logo.jpg} />
          <h1>Mercadona</h1>
        </div>
        <ul className="nav-links">
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Categorías</a></li>
          <li><a href="#">Carrito</a></li>
          <li><a href="#">Perfil</a></li>
        </ul>
      </nav>
    </header>
  );
}

