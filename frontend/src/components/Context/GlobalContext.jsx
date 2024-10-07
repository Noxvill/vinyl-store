import React, { createContext, useState } from 'react';

// Crea el contexto
export const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <GlobalContext.Provider value={{ user, setUser, cart, setCart }}>
      {children}
    </GlobalContext.Provider>
  );
};
