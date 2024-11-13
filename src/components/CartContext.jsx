import React, { createContext, useState, useContext } from "react";

// Crear el contexto para el carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar o quitar un producto al carrito
  const toggleCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);

    if (isProductInCart) {
      // Si el producto ya está en el carrito, lo eliminamos
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      // Si el producto no está en el carrito, lo agregamos
      setCart([...cart, product]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito en otros componentes
export const useCart = () => {
  return useContext(CartContext);
};
