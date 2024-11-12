import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import Header from "./components/Header"; 
import Footer from "./components/Footer"; 
import "./css/Header.css";

function App() {
  return (
    <RouterProvider router={Router}>
      <div className="app-container">
        <Header /> {/* El Header siempre estará visible */}
        
        <main className="main-content">
          {/* Aquí se renderizan las rutas según la configuración en Router.jsx */}
        </main>
        
        <Footer /> {/* El Footer siempre estará visible */}
      </div>
    </RouterProvider>
  );
}

export default App;
