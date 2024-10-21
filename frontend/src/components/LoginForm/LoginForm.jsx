import React, { useContext, useState } from 'react';
import { GlobalContext } from '../Context/GlobalContext'; // Importar el contexto
import { useNavigate } from 'react-router-dom'; // Hook para redirigir después de iniciar sesión
import loginlogo from '../../assets/login.png';
import './LoginForm.css'; 

const LoginForm = () => {
  const { login } = useContext(GlobalContext); // Obtener la función de login del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await login(email, password); // Llamada a la función login del contexto
      setError(null); // Si el login es exitoso, eliminamos cualquier error anterior
      navigate('/'); // Redirigir al inicio después del login
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <img src={loginlogo} alt="Logo" className="logo" />
        <h2>Bienvenido!</h2>
        <p>Ingresa tus datos para continuar</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Ingresa tu Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="Ingresa tu Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <a href="#" className="forgot-password">Olvidaste tu clave?</a>
          <button type="submit" className="login-btn">Entrar</button>
          {error && <p className="error">{error}</p>} {/* Mostrar error si existe */}
          <p>No estás registrado? <a href="/registro">Registrate aquí!</a></p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
