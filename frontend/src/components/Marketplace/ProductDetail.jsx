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
      {/* Imagen del producto movida justo debajo del título */}
      <div className="product-image-section">
        <img src={product.imagen_url} alt={product.titulo} className="product-image" />
      </div>
      <div className="product-detail-content">
        <div className="product-info-section">
          
          <div className="product-meta">
          <div>
          <strong>Titulo:</strong>
          <input 
            type="text" 
            value={editableProduct.titulo} 
            onChange={(e) => setEditableProduct({ ...editableProduct, titulo: e.target.value })} 
            disabled={!isEditing} 
          /></div>
<div>
          
          <p><strong>Precio:</strong>
             <input 
              type="number" 
              value={editableProduct.precio} 
              onChange={(e) => setEditableProduct({ ...editableProduct, precio: e.target.value })} 
              disabled={!isEditing} 
            />
          </p></div>

          <div>
          <strong>Descripción:</strong>
          <textarea 
          
            value={editableProduct.descripcion}
            onChange={(e) => setEditableProduct({ ...editableProduct, descripcion: e.target.value })}
            disabled={!isEditing}
          /></div>
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
