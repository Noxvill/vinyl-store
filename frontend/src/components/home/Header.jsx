import React from 'react';
import './Header.css';
import logo from '../../assets/logostore.png';

const Header = () => {




  return (
    <header className="header">
      <img src={logo} alt="Logo" style={{ width: '120px', height: 'auto', maskImage: 'radial-gradient(circle, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)'}} />
      <input type="text" placeholder="Buscar disco..." className="search-bar" />
      <nav className="nav">
        <a href="#">Explorar</a>
        <a href="#">Publicar</a>
      </nav>
      <div className="actions">
        <button className="login-btn">Login</button>
        <button className="register-btn">Registro</button>
        <button className="cart-btn">🛒</button>
       
      </div>
    </header>
  );
};

export default Header;
