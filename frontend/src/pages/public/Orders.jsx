import { useMemo } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import { useOrders } from '../../contexts/order/OrderContext';
import OrderItem from '../../components/order/OrderItem';
import { Link } from 'react-router';
import Button from '../../components/ui/Button';

export default function Order() {
  const { user } = useAuth();
  const { orders, loading } = useOrders();

  const userOrders = useMemo(() => {
    if (!user || !orders) return [];
    return orders.filter(order => order.userId === user.id)
                 .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, user]);

  if (loading) {
    return <div className="text-center py-16">Carregando seus pedidos...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Meus Pedidos</h1>

      {userOrders.length > 0 ? (
        <div className="space-y-4">
          {userOrders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface rounded-lg">
          <h2 className="text-2xl font-bold">Você ainda não fez nenhum pedido.</h2>
          <p className="text-text-muted mt-2 mb-6">Explore nosso catálogo e encontre sua próxima leitura!</p>
          <Link to="/products">
            <Button size="large">Ver Produtos</Button>
          </Link>
        </div>
      )}
    </div>
  );
}