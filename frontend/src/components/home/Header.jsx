import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom
import './Header.css';
import logo from '../../assets/logostore.png';

const Header = () => {
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
        {/* <a href="#">Explorar</a> */}
        <Link to="/Publicaciones" className="login-btn">
          Explorar
        </Link>
        {/* <a href="#">Publicar</a> */}

        <Link to="/publicar" className="login-btn">
          Publicar
        </Link>
      </nav>
      <div className="actions">
        <Link to="/login" className="login-btn">
          Login
        </Link>
        <Link to="/registro" className="register-btn">
          Registro
        </Link>
        <Link to="/profile" className="register-btn">
          Mi Perfil
        </Link>
        <button className="cart-btn">🛒</button>
      </div>
    </header>
  );
};

export default Header;
