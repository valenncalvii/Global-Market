import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../css/cart.css";
export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
        <div className="cart-bar">
          <p></p>
          <h3>Producto</h3>
          <h3>Precio</h3>
          <h3>Subtotal</h3>
        </div>
        <ul>
          {cart.map((product, index) => (
            <li key={index} className="cart-list">
              
              <img className="cart-img" src={product.image} alt={product.title} />
              <h4>{product.titulo}</h4>
              <div>${product.price.toLocaleString()}</div> 
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
}
