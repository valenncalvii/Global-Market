import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Actualiza el localStorage cuando cambia el carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item.id === product.id);
      if (productIndex > -1) {
        // Si el producto ya existe, incrementa la cantidad
        const updatedCart = [...prevCart];
        updatedCart[productIndex].cantidad += 1;
        return updatedCart;
      } else {
        // Si el producto no existe, agrégalo con cantidad inicial de 1
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };
  //para remover productos del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart
    .map((item) =>
      item.id === productId ? { ...item, cantidad: item.cantidad - 1 } : item
    )
    .filter((item) => item.cantidad > 0)
);
  };

  const toggleCart = (product) => {
    const isInCart = cart.some((item) => item.id === product.id);
    if (isInCart) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
    } else {
      addToCart(product);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);