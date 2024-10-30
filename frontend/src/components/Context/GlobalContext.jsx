// import React, { createContext, useState, useEffect } from 'react';

// // Crea el contexto
// export const GlobalContext = createContext();

// // Proveedor del contexto
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
//       fetchUserProfile(); // Obtener perfil del usuario si el token está disponible
//     }
//   }, [token]);

//   // Función para iniciar sesión
//   // const login = async (email, password) => {
//   //   try {
//   //     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login/`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({ mail: email, contraseña: password })
//   //     });
  
//   //     if (!response.ok) {
//   //       const errorData = await response.json();
//   //       console.log('Error en el login:', errorData);
//   //       throw new Error(errorData.message || 'Error al iniciar sesión');
//   //     }
  
//   //     const data = await response.json();
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
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Error al iniciar sesión');
//       }
  
//       const data = await response.json();
//       console.log("Datos del usuario logueado:", data.user); // Verifica que el ID del usuario se obtenga
//       setUser(data.user); 
//       setToken(data.token); 
//       localStorage.setItem('token', data.token); 
//     } catch (error) {
//       console.error('Error de autenticación:', error.message);
//       throw error;
//     }
//   };
  

//   // Función para obtener el perfil del usuario
//   const fetchUserProfile = async () => {
//     try {
//       if (!token) return; // Solo ejecuta si el token está disponible

//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       if (!response.ok) {
//         throw new Error('Error al obtener el perfil del usuario');
//       }

//       const data = await response.json();
//       setUser(data); 
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
//     localStorage.removeItem('token'); 
//   };

//   // Función para obtener productos
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/all`);
//       if (!response.ok) {
//         throw new Error('Error al cargar productos');
//       }
//       const data = await response.json();
//       console.log('Productos obtenidos:', data); // <-- Aquí aseguramos que productos tienen el campo "precio"
//       setProducts(data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error en fetchProducts:', err); // <-- Asegúrate de manejar correctamente el error
//       setError(err.message);
//       setLoading(false);
//     }
//   };
  

//   // Nueva función para obtener los 9 productos más recientes
//   const getLastProducts = () => {
//     return products
//       .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion)) 
//       .slice(0, 9); 
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



// // Función para eliminar un producto
// const deleteProduct = async (productId) => {
//   if (!token) {
//     throw new Error('Debes estar logueado para eliminar un producto.');
//   }

//   const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
//   if (!confirmDelete) return false;

//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });

//     if (response.ok) {
//       // Eliminar el producto localmente del estado
//       setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
//       alert('Producto eliminado exitosamente.');
//       return true; // Retornar true si se elimina exitosamente
//     } else {
//       alert('Error al eliminar el producto.');
//       return false;
//     }
//   } catch (error) {
//     console.error('Error al eliminar el producto:', error);
//     alert('Hubo un problema al eliminar el producto.');
//     return false;
//   }
// };


// // Función para actualizar un producto
// const updateProduct = async (productId, updatedProductData) => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//       body: JSON.stringify(updatedProductData),
//     });

//     if (response.ok) {
//       const updatedProduct = await response.json();
//       setProducts((prevProducts) => prevProducts.map(product =>
//         product.id === productId ? updatedProduct : product
//       ));
//       alert('Producto actualizado exitosamente.');
//     } else {
//       throw new Error('Error al actualizar el producto');
//     }
//   } catch (error) {
//     console.error('Error al actualizar el producto:', error);
//     alert('Hubo un problema al actualizar el producto.');
//   }
// };


//   // Funciones del carrito de compras
//   const addToCart = (productId) => {
//     const product = products.find(p => p.id === productId);
//     if (product) {
//       setCart(prevCart => [...prevCart, product]);
//     }
//   };
  

//   const removeFromCart = (productId) => {
//     setCart(cart.filter(product => product.id !== productId));
//   };

//   const handlePurchase = async () => {
//     try {
//       const purchases = cart.map(item => ({
//         producto_id: item.id,
//         monto_pagado: item.precio,
//       }));

//       for (const purchase of purchases) {
//         await axios.post('http://localhost:3000/api/buys/newbuy', purchase, {
//           headers: {
//             Authorization: `Bearer ${token}`, 
//           }
//         });
//       }

//       setCart([]); // Limpiar el carrito después de la compra
//       alert('Compra realizada con éxito');
//     } catch (error) {
//       console.error('Error al realizar la compra:', error);
//       alert('Hubo un problema con la compra');
//     }
//   };


//   return (
//     <GlobalContext.Provider value={{
//       user,
//       registerUser, // Asegúrate de incluir registerUser en el valor del contexto
//       login,
//       logout,
//       token,
//       createProduct,
//       cart,
//       setCart,
//       products,
//       loading,
//       error,
//       deleteProduct,
//       updateProduct,
//       getLastProducts,
//       addToCart,
//       removeFromCart,
//       handlePurchase
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
  // Cargar el carrito desde localStorage al iniciar
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

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

  // Guardar el carrito en localStorage cada vez que se actualice
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
      if (!token) return;

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
      console.log('Productos obtenidos:', data);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error('Error en fetchProducts:', err);
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

  // Función para eliminar un producto
  const deleteProduct = async (productId) => {
    if (!token) {
      throw new Error('Debes estar logueado para eliminar un producto.');
    }

    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (!confirmDelete) return false;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
        alert('Producto eliminado exitosamente.');
        return true;
      } else {
        alert('Error al eliminar el producto.');
        return false;
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Hubo un problema al eliminar el producto.');
      return false;
    }
  };

  // Función para actualizar un producto
  const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProductData),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prevProducts) => prevProducts.map(product =>
          product.id === productId ? updatedProduct : product
        ));
        alert('Producto actualizado exitosamente.');
      } else {
        throw new Error('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Hubo un problema al actualizar el producto.');
    }
  };

  // Funciones del carrito de compras
  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setCart(prevCart => [...prevCart, product]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(product => product.id !== productId));
  };

  const handlePurchase = async () => {
    try {
      const purchases = cart.map(item => ({
        producto_id: item.id,
        monto_pagado: item.precio,
      }));

      for (const purchase of purchases) {
        await axios.post('http://localhost:3000/api/buys/newbuy', purchase, {
          headers: {
            Authorization: `Bearer ${token}`, 
          }
        });
      }

      setCart([]); // Limpiar el carrito después de la compra
      alert('Compra realizada con éxito');
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Hubo un problema con la compra');
    }
  };

  return (
    <GlobalContext.Provider value={{
      user,
      registerUser,
      login,
      logout,
      token,
      createProduct,
      cart,
      setCart,
      products,
      loading,
      error,
      deleteProduct,
      updateProduct,
      getLastProducts,
      addToCart,
      removeFromCart,
      handlePurchase
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
