import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useOrders } from '../../contexts/order/OrderContext';

import AddressForm from '../../components/checkout/AddressForm';
import PaymentForm from '../../components/checkout/PaymentForm';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/ui/Button';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const handleFinish = () => {
    if (!addressData) {
      alert("Por favor, preencha e confirme seu endereço de entrega.");
      return;
    }
    if (!paymentData) {
      alert("Por favor, confirme os dados de pagamento.");
      return;
    }

    const orderData = { 
      items: cartItems, 
      deliveryAddress: addressData, 
      paymentInfo: paymentData 
    };
  
    placeOrder(orderData);
    clearCart();

    alert("Pedido realizado com sucesso!");
    navigate("/orders"); 
  };

  if (!cartItems || cartItems.length === 0) {
    return (
        <div className="text-center py-16 container mx-auto">
            <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio.</h1>
            <p className="text-text-muted mb-6">Adicione itens ao carrinho antes de prosseguir para o checkout.</p>
            <Link to="/products">
                <Button size="large">Explorar Produtos</Button>
            </Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Finalizar Compra</h1>
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <AddressForm onAddressChange={setAddressData} />
          <PaymentForm onSubmit={setPaymentData} />
        </div>

        <div className="w-full">
            <CartSummary hideButton />
            
            <Button
                onClick={handleFinish}
                size="large"
                className="w-full mt-4"
                disabled={!addressData || !paymentData} 
            >
                Finalizar Pedido e Pagar
            </Button>
        </div>
      </div>
    </div>
  );
}