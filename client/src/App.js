import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import Ask from './pages/Ask';
import QuestionDetails from './pages/QuestionDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/editask" element={<Ask />} />
        <Route path="/detail/:id" element={<QuestionDetails />} />
      </Routes>
    </>
  );
}

export default App;
