import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from "./Components/NavBar";
import Browse from './Components/Browse';
import Login from './Components/Login';
import Register from './Components/Register';
import SellPart from './Components/SellPart';
import Admin from './Components/Admin';
import MyAccount from "./Components/MyAccount";

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
            <Route path="/sellPart" element={<SellPart />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/admin" element={<Admin />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
