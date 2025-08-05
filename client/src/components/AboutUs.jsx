import React from 'react';
import './AboutUs.css';

export default function AboutUs() {
    return (
        <section className="about-us-section py-5">
        <div className="container">
            <h2 className="section-title text-center mb-4">Acerca de Nosotros</h2>
            <div className="row align-items-center">
            <div className="col-md-6">
                <p className="about-text">
                En <strong>Mi Tienda</strong> nos dedicamos a ofrecer productos de la más alta calidad,
                seleccionados cuidadosamente para ti. Nuestra misión es brindarte
                una experiencia de compra excepcional, con atención personalizada
                y envío rápido a tu puerta.
                </p>
                <p className="about-text">
                Contamos con un equipo apasionado que trabaja día a día para innovar
                y mejorar nuestros servicios. ¡Bienvenido a la familia de Mi Tienda!
                </p>
            </div>
            <div className="col-md-6 text-center">
                <img
                src="/img/about-us.jpg"
                alt="Acerca de nosotros"
                className="about-image img-fluid rounded shadow-sm"
                />
            </div>
            </div>
        </div>
    </section>
);
}
