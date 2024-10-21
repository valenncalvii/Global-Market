import React from "react";
import "../css/ProductCard.css";
import { Link } from "react-router-dom";
export default function ProductCards({id, image, title, price }) {


  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-price-start">${price}</p>
      </div>
      <Link to={`/detailsproduct/${id}`}> 
        <button className="add-to-cart">Agregar al carrito</button>
      </Link>
    </div>
    
  );
}
