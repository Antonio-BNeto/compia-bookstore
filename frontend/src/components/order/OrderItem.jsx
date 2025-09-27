import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import OrderSummary from './OrderSummary'; // Importa o componente de resumo

export default function OrderItem({ order }) {
  const [isOpen, setIsOpen] = useState(false);

  // Calcula o total do pedido para exibir no cabeçalho
  const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Função auxiliar para definir a cor do status do pedido
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'Enviado':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'Entregue':
        return 'bg-success/10 text-success';
      case 'Cancelado':
        return 'bg-error/10 text-error';
      default:
        return 'bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col md:flex-row md:items-center md:gap-6">
          <div>
            <p className="font-bold text-lg">Pedido #{order.id}</p>
            <p className="text-sm text-text-muted">
              Realizado em: {new Date(order.date).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)} mt-2 md:mt-0`}>
            {order.status}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg text-primary hidden sm:inline">
            R$ {orderTotal.toFixed(2)}
          </span>
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-gray-100 dark:border-gray-800">
          <h4 className="font-semibold mb-2">Itens do Pedido:</h4>
          <div className="space-y-3">
            {order.items.map(item => (
              <div key={item.sku} className="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-800 pb-2 last:border-b-0">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-10 h-14 object-cover rounded"/>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-text-muted">Qtd: {item.quantity} | {item.type}</p>
                  </div>
                </div>
                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <OrderSummary order={order} />
        </div>
      )}
    </div>
  );
}