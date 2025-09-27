import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function AddressForm({ onSubmit }) {
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!street || !number || !neighborhood || !city || !state || !zipCode) {
      setError('Preencha todos os campos.');
      return;
    }

    const deliveryAddress = {
      street,
      number,
      neighborhood,
      city,
      state,
      zipCode
    };

    if (onSubmit) {
      onSubmit(deliveryAddress);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Rua"
        type="text"
        placeholder="Digite sua rua"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required
      />
      <Input
        label="Número"
        type="text"
        placeholder="Número da residência"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        required
      />
      <Input
        label="Bairro"
        type="text"
        placeholder="Digite seu bairro"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
        required
      />
      <Input
        label="Cidade"
        type="text"
        placeholder="Digite sua cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <Input
        label="Estado"
        type="text"
        placeholder="Digite seu estado"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <Input
        label="CEP"
        type="text"
        placeholder="Digite seu CEP"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
      />

      {error && <p className="text-sm text-error text-center -my-2">{error}</p>}

      <Button type="submit" className="w-full text-lg py-3">
        Finalizar Compra
      </Button>
    </form>
  );
}