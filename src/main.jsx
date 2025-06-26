import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CountryProvider } from './context/CountryContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CountryProvider>
        <App />
      </CountryProvider>
    </BrowserRouter>
  </React.StrictMode>
);