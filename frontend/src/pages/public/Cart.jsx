import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart/CartContext";
import Button from "../../components/ui/Button";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, getTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-text-muted mb-4" />
        <h1 className="text-3xl font-bold mb-2">Seu carrinho está vazio</h1>
        <p className="text-text-muted mb-6">Adicione livros do nosso catálogo para começar.</p>
        <Link to="/">
          <Button>Ver Catálogo</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Meu Carrinho</h1>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Lista de Itens */}
          <div className="lg:col-span-2 bg-surface rounded-lg shadow-sm p-6 space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.author}</p>
                  <p className="font-bold text-primary mt-1">R$ {item.price.toFixed(2)}</p>
                </div>
                <Button onClick={() => removeFromCart(item.id)} variant="ghost" size="icon">
                  <Trash2 size={20} className="text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="bg-surface rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-2xl font-bold border-b pb-4 mb-4">Resumo</h2>
            <div className="flex justify-between mb-2">
              <span className="text-text-muted">Subtotal</span>
              <span className="font-semibold">R$ {getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-text-muted">Frete</span>
              <span className="font-semibold">Grátis</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-4">
              <span>Total</span>
              <span>R$ {getTotal().toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button className="w-full mt-6 text-lg py-3 flex items-center justify-center gap-2">
                Finalizar Compra <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}