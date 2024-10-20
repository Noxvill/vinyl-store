import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext'; // Importa el contexto
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

  return (
    <section className="products-section">
      <h2>Últimos añadidos</h2>
      <p>Subheading</p>
      <div className="products-grid">
        {/* Limitar la cantidad de productos a 9 usando slice() */}
        {products.slice(0, 9).map(product => (
          <ProductCard 
            key={product.id} // Asegúrate de usar una clave única
            title={product.titulo} // Ajusta según los campos de la API
            description={product.descripcion} // Ajusta según los campos de la API
            imageUrl={product.imagen_url} // Pasar la URL de la imagen
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
