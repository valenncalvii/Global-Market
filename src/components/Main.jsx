import React from "react";
import { useState } from "react";
import ProductCards from "./ProductCards";
import products from "../productos.json";
import Pagination from "./pagination";
import "../css/ProductCard.css";
const ITEMS_PER_PAGE = 9;

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");

  // Calcular el índice de inicio y fin de los productos a mostrar
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  ); //currentProduct es un array
  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  //FILTRO DE PRODUCTOS
  const filteredProducts = products.filter((product) =>
    filterCategory ? product.category === filterCategory : true
  );
  //mostrar 9 productos del filteredProducts
  const filteredProductsPerPage = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  //calcular el numero total de paginas por producto filtrado
  const totalFilteredPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  return (
    <main className="main-container">
      {/* Aquí va el contenido principal de la página, como los productos */}
      <aside className="filter-container">
        <div className="filter-product-box">
          {" "}
          <h3>Categorias</h3>
          {/* Filtro por categoría */}
          <ul>
            <li>
              <button onClick={() => setFilterCategory("celulares")}>
                <span>Celulares</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("ropa")}>
                <span>Ropa</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("muebles")}>
                <span>Muebles</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("electrodomesticos")}>
                <span>Electrodomésticos</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("libros")}>
                <span>Libros</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("herramientas")}>
                <span>Herramientas</span>
              </button>
            </li>
          </ul>
          <h3>Precios</h3>
          {/* Filtro por categoría */}
          <ul>
            <li>
              <button onClick={() => setFilterCategory("")}>
                <span>200k</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("ropa")}>
                <span>200k-400k</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("muebles")}>
                <span>400k-600k</span>
              </button>
            </li>
            <li>
              <button onClick={() => setFilterCategory("electrodomesticos")}>
                <span>600k-1000k</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <section className="product-list">
        {filterCategory //aca muestra los productos filtrados si filtercategory tiene algo, sino muestra todos los productos
          ? filteredProductsPerPage.map((product, index) => (
              <ProductCards
                key={index}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))
          : currentProducts.map((product, index) => (
              <ProductCards
                key={index}
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
              />
            ))}
        <div className="pagination-container" style={{ gridColumn: "1/-1" }}>
          {" "}
          {/*ocupa toda la fila*/}
          {filterCategory ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalFilteredPages}
              onPageChange={setCurrentPage}
            />
          ) : (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>
    </main>
  );
}
