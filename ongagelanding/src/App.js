// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import './App.css';

function App() {
  const clientID=process.env.REACT_APP_CLIENT_ID
  console.log(clientID)
  return (
    <GoogleOAuthProvider clientId={clientID}>
      <div className="App">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
