import React, { useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import './Carrito.css';

const Cart = () => {
  const { cart, removeFromCart } = useContext(GlobalContext);

  // Calcular el total del carrito asegurando que los precios se sumen correctamente como números
  const total = cart.reduce((acc, product) => acc + parseFloat(product.precio), 0);

  if (cart.length === 0) {
    return <h2 className="cart-header">Tu carrito está vacío</h2>;
  }

  return (
    <div className="cart-container">
      <h1 className="cart-header">Carrito de Compras</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <img src={item.imagen_url} alt={item.titulo} className="cart-item-image" />
            <div className="cart-item-details">
              <h2>{item.titulo}</h2>
              <p>{item.descripcion}</p>
            </div>
            <span className="cart-item-price">${parseFloat(item.precio).toLocaleString()}</span>
            <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>X</button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Total: ${total.toLocaleString()}</h3>
        <button className="comprar-btn">Comprar</button>
      </div>
    </div>
  );
};

export default Cart;
