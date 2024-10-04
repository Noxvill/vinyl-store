import React from 'react';
import './LoginForm.css'; // Asegúrate de crear este archivo de estilos

const LoginForm = () => {
  return (
    <div className="form-container">
      <h2>Inicio de sesión</h2>
      <form className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Value" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Value" />
        </div>
        <button type="submit" className="login-btn">Sign In</button>
        <a href="#" className="forgot-password">Forgot password?</a>
      </form>
    </div>
  );
};

export default LoginForm;
