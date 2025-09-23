import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../../contexts/product/ProductContext";
import { CartContext } from "../../contexts/cart/CartContext";
import Button from "../../components/ui/Button";
import { ShoppingCart, ArrowLeft, Tag } from "lucide-react";
import image from "../../assets/logo.jpg"; // Imagem placeholder

export default function ProductDetails() {
  const { productId } = useParams(); // Pega o ID da URL (ex: /products/3)
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  // Simula a busca do produto. Em um projeto real, isso seria uma chamada de API.
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Produto não encontrado!</h2>
        <Link to="/">
          <Button variant="outline" className="mt-4">
            <ArrowLeft size={18} className="mr-2" />
            Voltar para o Catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text py-12">
      <div className="container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-2 text-primary mb-8 hover:underline">
          <ArrowLeft size={18} />
          Voltar para o catálogo
        </Link>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Imagem do Produto */}
          <div className="bg-surface p-6 rounded-lg shadow-md">
            <img
              src={image} // Usar product.imageUrl em um caso real
              alt={product.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Detalhes do Produto */}
          <div>
            <span className="text-sm uppercase text-text-muted">{product.category || "Programação"}</span>
            <h1 className="text-4xl font-bold my-3">{product.title}</h1>
            <p className="text-xl text-text-muted mb-6">{product.author}</p>
            <p className="text-lg leading-relaxed mb-6">
              {product.description || "Descrição detalhada do livro, abordando os principais tópicos, público-alvo e o que o leitor aprenderá ao final da leitura."}
            </p>
            <div className="flex items-center gap-3 mb-8">
              <Tag size={24} className="text-primary" />
              <p className="text-3xl font-bold text-primary">R$ {product.price.toFixed(2)}</p>
            </div>
            <Button
              onClick={() => addToCart(product)}
              className="w-full md:w-auto px-8 py-3 text-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}