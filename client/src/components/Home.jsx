import './Home.css';
import { useNavigate } from 'react-router-dom';
import BrandCarousel from './BrandCarousel';
import VideosSection from './VideosSection';
import Footer from './Footer';



export default function Home() {
    const navigate = useNavigate();
    const heroStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/img/fondo1.jpg)`,
    backgroundSize:   'cover',
    backgroundPosition: 'center',
    height:           '80vh',
    position:         'relative',
    alignItems:       'center',
    justifyContent:   'center',
    color:            '#fff',
    };

    return (
        <>
        <section className="hero" style={heroStyle}>
            <div className="hero-content">
            <h1 className="hero-title">Bienvenido a TechXtreme</h1>
            <p className="hero-subtitle">
                Estamos a la vanguardia en tecnología. Explora nuestro catálogo
                de productos innovadores y de alto rendimiento.
            </p>
            <button
                className="btn btn-outline-info hero-btn"
                onClick={() => navigate('/productos')}
            >
                Ver Productos
            </button>
            </div>
        </section>

        <section className="features text-center">
            <div className="container-flex">
            <div className="row gy-4">
                <div className="col-md-4">
                <i className="bi bi-speedometer2 feature-icon"></i>
                <h4>Alto Rendimiento</h4>
                <p>Componentes optimizados para máxima velocidad y eficiencia.</p>
                </div>
                <div className="col-md-4">
                <i className="bi bi-shield-lock feature-icon"></i>
                <h4>Seguridad</h4>
                <p>Encriptación y protocolos de última generación para tu tranquilidad.</p>
                </div>
                <div className="col-md-4">
                <i className="bi bi-cloud-upload feature-icon"></i>
                <h4>Conectividad</h4>
                <p>Soluciones en la nube y sincronización en tiempo real.</p>
                </div>
            </div>
            </div>
            </section>
            {/* Carrusel de marcas */}
            <BrandCarousel />
            <VideosSection />
            {/* Footer */}
            <Footer />
        </>
    );
}
