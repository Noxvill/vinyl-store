import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import './UserProfile.css';
import ProductCard from '../home/ProductCard'; // Importamos el componente para las cards de productos

const UserProfile = () => {
  const { user, products } = useContext(GlobalContext);
  const [userProducts, setUserProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 9 artículos por página

  useEffect(() => {
    if (user) {
      // Filtrar los productos que pertenecen al usuario logueado
      const filteredProducts = products.filter(product => product.vendedor_id === user.id);
      setUserProducts(filteredProducts);
    }
  }, [user, products]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = userProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>MI PERFIL</h2>
      </div>
      <div className="profile-picture-section">
        <div className="profile-picture">
          <img src={user.foto_perfil || "path/to/user-placeholder.png"} alt={user.nombre} />
          <h3>{user.nombre}</h3>
        </div>
      </div>
      <div className="profile-details">
        <p><strong>Nombre:</strong> {user.nombre}</p>
        <p><strong>Email:</strong> {user.mail || user.email}</p> {/* Ajuste del email */}
        <p><strong>Fecha de Registro:</strong> {new Date(user.fecha_registro).toLocaleDateString()}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Ubicación:</strong> {user.ubicacion}</p>
      </div>

      {/* Galería de productos propios */}
      <div className="profile-products">
        <h2 style={{ textAlign: 'center' }}>Mis productos en venta</h2>
        <div className="products-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.titulo}
                description={product.descripcion}
                imageUrl={product.imagen_url}
              />
            ))
          ) : (
            <p>No tienes productos en venta.</p>
          )}
        </div>
        <div className="pagination">
          {[...Array(Math.ceil(userProducts.length / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
