// src/components/products/ProductFilter.jsx
export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  author,
  setAuthor,
  type,
  setType,
  authorsAvailable,
  typesAvailable
}) {
  const categories = [
    "all",
    "Programação",
    "Inteligência Artificial",
    "Banco de Dados",
    "Segurança da Informação",
    "Design (UI/UX)",
    "Redes e Infraestrutura",
    "Desenvolvimento Web",
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Busca */}
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-lg bg-surface text-text"
      />

      {/* Categoria */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded-lg bg-surface text-text"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c === "all" ? "Todas as categorias" : c}
          </option>
        ))}
      </select>

      {/* Faixa de Preço */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min R$"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-1/2 p-2 border rounded-lg bg-surface text-text"
        />
        <input
          type="number"
          placeholder="Max R$"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-1/2 p-2 border rounded-lg bg-surface text-text"
        />
      </div>

      {/* Autor */}
      <select
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="p-2 border rounded-lg bg-surface text-text"
      >
        <option value="all">Todos os autores</option>
        {authorsAvailable.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>

      {/* Tipo do Livro */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="p-2 border rounded-lg bg-surface text-text"
      >
        <option value="all">Todos os tipos</option>
        {typesAvailable.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
}
