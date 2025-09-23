import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useOrders } from '../../contexts/order/OrderContext';
import Button from '../../components/ui/Button';
import { CreditCard, CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    // 1. Usa a função do OrderContext
    placeOrder(cart);

    // 2. Limpa o carrinho usando a função do CartContext
    clearCart();

    // 3. Redireciona para uma página de sucesso ou histórico de pedidos
    alert('Pedido realizado com sucesso!');
    navigate('/orders'); // Supondo que você tenha uma página de pedidos
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto text-center py-16">
          <CheckCircle size={64} className="mx-auto text-success mb-4" />
          <h1 className="text-2xl font-bold">Seu carrinho está vazio.</h1>
          <p className="text-text-muted">Não há nada para finalizar aqui.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Formulários de Endereço e Pagamento (Esquerda) */}
        <div className="md:col-span-2 bg-surface p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Detalhes de Pagamento e Entrega</h2>
            <p className="text-text-muted">
                (Aqui entrariam os componentes AddressForm.jsx e PaymentForm.jsx)
            </p>
        </div>

        {/* Resumo do Pedido (Direita) */}
        <div className="bg-surface p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold border-b pb-4 mb-4">Resumo</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-sm mb-2">
              <span>{item.title} (x{item.qty})</span>
              <span className="font-medium">R$ {(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <Button 
            onClick={handlePlaceOrder} 
            className="w-full mt-6 text-lg py-3 flex items-center justify-center gap-2"
          >
            <CreditCard size={20}/> Pagar e Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
}