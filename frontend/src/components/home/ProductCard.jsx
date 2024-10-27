// import React from 'react';
// import { Link } from 'react-router-dom';
// import './ProductCard.css'; // Estilos específicos para la tarjeta de producto

// const ProductCard = ({ title, description, imageUrl }) => {
//   return (
//     <div className="product-card">
//       {/* Renderizar la imagen del producto */}
//       <div className="image-placeholder">
//         <img src={imageUrl} alt={title} className="product-image" />
//       </div>
//       <h3>{title}</h3>
//       <p>{description}</p>
//       <Link to="/DetalleProducto" className="login-btn">
//         Detalle del Producto
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;

import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css'; // Estilos específicos para la tarjeta de producto

const ProductCard = ({ id, title, description, imageUrl }) => {
  return (
    <div className="product-card">
      <div className="image-placeholder">
        <img src={imageUrl} alt={title} className="product-image" />
      </div>
      <h3>{title}</h3>
      <p className='desc'>{description}</p>
      <Link to={`/producto/${id}`} className="login-btn">
        Detalle del Producto
      </Link>
    </div>
  );
};

export default ProductCard;
