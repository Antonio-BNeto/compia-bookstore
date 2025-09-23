import { useState } from "react";
import { useProducts } from "../../contexts/product/useProduct";
import ProductFilters from "../../components/products/ProductFilters";
import ProductList from "../../components/products/ProductList";

export default function Products() {
  const { products } = useProducts();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [author, setAuthor] = useState("all");
  const [type, setType] = useState("all");

  // gera listas únicas para filtros
  const authorsAvailable = [...new Set(products.map((p) => p.author))];
  const typesAvailable = ["Físico", "E-book"]; // já que seu mock sempre tem esses dois

  const filteredProducts = products.filter((p) => {
    // preço mais baixo do produto considerando os formatos
    const prices = p.formats.map((f) => f.price);
    const lowestPrice = Math.min(...prices);

    const matchesSearch = (p.title ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "all" || p.category === category;
    const matchesAuthor = author === "all" || p.author === author;

    const matchesType =
      type === "all" || p.formats.some((f) => f.type === type);

    const matchesMinPrice =
      minPrice === "" || lowestPrice >= parseFloat(minPrice);
    const matchesMaxPrice =
      maxPrice === "" || lowestPrice <= parseFloat(maxPrice);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAuthor &&
      matchesType &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Produtos Disponíveis</h1>

      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        author={author}
        setAuthor={setAuthor}
        type={type}
        setType={setType}
        authorsAvailable={authorsAvailable}
        typesAvailable={typesAvailable}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
}
