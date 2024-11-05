import React from "react";
import logo from "../assets/logo.png";
import "../css/Header.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h1>Global Market</h1>
      </div>
      
        <nav className="navbar">
          <ul className="nav-links">
           
            <li>
               <Link to={"/"}><a href="#">Inicio</a> </Link>
            </li>
           
            <li>
             <Link to={"/login"}> <a href="#">Ingresar</a></Link>
            </li>
            <li>
              <Link to={"/cart"}><a href="#"><span className="material-symbols-outlined">shopping_cart</span></a></Link>
            </li>
          </ul>
        </nav>
      
    </header>
  );
}
