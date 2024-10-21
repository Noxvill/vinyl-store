import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import './Header.css';
import logo from '../../assets/logostore.png';

const Header = () => {
  const { user, logout } = useContext(GlobalContext);

  console.log('Estado del usuario en el header:', user); // Verifica si el usuario se actualiza correctamente

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

        {/* Mostrar el botón "Publicar" solo si el usuario está autenticado */}
        {user && (
          <Link to="/publicar" className="login-btn">Publicar</Link>
        )}
      </nav>
      <div className="actions">
        {/* Si el usuario está autenticado, mostrar "Mi Perfil" y el botón de Logout */}
        {user ? (
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
