// ItemsForSale.js
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import ProductCard from '../home/ProductCard';
import './ItemsForSale.css';

const ItemsForSale = () => {
  const { products, loading, error } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('new');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredProducts = products
    .filter(product => product.titulo.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'price-asc') return a.precio - b.precio;
      if (sortOption === 'price-desc') return b.precio - a.precio;
      return new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion);
    });

  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return (
    <div className="items-for-sale-container">
      <h1>Artículos en venta</h1>
      <div className="search-and-sort">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <div className="sort-options">
          <button
            className={sortOption === 'new' ? 'active' : ''}
            onClick={() => setSortOption('new')}
          >
            Nuevos
          </button>
          <button
            className={sortOption === 'price-asc' ? 'active' : ''}
            onClick={() => setSortOption('price-asc')}
          >
            Precio ascendente
          </button>
          <button
            className={sortOption === 'price-desc' ? 'active' : ''}
            onClick={() => setSortOption('price-desc')}
          >
            Precio descendente
          </button>
        </div>
      </div>

      <div className="items-grid">
        {currentProducts.map(product => (
          <ProductCard 
            key={product.id}
            id={product.id}
            title={product.titulo}
            description={product.descripcion}
            imageUrl={product.imagen_url}
            price={product.precio} // Reutilizando ProductCard
          />
        ))}
      </div>

      <div className="pagination">
        {[...Array(Math.ceil(filteredProducts.length / itemsPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemsForSale;
