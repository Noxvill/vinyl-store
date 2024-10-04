import React from 'react';
import Header from './components/home/Header';
import HeroSection from './components/home/HeroSection';
import ProductsSection from './components/home/ProductSection';
import RegistrationPage from './components/RegistrationForm/RegistrationPage';
import Footer from './components/home/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <ProductsSection />
          <Footer />
      {/* <RegistrationPage />  */}
    </div>
  );
}

export default App;
