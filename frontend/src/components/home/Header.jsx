import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext'; // Importar el contexto
import './Header.css';
import logo from '../../assets/logostore.png';

const Header = () => {
  const { user, logout, products } = useContext(GlobalContext); // Asegúrate de obtener `products` del contexto también
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      const filtered = products.filter(product => 
        product.titulo.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  };

  const handleProductSelect = (id) => {
    navigate(`/product/${id}`);
    setSearchTerm('');
    setFilteredProducts([]);
  };

  return (
    <header className="header">
      <Link to="/">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '120px', height: 'auto', maskImage: 'radial-gradient(circle, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)'}} 
        />
      </Link>

      <div className="search-bar-container">
        <input 
          type="text" 
          placeholder="Buscar disco..." 
          className="search-bar" 
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {filteredProducts.length > 0 && (
          <ul className="search-results">
            {filteredProducts.map(product => (
              <li 
                key={product.id} 
                onClick={() => handleProductSelect(product.id)} 
                className="search-result-item"
              >
                {product.titulo}
              </li>
            ))}
          </ul>
        )}
      </div>

      <nav className="nav">
        <Link to="/Publicaciones" className="login-btn">Explorar</Link>
        {user && <Link to="/publicar" className="login-btn">Publicar</Link>}
      </nav>
      
      <div className="actions">
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
