import React from 'react';
import ReactDOM from 'react-dom';
import actionCable from 'actioncable';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { WS_CABLE_URL } from './lib/const'

const CableApp = {}
CableApp.cable = actionCable.createConsumer(WS_CABLE_URL);

ReactDOM.render(
  <React.StrictMode>
    <App cableApp={CableApp} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
