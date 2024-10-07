import React from 'react';
import './Footer.css';
import appstore from '../../assets/app_store.png'
import playstore from '../../assets/play_store.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column discos">
          <h3>Discos</h3>
          <ul>
            <li><a href="#">Quiénes somos?</a></li>
            <li><a href="#">Trabaja con nosotros</a></li>
            </ul>
        </div>
        <div className="footer-column ayuda">
          <h3>Encuentra ayuda aquí</h3>
          <ul>
            <li><a href="#">Ayuda</a></li>
            <li><a href="#">Sugerencias y reclamos</a></li>
            <li><a href="#">Foro [Pronto...]</a></li>
            <li><a href="#">Normas del sitio</a></li>
            
          </ul>
        </div>
        <div className="footer-column unete">
          <h3>Únete</h3>
          <ul>
            <li><a href="#">Registro</a></li>
            <li><a href="#">Explora el sitio</a></li>
            <li><a href="#">Donaciones</a></li>
            <li><a href="#">Publica tu anuncio</a></li>
          </ul>
        </div>
        <div className="footer-column siguenos">
          <h3>Síguenos en</h3>
          <ul>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">TikTok</a></li>
        
          </ul>
        </div>
        <div className="footer-column onthego">
          <h3>Descarga nuestra app!</h3>
          <div className="app-links">
            <a href="#">
              <img src={appstore} alt="App Store" />
            </a>
            <a href="#">
              <img src={playstore} alt="Google Play" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
