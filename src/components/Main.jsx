import React, { useState, useEffect } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";
import Pagination from "./pagination";
import API_URL from "../API";
import "../css/ProductCard.css";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const ITEMS_PER_PAGE = 9;

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProductos(response.data);
        console.log("Categorías disponibles:", response.data.map(product => product.category));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    obtenerProductos();
  }, []);

  // Función para filtrar productos por categoría
  const filterProducts = () => {
    let filtered = productos;

    // Filtrar por categoría si está seleccionada
    if (filterCategory) {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }
    return filtered;
  };
  //HASTA ACA EL FILTRO DSP ABAJO ES PARA FILTRAR LAS PAG QUE APAREZCAN 9 PROD
  
  const filteredProducts = filterProducts();

  // Para la paginación que muestre la cantidad de páginas
  const totalFilteredPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <main className="main-container">
      <aside className="filter-container">
        <div className="filter-product-box">
          <h3>Construcción</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("sanitarios")}>Sanitarios</button></li>
            <li><button onClick={() => setFilterCategory("materiales")}>Materiales</button></li>
            <li><button onClick={() => setFilterCategory("herramientas")}>Herramientas varias</button></li>
          </ul>

          <h3>Ferretería</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("corte")}>Herramientas de corte</button></li>
            <li><button onClick={() => setFilterCategory("fijacion")}>Herramientas de fijación</button></li>
            <li><button onClick={() => setFilterCategory("mano")}>Herramientas de mano</button></li>
            <li><button onClick={() => setFilterCategory("electricas")}>Herramientas eléctricas</button></li>
            <li><button onClick={() => setFilterCategory("herrajes")}>Herrajes y herraduras</button></li>
          </ul>
          
          <h3>Hogar</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("jardin")}>Jardín y Camping</button></li>
            <li><button onClick={() => setFilterCategory("piletas")}>Piletas</button></li>
          </ul>
        </div>
      </aside>

      <section className="product-list">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCards
              key={product.id}
              id={product.id}
              image={product.url}
              title={product.titulo}
              price={product.precio}
            />
          ))
        ) : (
          <p>No se encontraron productos para esta categoría.</p>
        )}

        <div className="pagination-container" style={{ gridColumn: "1/-1" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalFilteredPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>
    </main>
  );
}
