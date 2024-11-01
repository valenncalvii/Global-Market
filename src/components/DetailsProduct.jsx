import React from 'react'
import products from "../productos.json";
import { useParams } from 'react-router-dom';// permite acceder a los parámetros dinámicos de la URL en componentes
import { useState } from 'react';
import "../css/DetailsProduct.css";
import Modal from './Modal';


export default function DetailsProduct() {
  const { id } = useParams(); // Capturamos el id del producto desde la URL
  const product = products.find((p) => p.id === parseInt(id)); // Buscamos el producto por su id
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado de visibilidad de la modal
  const paymentMethods = ["Tarjeta de crédito", "Tarjeta de débito", "Transferencia", "PayPal"]; // Opciones de pago disponibles

  // Verifica si el producto existe, si no muestra un mensaje
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <main className="product-details-container">
      {/* Sección de imagen del producto */}
      <section className="product-selected-image">
        <img src={product.image} alt={product.title} />
      </section>

      {/* Sección de información principal del producto */}
      <article className="product-info">
        <h1>{product.title}</h1>
        <p className="product-category">Categoría: {product.category}</p>
        
        {/* Lista de detalles específicos */}
        <ul className="product-details-list">
          <li>Detalle 1</li>
          <li>Detalle 2</li>
        </ul>
        
        <p className="product-price">Precio: ${product.price.toLocaleString()}</p>
        <p className="product-cuotas">Cuotas: {product.cuotas} cuotas</p>
        
        {/* Botón de compra */}
        <button className="buy-button">Comprar Ahora</button>
        
        {/* Botón para abrir el modal de métodos de pago */}
        <button className='modal-button' onClick={() => setIsModalOpen(true)}>Medios de pago</button>
        
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quos officia voluptas quae, cum quas eos,
          corrupti sunt, voluptates aspernatur facere eius voluptatibus aperiam ullam veniam. Dolor quae commodi eos! 
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis doloremque maxime suscipit quaerat 
          quibusdam cupiditate. Ipsum dolorum modi aperiam, soluta eos expedita commodi. Commodi ipsam ipsa veniam nulla 
          asperiores? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus id sunt ad perspiciatis rerum
          ea sed deleniti, veniam optio maxime cum quae minima dolor voluptatum, aspernatur eos reprehenderit ratione 
          accusamus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore nam est, nobis tempora ipsam 
          eveniet nesciunt corporis at iste, dolores atque? Beatae iste explicabo amet! Nemo nobis vitae voluptatibus vel.
        </p>
      </section>
    </main>
  );
}
