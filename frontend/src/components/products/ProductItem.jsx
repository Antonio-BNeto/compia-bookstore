import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  const lowestPrice = product.formats?.length
    ? Math.min(...product.formats.map((f) => f.price))
    : 0;

  return (
    <div className="bg-surface rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col">
      <img
        src={product.image || "/placeholder.jpg"}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg"
      />

      <div className="mt-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <p className="text-sm text-text-muted flex-1">{product.description}</p>

        <span className="mt-2 text-primary font-bold text-lg">
          R$ {lowestPrice.toFixed(2)}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="mt-4 inline-block text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ver detalhes
        </Link>
      </div>
    </div>
  );
}
