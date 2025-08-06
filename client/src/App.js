// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar          from './components/NavBar';
import LoginModal      from './components/Login';      // Login.jsx exporta tu modal
import RegisterModal   from './components/Register';   // Register.jsx exporta tu modal

import Home            from './components/Home';
import ProductList     from './components/ProductList';
import ProductDetail   from './components/ProductDetail';
import Cart            from './components/Cart';
import Checkout        from './components/Checkout';
import ProtectedRoute  from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      {/* Siempre montados, fuera de <Routes> */}
      <NavBar />
      <LoginModal />
      <RegisterModal />

      <div className="container-flex text-center">
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/productos"       element={<ProductList />} />
          <Route path="/productos/:id"   element={<ProductDetail />} />
          <Route path="/cart"            element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="*"                element={<h2>Página no encontrada</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
