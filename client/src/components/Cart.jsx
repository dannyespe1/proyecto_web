// client/src/components/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart]         = useState({});
  const [products, setProducts] = useState({});
  const [loading, setLoading]   = useState(true);

  // Base URL de la API desde variable de entorno, o ruta relativa si falta
  const API = process.env.REACT_APP_API_URL || '';

  // Para depuración: ver en consola qué URL está usando
  console.log('🛠️ Cart.jsx – API base URL:', API || '(relative)');

  useEffect(() => {
    const productsReq = axios.get(`${API}/api/products`, { withCredentials: true });
    const cartReq     = axios.get(`${API}/api/cart`,     { withCredentials: true });

    Promise.all([productsReq, cartReq])
      .then(([prodRes, cartRes]) => {
        // Ver en consola la respuesta del carrito
        console.log('🛠️ Cart.jsx – /api/cart response:', cartRes.data);

        // Mapear productos por ID para acceso rápido
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
        console.error('🛠️ Cart.jsx – error al cargar carrito:', err);
        alert('Error cargando carrito: ' + err.message);
      })
      .finally(() => setLoading(false));
  }, [API]);

  const updateQty = (id, qty) => {
    axios.post(
      `${API}/api/cart/update`,
      { id, qty },
      { withCredentials: true }
    )
    .then(res => {
      console.log('🛠️ Cart.jsx – /api/cart/update response:', res.data.cart);
      setCart(res.data.cart);
    })
    .catch(err => {
      console.error('🛠️ Cart.jsx – error al actualizar carrito:', err);
      alert('Error actualizando carrito: ' + err.message);
    });
  };

  if (loading) return <p>Cargando carrito…</p>;

  const items = Object.entries(cart);
  if (items.length === 0) return <p>Tu carrito está vacío.</p>;

  let subtotal = 0;
  items.forEach(([id, qty]) => {
    const prod = products[id];
    if (prod) {
      subtotal += prod.price * qty;
    }
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
