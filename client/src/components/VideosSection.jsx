// client/src/components/VideosSection.jsx
import React, { useRef, useEffect, useState, useMemo } from 'react';
import './VideosSection.css';

const videoItems = [
    {
        src: `${process.env.PUBLIC_URL}/videos/video1.mp4`,
        title: 'Omen Gaming Laptop',
        description: 'Descubre el rendimiento del Omen Gaming Laptop en acción.'
    },
    {
        src: `${process.env.PUBLIC_URL}/videos/video2.mp4`,
        title: 'aorus Gaming Monitor',
        description: 'Explora la calidad visual del aorus Gaming Monitor.'
    },
    {
        src: `${process.env.PUBLIC_URL}/videos/video3.mp4`,
        title: 'IPHONE 16 Pro',
        description: 'Experimenta la potencia del nuevo iPhone 16 Pro.'
    },
    ];

    export default function VideosSection() {
    const refs = useRef([]);
    const videoRefs = useRef([]);
    const [visible, setVisible] = useState(
        new Array(videoItems.length + 1).fill(false) // +1 para la intro
    );

    // Memoizamos la lista de secciones para que sea estable
    const sections = useMemo(() => [
        { type: 'intro' },
        ...videoItems.map(item => ({ type: 'video', ...item }))
    ], []);

    useEffect(() => {
        let current = 0;
        const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const idx = Number(entry.target.dataset.idx);
            if (entry.isIntersecting && idx === current) {
            // Revelar sección
            setVisible(v => {
                const copy = [...v];
                copy[idx] = true;
                return copy;
            });
            observer.unobserve(entry.target);
            // Si es vídeo, reproducirlo
            if (sections[idx].type === 'video') {
                const vid = videoRefs.current[idx];
                if (vid) {
                vid.volume = 1;
                vid.play().catch(() => {});
                }
            }
            // Observar siguiente
            current += 1;
            if (refs.current[current]) {
                observer.observe(refs.current[current]);
            }
            }
        });
        }, { threshold: 0.5 });

        // Iniciar observando la intro
        if (refs.current[0]) observer.observe(refs.current[0]);
        return () => observer.disconnect();
    }, [sections]);

    return (
        <div className="videos-section">
        {sections.map((sec, idx) => {
            if (sec.type === 'intro') {
            return (
                <section
                key="intro"
                data-idx={0}
                ref={el => (refs.current[0] = el)}
                className={`video-fullscreen intro fullscreen-sect ${
                    visible[0] ? 'show' : 'hidden'
                }`}
                >
                <div className="container-fluid intro-text">
                    <h2 className="section-title mb-4">Acerca de Nosotros</h2>
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
            } else {
            return (
                <section
                key={idx}
                data-idx={idx}
                ref={el => (refs.current[idx] = el)}
                className={`video-fullscreen ${
                    visible[idx] ? 'show' : 'hidden'
                }`}
                >
                <div className="video-container">
                    <video
                    ref={el => (videoRefs.current[idx] = el)}
                    src={sec.src}
                    controls
                    muted={false}
                    playsInline
                    loop
                    />
                </div>
                <div className="text-container">
                    <h2>{sec.title}</h2>
                    <p>{sec.description}</p>
                </div>
                </section>
            );
            }
        })}
        </div>
    );
}
