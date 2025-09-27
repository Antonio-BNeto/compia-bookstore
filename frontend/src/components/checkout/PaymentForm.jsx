import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { CreditCard, Calendar, Lock } from 'lucide-react';

export default function PaymentForm({ onSubmit }) {
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });
  const [error, setError] = useState('');

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = (value.match(/.{1,4}/g) || []).join(' ').slice(0, 19);
    setCardInfo({ ...cardInfo, number: formattedValue });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setCardInfo({ ...cardInfo, expiry: value });
  };
  
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardInfo({ ...cardInfo, cvv: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!cardInfo.number || !cardInfo.name || !cardInfo.expiry || !cardInfo.cvv) {
      setError('Por favor, preencha todos os campos do cartão.');
      return;
    }
  

    if (onSubmit) {
      onSubmit({ method: 'Cartão de Crédito', last4: cardInfo.number.slice(-4) });
    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Nome no Cartão"
          type="text"
          placeholder="Como está escrito no cartão"
          value={cardInfo.name}
          onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
          required
        />
        <Input
          label="Número do Cartão"
          type="text"
          placeholder="0000 0000 0000 0000"
          icon={<CreditCard size={20} className="text-text-muted" />}
          value={cardInfo.number}
          onChange={handleCardNumberChange}
          maxLength={19}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Validade (MM/AA)"
            type="text"
            placeholder="MM/AA"
            icon={<Calendar size={20} className="text-text-muted" />}
            value={cardInfo.expiry}
            onChange={handleExpiryChange}
            maxLength={5}
            required
          />
          <Input
            label="CVV"
            type="text"
            placeholder="123"
            icon={<Lock size={20} className="text-text-muted" />}
            value={cardInfo.cvv}
            onChange={handleCvvChange}
            maxLength={4}
            required
          />
        </div>

        {error && <p className="text-sm text-center text-error">{error}</p>}
        
        <p className="text-xs text-text-muted pt-2 text-center">
            Seus dados de pagamento são processados de forma segura.
        </p>

        <Button type="submit" className="w-full">Confirmar Pagamento</Button>
      </form>
    </div>
  );
}