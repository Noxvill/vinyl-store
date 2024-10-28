import React, { useState, useContext } from 'react';
import './ItemsForSale.css';
import { GlobalContext } from '../Context/GlobalContext';
import ProductCard from '../home/ProductCard'; // Importamos el componente ProductCard

const ItemsForSale = () => {
  const { products, loading, error } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('new');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filtrar y ordenar los productos según el término de búsqueda y opción de ordenamiento
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

  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error}</p>;
  }

  return (
    <div className="items-for-sale-container">
      <h1>Artículos en venta</h1>

      <div className="items-grid-section">
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

        <div className="items-grid">
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              title={product.titulo}
              description={product.descripcion}
              imageUrl={product.imagen_url}
              price={product.precio}
              vendedor_id={product.vendedor_id} // Pasar vendedor_id para verificar propiedad del producto
            />
          ))}
        </div>

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
