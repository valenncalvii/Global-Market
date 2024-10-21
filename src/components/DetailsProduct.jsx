import React from 'react'
import products from "../productos.json";
import { useParams } from 'react-router-dom';
import "../css/DetailsProduct.css";
export default function DetailsProduct() {
    const { id } = useParams(); // capturamos el id desde la URL
    const product = products.find((p) => p.id === parseInt(id)); // buscamos el producto por su id
  
    if (!product) {
      return <div>Producto no encontrado</div>;
    }
    return (
        <div className="product-details-container">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-info">
            <h1>{product.title}</h1>
            <p className="product-category">Categoria: {product.category}</p>
            <p className="product-price">Precio: ${product.price.toLocaleString()}</p>
            <p className="product-cuotas">Cuotas: {product.cuotas} cuotas</p>
            <button className="buy-button">Comprar Ahora</button>
          </div>
        </div>
      );
      
}

