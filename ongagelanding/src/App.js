// src/App.js
import React, { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const clientID = process.env.REACT_APP_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className="App">
        <Navbar />
        <LandingPage />
        <Footer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
