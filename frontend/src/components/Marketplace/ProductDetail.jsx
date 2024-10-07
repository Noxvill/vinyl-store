import React from 'react';
import './ProductDetail.css';

const ProductDetail = () => {
  const product = {
    title: 'Vinilo Clásico de Queen',
    price: '25000',
    description: 'Este es un vinilo de edición limitada de la banda Queen, en excelente estado.',
    artist: 'Queen',
    year: '1975',
    format: 'Vinilo',
    condition: 'Muy buena',
    image: 'https://via.placeholder.com/400x400.png?text=Imagen+del+Vinilo', // Imagen de prueba
  };

  return (
    <div className="product-detail-container">
      <h1>{product.title}</h1>

      <div className="product-detail-content">
        {/* Product Image */}
        <div className="product-image-section">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <h2>{product.title}</h2>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-meta">
            <div>
              <strong>Artista:</strong> {product.artist}
            </div>
            <div>
              <strong>Año:</strong> {product.year}
            </div>
            <div>
              <strong>Formato:</strong> {product.format}
            </div>
            <div>
              <strong>Condición:</strong> {product.condition}
            </div>
          </div>

          <button className="buy-now-btn">Comprar Ahora</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
