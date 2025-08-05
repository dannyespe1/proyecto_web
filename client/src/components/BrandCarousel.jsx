// client/src/components/BrandCarousel.jsx
import React from 'react';
import './BrandCarousel.css';

export default function BrandCarousel() {
  // Ajusta estos paths a tus imágenes en public/img/
    const logos = [
        '/img/amd-ryzen-1.svg',
        '/img/aorus-1.svg',
        '/img/intel-6.svg',
        '/img/lenovo-2.svg',
        '/img/logitech-2-1.svg',
        '/img/nvidia.svg',
        '/img/apple-13.svg',
        '/img/samsung-8.svg',
    ];

  // Duplicamos el array para que el scroll sea continuo
    const trackLogos = [...logos, ...logos, ...logos];

    return (
        <div className="brand-carousel py-5">
        <div className="brand-track">
            {trackLogos.map((src, idx) => (
            <div className="brand-item" key={idx}>
                <img src={src} alt="" />
            </div>
            ))}
        </div>
        </div>
    );
}
