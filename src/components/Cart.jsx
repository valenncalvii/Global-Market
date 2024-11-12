import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../css/cart.css";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);

 // Calcular el total de compra
 const total = cart.reduce(
  (acc, product) => acc + product.precio * (product.cantidad || 1),
  0
);
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
          <h3>Cantidad</h3>
        </div>
        <ul>
          {cart.map((product, index) => (
          
            <li key={index} className="cart-list">
              
              <img className="cart-img" src={product.image} alt={`Imagen de ${product.titulo}`} />
              <h4>{product.titulo}</h4>
              <div>${product.precio}</div> 
              <div>${product.precio * (product.cantidad || 1)}</div> 
              <div>{product.cantidad || 1}</div>
              <div className="control-units">
                  <button onClick={() => removeFromCart(product.id)}>-</button>
                  <span>{product.cantidad}</span>
                  <button onClick={() => addToCart(product)}>+</button>
                </div>
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
