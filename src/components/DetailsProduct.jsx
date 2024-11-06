import React, { useCallback, useContext } from 'react'
import { useParams } from 'react-router-dom';// permite acceder a los parámetros dinámicos de la URL en componentes
import { useState, useEffect } from 'react';
import "../css/DetailsProduct.css";
import Modal from './Modal';
import { useCart } from '../context/CartContext';
import API_URL from '../API';
import axios from 'axios';

export default function DetailsProduct() {
  const { id } = useParams(); // Capturamos el id del producto desde la URL

  const { cart, toggleCart } = useCart()
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado de visibilidad de la modal
  const [isClicked, setIsClicked] = useState(false);//estado para cambiar clase de boton
  const paymentMethods = ["Tarjeta de crédito", "Tarjeta de débito", "Transferencia", "PayPal"]; // Opciones de pago disponibles
  const [productos, setProductos] = useState([]);
  const [product, setProduct] = useState(null); // Usamos estado para almacenar el producto que buscamos

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data); // Actualiza el estado con los datos de la API
        console.log(product)
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    obtenerProductos();
  }, []);
  useEffect(() => {
    const foundProduct = productos.find((p) => p.id === parseInt(id));
    setProduct(foundProduct); // Buscamos el producto en el estado `products`
  }, [id, productos]); // Vuelve a ejecutar cuando `id` o `products` cambian
 


  // Verifica si el producto existe, si no muestra un mensaje
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <main className="product-details-container">
      {/* Sección de imagen del producto */}
      <section className="product-selected-image">
        <img src={product.image} alt={product.titulo} />
      </section>

      {/* Sección de información principal del producto */}
      <article className="product-info">
        <h1>{product.titulo}</h1>
        <p className="product-category">Categoría: {product.category}</p>
        
        {/* Lista de detalles específicos */}
        <ul className="product-details-list">
          <li>Detalle 1</li>
          <li>Detalle 2</li>
        </ul>
        
        <p className="product-price">Precio: ${product.precio}</p>
        <p className="product-cuotas">Unidades: {product.unidades} Unidades</p>
        
        {/* Botón de compra */}
        <button className="buy-button">Comprar Ahora</button>
        
        {/* Botón para abrir el modal de métodos de pago */}
        <button className='modal-button' onClick={() => setIsModalOpen(true)}>Medios de pago</button>
        
       {/* Botón de Agregar/Quitar al Carrito */}
       <button
          onClick={() => toggleCart(product)}
          className={`cart-button ${isInCart ? "in-cart" : ""}`}
        >
          {isInCart ? "Quitar del Carrito" : "Agregar al Carrito"}
        </button>
        {/* Modal de métodos de pago */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          paymentMethods={paymentMethods}
        />
      </article>

      {/* Sección de detalles adicionales del producto */}
      <section className="details-container">
        <h2>Detalles</h2>
        <p>
          {product.descripcion}
        </p>
      </section>
    </main>
  );
}
