import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import "../styles/DetailsProduct.css";
import Modal from './modals/Modal';
import { useCart } from '../context/CartContext';
import API_URL from '../services/API';
import axios from 'axios';
import { useAuth } from "../context/AuthContext"
import Loading from './Loading';
import { Link } from "react-router-dom";

export default function DetailsProduct() {
  const { id } = useParams(); // Capturamos el id del producto desde la URL
  const { cart, toggleCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado de visibilidad del modal
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Estado para almacenar el método de pago seleccionado
  const paymentMethods = ["Tarjeta de crédito", "Tarjeta de débito", "Transferencia", "PayPal"];
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir
  const location = useLocation(); // Captura la URL de la página actual
  const { isAuthenticated} = useAuth();// Estado de si el usuario está logueado

 
  //funcion para llamar a la api y obtener producto
  useEffect(() => {
    const obtenerProducto = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`${API_URL}/products/${id}`);
        console.log(response)
        setProduct(response.data);
        console.log("Producto obtenido:", response.data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      }finally{
        setIsLoading(false)
      }
    };
    obtenerProducto();
  }, [id]);

  // Función para manejar la selección de un método de pago desde el modal
  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
    setIsModalOpen(false); // Cerrar el modal después de seleccionar
  };

  // Redirigir al login si no está logueado y pasar la URL actual para redirigir después
  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      
    } else {
        const newOrder = {
          fechaOrden:  new Date().toISOString(),
          UserId: 1, //
          ProductId: product.id,
          Quantit: 1,
          Price: product.precio,
        };
    
        try {
          const response = await axios.post(`${API_URL}/orders`, newOrder);
          console.log("Orden creada con éxito:", response.data);
        } catch (error) {
          console.error("Error al crear la orden:", error);
        }
      }
  };

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <main className="product-details-container">
      
      {/* Sección de imagen del producto */}
      <section className="product-selected-image">
       <div className='div-link'>
        <Link className="link" to={"/"}>⬅</Link>
       </div>
        <img src={product.url} alt={product.titulo} />
      </section>

      {/* Sección de información principal del producto */}
      <article className="product-info">
      {isLoading && <Loading></Loading>}
        <h1>{product.titulo}</h1>
        <p className="product-category">Categoría: {product.categoria}</p>

        <p className="product-price">Precio: ${product.precio}</p>
        <p className="product-cuotas">Unidades: {product.unidades} Unidades</p>

        {/* Botón de compra */}
        <button className="buy-button" onClick={handleBuyNow}>Comprar Ahora</button>

        {/* Botón para abrir el modal de métodos de pago */}
        <button className="modal-button" onClick={() => setIsModalOpen(true)}>Medios de pago</button>

        {/* Botón de Agregar/Quitar al Carrito */}
        <button
          onClick={() => toggleCart(product)}
          className={`cart-button ${isInCart ? "in-cart" : ""}`}
        >
          {isInCart ? "Quitar del Carrito" : "Agregar al Carrito"}
        </button>

        {/* Mostrar el método de pago seleccionado */}
        {selectedPaymentMethod && (
          <p className="selected-payment-method">Método de pago seleccionado: {selectedPaymentMethod}</p>
        )}

        {/* Modal de métodos de pago */}
        <Modal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          paymentMethods={paymentMethods}
          onSelectPaymentMethod={handleSelectPaymentMethod}
        />
      </article>

      {/* Sección de detalles adicionales del producto */}
      <section className="details-container">
        <h2>Detalles</h2>
        <p>{product.descripcion}</p>
      </section>
    </main>
  );
}
