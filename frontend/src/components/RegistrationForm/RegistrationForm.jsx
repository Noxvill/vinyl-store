import React from 'react';
import signuplogo from '../../assets/signup.png'
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  return (
    <div className="form-container">
      <img src={signuplogo} alt="Logo" className="logo" />
      <h2>Bienvenido</h2>
      <p>Registrarse</p>
      <form className="registration-form">
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input type="text" placeholder="Ingrese un nombre de usuario" className="valid-input" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Ingrese su Email" className="invalid-input" />
                  </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" placeholder="Ingrese su contraseña" />
        </div>
        <button type="submit" className="register-btn">Guardar</button>
        <p>Ya tienes una cuenta? <a href="#">Ir a Login</a></p>
      </form>
    </div>
  );
};

export default RegistrationForm;
