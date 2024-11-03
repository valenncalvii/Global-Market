import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((product, index) => (
            <li key={index}>
              {product.title} - ${product.price.toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}