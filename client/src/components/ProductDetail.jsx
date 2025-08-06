// client/src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import ProductFilter from './ProductFilter';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error,   setError]   = useState(null);

  // Estados de filtro idénticos a ProductList
  const [search,   setSearch]   = useState('');
  const [maxPrice, setMaxPrice] = useState(Infinity);

  // Base URL de la API desde variable de entorno
  //const API = process.env.REACT_APP_API_URL || ''; 
  // Ejemplo: "https://backend-d7qm.onrender.com"

  useEffect(() => {
    axios.get(`/api/products/${id}`, { withCredentials: true })
      .then(res => setProduct(res.data))
      .catch(err => setError(err.response?.data?.error || err.message));
  }, [API, id]);

  const addToCart = () => {
    axios.post(
      `/api/cart/add`,
      { id: product.id, qty: 1 },
      { withCredentials: true }
    )
    .then(() => alert('✔ Añadido al carrito'))
    .catch(err => alert('✖ Error: ' + err.message));
  };

  if (error)    return <p className="text-danger">Error: {error}</p>;
  if (!product) return <p>Cargando producto…</p>;

  return (
    <main className="container py-5 product-detail">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/productos">Productos</Link></li>
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          {product.category && (
            <span className="badge bg-secondary mb-3">{product.category}</span>
          )}
          <h4 className="text-success mb-3">${Number(product.price).toFixed(2)}</h4>
          <p className="text-muted mb-4">
            {product.shortDescription || product.description}
          </p>
          <button
            className="btn btn-success btn-lg me-3"
            onClick={addToCart}
          >
            Agregar al carrito
          </button>
          <span className="text-muted">Stock: {product.stock}</span>
          <hr className="my-4" />
          <h5>Descripción completa</h5>
          <p>{product.description}</p>
        </div>
      </div>

      <ProductFilter
        search={search}
        setSearch={setSearch}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />
    </main>
  );
}
