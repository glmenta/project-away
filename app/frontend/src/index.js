import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext.js';

const Main = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
ReactDOM.render(
  <UserProvider>
    <Main />
  </UserProvider>,
  document.getElementById('root')
);
