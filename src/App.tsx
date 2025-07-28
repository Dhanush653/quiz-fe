import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage/loginPage';
import Dashboard from './components/Dashboard/dashboard';
import CreateQuiz from './components/CreateQuiz/createQuiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create-quiz' element={<CreateQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
