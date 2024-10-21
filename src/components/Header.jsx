import React from "react";
import logo from "../assets/logo.png";
import "../css/Header.css";
import { Link } from "react-router-dom";
export default function Header({ showCategories }) {
  return (
    <header className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Global Market</h1>
      </div>
      {showCategories && (
        <nav className="navbar">
          <ul className="nav-links">
           
            <li>
               <Link to={"/products"}><a href="#">Inicio</a> </Link>
            </li>
           
            <li>
              <a href="#">Carrito</a>
            </li>
            <li>
              <a href="#">Perfil</a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
