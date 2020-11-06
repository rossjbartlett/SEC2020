import React from 'react';
import ReactDOM from 'react-dom';
import openSocket from 'socket.io-client';
import App from './App';
const parser = require('socket.io-json-parser');

const socket = openSocket(
  process.env.REACT_APP_SERVER || 'http://localhost:4000',
  { parser }
);

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket} />
  </React.StrictMode>,
  document.getElementById('root')
);
