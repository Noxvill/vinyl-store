
// import React, { createContext, useState, useEffect } from 'react';

// // Crea el contexto
// export const GlobalContext = createContext();

// // Proveedor del contexto
// export const GlobalProvider = ({ children }) => {
//   const [cart, setCart] = useState([]); // Estado del carrito
//   const [products, setProducts] = useState([]); // Estado para los productos
//   const [loading, setLoading] = useState(true); // Estado de carga de datos
//   const [error, setError] = useState(null); // Estado de error
//   const [user, setUser] = useState(null); // Estado del usuario autenticado
//   const [token, setToken] = useState(null); // Estado para el token de autenticación

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//       fetchUserProfile(); // Obtener perfil del usuario si el token está disponible
//     }
//   }, [token]);

//   // Función para iniciar sesión
//   const login = async (email, password) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mail: email, contraseña: password })
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         console.log('Error en el login:', errorData);
//         throw new Error(errorData.message || 'Error al iniciar sesión');
//       }
  
//       const data = await response.json();
//       setUser(data.user); // Guarda los datos del usuario
//       setToken(data.token); // Guarda el token en el estado
//       localStorage.setItem('token', data.token); // Guarda el token en el localStorage
//     } catch (error) {
//       console.error('Error de autenticación:', error.message);
//       throw error;
//     }
//   };

//   // Función para obtener el perfil del usuario
//   const fetchUserProfile = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
//         headers: {
//           'Authorization': `Bearer ${token}` // Envía el token en el encabezado
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Error al obtener el perfil del usuario');
//       }

//       const data = await response.json();
//       setUser(data); // Guarda los datos del perfil en el estado global
//     } catch (error) {
//       console.error('Error al obtener el perfil del usuario:', error.message);
//     }
//   };

//   // Función para crear un producto
//   const createProduct = async (productData) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('Token inválido o no presente');
//       }

//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/newproduct/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(productData)
//       });

//       if (!response.ok) {
//         throw new Error('Error al crear el producto');
//       }

//       const data = await response.json();
//       console.log('Producto creado:', data);
//     } catch (error) {
//       console.error('Error al crear el producto:', error.message);
//     }
//   };

//   // Función para cerrar sesión
//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token'); // Elimina el token del localStorage
//   };

//   // Función para obtener productos
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/all`);
//       if (!response.ok) {
//         throw new Error('Error al cargar productos');
//       }
//       const data = await response.json();
//       setProducts(data); 
//       setLoading(false); 
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   // Nueva función para obtener los 9 productos más recientes
//   const getLastProducts = () => {
//     return products
//       .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)) // Ordena por fecha de publicación
//       .slice(0, 9); // Limita a los 9 productos más recientes
//   };

//   // Función para registrar un nuevo usuario
//   const registerUser = async (username, mail, password, rol, ubicacion) => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ nombre: username, mail, contraseña: password, rol, ubicacion }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Error al registrar el usuario');
//       }

//       const newUser = await response.json();
//       setUser(newUser);
//     } catch (err) {
//       console.error('Error:', err.message);
//       setError(err.message);
//     }
//   };

//   // Efecto para obtener los productos cuando se carga el componente
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <GlobalContext.Provider value={{
//       user,
//       registerUser,
//       login,
//       logout,
//       token,
//       createProduct,
//       cart,
//       setCart,
//       products,
//       loading,
//       error,
//       getLastProducts
//     }}>
//       {children}
//     </GlobalContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from 'react';

// Crea el contexto
export const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null); 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile(); // Obtener perfil del usuario si el token está disponible
    }
  }, [token]);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email, contraseña: password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error en el login:', errorData);
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }
  
      const data = await response.json();
      setUser(data.user); 
      setToken(data.token); 
      localStorage.setItem('token', data.token); 
    } catch (error) {
      console.error('Error de autenticación:', error.message);
      throw error;
    }
  };

  // Función para obtener el perfil del usuario
  const fetchUserProfile = async () => {
    try {
      if (!token) return; // Solo ejecuta si el token está disponible

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener el perfil del usuario');
      }

      const data = await response.json();
      setUser(data); 
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error.message);
    }
  };

  // Función para crear un producto
  const createProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token inválido o no presente');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/newproduct/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto');
      }

      const data = await response.json();
      console.log('Producto creado:', data);
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); 
  };

  // Función para obtener productos
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/all`);
      if (!response.ok) {
        throw new Error('Error al cargar productos');
      }
      const data = await response.json();
      setProducts(data); 
      setLoading(false); 
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Nueva función para obtener los 9 productos más recientes
  const getLastProducts = () => {
    return products
      .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)) 
      .slice(0, 9); 
  };

  // Función para registrar un nuevo usuario
  const registerUser = async (username, mail, password, rol, ubicacion) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: username, mail, contraseña: password, rol, ubicacion }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar el usuario');
      }

      const newUser = await response.json();
      setUser(newUser);
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message);
    }
  };

  // Efecto para obtener los productos cuando se carga el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <GlobalContext.Provider value={{
      user,
      registerUser, // Asegúrate de incluir registerUser en el valor del contexto
      login,
      logout,
      token,
      createProduct,
      cart,
      setCart,
      products,
      loading,
      error,
      getLastProducts
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
