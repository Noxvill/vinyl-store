import React from 'react';
import './UserProfile.css'; // Archivo CSS para los estilos específicos del perfil

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>MI PERFIL</h2>
      </div>
      <div className="profile-picture-section">
        <div className="profile-picture">
          <img src="path/to/user-placeholder.png" alt="Usuario" />
          <h3>Usuario</h3>
        </div>
      </div>
      <div className="profile-details">
        <p><strong>Nombre:</strong></p>
        <p><strong>Edad:</strong></p>
        <p><strong>Fecha de Nacimiento:</strong></p>
        <p><strong>Fecha de registro:</strong></p>
        <p><strong>Correo:</strong></p>
        <p><strong>Fono:</strong></p>
      </div>
    </div>
  );
};

export default UserProfile;
