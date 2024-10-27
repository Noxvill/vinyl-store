import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext'; // Importa el contexto global
import ProductCard from './ProductCard';
import './ProductSection.css'; // Estilos específicos para la sección de productos

const ProductsSection = () => {
  const { products, loading, error } = useContext(GlobalContext); // Accede a productos, carga y error desde el contexto

  if (loading) {
    return <p>Cargando productos...</p>; // Mostrar mensaje de carga mientras se obtienen los productos
  }

  if (error) {
    return <p>Error al cargar los productos: {error}</p>; // Mostrar error si ocurre alguno
  }

  // Ordenar los productos por la fecha de publicación
  const sortedProducts = products.sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));

  return (
    <section className="products-section">
      <h2>Últimos discos añadidos!</h2>
      <div className="products-grid">
        {sortedProducts.slice(0, 9).map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id} 
            title={product.titulo} 
            description={product.descripcion} 
            imageUrl={product.imagen_url} 
            price={product.precio} // Pasar el precio al componente ProductCard
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
