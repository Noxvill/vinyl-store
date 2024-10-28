import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { GlobalContext } from '../Context/GlobalContext'; 
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const { products, user, deleteProduct } = useContext(GlobalContext); // Obtenemos la función deleteProduct
  const [product, setProduct] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    // Busca el producto en la lista de productos obtenida del contexto
    const foundProduct = products.find(product => product.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return <p>Cargando detalles del producto...</p>;
  }

  // Formatear el precio con separador de miles
  const formattedPrice = product.precio && !isNaN(product.precio)
    ? `$${Number(product.precio).toLocaleString()}`
    : 'No disponible';

  // Manejar la eliminación del producto
  const handleDelete = async () => {
    const wasDeleted = await deleteProduct(product.id); // Llamar a la función deleteProduct del contexto
    if (wasDeleted) {
      navigate('/'); // Redirige a la página principal si se elimina el producto
    }
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
          <h2>{product.titulo}</h2>
          <p className="product-price">Precio: {formattedPrice}</p> 
          <p className="product-description">{product.descripcion}</p>

          <div className="product-meta">
            <div><strong>Artista:</strong> {product.artista}</div>
            <div><strong>Año:</strong> {product.ano}</div>
            <div><strong>Formato:</strong> {product.formato}</div>
            <div><strong>Condición:</strong> {product.condicion}</div>
          </div>

          <button className="buy-now-btn">Comprar Ahora</button>

          {/* Mostrar el botón "Eliminar" solo si el usuario es el dueño del producto */}
          {isOwner && (
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
