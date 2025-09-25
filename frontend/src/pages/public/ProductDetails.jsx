import { useParams, Link } from "react-router-dom";
import { mockProducts } from "../../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id, 10); // garante número
  const product = mockProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold mb-2">Produto não encontrado!</h1>
        <p className="text-gray-400 mb-6">
          O livro que você procura não existe ou foi removido.
        </p>
        <Link
          to="/products"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Voltar ao Catálogo
        </Link>
      </div>
    );
  }

  const lowestPrice = Math.min(...product.formats.map((f) => f.price));

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Imagem */}
      <div className="flex justify-center">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.title}
          className="rounded-lg shadow-lg max-h-[400px] object-contain"
        />
      </div>

      {/* Detalhes */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-500 mb-2">Autor: {product.author}</p>
        <span className="text-yellow-400 font-semibold mb-4">
          ⭐ {product.rating}
        </span>
        <p className="text-gray-700 mb-6">{product.description}</p>

        <div className="mb-6">
          <span className="text-2xl font-bold text-primary">
            R$ {lowestPrice.toFixed(2)}
          </span>
        </div>

        {/* Formatos */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Formatos disponíveis:</h2>
          <ul className="space-y-2">
            {product.formats.map((f) => (
              <li
                key={f.sku}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <span>{f.type}</span>
                <span className="font-bold">R$ {f.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <button className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
