import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useContext(GlobalContext); // Obtener el usuario desde el contexto

  if (!user) {
    // Si el usuario no está autenticado, redirigir a la página de login
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, renderizar el componente deseado
  return element;
};

export default ProtectedRoute;
