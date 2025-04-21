import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// 使用 hydrate 方法接管服务器渲染的内容
ReactDOM.hydrate(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);