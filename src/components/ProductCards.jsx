import React from "react";
import "../css/ProductCard.css";
export default function ProductCards({ image, title, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">${price}</p>
      </div>
      <button className="add-to-cart">Agregar al carrito</button>
    </div>
  );
}
