import React, { useState, useContext, useEffect } from 'react';
import './ItemsForSale.css';
import { GlobalContext } from '../Context/GlobalContext';

const ItemsForSale = () => {
  const { products, loading, error } = useContext(GlobalContext); // Accede a los productos desde el contexto
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('new');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 9 artículos por página

  // Calcula el índice de los productos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtra y ordena los productos según la búsqueda y el criterio de ordenamiento
  const filteredProducts = products
    .filter((product) =>
      product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'price-asc') {
        return a.precio - b.precio;
      } else if (sortOption === 'price-desc') {
        return b.precio - a.precio;
      } else {
        return new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion);
      }
    });

  // Obtén los productos para la página actual
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reinicia la paginación al hacer una búsqueda
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reinicia la paginación al cambiar la opción de ordenamiento
  };

  // Mostrar mensaje mientras los productos están cargando
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  // Mostrar mensaje de error si algo sale mal
  if (error) {
    return <p>Error al cargar productos: {error}</p>;
  }

  return (
    <div className="items-for-sale-container">
      <h1>Artículos en venta</h1>

      <div className="items-grid-section">
        {/* Search bar */}
        <div className="search-and-sort">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <div className="sort-options">
            <button
              className={sortOption === 'new' ? 'active' : ''}
              onClick={() => handleSortChange('new')}
            >
              Nuevos
            </button>
            <button
              className={sortOption === 'price-asc' ? 'active' : ''}
              onClick={() => handleSortChange('price-asc')}
            >
              Precio ascendente
            </button>
            <button
              className={sortOption === 'price-desc' ? 'active' : ''}
              onClick={() => handleSortChange('price-desc')}
            >
              Precio descendente
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="items-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.imagen_url} alt={product.titulo} className="product-img" />
              </div>
              <div className="product-details">
                <h4>{product.titulo}</h4>
                <p>${product.precio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {[...Array(Math.ceil(filteredProducts.length / itemsPerPage))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemsForSale;
