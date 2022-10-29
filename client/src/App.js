import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailsComponent from './components/DetailComponent/DetailsComponent';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import Ask from './pages/Ask';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </>
  );
}

export default App;
