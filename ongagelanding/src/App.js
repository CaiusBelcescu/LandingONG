// src/App.js
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
      <div className="App">
        <Navbar />
        <LandingPage />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
