import React from 'react';
import './RegistrationForm.css'; // Asegúrate de crear este archivo de estilos

const RegistrationForm = () => {
  return (
    <div className="form-container">
      <h2>Formulario de Registro</h2>
      <form className="registration-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Value" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" placeholder="Value" />
        </div>
        <div className="form-group checkbox-group">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            <span>Label</span>
            <p>Description</p>
          </label>
        </div>
        <button type="submit" className="register-btn">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
