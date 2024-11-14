
import React from "react";
import "../styles/Loading.css"; // Asegúrate de tener estilos para el loading

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default Loading;