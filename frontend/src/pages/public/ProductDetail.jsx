import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { mockProducts } from "../../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const product = mockProducts.find((p) => p.id === productId);

  const [selectedFormat, setSelectedFormat] = useState(
    product?.formats[0]?.type || null
  );

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

  const currentFormat = product.formats.find((f) => f.type === selectedFormat);

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

        {/* Preço do formato selecionado */}
        <div className="mb-6">
          <span className="text-2xl font-bold text-primary">
            R$ {currentFormat?.price.toFixed(2)}
          </span>
        </div>

        {/* Formatos como tags */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Formatos disponíveis:</h2>
          <div className="flex gap-3 flex-wrap">
            {product.formats.map((f) => (
              <span
                key={f.sku}
                onClick={() => setSelectedFormat(f.type)}
                className={`px-4 py-2 rounded-full border-2 cursor-pointer text-sm transition ${
                  selectedFormat === f.type
                    ? "bg-primary text-white border-primary"
                    : "bg-black/50 text-white border-gray-300 hover:border-primary"
                }`}
              >
                {f.type}
              </span>
            ))}
          </div>
        </div>

        <button className="mt-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
