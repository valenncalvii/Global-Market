import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Asegúrate de importar el contexto
import "../css/cart.css";

export default function Cart() {
  const { cart, removeFromCart, addToCart, removeProduct, toggleCart } = useContext(CartContext);

  // Calcular el total de la compra
  const total = cart.reduce(
    (acc, product) => acc + product.precio * (product.cantidad || 1),
    0
  );

  // Función para manejar la eliminación del producto
  const handleRemoveProduct = (product) => {
    removeFromCart(product.id); // Llamada a la función de eliminar el producto
  };

  // Función para manejar la reducción de cantidad
  const handleRemove = (product) => {
    if (product.cantidad > 1) {
      removeFromCart(product.id, product.cantidad - 1); // Reducir la cantidad
    } else {
      handleRemoveProduct(product.id); // Eliminar si la cantidad es 1
    }
  };

  // Función para alternar el producto en el carrito (agregar o quitar)
  const handleToggleCart = (product) => {
    toggleCart(product); // Llamada a toggleCart para agregar o quitar el producto
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="cart-title-empty">El carrito está vacío</p>
      ) : (
        <>
          <div className="cart-bar">
            <p></p>
            <h3>Producto</h3>
            <h3>Precio</h3>
            <h3>Subtotal</h3>
            <h3>Cantidad</h3>
          </div>
          <ul>
            {cart.map((product, index) => (
              <li key={index} className="cart-list">
                <img
                  className="cart-img"
                  src={product.url}
                  alt={`Imagen de ${product.titulo}`}
                />
                <h4>{product.titulo}</h4>
                <div>${product.precio}</div>
                <div>${product.precio * (product.cantidad || 1)}</div>
                <div>{product.cantidad || 1}</div>
                <div className="control-units">
                  <button
                    onClick={() => handleRemove(product)}
                    disabled={product.cantidad === 1} // Deshabilitar si la cantidad es 1
                    className={product.cantidad === 1 ? "disabled-button" : ""}
                  >
                    -
                  </button>
                  <span>{product.cantidad}</span>
                  <button onClick={() => addToCart(product)}>+</button>
                </div>

                {/* Botón de alternar (Añadir o Quitar) */}
                <button
                  className="toggle-cart-button"
                  onClick={() => handleToggleCart(product)}
                >
                  {cart.some(item => item.id === product.id) ? 'Quitar del carrito' : 'Añadir al carrito'}
                </button>
              </li>
            ))}
          </ul>
          <section className="cart-buy">
            <div className="cart-buy-total">
              <p>El total de compra es: ${total.toFixed(2)}</p>
            </div>
            <button className="cart-buy-button">Comprar todo</button>
          </section>
        </>
      )}
    </div>
  );
}
