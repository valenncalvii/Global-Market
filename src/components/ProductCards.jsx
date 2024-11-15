import React, { useState, useEffect } from "react";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";

export default function ProductCards({ id, image, title, price }) {
  const [imageError, setImageError] = useState(false);

  // Manejar el error si la imagen no carga
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="product-card">
      <img
        src={imageError ? "/path/to/default-image.jpg" : image} // Usa una imagen por defecto si hay error
        alt={title}
        className="product-image"
        onError={handleImageError}
      />
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-price-start">${price}</p>
      </div>
      <Link to={`/detailsproduct/${id}`}>
        <button className="buy-now">Comprar</button>
      </Link>
    </div>
  );
}
