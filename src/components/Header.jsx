import React from "react";
import logo from "../assets/logo.png";
import "../css/Header.css";
export default function Header() {
  return (
    <header className="header-container">
       <div className="logo">
          <img src={logo} alt={logo.jpg} />
          <h1>Global Market</h1>
        </div>
        <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Categorías</a>
          </li>
          <li>
            <a href="#">Carrito</a>
          </li>
          <li>
            <a href="#">Perfil</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
