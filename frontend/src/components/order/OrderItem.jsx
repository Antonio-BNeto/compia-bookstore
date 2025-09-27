import { MapPin } from 'lucide-react';

export default function OrderSummary({ order }) {
  const total = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-text-muted mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold">Endereço de Entrega</h4>
            <address className="text-sm text-text-muted not-italic">
              {order.deliveryAddress.street}, {order.deliveryAddress.number}
              <br />
              {order.deliveryAddress.neighborhood}, {order.deliveryAddress.city} - {order.deliveryAddress.state}
              <br />
              CEP: {order.deliveryAddress.zipCode}
            </address>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-text-muted">Subtotal</span>
            <span className="font-medium">R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-muted">Frete</span>
            <span className="font-medium text-success">Grátis</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <span>Total Pago</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}