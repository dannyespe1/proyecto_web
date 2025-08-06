// client/src/components/LoginModal.jsx
import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import Modal from 'bootstrap/js/dist/modal';
import './LoginModal.css';

export default function LoginModal() {
  const { setUser } = useContext(AuthContext);
  const navigate    = useNavigate();
  const modalRef    = useRef(null);

  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const API = process.env.REACT_APP_API_URL || '';

  // Limpiar y preparar formulario
  const handle = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  // Al ocultarse el modal, limpiamos backdrop y scroll-lock, y navegamos
  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    const onHidden = () => {
      document.body.classList.remove('modal-open');
      document.querySelectorAll('.modal-backdrop').forEach(x => x.remove());
      navigate('/productos');
    };
    el.addEventListener('hidden.bs.modal', onHidden);
    return () => el.removeEventListener('hidden.bs.modal', onHidden);
  }, [navigate]);

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(
        `${API}/api/auth/login`,
        form,
        { withCredentials: true }
      );
      setUser(res.data);

      // Cerramos el modal; la navegación y limpieza vendrán por hidden.bs.modal
      const bsModal = Modal.getOrCreateInstance(modalRef.current);
      bsModal.hide();
    } catch (err) {
      setError(err.response?.data?.error || 'Error inesperado');
    }
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content p-0 overflow-hidden">
          <div className="row g-0">
            {/* Video de fondo (solo en desktop) */}
            <div className="col-lg-5 d-none d-lg-block">
              <video
                className="h-100 w-100 object-fit-cover"
                src="/videos/video1.mp4"
                autoPlay
                muted
                loop
              />
            </div>
            {/* Formulario */}
            <div className="col-lg-7 p-5">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title" id="loginModalLabel">Iniciar Sesión</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                />
              </div>
              <div className="modal-body pt-3">
                {error && <div className="alert alert-danger py-2">{error}</div>}
                <form onSubmit={submit}>
                  <div className="mb-4">
                    <label htmlFor="loginEmail" className="form-label">Correo electrónico</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-envelope-fill"></i>
                      </span>
                      <input
                        type="email"
                        id="loginEmail"
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
                    <label htmlFor="loginPassword" className="form-label">Contraseña</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        type="password"
                        id="loginPassword"
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
                    className="btn btn-primary w-100 py-2"
                  >
                    Entrar
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
