import React from "react";

export default function Header() {
  return (
    <header className="header-container">
      <nav>
        {/* Aquí irá el menú de navegación, el logo, etc. */}
        <h1>Nombre del Proyecto</h1>
        <ul>
          <li>Inicio</li>
          <li>Categorías</li>
          <li>Carrito</li>
          <li>Perfil</li>
        </ul>
      </nav>
    </header>
  );
}
