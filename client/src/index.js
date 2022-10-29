import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducer';

// ()()두개를 사용한 이유는 첫번째 함수가 리턴한 것이 함수라면 해당 함수를 ()붙여서 실행할 수 있음
// 기존 리듀서는 객체만 처리 할 수 있는 데 아래와 같이 처리하면, 함수와 프로미스 객체도 처리할 수 있음.
const createStoreWithMiddleware = applyMiddleware(
  // 해당 변수는 createStore과 같은 역할을 하게 됨.
  promiseMiddleware, // 리듀서가 promise 객체 처리가능
  ReduxThunk // 리듀서가 function 처리 가능
)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 스토어에 리듀서 설치 */}
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        // 익스텐션 사용을 위한 것
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
