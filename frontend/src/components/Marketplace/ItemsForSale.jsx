import React, { useState } from 'react';
import './ItemsForSale.css';

const ItemsForSale = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('new');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="items-for-sale-container">
      <h1>Artículos en venta</h1>
      
      <div className="items-grid-section">
        {/* Search bar */}
        <div className="search-and-sort">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <div className="sort-options">
            <button
              className={sortOption === 'new' ? 'active' : ''}
              onClick={() => handleSortChange('new')}
            >
              New
            </button>
            <button
              className={sortOption === 'price-asc' ? 'active' : ''}
              onClick={() => handleSortChange('price-asc')}
            >
              Price ascending
            </button>
            <button
              className={sortOption === 'price-desc' ? 'active' : ''}
              onClick={() => handleSortChange('price-desc')}
            >
              Price descending
            </button>
            <button
              className={sortOption === 'rating' ? 'active' : ''}
              onClick={() => handleSortChange('rating')}
            >
              Rating
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="items-grid">
          {/* Example product cards (9 cards) */}
          {[...Array(9)].map((_, index) => (
            <div key={index} className="product-card">
              <div className="product-image-placeholder"></div>
              <div className="product-details">
                <h4>Producto {index + 1}</h4>
                <p>$0</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemsForSale;
