import React, { useState, useEffect } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";
import Pagination from "./pagination";
import API_URL from "../services/API";
import "../styles/ProductCard.css";
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

  // Obtener categorías desde el endpoint
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/products/{id}`);
        setCategories(response.data);
       console.log(categories)
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  //ACA ESTA EL FILTRO POR CATEGORIA PERO ESTA MEDIO MAL, ALGO DE ACA SIRVE IGUAL
  
   // Filtrar productos por categoría
   const filterProducts = () => {
    if (!filterCategory) return productos;  // Si no hay categoría seleccionada, mostrar todos los productos
    return productos.filter(product => product.category?.nombre === filterCategory);
    console.log("aca"+filterCategory)
    console.log("otro"+productos) 

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
            <li><button onClick={() => setFilterCategory("Sanitarios")}>Sanitarios</button></li>
            <li><button onClick={() => setFilterCategory("Materiales")}>Materiales</button></li>
            <li><button onClick={() => setFilterCategory("Herramientas varias")}>Herramientas varias</button></li>
          </ul>

          <h3>Ferretería</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("herramientas de corte")}>Herramientas de corte</button></li>
            <li><button onClick={() => setFilterCategory("herramientas de fijacion")}>Herramientas de fijación</button></li>
            <li><button onClick={() => setFilterCategory("herramientas de mano")}>Herramientas de mano</button></li>
            <li><button onClick={() => setFilterCategory("herramientas electricas")}>Herramientas eléctricas</button></li>
            <li><button onClick={() => setFilterCategory("herrajes y herraduras")}>Herrajes y herraduras</button></li>
          </ul>
          
          <h3>Hogar</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("jardin y camping")}>Jardín y Camping</button></li>
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
