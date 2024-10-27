import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Estilos específicos para la tarjeta de producto

const ProductCard = ({ id, title, description, imageUrl, price, addToCart }) => {
  // Formatear el precio correctamente
  const formattedPrice = price && !isNaN(price) ? `$${Number(price).toLocaleString()}` : 'No disponible';

  return (
    <div className="product-card">
      <div className="image-placeholder">
        <img src={imageUrl} alt={title} className="product-image" />
      </div>
      <h3 className="titulo">{title}</h3>
      <p className="desc">{description}</p>
      <p className="price">Precio: {formattedPrice}</p> {/* Mostrar el precio */}
      <div className="card-buttons">
        <Link to={`/producto/${id}`} className="detail-btn">
          Detalle
        </Link>
        <button className="comprar-btn" onClick={() => addToCart(id)}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
