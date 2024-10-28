import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';
import './Header.css';
import logo from '../../assets/logostore.png';

const Header = () => {
  const { user, logout, token, products } = useContext(GlobalContext); // Accede a productos desde el contexto
  const [tokenPresent, setTokenPresent] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para controlar el término de búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]); // Estado para los resultados filtrados
  const navigate = useNavigate(); // Para redirigir a la página de detalles del producto

  // Verificar si el token en el contexto está presente y actualizar el estado
  useEffect(() => {
    setTokenPresent(!!token);
  }, [token]);

  // Función para manejar la búsqueda y filtrar productos
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Filtrar productos que coincidan con el término de búsqueda
    if (searchTerm.trim() !== '') {
      const results = products.filter((product) =>
        product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // Vaciar los resultados si no hay búsqueda
    }
  };

  // Función para seleccionar un producto de la lista de resultados y redirigir
  const handleSelectProduct = (productId) => {
    setSearchTerm('');
    setFilteredProducts([]); // Vaciar los resultados tras la selección
    navigate(`/producto/${productId}`); // Redirigir a la página del producto
  };

  return (
    <header className="header">
      <Link to="/">
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '120px', height: 'auto', maskImage: 'radial-gradient(circle, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)' }} 
        />
      </Link>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar disco..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
        {filteredProducts.length > 0 && (
          <div className="search-results">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => handleSelectProduct(product.id)}
              >
                {product.titulo}
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="nav">
        <Link to="/Publicaciones" className="login-btn">Explorar</Link>
        {tokenPresent && (
          <Link to="/publicar" className="login-btn">Publicar</Link>
        )}
      </nav>

      <div className="actions">
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
