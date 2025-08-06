// client/src/components/NavBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './NavBar.css';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const [isTransparent, setTransparent] = useState(false);

  // Base URL de la API desde variable de entorno
  const API = process.env.REACT_APP_API_URL || '';
  // Ejemplo: "https://backend-d7qm.onrender.com"

  // Verificar si estamos en la página de productos
  const isProductsPage =
    location.pathname === '/productos' ||
    location.pathname.startsWith('/productos/');

  // Refresca el contador del carrito en cada cambio de ruta
  useEffect(() => {
    axios
      .get(`${API}/api/cart`, { withCredentials: true })
      .then(res => {
        const total = Object.values(res.data).reduce((sum, q) => sum + q, 0);
        setCartCount(total);
      })
      .catch(console.error);
  }, [location, API]);

  // Transparencia al hacer scroll
  useEffect(() => {
    const onScroll = () => setTransparent(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    axios
      .post(`${API}/api/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top transition-navbar ${
        isTransparent ? 'bg-transparent' : 'bg-dark text-white'
      }`}
    >
      <div className="container">
        {/* Marca */}
        <NavLink className="navbar-brand text-white" to="/">
          <i className="bi bi-pc-display-horizontal me-2"></i>TechXtreme
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Mostrar menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Botón de Filtrar (móvil) */}
        {isProductsPage && (
          <button
            className="btn btn-outline-light d-lg-none ms-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#filterOffcanvas"
            aria-controls="filterOffcanvas"
          >
            <i className="bi bi-funnel-fill"></i>
          </button>
        )}

        {/* Menú */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Enlaces */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {[
              { to: '/', label: 'Inicio', icon: 'house-fill' },
              { to: '/productos', label: 'Productos', icon: 'box-seam' },
            ].map(({ to, label, icon }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active' : ''}`
                  }
                >
                  <i className={`bi bi-${icon} me-1`}></i>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth + Carrito */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {!user ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-white"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    <i className="bi bi-person-plus-fill me-1"></i>Registro
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#!"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-1"></i>
                  {user.name}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-left me-1"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* Carrito */}
            <li className="nav-item position-relative ms-3">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `nav-link text-white${isActive ? ' active' : ''}`
                }
              >
                <i className="bi bi-cart-fill"></i>
              </NavLink>
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </li>
          </ul>

          {/* Filtrar (desktop) */}
          {isProductsPage && (
            <button
              className="btn btn-outline-light d-none d-lg-inline-block ms-3"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#filterOffcanvas"
              aria-controls="filterOffcanvas"
            >
              <i className="bi bi-funnel-fill"></i> Filtrar
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
