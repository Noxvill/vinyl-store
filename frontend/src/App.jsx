// import React from 'react';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from './components/home/Header';
// import HeroSection from './components/home/HeroSection';
// import ProductsSection from './components/home/ProductSection';
// import RegistrationPage from './components/RegistrationForm/RegistrationPage';
// import LoginPage from './components/LoginForm/LoginPage';
// import NotFound from './components/home/NotFound';
// import ItemsForSale from './components/Marketplace/ItemsForSale'
// import ProductDetail from './components/Marketplace/ProductDetail'
// import NewPublication from './components/NewPostForm/NewPublication';
// import Footer from './components/home/Footer';
// import UserProfilePage from './components/UserProfilePage/UserProfilePage'
// import { GlobalProvider } from './components/Context/GlobalContext';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <GlobalProvider> {/* Envuelve toda la aplicación con el proveedor */}
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           {/* Ruta principal incluye tanto HeroSection como ProductsSection */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <HeroSection />
//                 <ProductsSection />
//               </>
//             }
//           />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/registro" element={<RegistrationPage />} />
//           <Route path="/productos" element={<ProductsSection />} />
//           <Route path="/*" element={<NotFound />} />
//           <Route path="/Publicaciones" element={<ItemsForSale />} />
//           <Route path="/Publicar" element={<NewPublication />} />
//           <Route path="/DetalleProducto" element={<ProductDetail />} />
//           <Route path="/profile" element={<UserProfilePage />} />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//       </GlobalProvider>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/home/Header';
import HeroSection from './components/home/HeroSection';
import ProductsSection from './components/home/ProductSection';
import RegistrationPage from './components/RegistrationForm/RegistrationPage';
import LoginPage from './components/LoginForm/LoginPage';
import NotFound from './components/home/NotFound';
import ItemsForSale from './components/Marketplace/ItemsForSale'
import ProductDetail from './components/Marketplace/ProductDetail'
import NewPublication from './components/NewPostForm/NewPublication';
import Footer from './components/home/Footer';
import UserProfilePage from './components/UserProfilePage/UserProfilePage'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute'; 
import Carrito from './components/Cart/Carrito';
import { GlobalProvider } from './components/Context/GlobalContext';
import './App.css';


function App() {
  return (
    <div className="App">
      <GlobalProvider> {/* Envuelve toda la aplicación con el proveedor */}
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Ruta principal incluye tanto HeroSection como ProductsSection */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <ProductsSection />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistrationPage />} />
            <Route path="/productos" element={<ProductsSection />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/Publicaciones" element={<ItemsForSale/>} />
            <Route path="/DetalleProducto" element={<ProductDetail />} />
            <Route path="/" element={<ProductsSection />} />
        <Route path="/producto/:id" element={<ProductDetail />} /> {/* Ruta dinámica */}
            {/* Proteger la ruta de publicación */}
            <Route
              path="/Publicar"
              element={<ProtectedRoute element={<NewPublication />} />}
            />
            {/* Proteger la ruta del perfil del usuario */}
            <Route
              path="/profile"
              element={<ProtectedRoute element={<UserProfilePage />} />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </GlobalProvider>
    </div>
  );
}

export default App;
