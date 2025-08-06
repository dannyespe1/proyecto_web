// client/src/components/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart]         = useState({});
  const [products, setProducts] = useState({});
  const [loading, setLoading]   = useState(true);

  // Base URL de la API desde variable de entorno (o '' para rutas relativas)
  //const API = process.env.REACT_APP_API_URL || '';
  //console.log('🛠️ Cart.jsx – usando API:', API || '/ (rutas relativas)');

  // Carga inicial de productos y carrito
  useEffect(() => {
    const fetchProducts = axios.get(`/api/products`, { withCredentials: true });
    const fetchCart     = axios.get(`/api/cart`,     { withCredentials: true });

    Promise.all([fetchProducts, fetchCart])
      .then(([prodRes, cartRes]) => {
        // Mapear productos por ID
        const prodMap = {};
        prodRes.data.forEach(p => {
          prodMap[p.id] = {
            ...p,
            price: typeof p.price === 'string'
              ? parseFloat(p.price)
              : p.price
          };
        });
        setProducts(prodMap);
        setCart(cartRes.data);
      })
      .catch(err => {
      })
      .finally(() => setLoading(false));
  }, [API]);

  // Función para actualizar cantidad o eliminar
  const updateQty = (id, qty) => {
    axios.post(
      `/api/cart/update`,
      { id, qty },
      { withCredentials: true }
    )
    .then(res => {
      setCart(res.data.cart);
    })
    .catch(err => {
      alert('Error actualizando carrito: ' + err.message);
    });
  };

  if (loading) return <p>Cargando carrito…</p>;

  const items = Object.entries(cart);
  if (items.length === 0) return <p>Tu carrito está vacío.</p>;

  // Cálculo de totales
  let subtotal = 0;
  items.forEach(([id, qty]) => {
    const prod = products[id];
    if (prod) subtotal += prod.price * qty;
  });
  const tax   = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <main className="container py-5">
      <h2 className="mb-4">Tu Carrito</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {items.map(([id, qty]) => {
            const p = products[id] || {};
            return (
              <tr key={id}>
                <td>{p.name || '—'}</td>
                <td>${p.price?.toFixed(2) ?? '—'}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    style={{ width: '80px' }}
                    value={qty}
                    min="0"
                    onChange={e => {
                      const v = parseInt(e.target.value, 10);
                      updateQty(id, isNaN(v) ? 0 : v);
                    }}
                  />
                </td>
                <td>${(p.price * qty).toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => updateQty(id, 0)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4">
        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p><strong>Impuestos (12%):</strong> ${tax.toFixed(2)}</p>
        <h5><strong>Total:</strong> ${total.toFixed(2)}</h5>
      </div>

      <div className="mt-3">
        <Link to="/checkout" className="btn btn-success">
          Ir a Checkout
        </Link>
      </div>
    </main>
  );
}
