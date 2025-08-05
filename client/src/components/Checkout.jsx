// client/src/components/Checkout.jsx
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './Checkout.css';

export default function Checkout() {
    const { user } = useContext(AuthContext);
    const [name, setName]       = useState('');
    const [email, setEmail]     = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        if (user) {
        setName(user.name || '');
        setEmail(user.email || '');
        }
    }, [user]);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        try {
        const res = await axios.post(
            '/api/checkout',
            { name, email, address },
            { withCredentials: true }
        );
        setMessage(res.data.success 
            ? '¡Compra realizada con éxito!' 
            : 'Hubo un problema al procesar tu compra.'
        );
        } catch (err) {
        setMessage('Error: ' + err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
        <main className="container py-5">
        <h2 className="mb-4">Checkout</h2>
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
                type="text"
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                disabled
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Dirección de envío</label>
            <textarea
                className="form-control"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
            />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Procesando...' : 'Confirmar Compra'}
            </button>
        </form>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        </main>
    );
}
