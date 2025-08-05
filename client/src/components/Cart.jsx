// client/src/components/Cart.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  // Base URL de la API desde variable de entorno
  const API = process.env.REACT_APP_API_URL; 
  // Ejemplo: "https://backend-d7qm.onrender.com"

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/api/products`, { withCredentials: true }),
      axios.get(`${API}/api/cart`,     { withCredentials: true }),
    ])
      .then(([prodRes, cartRes]) => {
        const prodMap = {};
        prodRes.data.forEach(p => { prodMap[p.id] = p; });
        setProducts(prodMap);
        setCart(cartRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [API]);

  const updateQty = (id, qty) => {
    axios.post(
      `${API}/api/cart/update`,
      { id, qty },
      { withCredentials: true }
    )
    .then(res => setCart(res.data.cart))
    .catch(err => alert('Error: ' + err.message));
  };

  if (loading) return <p>Cargando carrito…</p>;

  const items = Object.entries(cart);
  if (items.length === 0) return <p>Tu carrito está vacío.</p>;

  let subtotal = 0;
  items.forEach(([id, qty]) => {
    subtotal += parseFloat(products[id].price) * qty;
  });
  const tax   = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <main className="container py-5">
      <table className="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {items.map(([id, qty]) => {
            const p = products[id];
            return (
              <tr key={id}>
                <td>{p.name}</td>
                <td>${parseFloat(p.price).toFixed(2)}</td>
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
                <td>${(parseFloat(p.price) * qty).toFixed(2)}</td>
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
