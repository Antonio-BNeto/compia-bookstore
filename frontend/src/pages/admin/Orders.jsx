import { useContext } from "react";
import { OrderContext } from "../../contexts/order/OrderContext";

export default function OrdersAdmin() {
  const { orders } = useContext(OrderContext);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Pedidos</h1>
      {orders.map((o) => (
        <div key={o.id} className="card mb-4">
          <p>ID: {o.id}</p>
          <p>Status: {o.status}</p>
          <p>Itens: {o.items.length}</p>
        </div>
      ))}
    </div>
  );
}
