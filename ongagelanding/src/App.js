// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default App; 
