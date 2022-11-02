import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import Ask from './pages/Ask';
import QuestionDetails from './pages/QuestionDetails';
import EditQuestion from './pages/EditQuestion';
import EditAnswer from './pages/EditAnswer';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<Ask />} />
        {/* 상세페이지 창 */}
        <Route path="/detail/:id" element={<QuestionDetails />} />
        {/* 질문 수정*/}
        <Route path="/detail/:id/edit" element={<EditQuestion />} />
        {/* 댓글 수정 */}
        <Route path="/comment/:id/edit" element={<EditAnswer />} />
      </Routes>
    </>
  );
}

export default App;
