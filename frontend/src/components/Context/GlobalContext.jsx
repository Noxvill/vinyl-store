// import React, { createContext, useState, useEffect } from 'react';

// // Crea el contexto
// export const GlobalContext = createContext();

// // Proveedor del context
// export const GlobalProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);     
//   const [user, setUser] = useState(null); 
//   const [token, setToken] = useState(null); 

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   // const login = async (email, password) => {
//   //   try {
//   //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
//   //       // const response = await fetch('http://localhost:3000/api/auth/login/', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ mail: email, contraseña: password })
//   //     });

//   //     if (!response.ok) {
//   //       throw new Error('Error al iniciar sesión');
//   //     }

//   //     const data = await response.json();
//   //     console.log('Respuesta de la API:', data); 
//   //     setUser(data.user); 
//   //     setToken(data.token); 
//   //     localStorage.setItem('token', data.token); 
//   //   } catch (error) {
//   //     console.error('Error de autenticación:', error.message);
//   //     throw error;
//   //   }
//   // };

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
//         const errorData = await response.json(); // Obtener información detallada del error
//         console.log('Error en el login:', errorData); // Ayuda para depurar
//         throw new Error(errorData.message || 'Error al iniciar sesión');
//       }
  
//       const data = await response.json();
//       setUser(data.user);
//       setToken(data.token);
//       localStorage.setItem('token', data.token);
//     } catch (error) {
//       console.error('Error de autenticación:', error.message);
//       throw error;
//     }
//   };

//   const createProduct = async (productData) => {
//     try {
//       const token = localStorage.getItem('token'); // Obtener el token del localStorage
  
//       if (!token) {
//         throw new Error('Token inválido o no presente');
//       }
  
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/newproduct/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Incluir el token en el encabezado Authorization
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

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token'); 
//   };

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


//   const registerUser = async (username, mail, password, rol, ubicacion) => {
//         try {
//           const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ nombre: username, mail, contraseña: password, rol, ubicacion }),
//           });
      
//           // Verificar si la respuesta es exitosa
//           if (!response.ok) {
//             const errorData = await response.json(); // Intentar obtener el error del cuerpo de la respuesta
//             throw new Error(errorData.message || 'Error al registrar el usuario');
//           }
      
//           // Verificar que la respuesta tenga contenido JSON
//           const contentLength = response.headers.get('content-length');
//           if (contentLength && contentLength !== '0') {
//             const newUser = await response.json();
//             setUser(newUser); // Guarda el nuevo usuario en el estado
//           } else {
//             console.log('Registro exitoso sin respuesta en el cuerpo');
//           }
//         } catch (err) {
//           console.error('Error:', err.message);
//           setError(err.message); // Maneja el error en el frontend
//         }
//       };
    

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <GlobalContext.Provider value={{ user, registerUser, login, logout, token, createProduct, cart, setCart, products, loading, error }}>
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
    }
  }, []);

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

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token'); 
  };

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
      .sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)) // Ordena por fecha de creación
      .slice(0, 9); // Limita a los 9 productos más recientes
  };

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
  
      const contentLength = response.headers.get('content-length');
      if (contentLength && contentLength !== '0') {
        const newUser = await response.json();
        setUser(newUser); 
      } else {
        console.log('Registro exitoso sin respuesta en el cuerpo');
      }
    } catch (err) {
      console.error('Error:', err.message);
      setError(err.message); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, registerUser, login, logout, token, createProduct, cart, setCart, products, loading, error, getLastProducts }}>
      {children}
    </GlobalContext.Provider>
  );
};
