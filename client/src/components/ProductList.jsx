// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css';
import { useNavigate } from 'react-router-dom';
import ProductFilter from './ProductFilter';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  // Estados de filtro
  const [search,   setSearch]   = useState('');
  const [maxPrice, setMaxPrice] = useState(Infinity);

  const navigate = useNavigate();

  // Base URL de la API
  const API = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    axios.get(`${API}/api/products`, { withCredentials: true })
      .then(res => {
        const prods = res.data.map(p => ({
          ...p,
          price: typeof p.price === 'string'
                   ? parseFloat(p.price)
                   : p.price
        }));
        setProducts(prods);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [API]);

  const addToCart = id => {
    axios.post(
      `${API}/api/cart/add`,
      { id, qty: 1 },
      { withCredentials: true }
    )
    .then(() => alert('✔ Añadido al carrito'))
    .catch(err => alert('✖ Error: ' + err.message));
  };

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => p.price <= maxPrice);

  if (loading) return <p>Cargando productos…</p>;
  if (error)   return <p className="text-danger">Error: {error}</p>;

  return (
    <main className="container py-5 product-list">
      {/* Offcanvas de filtros */}
      <ProductFilter
        search={search}
        setSearch={setSearch}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Productos en cuadrícula */}
      <section className="mt-4 product-list__section">
        <h2 className="mb-4 product-list__section-title">Productos</h2>
        <div className="row g-4">
          {filtered.map(p => (
            <div key={p.id} className="col-12 col-md-6 col-lg-4">
              <div
                className="card h-100 product-card"
                onClick={() => navigate(`/productos/${p.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <img src={p.image_url} className="card-img-top" alt={p.name} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text flex-grow-1">
                    ${p.price.toFixed(2)}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={e => { e.stopPropagation(); addToCart(p.id); }}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
