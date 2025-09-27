import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/cart/CartContext";
import Button from "../ui/Button";
import { ArrowRight } from "lucide-react";

export default function CartSummary({ hideButton = false, address }) {
  const { getTotal, cartItems } = useCart();
  const total = getTotal();

  const [shipping, setShipping] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemText = totalItemCount > 1 ? "itens" : "item";

  useEffect(() => {
    async function fetchShipping() {
      if (!address?.zipCode) return;

      const unmaskedZip = address.zipCode.replace(/\D/g, "");
      if (unmaskedZip.length !== 8) return;

      try {
        setLoading(true);

        const response = await fetch("http://localhost:8080/api/v1/shipping", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: {
              postal_code: unmaskedZip,
            },
          }),
        });

        if (!response.ok) throw new Error("Erro ao calcular frete");

        const data = await response.json();

        // supondo que API retorna { price: 12.5 }
        setShipping(data.price ?? 0);
      } catch (error) {
        console.error(error);
        setShipping(0);
      } finally {
        setLoading(false);
      }
    }

    fetchShipping();
  }, [address]);

  const finalTotal = total + shipping;

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6 sticky top-24">
      <h2 className="text-2xl font-bold border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        Resumo do Pedido
      </h2>
      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-text-muted">
            Subtotal ({totalItemCount} {itemText})
          </span>
          <span className="font-semibold">R$ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-muted">Frete</span>
          <span className="font-semibold text-success">
            {loading ? "Calculando..." : `R$ ${shipping.toFixed(2)}`}
          </span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-xl border-t border-gray-200 dark:border-gray-700 pt-4">
        <span>Total</span>
        <span>R$ {finalTotal.toFixed(2)}</span>
      </div>

      {!hideButton && (
        <Link to="/checkout">
          <Button
            size="large"
            className="w-full mt-6"
            icon={<ArrowRight size={20} />}
          >
            Finalizar Compra
          </Button>
        </Link>
      )}
    </div>
  );
}
