import React from "react";
import { useState } from "react";
import ProductCards from "./ProductCards";
import products from "../productos.json";
import Pagination from "./pagination";
import "../css/ProductCard.css";
const ITEMS_PER_PAGE = 9;

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);//estado de paginas
  const [filterCategory, setFilterCategory] = useState("");//estado de filtro
  const [filterPriceRange, setFilterPriceRange] = useState(null); // Estado para rango de precios

  // Función para filtrar productos por categoría y rango de precio
  const filterProducts = () => {
    let filtered = products;

    // Filtrar por categoría si está seleccionada
    if (filterCategory) {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }
    return filtered;
  };

  const filteredProducts = filterProducts();
  //para la paginacion que muestre la cant de paginas
  const totalFilteredPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  //para mostrar en pantalla 9 productos
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <main className="main-container">
      <aside className="filter-container">
        <div className="filter-product-box">
          <h3>Construccion</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("celulares")}>Sanitarios</button></li>
            <li><button onClick={() => setFilterCategory("ropa")}>Materiales</button></li>
            <li><button onClick={() => setFilterCategory("muebles")}>Herramientas varias</button></li>
          </ul>

          <h3>Ferreteria</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("")}>Herramientas de corte</button></li>
            <li><button onClick={() => setFilterCategory("")}>Herramientas de fijacion</button></li>
            <li><button onClick={() => setFilterCategory("")}>Herramientas de mano</button></li>
            <li><button onClick={() => setFilterCategory("")}>Herramientas electricas</button></li>
            <li><button onClick={() => setFilterCategory("")}>Herrajes y herraduras</button></li>
          </ul>
          <h3>Hogar</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("")}>Jardin y Camping</button></li>
            <li><button onClick={() => setFilterCategory("")}>Piletas</button></li>
          </ul>
        </div>
      </aside>

      <section className="product-list">
        {currentProducts.map((product) => (
          <ProductCards
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}

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