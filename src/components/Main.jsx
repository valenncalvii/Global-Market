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

    // Filtrar por rango de precio si está seleccionado
    if (filterPriceRange) {
      const [min, max] = filterPriceRange;
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
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
          <h3>Categorías</h3>
          <ul>
            <li><button onClick={() => setFilterCategory("celulares")}>Celulares</button></li>
            <li><button onClick={() => setFilterCategory("ropa")}>Ropa</button></li>
            <li><button onClick={() => setFilterCategory("muebles")}>Muebles</button></li>
            <li><button onClick={() => setFilterCategory("electrodomesticos")}>Electrodomésticos</button></li>
            <li><button onClick={() => setFilterCategory("libros")}>Libros</button></li>
            <li><button onClick={() => setFilterCategory("herramientas")}>Herramientas</button></li>
            <li><button onClick={() => setFilterCategory("")}>Todas</button></li>
          </ul>

          <h3>Rango de Precios</h3>
          <ul>
            <li><button onClick={() => setFilterPriceRange([0, 200000])}>Hasta 200k</button></li>
            <li><button onClick={() => setFilterPriceRange([200000, 400000])}>200k - 400k</button></li>
            <li><button onClick={() => setFilterPriceRange([400000, 600000])}>400k - 600k</button></li>
            <li><button onClick={() => setFilterPriceRange([600000, 1000000])}>600k - 1M</button></li>
            <li><button onClick={() => setFilterPriceRange(null)}>Todos</button></li>
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