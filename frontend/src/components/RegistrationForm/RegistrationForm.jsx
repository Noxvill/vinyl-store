import React, { useState, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import signuplogo from '../../assets/signup.png';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  const { registerUser } = useContext(GlobalContext); // Usar la función registerUser del contexto
  const [username, setUsername] = useState('');
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !mail || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      await registerUser(username, mail, password);
      setError(null); // Reiniciar el error si el registro es exitoso
      // Redirigir o mostrar un mensaje de éxito
      alert('Registro exitoso');
    } catch (err) {
      setError('Hubo un problema al registrar el usuario');
    }
  };

  return (
    <div className="form-container">
      <img src={signuplogo} alt="Logo" className="logo" />
      <h2>Bienvenido</h2>
      <p>Registrarse</p>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input 
            type="text" 
            placeholder="Ingrese un nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="valid-input" 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Ingrese su Email" 
            value={mail}
            onChange={(e) => setEmail(e.target.value)} 
            className="valid-input" 
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            placeholder="Ingrese su contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="register-btn">Guardar</button>
        {error && <p className="error">{error}</p>}
        <p>Ya tienes una cuenta? <a href="#">Ir a Login</a></p>
      </form>
    </div>
  );
};

export default RegistrationForm;
