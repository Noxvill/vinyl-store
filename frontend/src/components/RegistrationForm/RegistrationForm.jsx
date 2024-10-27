// import React, { useState, useContext } from 'react';
// import { GlobalContext } from '../Context/GlobalContext';
// import signuplogo from '../../assets/signup.png';
// import './RegistrationForm.css'; 

// const RegistrationForm = () => {
//   const { registerUser } = useContext(GlobalContext);
//   const [username, setUsername] = useState('');
//   const [mail, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!username || !mail || !password) {
//       setError('Por favor, complete todos los campos');
//       return;
//     }

//     try {
//       await registerUser(username, mail, password);
//       setError(null); 
//       alert('Registro exitoso');
//     } catch (err) {
//       setError('Hubo un problema al registrar el usuario');
//     }
//   };

//   return (
//     <div className="form-container">
//       <img src={signuplogo} alt="Logo" className="logo" />
//       <h2>Registrarse</h2>
//       <p>Ingrese los datos solicitados</p>
//       <form className="registration-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Nombre de usuario</label>
//           <input 
//             type="text" 
//             placeholder="Usuario" 
//             value={username} 
//             onChange={(e) => setUsername(e.target.value)} 
//             className="valid-input" 
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input 
//             type="email" 
//             placeholder="Ingrese una Email" 
//             value={mail}
//             onChange={(e) => setEmail(e.target.value)} 
//             className="valid-input" 
//           />
//         </div>
//         <div className="form-group">
//           <label>Contraseña</label>
//           <input 
//             type="password" 
//             placeholder="Ingrese su contraseña" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <button type="submit" className="register-btn">Guardar</button>
//         {error && <p className="error">{error}</p>}
//         <p>Ya tienes una cuenta? <a href="/login">Ir a Login</a></p>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import { GlobalContext } from '../Context/GlobalContext';
import signuplogo from '../../assets/signup.png';
import './RegistrationForm.css'; 

const RegistrationForm = () => {
  const { registerUser } = useContext(GlobalContext);
  const [username, setUsername] = useState('');
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('comprador'); // Nuevo campo por defecto
  const [ubicacion, setUbicacion] = useState('Chile'); // Nuevo campo por defecto
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !mail || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      await registerUser(username, mail, password, rol, ubicacion);
      setError(null); 
      alert('Registro exitoso');
      navigate('/login'); // Redirige a login después del registro exitoso
    } catch (err) {
      setError('Hubo un problema al registrar el usuario');
    }
  };

  return (
    <div className="form-container">
      <img src={signuplogo} alt="Logo" className="logo" />
      <h2>Registrarse</h2>
      <p>Ingrese los datos solicitados</p>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre de usuario</label>
          <input 
            type="text" 
            placeholder="Usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="valid-input" 
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Ingrese un Email" 
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
        {/* Podrías agregar campos extra si los necesitas */}
        <button type="submit" className="register-btn">Guardar</button>
        {error && <p className="error">{error}</p>}
        <p>¿Ya tienes una cuenta? <a href="/login">Ir a Login</a></p>
      </form>
    </div>
  );
};

export default RegistrationForm;
