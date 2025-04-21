import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from "./Components/NavBar";
import Browse from './Components/Browse';
import Login from './Components/Login';
import Register from './Components/Register';
import Sell from './Components/SellPart';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App flex">
        <NavBar />
        <div className="flex-1 ml-64 p-6">
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/administrative" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
