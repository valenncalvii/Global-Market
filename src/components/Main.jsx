import { useState, useEffect } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";
import Pagination from "./pagination";
import API_URL from "../services/API";
import "../styles/ProductCard.css";

const ITEMS_PER_PAGE = 9;

export default function Main() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState(null);
  const [productos, setProductos] = useState([]);
  const [categories, setCategories] = useState([]);

  // Función para obtener productos
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    obtenerProductos();
  }, []);

  // Función para obtener categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Función para manejar la selección de categorías
  const handleCategorySelection = (category) => {
    setFilterCategory(category); // Establece el filtro de categoría
    setCurrentPage(1); // Reinicia la página a la primera cuando se cambia la categoría
  };

    // Filtrar productos por categoría
    const filterProducts = () => {
      if (!filterCategory) return productos; // Si no hay categoría seleccionada, mostrar todos los productos
      return productos.filter(
        (product) => product.categoryId === filterCategory.id // Asegúrate de que los tipos de category_id e id sean compatibles
      );
    };

    const filteredProducts = filterProducts();

  // Configuración de paginación
  const totalFilteredPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <main className="main-container">
      <aside className="filter-container">
        <div className="filter-product-box">
          <h3>Categorías</h3>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <button onClick={() => handleCategorySelection(category)}>
                  {category.nombre}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => handleCategorySelection(null)}>Mostrar todos</button>
            </li>
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
