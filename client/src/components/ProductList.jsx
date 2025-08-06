// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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

  // Lee la URL base de tu API desde la variable de entorno
  const API = process.env.REACT_APP_API_URL || ''; 
  // Por ejemplo: "https://backend-d7qm.onrender.com"

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <main className="container py-5 product-list">
      {/* Offcanvas */}
      <ProductFilter
        search={search}
        setSearch={setSearch}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Productos en carrusel */}
      <section className="mt-4 product-list__section">
        <h2 className="mb-4 product-list__section-title">Productos</h2>
        <Slider {...settings}>
          {filtered.map(p => (
            <div key={p.id} className="px-2">
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
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
    </main>
  );
}
