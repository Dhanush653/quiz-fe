import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/loginPage/loginPage';
import Dashboard from './components/Dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
