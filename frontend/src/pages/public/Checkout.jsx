import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useOrders } from '../../contexts/order/OrderContext';
import AddressForm from '../../components/checkout/AddressForm';
import PaymentForm from '../../components/checkout/PaymentForm';

export default function Checkout() {
  const { cart = [], total = 0, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);

  const handleFinish = () => {
    if (!cart || cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    if (!address || !payment) {
      alert("Preencha endereço e pagamento antes de finalizar.");
      return;
    }

    const orderData = { cart, total, deliveryAddress: address, payment };
    placeOrder(orderData);
    clearCart();
    alert("Pedido realizado com sucesso!");
    navigate("/orders");
  };

  if (!cart || cart.length === 0) {
    return <p className="text-center py-16">Seu carrinho está vazio.</p>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Finalizar Pedido</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Coluna esquerda */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
          <AddressForm onSubmit={(data) => setAddress(data)} />

          <h2 className="text-xl font-bold mt-8 mb-4">Pagamento</h2>
          <PaymentForm onSubmit={(data) => setPayment(data)} />

          <button
            onClick={handleFinish}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Finalizar Pedido
          </button>
        </div>

        {/* Coluna direita */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>
                {item.title} (x{item.qty})
              </span>
              <span>R$ {(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold mt-4 pt-4 border-t">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
