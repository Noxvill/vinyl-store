import React, { createContext, useState, useEffect } from 'react';

// Crea el contexto
export const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]); // Estado para almacenar productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);     // Estado para manejar errores

  // Función para cargar productos desde la API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products/all'); // Reemplaza con tu URL de API
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      setProducts(data); // Guardar productos en el estado
      setLoading(false); // Finalizar el estado de carga
    } catch (err) {
      setError(err.message); // Manejar errores
      setLoading(false);
    }
  };

  // Llamar a la API cuando se cargue el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, cart, setCart, products, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};
