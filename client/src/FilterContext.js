import { createContext, useState } from 'react';

export const FilterContext = createContext(null);

export function FilterProvider({ children }) {
    const [search,   setSearch]   = useState('');
    const [maxPrice, setMaxPrice] = useState(Infinity);

    return (
        <FilterContext.Provider value={{
        search, setSearch,
        maxPrice, setMaxPrice
        }}>
        {children}
        </FilterContext.Provider>
    );
}
