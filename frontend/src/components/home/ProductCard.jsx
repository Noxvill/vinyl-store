import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Estilos específicos para la tarjeta de producto

const ProductCard = ({ title, description }) => {
  return (
    <div className="product-card">
      <div className="image-placeholder">[Imagen]</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to="/DetalleProducto" className="login-btn">
          Detalle del Producto
        </Link>
      {/* <button className="buy-btn">Detalle del Producto</button> */}
    </div>
  );
};

export default ProductCard;
