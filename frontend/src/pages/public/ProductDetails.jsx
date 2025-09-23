import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../../contexts/product/ProductContext";
import { CartContext } from "../../contexts/cart/CartContext";
import Button from "../../components/ui/Button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import image from "../../assets/logo.jpg"; // Placeholder caso não tenha imagem

export default function ProductDetails() {
  const { productId } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

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
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary mb-8 hover:underline"
        >
          <ArrowLeft size={18} />
          Voltar para o catálogo
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Imagem */}
          <div className="bg-surface p-6 rounded-lg shadow-md">
            <img
              src={product.image || image}
              alt={product.title}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Detalhes */}
          <div>
            <span className="text-sm uppercase text-text-muted">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold my-3">{product.title}</h1>
            <p className="text-xl text-text-muted mb-6">{product.author}</p>
            <p className="text-lg leading-relaxed mb-6">{product.description}</p>

            {/* Lista de formatos */}
            <div className="space-y-4">
              {product.formats.map((format) => (
                <div
                  key={format.sku}
                  className="flex items-center justify-between p-4 border rounded-lg bg-surface"
                >
                  <div>
                    <p className="font-semibold">{format.type}</p>
                    <p className="text-primary font-bold text-lg">
                      R$ {format.price.toFixed(2)}
                    </p>
                    {format.stock !== null && (
                      <p className="text-sm text-text-muted">
                        {format.stock > 0
                          ? `Estoque: ${format.stock}`
                          : "Sem estoque"}
                      </p>
                    )}
                  </div>

                  <Button
                    disabled={format.stock === 0}
                    onClick={() => addToCart({ ...product, chosenFormat: format })}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    {format.stock === 0 ? "Indisponível" : "Adicionar"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
