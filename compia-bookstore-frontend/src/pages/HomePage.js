import { useState, useMemo } from "react";
import FilterSideBar from "../components/catalog/FilterSideBar";
import ProductCard from "../components/catalog/ProductCard";
import { mockProducts } from "../data/mockProducts"; 
import '../styles/HomePage.css';

function HomePage() {

    const [filters, setFilters] = useState({
        formats: [],
        priceRanges: [],
        authors: [],
        ratings: []
    })

    const filteredProducts = useMemo(()=> {
        return mockProducts.filter(product => {
            const formatMatch = filters.formats.length === 0 || filters.formats.include(product.formats)
            const authorMatch = filters.authors.length === 0 || filters.authors(product.author)
            
            const priceMatch = filters.priceRanges.length === 0 || filters.priceRanges.some(range => {
                const [min, max] = range.split('-').map(Number);
                return product.price >= min && product.price <= max;
            });

            const ratingMatch = filters.ratings.length === 0 || filters.ratings.some(minRating => product.rating >= minRating)

            return formatMatch && authorMatch && priceMatch && ratingMatch
        })
    }, [filters]);

    return (
        <div className="home-container grid">
            <FilterSideBar filters={filters} setFilters={setFilters}/>
            <main className="catalog-content">
                <h1 className="home-title">{filteredProducts.length} Produtos Encontrados</h1>
                <div className="catalog-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            product={product}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default HomePage;