import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Home from './pages/Home';
import Ask from './pages/Ask';
import QuestionDetails from './pages/QuestionDetails';
import EditQuestion from './pages/EditQuestion';
import EditAnswer from './pages/EditAnswer';
import { setUser } from './redux/actions/user_actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    let Token = sessionStorage.getItem('jwt-token');
    let user = sessionStorage.getItem('user');
    if (Token && user) {
      dispatch(setUser(user));
    } else {
      sessionStorage.removeItem('jwt-token');
      sessionStorage.removeItem('user');
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/detail/:id" element={<QuestionDetails />} />
        <Route path="/editquestion" element={<EditQuestion />} />
        <Route path="/editanswer/:id" element={<EditAnswer />} />
      </Routes>
    </>
  );
}

export default App;
