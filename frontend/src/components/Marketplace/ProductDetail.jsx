import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir después de eliminar
import { GlobalContext } from '../Context/GlobalContext'; // Importa el contexto
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); // Captura el ID de la URL
  const { products, user, token } = useContext(GlobalContext); // Obtén los productos y el usuario logueado del contexto
  const [product, setProduct] = useState(null); // Estado para almacenar el producto específico
  const navigate = useNavigate(); // Hook para redireccionar después de eliminar el producto

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

  // Función para eliminar el producto
  const handleDelete = async () => {
    if (!token) {
      alert('Debes estar logueado para eliminar un producto.');
      return;
    }

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Producto eliminado exitosamente.');
        navigate('/'); // Redirige al usuario a la página principal después de eliminar el producto
      } else {
        alert('Error al eliminar el producto.');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Hubo un problema al eliminar el producto.');
    }
  };

  // Verifica si el usuario logueado es el dueño del producto
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
