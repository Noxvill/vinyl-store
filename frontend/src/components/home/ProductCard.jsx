import React from 'react';
import './ProductCard.css'; // Estilos específicos para la tarjeta de producto

const ProductCard = ({ title, description }) => {
  return (
    <div className="product-card">
      <div className="image-placeholder">[Imagen]</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="buy-btn">Comprar</button>
    </div>
  );
};

export default ProductCard;
