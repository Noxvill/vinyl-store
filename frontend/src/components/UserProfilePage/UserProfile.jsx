import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalContext'; // Importa el contexto
import './UserProfile.css'; // Archivo CSS para los estilos específicos del perfil

const UserProfile = () => {
  const { user } = useContext(GlobalContext); // Obtén los datos del usuario desde el contexto

  if (!user) {
    return <p>Cargando perfil...</p>; // Mostrar un mensaje de carga si no hay datos de usuario aún
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
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Fecha de Registro:</strong> {new Date(user.fecha_registro).toLocaleDateString()}</p>
        <p><strong>Rol:</strong> {user.rol}</p>
        <p><strong>Ubicación:</strong> {user.ubicacion}</p>
      </div>
    </div>
  );
};

export default UserProfile;
