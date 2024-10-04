import React from 'react';
import Header from '../home/Header'; // Reutiliza el componente de Header
import Footer from '../home/Footer'; // Reutiliza el componente de Footer
import RegistrationForm from './RegistrationForm'; // Importa el nuevo formulario
import './RegistrationPage.css'; // Estilos específicos para esta página

const RegistrationPage = () => {
  return (
    <div className="registration-page">
      <Header />
      <div className="registration-content">
        <RegistrationForm />
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
