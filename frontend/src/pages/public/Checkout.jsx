import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../contexts/cart/CartContext';
import { useOrders } from '../../contexts/order/OrderContext';

import AddressForm from '../../components/checkout/AddressForm';
import PaymentForm from '../../components/checkout/PaymentForm';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/ui/Button';

export default function CheckoutPage() {
  const { cartItems, clearCart, getTotal } = useCart();
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
    criarPreferenciaPagamentoTeste()
    clearCart();


    alert("Pedido realizado com sucesso!");
    navigate("/orders"); 
  };

  async function criarPreferenciaPagamentoTeste() {
    
    const ENDPOINT_URL = "http://localhost:8080/api/v1/payments";
    const totalAleatorio = getTotal() // Valor entre R$ 50.99 e R$ 250.99

    const requestBody = {
        userId: 999, // ID Fictício
        totalAmount: totalAleatorio, // Total calculado aleatoriamente
        payer: {
            name: "João Testador Aleatório",
            email: `teste${Math.floor(Math.random() * 1000)}@exemplo.com` 
        },
        backUrls: {
            success: "http://localhost:5173/checkout/success",
            pending: "http://localhost:5173/checkout/pending",
            failure: "http://localhost:5173/checkout/failure"
        },
        deliveryAddress: {
            street: "Rua das Flores",
            zipCode: "88000000",
            city: "Florianópolis",
            state: "SC",
            neighborhood: "Centro",
            number: String(Math.floor(Math.random() * 500) + 10) // Número aleatório
        },
        items: [
            {
                id: "ITEM-A-77",
                title: "Produto de Teste (Notebook)",
                description: "Item para verificar a transação MP",
                quantity: 1,
                unitPrice: totalAleatorio - 1.00 // Preço unitário ajustado
            },
            {
                id: "ITEM-FRETE",
                title: "Custo de Envio",
                description: "Frete Aleatório",
                quantity: 1,
                unitPrice: 1.00 // Valor simbólico de frete
            }
        ]
    };

    try {
        console.log("Enviando requisição de preferência de pagamento...");
        
        const response = await fetch(ENDPOINT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro HTTP ${response.status}: ${errorText}`);
        }

        const mpData = await response.json();
        
        console.log("Preferência de Pagamento Criada com Sucesso!");
        console.log("Dados do Mercado Pago (init_point, id):", mpData);
        
        let paymentLink = mpData["redirectUrl"]; 
        console.log("o link aqui: " + paymentLink)
        window.open(paymentLink, '_blank'); 

    } catch (error) {
        console.error("Falha na criação da preferência de pagamento:", error);
        return null;
    }
}


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