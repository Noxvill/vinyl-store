import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import ProductCard from '../home/ProductCard'; 
import './UserProfile.css';

const UserProfile = () => {
  const { user, products, loading, error } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Mostrar 9 productos por página

  // Filtrar productos por usuario logueado
  const userProducts = products.filter(product => product.vendedor_id === user?.id);

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = userProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error}</p>;
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
        <p><strong>Email:</strong> {user.mail}</p>
        <p><strong>Fecha de Registro:</strong> {new Date(user.fecha_registro).toLocaleDateString()}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Ubicación:</strong> {user.ubicacion}</p>
      </div>

      <div className="profile-products">
        <h3>Mis productos en venta</h3>
        <div className="products-grid">
          {currentProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.titulo}
              description={product.descripcion}
              imageUrl={product.imagen_url}
            />
          ))}
        </div>
        {/* Pagination */}
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
