import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import './Header.css';
import logo from '../../assets/logostore.png';

const Header = () => {
  const { user, logout, token } = useContext(GlobalContext); // Accedemos al token desde el contexto
  const [tokenPresent, setTokenPresent] = useState(false);

  // Verificar si el token en el contexto está presente y actualizar el estado
  useEffect(() => {
    if (token) {
      setTokenPresent(true);
    } else {
      setTokenPresent(false);
    }
  }, [token]); // Se actualiza cada vez que cambia el token

  return (
    <header className="header">
      <Link to="/">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '120px', height: 'auto', maskImage: 'radial-gradient(circle, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)'}} 
        />
      </Link>
      <input type="text" placeholder="Buscar disco..." className="search-bar" />
      <nav className="nav">
        <Link to="/Publicaciones" className="login-btn">Explorar</Link>

        {/* Mostrar el botón "Publicar" solo si hay un token presente */}
        {tokenPresent && (
          <Link to="/publicar" className="login-btn">Publicar</Link>
        )}
      </nav>
      <div className="actions">
        {/* Si hay un token presente, mostrar "Mi Perfil" y el botón de Logout */}
        {tokenPresent ? (
          <>
            <Link to="/profile" className="register-btn">Mi Perfil</Link>
            <button onClick={logout} className="logout-btn">Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="register-btn">Login</Link>
            <Link to="/registro" className="register-btn">Registro</Link>
          </>
        )}
        <button className="cart-btn">🛒</button>
      </div>
    </header>
  );
};

export default Header;
