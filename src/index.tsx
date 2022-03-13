import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './routes';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import ReduxStore from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ReduxStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
