import React from 'react';
import ProductCard from './ProductCard';
import './ProductSection.css'; // Estilos específicos para la sección de productos

const ProductsSection = () => {
  return (
    <section className="products-section">
      
      <h2>Últimos añadidos</h2>
      <p>Subheading</p>
      <div className="products-grid">
        <ProductCard title="Título 1" description="Descripción del producto 1" />
        <ProductCard title="Título 2" description="Descripción del producto 2" />
        <ProductCard title="Título 3" description="Descripción del producto 3" />
        <ProductCard title="Título 4" description="Descripción del producto 4" />
        <ProductCard title="Título 5" description="Descripción del producto 5" />
        <ProductCard title="Título 6" description="Descripción del producto 6" />
      </div>
    </section>
  );
};

export default ProductsSection;
