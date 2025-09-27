import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function PaymentForm({ onSubmit }) {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!cardName || !cardNumber || !expiry || !cvv) {
      setError('Preencha todos os campos.');
      return;
    }

    const paymentData = {
      cardName,
      cardNumber,
      expiry,
      cvv,
    };

    if (onSubmit) {
      onSubmit(paymentData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome no cartão"
        type="text"
        placeholder="Nome como está no cartão"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
        required
      />
      <Input
        label="Número do cartão"
        type="text"
        placeholder="0000 0000 0000 0000"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        required
      />
      <div className="flex gap-4">
        <Input
          label="Validade"
          type="text"
          placeholder="MM/AA"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          required
        />
        <Input
          label="CVV"
          type="password"
          placeholder="123"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-error text-center -my-2">{error}</p>}

      <Button type="submit" className="w-full text-lg py-3">
        Pagar
      </Button>
    </form>
  );
}