import React from 'react';
// import Header from '../home/Header'; // Reutiliza el componente de Header
// import Footer from '../home/Footer'; // Reutiliza el componente de Footer
// import LoginForm from './LoginForm'; // Importa el nuevo formulario
import './LoginPage.css'; // Estilos específicos para esta página

const LoginPage = () => {
  return (
    <div className="login-page">
      <Header />
      <div className="login-content">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
