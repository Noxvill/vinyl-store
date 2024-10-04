import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">LOGO</div>
      <input type="text" placeholder="Buscar..." className="search-bar" />
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
