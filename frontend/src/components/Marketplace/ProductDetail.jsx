// import React, { useContext, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; 
// import { GlobalContext } from '../Context/GlobalContext'; 
// import './ProductDetail.css';

// const ProductDetail = () => {
//   const { id } = useParams(); // Captura el ID de la URL
//   const { products, user, deleteProduct } = useContext(GlobalContext); // Obtenemos la función deleteProduct
//   const [product, setProduct] = useState(null); 
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     // Busca el producto en la lista de productos obtenida del contexto
//     const foundProduct = products.find(product => product.id === parseInt(id));
//     if (foundProduct) {
//       setProduct(foundProduct);
//     }
//   }, [id, products]);

//   if (!product) {
//     return <p>Cargando detalles del producto...</p>;
//   }

//   // Formatear el precio con separador de miles
//   const formattedPrice = product.precio && !isNaN(product.precio)
//     ? `$${Number(product.precio).toLocaleString()}`
//     : 'No disponible';

//   // Manejar la eliminación del producto
//   const handleDelete = async () => {
//     const wasDeleted = await deleteProduct(product.id); // Llamar a la función deleteProduct del contexto
//     if (wasDeleted) {
//       navigate('/'); // Redirige a la página principal si se elimina el producto
//     }
//   };

//   // Verificar si el usuario es el dueño del producto
//   const isOwner = user && product.vendedor_id === user.id;

//   return (
//     <div className="product-detail-container">
//       <h1>{product.titulo}</h1>
//       <div className="product-detail-content">
//         <div className="product-image-section">
//           <img src={product.imagen_url} alt={product.titulo} className="product-image" />
//         </div>
//         <div className="product-info-section">
//           <h2>{product.titulo}</h2>
//           <p className="product-price">Precio: {formattedPrice}</p> 
//           <p className="product-description">{product.descripcion}</p>

//           <div className="product-meta">
//             <div><strong>Artista:</strong> {product.artista}</div>
//             <div><strong>Año:</strong> {product.ano}</div>
//             <div><strong>Formato:</strong> {product.formato}</div>
//             <div><strong>Condición:</strong> {product.condicion}</div>
//           </div>

//           <button className="buy-now-btn">Comprar Ahora</button>

//           {/* Mostrar el botón "Eliminar" solo si el usuario es el dueño del producto */}
//           {isOwner && (
//             <button className="delete-btn" onClick={handleDelete}>
//               Eliminar Producto
//             </button>




//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { GlobalContext } from '../Context/GlobalContext'; 
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products, user, deleteProduct, updateProduct } = useContext(GlobalContext); // Incluimos updateProduct
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para activar la edición
  const [editableProduct, setEditableProduct] = useState({}); // Estado para los cambios editables
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find(product => product.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setEditableProduct(foundProduct); // Inicializamos los campos con los valores actuales
    }
  }, [id, products]);

  if (!product) {
    return <p>Cargando detalles del producto...</p>;
  }

  const formattedPrice = product.precio && !isNaN(product.precio)
    ? `$${Number(product.precio).toLocaleString()}`
    : 'No disponible';

  const handleDelete = async () => {
    const wasDeleted = await deleteProduct(product.id);
    if (wasDeleted) {
      navigate('/');
    }
  };

  const handleUpdate = async () => {
    await updateProduct(product.id, editableProduct);
    setIsEditing(false); // Bloquear los campos de nuevo tras actualizar
  };

  // Verificar si el usuario es el dueño del producto
  const isOwner = user && product.vendedor_id === user.id;

  return (
    <div className="product-detail-container">
      <h1>{product.titulo}</h1>
      <div className="product-detail-content">
        <div className="product-image-section">
          <img src={product.imagen_url} alt={product.titulo} className="product-image" />
        </div>
        <div className="product-info-section">
          <input 
            type="text" 
            value={editableProduct.titulo} 
            onChange={(e) => setEditableProduct({ ...editableProduct, titulo: e.target.value })} 
            disabled={!isEditing} 
          />
          <p className="product-price">
            Precio: <input 
              type="number" 
              value={editableProduct.precio} 
              onChange={(e) => setEditableProduct({ ...editableProduct, precio: e.target.value })} 
              disabled={!isEditing} 
            />
          </p>
          <textarea
            value={editableProduct.descripcion}
            onChange={(e) => setEditableProduct({ ...editableProduct, descripcion: e.target.value })}
            disabled={!isEditing}
          />
          <div className="product-meta">
            <div><strong>Artista:</strong> <input 
              type="text" 
              value={editableProduct.artista} 
              onChange={(e) => setEditableProduct({ ...editableProduct, artista: e.target.value })} 
              disabled={!isEditing} 
            /></div>
            <div><strong>Año:</strong> <input 
              type="number" 
              value={editableProduct.ano} 
              onChange={(e) => setEditableProduct({ ...editableProduct, ano: e.target.value })} 
              disabled={!isEditing} 
            /></div>
            <div><strong>Formato:</strong> <input 
              type="text" 
              value={editableProduct.formato} 
              onChange={(e) => setEditableProduct({ ...editableProduct, formato: e.target.value })} 
              disabled={!isEditing} 
            /></div>
            <div><strong>Condición:</strong> <input 
              type="text" 
              value={editableProduct.condicion} 
              onChange={(e) => setEditableProduct({ ...editableProduct, condicion: e.target.value })} 
              disabled={!isEditing} 
            /></div>
          </div>

          {!isOwner ? (
            <button className="buy-now-btn">Comprar Ahora</button>
          ) : isEditing ? (
            <button className="save-btn" onClick={handleUpdate}>Guardar Cambios</button>
          ) : (
            <button className="update-btn" onClick={() => setIsEditing(true)}>Actualizar</button>
          )}

          {isOwner && !isEditing && (
            <button className="delete-btn" onClick={handleDelete}>
              Eliminar Producto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
