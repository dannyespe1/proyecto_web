// client/src/components/Footer.jsx
import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer py-4 bg-dark text-light">
        <div className="container-flex">
            <div className="row gy-3">
            <div className="col-md-4">
                <h5>Mi Tienda</h5>
                <p>© {new Date().getFullYear()} Mi Tienda. Todos los derechos reservados.</p>
            </div>
            <div className="col-md-4">
                <h5>Contacto</h5>
                <p>
                <a href="mailto:contacto@mitienda.com" className="link-light">
                    contacto@mitienda.com
                </a><br/>
                <a href="tel:+1234567890" className="link-light">
                    +1 234 567 890
                </a>
                </p>
            </div>
            <div className="col-md-4">
                <h5>Síguenos</h5>
                <a
                href="https://facebook.com/mitienda"
                target="_blank"
                rel="noopener noreferrer"
                className="me-2 link-light"
                >
                <i className="bi bi-facebook"></i>
                </a>
                <a
                href="https://twitter.com/mitienda"
                target="_blank"
                rel="noopener noreferrer"
                className="me-2 link-light"
                >
                <i className="bi bi-twitter"></i>
                </a>
                <a
                href="https://instagram.com/mitienda"
                target="_blank"
                rel="noopener noreferrer"
                className="link-light"
                >
                <i className="bi bi-instagram"></i>
                </a>
            </div>
            </div>
        </div>
        </footer>
    );
}
