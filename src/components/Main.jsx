import React from "react";
import ProductCards from "./ProductCards";
export default function Main() {
  const products = [
    {
      image: "https://picsum.photos/300?random=1",
      title: "Producto 1",
      price: 19.99,
    },
    { image: "https://picsum.photos/300?random=2", title: "Producto 2", price: 19.99 },
    { image: "https://picsum.photos/300?random=3", title: "Producto 3", price: 19.99 },
  ];

  return (
    <main className="main-container">
      {/* Aquí va el contenido principal de la página, como los productos */}
      <section className="product-list">
        <h2>Productos Destacados</h2>

        {products.map((product, index) => (
          <ProductCards
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
      </section>
    </main>
  );
}
