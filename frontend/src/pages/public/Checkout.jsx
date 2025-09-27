import { useState, useEffect } from 'react';
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
  const [shippingCost, setShippingCost] = useState(0);

  // 🔹 Calcula o frete sempre que o CEP mudar
  useEffect(() => {
    if (addressData?.cep) {
      calcularFrete(addressData.cep);
    }
  }, [addressData?.cep]);

  const calcularFrete = async (cep) => {
    try {
      // Exemplo simples de regra: frete fixo por região (poderia ser API real)
      const cepNum = parseInt(cep.replace(/\D/g, '')); 

      let valorFrete = 0;
      if (cepNum >= 1000000 && cepNum <= 39999999) {
        valorFrete = 20; // Sudeste
      } else if (cepNum >= 40000000 && cepNum <= 65999999) {
        valorFrete = 30; // Nordeste
      } else if (cepNum >= 66000000 && cepNum <= 69999999) {
        valorFrete = 25; // Norte
      } else {
        valorFrete = 35; // Outras regiões
      }

      setShippingCost(valorFrete);
    } catch (err) {
      console.error("Erro ao calcular frete:", err);
      setShippingCost(0);
    }
  };

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
      paymentInfo: paymentData,
      shippingCost 
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

            {/* 🔹 Mostra o valor do frete */}
            {shippingCost > 0 && (
              <p className="mt-2 text-lg font-semibold">
                Frete: R$ {shippingCost.toFixed(2)}
              </p>
            )}
            
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