// client/src/components/RegisterModal.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './RegisterModal.css';
import { useNavigate } from 'react-router-dom';

export default function RegisterModal() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate(); 
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    
    const [error, setError] = useState('');
    

  // Base URL de la API desde variable de entorno
  const API = process.env.REACT_APP_API_URL;

  const handle = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `${API}/api/auth/register`,
        form,
        { withCredentials: true }
      );
      setUser(res.data);
      const modalEl = document.getElementById('registerModal');
      const modal   = window.bootstrap.Modal.getInstance(modalEl);
        modal.hide();
        navigate('/productos');
    } catch (err) {
      setError(err.response?.data?.error || 'Error inesperado');
    }
  };

  return (
    <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content p-0 overflow-hidden">
          <div className="row g-0">
            {/* Video de fondo en lado izquierdo */}
            <div className="col-lg-5 d-none d-lg-block">
              <video
                className="h-100 w-100 object-fit-cover"
                src="/videos/video3.mp4"
                autoPlay
                muted
                loop
              />
            </div>
            {/* Formulario */}
            <div className="col-lg-7 p-5">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title" id="registerModalLabel">Registro de Usuario</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
              </div>
              <div className="modal-body pt-3">
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <form onSubmit={submit}>
                  <div className="mb-4">
                    <label htmlFor="registerName" className="form-label">Nombre completo</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                      <input
                        type="text"
                        id="registerName"
                        name="name"
                        className="form-control"
                        placeholder="Tu nombre completo"
                        value={form.name}
                        onChange={handle}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="registerEmail" className="form-label">Correo electrónico</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-envelope-fill"></i></span>
                      <input
                        type="email"
                        id="registerEmail"
                        name="email"
                        className="form-control"
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={handle}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="registerPassword" className="form-label">Contraseña</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                      <input
                        type="password"
                        id="registerPassword"
                        name="password"
                        className="form-control"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handle}
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100 py-2 d-flex justify-content-center align-items-center"
                  >
                    Registrarse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
