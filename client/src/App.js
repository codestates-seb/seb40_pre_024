import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DetailsComponent from './components/DetailComponent/DetailsComponent';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';

function App() {
  // .length
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
