import React, { useState } from 'react';

export default price = ({ products }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
    };

    const applyPriceFilter = () => {
        const filteredProducts = products.filter((product) => {
            const price = parseFloat(product.price); // Replace 'price' with the actual key for price in your product data
            return (
                (!minPrice || price >= parseFloat(minPrice)) &&
                (!maxPrice || price <= parseFloat(maxPrice))
            );
        });
        setFilteredProducts(filteredProducts);
    };

    const resetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setFilteredProducts(products);
    };

    return (
        <div>
            <label>
                Min Price:
                <input type="number" value={minPrice} onChange={handleMinPriceChange} />
            </label>
            <label>
                Max Price:
                <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
            </label>
            <button onClick={applyPriceFilter}>Apply Filter</button>
            <button onClick={resetFilters}>Reset Filters</button>

            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

