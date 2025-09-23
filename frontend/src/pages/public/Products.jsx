import { useState, useMemo } from 'react';
import ProductFilters from '../../components/products/ProductFilters';
import ProductList from '../../components/products/ProductList';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { Filter } from 'lucide-react';
import { useProducts } from '../../contexts/product/ProductContext';

export default function ProductsPage() {
  const { products } = useProducts();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // --- 1. ESTADOS PARA OS FILTROS ---
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState(''); // Estado de preço atualizado

  // --- 2. LÓGICA PARA EXTRAIR OPÇÕES DE FILTRO DINAMICAMENTE ---
  const allCategories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const allAuthors = useMemo(() => [...new Set(products.map(p => p.author))], [products]);
  const allTypes = useMemo(() => [...new Set(products.flatMap(p => p.formats.map(f => f.type)))], [products]);

  // --- 3. FUNÇÕES AUXILIARES ---
  const handleFilterChange = (setter, value) => {
    setter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setSelectedTypes([]);
    setPriceRange('');
  };

  // --- 4. LÓGICA PARA APLICAR OS FILTROS ---
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const lowestPrice = Math.min(...product.formats.map(f => f.price));

      if (search && !product.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (selectedAuthors.length > 0 && !selectedAuthors.includes(product.author)) return false;
      if (selectedTypes.length > 0 && !product.formats.some(f => selectedTypes.includes(f.type))) return false;
      
      // Lógica de filtro de preço atualizada
      if (priceRange) {
        const [min, maxStr] = priceRange.split('-');
        const minPrice = parseFloat(min);
        const maxPrice = maxStr === 'Infinity' ? Infinity : parseFloat(maxStr);

        if (lowestPrice < minPrice || lowestPrice > maxPrice) {
          return false;
        }
      }

      return true;
    });
  }, [products, search, selectedCategories, selectedAuthors, selectedTypes, priceRange]);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Nosso Catálogo de Livros</h1>

      <div className="lg:hidden mb-6">
        <Button onClick={() => setIsFilterModalOpen(true)} className="w-full" icon={<Filter size={18} />}>
          Mostrar Filtros ({filteredProducts.length} resultados)
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block lg:w-1/4 xl:w-1/5">
          <ProductFilters
            search={search} setSearch={setSearch}
            selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
            selectedAuthors={selectedAuthors} setSelectedAuthors={setSelectedAuthors}
            selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}
            handleFilterChange={handleFilterChange}
            priceRange={priceRange} setPriceRange={setPriceRange}
            allCategories={allCategories}
            allAuthors={allAuthors}
            allTypes={allTypes}
            clearFilters={clearFilters}
          />
        </aside>

        <main className="w-full lg:w-3/4 xl:w-4/5">
          <ProductList products={filteredProducts} />
        </main>
      </div>

      <Modal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} title="Filtrar Produtos">
        <ProductFilters
            search={search} setSearch={setSearch}
            selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}
            selectedAuthors={selectedAuthors} setSelectedAuthors={setSelectedAuthors}
            selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}
            handleFilterChange={handleFilterChange}
            priceRange={priceRange} setPriceRange={setPriceRange}
            allCategories={allCategories}
            allAuthors={allAuthors}
            allTypes={allTypes}
            clearFilters={() => { clearFilters(); setIsFilterModalOpen(false); }}
        />
      </Modal>
    </div>
  );
}