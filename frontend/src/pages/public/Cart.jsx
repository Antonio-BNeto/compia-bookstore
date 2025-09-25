import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cart/CartContext";
import Button from "../../components/ui/Button";
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus } from "lucide-react";

export default function Cart() {
  const { cartItems, removeFromCart, getTotal, increaseQuantity, decreaseQuantity, clearCart } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center flex flex-col items-center">
        <ShoppingBag size={64} className="mx-auto text-text-muted mb-4" />
        <h1 className="text-3xl font-bold mb-2">Seu carrinho está vazio</h1>
        <p className="text-text-muted mb-6 max-w-md">
          Explore nosso catálogo para encontrar sua próxima leitura!
        </p>
        <Link to="/products">
          <Button size="large">Ver todos os produtos</Button>
        </Link>
      </div>
    );
  }

  // Cenário 2: Carrinho com itens
  return (
    <div className="min-h-screen bg-bg text-text py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Meu Carrinho</h1>
          <Button
            onClick={clearCart}
            variant="outline"
            className="mt-4 md:mt-0"
            icon={<Trash2 size={16} />}
          >
            Esvaziar Carrinho
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Lista de Itens */}
          <div className="lg:col-span-2 bg-surface rounded-lg shadow-sm p-6 space-y-6">
            {cartItems.map((item) => (
              <div key={item.sku} className="flex items-start sm:items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-36 object-cover rounded-md hidden sm:block"
                />
                <div className="flex-grow flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-text-muted">{item.author}</p>
                    <p className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full inline-block mt-2">
                      {item.type}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Controle de Quantidade */}
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <Button
                        onClick={() => decreaseQuantity(item.sku)}
                        size="icon"
                        variant="ghost"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </Button>
                      <span className="px-3 font-semibold">{item.quantity}</span>
                      <Button
                        onClick={() => increaseQuantity(item.sku)}
                        size="icon"
                        variant="ghost"
                      >
                        <Plus size={16} />
                      </Button>
                    </div>

                    <p className="font-bold text-lg w-24 text-right">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Remover item */}
                    <Button
                      onClick={() => removeFromCart(item.sku)}
                      variant="ghost"
                      size="icon"
                      className="text-error hover:bg-error/10"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
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
              <Button
                size="large"
                className="w-full mt-6 text-lg py-3 flex items-center justify-center gap-2"
              >
                Finalizar Compra <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
