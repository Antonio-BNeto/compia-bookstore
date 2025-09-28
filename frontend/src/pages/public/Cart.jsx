import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cart/CartContext";
import Button from "../../components/ui/Button";
import { Trash2, ShoppingBag } from "lucide-react";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

export default function Cart() {
  const { cartItems, clearCart } = useCart();

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
          <div className="lg:col-span-2 bg-surface rounded-lg shadow-sm p-4 md:p-6">
            {cartItems.map((item) => (
              <CartItem key={item.sku} item={item} />
            ))}
          </div>

          <CartSummary />
        </div>
      </div>
    </div>
  );
}