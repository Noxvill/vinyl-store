// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import './ProductCard.css';
// import { GlobalContext } from '../Context/GlobalContext';

// const ProductCard = ({ id, title, description, imageUrl, price, vendedor_id }) => {
//   const { user, addToCart } = useContext(GlobalContext); // Obtenemos al usuario logueado y la función addToCart

//   // Verificamos si el usuario está logueado y es el dueño del producto
//   const isOwner = user && String(user.id) === String(vendedor_id); // Comparamos el ID del usuario logueado con el vendedor_id

//   // Formatear el precio correctamente
//   const formattedPrice = price && !isNaN(price) ? `$${Number(price).toLocaleString()}` : 'No disponible';

//   return (
//     <div className="product-card">
//       <div className="image-placeholder">
//         <img src={imageUrl} alt={title} className="product-image" />
//       </div>
//       <h3 className="titulo">{title}</h3>
//       <p className="desc">{description}</p>
//       <p className="price">Precio: {formattedPrice}</p>
//       <div className="card-buttons">
//         <Link to={`/producto/${id}`} className="detail-btn">
//           Detalle
//         </Link>
//         {/* Mostrar el botón "Comprar" solo si el usuario no es el dueño del producto */}
//         {!isOwner && (
//           <button className="comprar-btn" onClick={() => addToCart(id)}>
//             Comprar
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { GlobalContext } from '../Context/GlobalContext';

const ProductCard = ({ id, title, description, imageUrl, price, vendedor_id }) => {
  const { user, addToCart } = useContext(GlobalContext); // Obtenemos al usuario logueado y la función addToCart
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  // Verificamos si el usuario está logueado y es el dueño del producto
  const isOwner = user && String(user.id) === String(vendedor_id); // Comparamos el ID del usuario logueado con el vendedor_id

  // Formatear el precio correctamente
  const formattedPrice = price && !isNaN(price) ? `$${Number(price).toLocaleString()}` : 'No disponible';

  // Función para agregar al carrito y mostrar el modal
  const handleAddToCart = (id) => {
    addToCart(id);
    setShowModal(true); // Muestra el modal
    setTimeout(() => setShowModal(false), 3000); // Cierra el modal automáticamente después de 3 segundos
  };

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
          <button className="comprar-btn" onClick={() => handleAddToCart(id)}>
            Comprar
          </button>
        )}
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>¡El producto ha sido agregado al carrito!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
