import React from 'react';
import Header from '../home/Header'; 
import Footer from '../home/Footer'; 
import RegistrationForm from './RegistrationForm'; 
import './RegistrationPage.css'; 

const RegistrationPage = () => {
  return (
    <div className="registration-page">
      <Header />
      <div className="registration-content">
        <RegistrationForm />
      </div>
      <Footer />
    </div>
  );
};

export default RegistrationPage;
