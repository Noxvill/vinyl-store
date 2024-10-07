import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import './LoginPage.css'; 
import { GlobalContext } from '../Context/GlobalContext'; // Importa el contexto

const LoginPage = () => {

  const { user, setUser } = useContext(GlobalContext);

  return (
    <div className="login-page">
       <div className="login-content">
        <LoginForm />
      </div>
    
    </div>
  );
};

export default LoginPage;
