import React from 'react';
import './HeroSection.css'; // Estilos para la sección Hero

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="tp1"><strong>Bienvenido a Vinyl</strong></h1>
        <h1 className="cosmos-text">
          <em>S</em>
          <em className="planet left">T</em>
          <em>O</em>
          <em>R</em>
          <em className="planet right">E</em>
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
