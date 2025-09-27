import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function PaymentForm({ onSubmit }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvv) {
      setError('Preencha todos os campos.');
      return;
    }
    if (onSubmit) onSubmit({ cardNumber, expiry, cvv });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <Input label="Número do cartão" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
      <Input label="Validade" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
      <Input label="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} required />

      {error && <p className="text-error text-center">{error}</p>}

      <Button type="submit" className="w-full">Pagar</Button>
    </form>
  );
}
