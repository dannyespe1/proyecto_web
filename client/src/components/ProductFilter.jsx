// src/components/ProductFilter.jsx
import React from 'react';

export default function ProductFilter({ search, setSearch, maxPrice, setMaxPrice }) {
    return (
        <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="filterOffcanvas"
        aria-labelledby="filterOffcanvasLabel"
        >
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="filterOffcanvasLabel">Filtros</h5>
            <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
            />
        </div>
        <div className="offcanvas-body">
            <div className="mb-3">
            <label htmlFor="searchInput" className="form-label">Buscar</label>
            <input
                id="searchInput"
                type="text"
                className="form-control"
                placeholder="Nombre..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="priceRange" className="form-label">
                Precio máximo: {isFinite(maxPrice) ? `$${maxPrice}` : '∞'}
            </label>
            <input
                id="priceRange"
                type="range"
                className="form-range"
                min="0"
                max="100"
                step="1"
                onChange={e => {
                const v = Number(e.target.value);
                setMaxPrice(v === 100 ? Infinity : v);
                }}
            />
            <small className="text-muted d-block">Arrastra para filtrar por precio</small>
            </div>
        </div>
        </div>
    );
}
