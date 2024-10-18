import React from "react";
import { useState } from "react";
import ProductCards from "./ProductCards";
import products from "../Products.json";
import Pagination from "./pagination";
import "../css/ProductCard.css"
const ITEMS_PER_PAGE = 9;

export default function Main() {
const [currentPage, setCurrentPage] = useState(1);

  // Calcular el índice de inicio y fin de los productos a mostrar
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); //currentProduct es un array
  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  return (
    <main className="main-container">
      {/* Aquí va el contenido principal de la página, como los productos */}
      <section className="filter-product"><div><p>aca iria todos los filtros para productos</p></div></section>
      <section className="product-list">
        
        {currentProducts.map((product, index) => (
          <ProductCards
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))} 
        <div className="pagination-container" style={{ gridColumn:'1/-1'}}>{/*ocupa toda la fila*/}
        <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </div>
      </section>
     
    </main>
  );
}
