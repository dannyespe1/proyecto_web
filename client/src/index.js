// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import App from './App';
import { AuthProvider } from './AuthContext';
import { FilterProvider } from './FilterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthProvider><FilterProvider><App /></FilterProvider></AuthProvider>);