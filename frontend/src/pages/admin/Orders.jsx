import { useOrders } from '../../contexts/order/OrderContext';

export default function AdminOrders() {
  const { orders, loading, updateOrderStatus } = useOrders();
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pendente': return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'Enviado': return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'Entregue': return 'bg-success/10 text-success';
      case 'Cancelado': return 'bg-error/10 text-error';
      default: return 'bg-gray-100 dark:bg-gray-800';
    }
  };
  
  if (loading) return <div>Carregando pedidos...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gerenciar Pedidos</h1>
      <div className="bg-surface rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-4 font-semibold">Pedido ID</th>
              <th className="p-4 font-semibold">Data</th>
              <th className="p-4 font-semibold">Cliente</th>
              <th className="p-4 font-semibold">Total</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Mudar Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.sort((a,b) => b.id - a.id).map(order => {
              const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
              return (
                <tr key={order.id} className="border-t">
                  <td className="p-4 font-mono text-sm text-primary">#{order.id}</td>
                  <td className="p-4">{new Date(order.date).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4 font-semibold">R$ {total.toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(order.status)}`}>{order.status}</span>
                  </td>
                  <td className="p-4">
                    <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)} className="p-2 border rounded-lg bg-surface">
                      <option>Pendente</option><option>Enviado</option><option>Entregue</option><option>Cancelado</option>
                    </select>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}