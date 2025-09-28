import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '../ui/Button';
import FilterSection from './FilterSection';
import Input from '../ui/Input';

export default function ProductFilters({
  search, setSearch,
  selectedCategories, setSelectedCategories,
  selectedAuthors, setSelectedAuthors,
  selectedTypes, setSelectedTypes,
  handleFilterChange,
  priceRange, setPriceRange,
  allCategories,
  allAuthors,
  allTypes,
  clearFilters,
}) {
  const [authorSearch, setAuthorSearch] = useState('');

  const filteredAuthors = allAuthors.filter(author =>
    author.toLowerCase().includes(authorSearch.toLowerCase())
  );

  const priceRanges = [
    { label: 'Qualquer valor', value: '' },
    { label: 'Até R$ 50', value: '0-50' },
    { label: 'R$ 50 a R$ 100', value: '50-100' },
    { label: 'R$ 100 a R$ 150', value: '100-150' },
    { label: 'Acima de R$ 150', value: '150-Infinity' },
  ];

  return (
    <div className="bg-surface p-4 rounded-lg shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Filtros</h2>
        <Button onClick={clearFilters} variant="ghost" size="small">
          Limpar Tudo
        </Button>
      </div>

      <div className='mb-4'>
        <Input
          type="text"
          placeholder="Buscar por título..."
          icon={<Search size={18} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <FilterSection title="Preço">
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.value} className="flex items-center gap-3 cursor-pointer p-1 rounded">
              <input
                type="radio"
                name="priceRange"
                className="h-4 w-4 text-primary focus:ring-primary/50 border-gray-300"
                checked={priceRange === range.value}
                onChange={() => setPriceRange(range.value)}
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Categoria">
        {allCategories.map((category) => (
          <label key={category} className="flex items-center gap-3 cursor-pointer p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              className="h-4 w-4 rounded text-primary focus:ring-primary/50 border-gray-300"
              checked={selectedCategories.includes(category)}
              onChange={() => handleFilterChange(setSelectedCategories, category)}
            />
            <span>{category}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Autor">
        <Input
          type="text"
          placeholder="Buscar autor..."
          value={authorSearch}
          onChange={(e) => setAuthorSearch(e.target.value)}
          className="mb-3"
        />
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {filteredAuthors.map((author) => (
            <label key={author} className="flex items-center gap-3 cursor-pointer p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author)}
                onChange={() => handleFilterChange(setSelectedAuthors, author)}
                className="h-4 w-4 rounded text-primary focus:ring-primary/50 border-gray-300"
              />
              <span>{author}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Formato">
        {allTypes.map((type) => (
          <label key={type} className="flex items-center gap-3 cursor-pointer p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleFilterChange(setSelectedTypes, type)}
              className="h-4 w-4 rounded text-primary focus:ring-primary/50 border-gray-300"
            />
            <span>{type}</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );
}