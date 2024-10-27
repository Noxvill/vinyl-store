import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { GlobalContext } from '../Context/GlobalContext';

const ProductCard = ({ id, title, description, imageUrl, price, vendedor_id, addToCart }) => {
  const { user } = useContext(GlobalContext); // Obtenemos al usuario logueado

  // Verificamos si el usuario está logueado y es el dueño del producto
  const isOwner = user && String(user.id) === String(vendedor_id); // Comparamos el ID del usuario logueado con el vendedor_id

  // Formatear el precio correctamente
  const formattedPrice = price && !isNaN(price) ? `$${Number(price).toLocaleString()}` : 'No disponible';

  return (
    <div className="product-card">
      <div className="image-placeholder">
        <img src={imageUrl} alt={title} className="product-image" />
      </div>
      <h3 className="titulo">{title}</h3>
      <p className="desc">{description}</p>
      <p className="price">Precio: {formattedPrice}</p>
      <div className="card-buttons">
        <Link to={`/producto/${id}`} className="detail-btn">
          Detalle
        </Link>
        {/* Mostrar el botón "Comprar" solo si el usuario no es el dueño del producto */}
        {!isOwner && (
          <button className="comprar-btn" onClick={() => addToCart(id)}>
            Comprar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
