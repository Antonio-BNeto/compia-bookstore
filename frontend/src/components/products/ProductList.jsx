import ProductItem from "./ProductItem";

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p className="text-center text-text-muted">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
}
