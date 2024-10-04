import React from 'react';
import Header from '../home/Header'; // Reutiliza el Header existente
import Footer from '../home/Footer'; // Reutiliza el Footer existente
import UserProfile from './UserProfile'; // Componente del perfil de usuario
import './UserProfilePage.css'; // Estilos específicos para la página de perfil

const UserProfilePage = () => {
  return (
    <div className="user-profile-page">
      <Header />
      <UserProfile />
      <Footer />
    </div>
  );
};

export default UserProfilePage;
