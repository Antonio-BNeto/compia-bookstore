import { FaFilter } from 'react-icons/fa';
import  "../../styles/FilterSidebar.css";
import FilterSection from './FilterSection';

const filterOptions = {
    categories: ['Machine Learning', 'Programação', 'Algoritmos', 'Deep Learning', 'Ciência de Dados'],
    formats: ['Livro Físico', 'E-book', 'Físico + E-book'],
    priceRanges: [
        { label: 'Até R$ 50', value: '0-50' },
        { label: 'R$ 50 - R$ 100', value: '50-100' },
        { label: 'R$ 100 - R$ 200', value: '100-200' },
        { label: 'Acima de R$ 300', value: '300-9999' },
    ],
    authors: ['Robert C. Martin', 'François Chollet', 'Andrew Hunt', 'Aurélien Géron', 'Thomas H. Cormen'],
    ratings: [
        { label: '★★★★★ 5 estrelas ou mais', value: 5 },
        { label: '★★★★☆ 4 estrelas ou mais', value: 4 },
        { label: '★★★☆☆ 3 estrelas ou mais', value: 3 },
    ],
};

const FilterSidebar = ({ filters, setFilters }) => {

    // Sua função genérica para múltipla seleção. Está perfeita.
    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => {
            const currentValues = prevFilters[filterName] || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(item => item !== value)
                : [...currentValues, value];
            return { ...prevFilters, [filterName]: newValues };
        });
    };

    return (
        <aside className="filter-sidebar">
            <h3><FaFilter /> Filtros</h3>

            {/* Seção de Categorias */}
            <FilterSection title='Categorias' className="filter-section">
                {filterOptions.categories.map(category => (
                    <div key={category} className="filter-option">
                        <input
                            type="checkbox" id={category}
                            checked={filters.categories?.includes(category) || false}
                            onChange={() => handleFilterChange('categories', category)}
                        />
                        <label htmlFor={category}>{category}</label>
                    </div>
                ))}
            </FilterSection>

            {/* ADICIONADO: Seção de Formato */}
            <FilterSection title="Formato" className="filter-section">
                {filterOptions.formats.map(format => (
                    <div key={format} className="filter-option">
                        <input
                            type="checkbox" id={format}
                            checked={filters.formats?.includes(format) || false}
                            onChange={() => handleFilterChange('formats', format)}
                        />
                        <label htmlFor={format}>{format}</label>
                    </div>
                ))}
            </FilterSection>

            {/* ADICIONADO: Seção de Preço */}
            <FilterSection title="Faixa de Preços" className="filter-section">
                {filterOptions.priceRanges.map(range => (
                    <div key={range.value} className="filter-option">
                        <input
                            type="checkbox" id={range.value}
                            checked={filters.priceRanges?.includes(range.value) || false}
                            onChange={() => handleFilterChange('priceRanges', range.value)}
                        />
                        <label htmlFor={range.value}>{range.label}</label>
                    </div>
                ))}
            </FilterSection>

            {/* ADICIONADO: Seção de Autores */}
            <FilterSection title='Autores' className="filter-section">
                {filterOptions.authors.map(author => (
                    <div key={author} className="filter-option">
                        <input
                            type="checkbox" id={author}
                            checked={filters.authors?.includes(author) || false}
                            onChange={() => handleFilterChange('authors', author)}
                        />
                        <label htmlFor={author}>{author}</label>
                    </div>
                ))}
            </FilterSection>

            {/* ADICIONADO: Seção de Avaliação */}
            <FilterSection title='Avaliação' className="filter-section">
                {filterOptions.ratings.map(rating => (
                    <div key={rating.value} className="filter-option">
                        <input
                            type="checkbox" id={`rating-${rating.value}`}
                            checked={filters.ratings?.includes(rating.value) || false}
                            onChange={() => handleFilterChange('ratings', rating.value)}
                        />
                        <label htmlFor={`rating-${rating.value}`}>{rating.label}</label>
                    </div>
                ))}
            </FilterSection>
        </aside>
    );
};

export default FilterSidebar;