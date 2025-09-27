import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cart/CartContext";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function CartSummary({ hideButton = false }) {
  const { getTotal, cartItems } = useCart();
  const total = getTotal();

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemText = totalItemCount > 1 ? 'itens' : 'item';

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6 top-24">
      <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        Resumo do Pedido
      </h2>
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-text-muted">Subtotal ({totalItemCount} {itemText})</span>
          <span className="font-semibold">R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Frete</span>
          <span className="font-semibold text-success">Grátis</span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-xl border-t border-gray-200 dark:border-gray-700 pt-4">
        <span>Total</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      {!hideButton && (
        <Link to="/checkout">
          <Button size="large" className="w-full mt-6" icon={<ArrowRight size={20} />}>
            Finalizar Compra
          </Button>
        </Link>
      )}
    </div>
  );
}