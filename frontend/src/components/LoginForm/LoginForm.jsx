import React from 'react';
import './LoginForm.css'; 

const LoginForm = () => {
  return (
    <div className="login-wrapper">
      <div className="form-container">
        <img src="path/to/logo.png" alt="Logo" className="logo" />
        <h2>Bienvenido!</h2>
        <p>Ingresa tus datos para continuar</p>
        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Ingresa tu Email" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Ingresa tu Contraseña" />
          </div>
          <a href="#" className="forgot-password">Olvidaste tu clave?</a>
          <button type="submit" className="login-btn">Continue</button>
          <p>No estás registrado? <a href="#">Registrate aquí!</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
