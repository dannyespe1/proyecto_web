// client/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Home from './components/Home';
import NavBar      from './components/NavBar';
import Login       from './components/Login';
import Register from './components/Register';
import Checkout from './components/Checkout';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Login />
      <Register />
      <div className="container-flex text-center">
        <Routes>
          <Route path="/"    element={<Home />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout"element={<ProtectedRoute><Checkout /></ProtectedRoute>}/>
          <Route path="*"     element={<h2>Página no encontrada</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}