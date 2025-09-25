import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../contexts/product/ProductContext"; // 1. USA O CONTEXTO
import { useCart } from "../../contexts/cart/CartContext";
import { CheckCircle, Star, ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts(); // Pega todos os produtos do contexto
  const { addToCart } = useCart();

  // Encontra o produto APÓS os produtos serem carregados pelo contexto
  const product = products.find((p) => p.id === parseInt(id));

  // 2. ESTADO MELHORADO: Armazena o objeto do formato inteiro
  const [selectedFormat, setSelectedFormat] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  // Efeito para definir o formato padrão quando o produto é encontrado
  useEffect(() => {
    if (product) {
      // Prioriza o primeiro formato em estoque, senão o primeiro da lista
      const initialFormat = product.formats.find(f => f.stock !== 0) || product.formats[0];
      setSelectedFormat(initialFormat);
    }
  }, [product]);

  // Função para adicionar ao carrinho
  const handleAddToCart = () => {
    if (!product || !selectedFormat) return;

    const itemToAdd = {
      bookId: product.id,
      title: product.title,
      author: product.author,
      image: product.image,
      sku: selectedFormat.sku,
      type: selectedFormat.type,
      price: selectedFormat.price,
      quantity: 1,
    };
    
    addToCart(itemToAdd);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold mb-2">Produto não encontrado!</h1>
        <p className="text-text-muted mb-6">
          O livro que você procura não existe ou foi removido.
        </p>
        <Button onClick={() => navigate("/products")} icon={<ArrowLeft size={18}/>}>
          Voltar ao Catálogo
        </Button>
      </div>
    );
  }
  
  const isOutOfStock = selectedFormat?.stock === 0;

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8 lg:gap-12">
      {/* Imagem */}
      <div className="flex justify-center items-start">
        <img
          src={product.image || "/placeholder.jpg"}
          alt={product.title}
          className="rounded-lg shadow-lg max-h-[500px] object-contain sticky top-24"
        />
      </div>

      {/* Detalhes */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl lg:text-4xl font-bold">{product.title}</h1>
        <p className="text-lg text-text-muted">por {product.author}</p>
        <div className="flex items-center gap-2">
            <Star className="text-yellow-500" fill="currentColor" />
            <span className="font-bold">{product.rating}</span>
        </div>
        <p className="text-text-muted leading-relaxed">{product.description}</p>

        {/* 3. SELETOR DE FORMATO MELHORADO (com botões e estado de estoque) */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Formatos disponíveis:</h2>
          <div className="flex gap-3 flex-wrap">
            {product.formats.map((format) => (
              <button
                key={format.sku}
                onClick={() => setSelectedFormat(format)}
                disabled={format.stock === 0}
                className={`px-4 py-2 rounded-lg border-2 text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  selectedFormat?.sku === format.sku
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-gray-300 dark:border-gray-700 hover:border-primary"
                }`}
              >
                {format.type} {format.stock === 0 && "(Esgotado)"}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-surface rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="text-3xl font-bold text-primary">
                R$ {selectedFormat?.price.toFixed(2).replace('.', ',')}
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={isAdded || isOutOfStock}
              size="large"
              className="w-full"
            >
              {isAdded ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle size={20} /> Adicionado!
                </span>
              ) : isOutOfStock ? (
                "Produto Esgotado"
              ) : (
                "Adicionar ao Carrinho"
              )}
            </Button>
        </div>
      </div>
    </div>
  );
}