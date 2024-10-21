// import React, { createContext, useState, useEffect } from 'react';
// // import.meta.env
// // import * as jwtDecode from 'jwt-decode';




// // Crea el contexto
// export const GlobalContext = createContext();

// // Proveedor del contexto
// export const GlobalProvider = ({ children }) => {
//    const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]); // Estado para almacenar productos
//   const [loading, setLoading] = useState(true); // Estado de carga
//   const [error, setError] = useState(null);     // Estado para manejar errores
//   const [user, setUser] = useState(null); // Estado del usuario autenticado
//   const [token, setToken] = useState(null); // Estado para el token de autenticación (si tu API lo devuelve)


// // Función para autenticar usuario mediante la API

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//       // Aquí podrías hacer una llamada a la API para obtener los datos del usuario usando el token
//       // fetchUser(storedToken);
//     }
//   }, []);

//   // const login = async (email, password) => {
//   //   try {
//   //     const response = await fetch('http://localhost:3000/api/auth/login/', {
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
//   //     setUser(data.user);
//   //     setToken(data.token);
//   //     localStorage.setItem('token', data.token); // Guardar el token en localStorage
//   //   } catch (error) {
//   //     console.error('Error de autenticación:', error.message);
//   //     throw error;
//   //   }
//   // };

//   const login = async (email, password) => {
//     try {
//       const response = await fetch('http://localhost:3000/api/auth/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ mail: email, contraseña: password })
//       });
  
//       if (!response.ok) {
//         throw new Error('Error al iniciar sesión');
//       }
  
//       const data = await response.json();
//       console.log('Respuesta de la API:', data); // Verifica la respuesta de la API
  
//       // Guarda el token y los datos del usuario en el estado global
//       setUser(data.user); // Guarda los datos del usuario (nombre, email, rol, etc.)
//       setToken(data.token); // Guarda el token
//       localStorage.setItem('token', data.token); // Guarda el token en localStorage
//     } catch (error) {
//       console.error('Error de autenticación:', error.message);
//       throw error;
//     }
//   };
  


//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('token'); // Eliminar el token de localStorage
//   };


//   // Función para cargar productos desde la API
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch('https://vinyl-store-backend.onrender.com/api/products/all'); // Reemplaza con tu URL de API
//       if (!response.ok) {
//         throw new Error('Error al cargar productos');
//       }
//       const data = await response.json();
//       setProducts(data); // Guardar productos en el estado
//       setLoading(false); // Finalizar el estado de carga
//     } catch (err) {
//       setError(err.message); // Manejar errores
//       setLoading(false);
//     }
//   };

//   // Función para registrar un nuevo usuario

//   const registerUser = async (username, mail, password, rol, ubicacion) => {
//     try {
//       const response = await fetch('https://vinyl-store-backend.onrender.com/api/users/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ nombre: username, mail, contraseña: password, rol, ubicacion }),
//       });
  
//       // Verificar si la respuesta es exitosa
//       if (!response.ok) {
//         const errorData = await response.json(); // Intentar obtener el error del cuerpo de la respuesta
//         throw new Error(errorData.message || 'Error al registrar el usuario');
//       }
  
//       // Verificar que la respuesta tenga contenido JSON
//       const contentLength = response.headers.get('content-length');
//       if (contentLength && contentLength !== '0') {
//         const newUser = await response.json();
//         setUser(newUser); // Guarda el nuevo usuario en el estado
//       } else {
//         console.log('Registro exitoso sin respuesta en el cuerpo');
//       }
//     } catch (err) {
//       console.error('Error:', err.message);
//       setError(err.message); // Maneja el error en el frontend
//     }
//   };


//   const createProduct = async (productData) => {
//     try {
//       const token = localStorage.getItem('token'); // Asegúrate de que el token se obtenga correctamente
//       const response = await fetch('https://vinyl-store-backend.onrender.com/api/products/newproduct', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
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
  


//   // Llamar a la API cuando se cargue el componente
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <GlobalContext.Provider value={{ user, login, logout, token, setUser, cart, setCart, products, loading, error, registerUser, createProduct }}>
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
      // const response = await fetch('https://vinyl-store-backend.onrender.com/api/auth/login/', {
        const response = await fetch('http://localhost:3000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email, contraseña: password })
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      console.log('Respuesta de la API:', data); 
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
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
  
      if (!token) {
        throw new Error('Token inválido o no presente');
      }
  
      const response = await fetch('https://vinyl-store-backend.onrender.com/api/products/newproduct/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluir el token en el encabezado Authorization
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
      const response = await fetch('https://vinyl-store-backend.onrender.com/api/products/all'); 
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, login, logout, token, createProduct, cart, setCart, products, loading, error }}>
      {children}
    </GlobalContext.Provider>
  );
};
