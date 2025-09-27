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

  const handleZipChange = async (e) => {
    const zip = e.target.value.replace(/\D/g, '');
    setZipCode(zip);

    if (zip.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${zip}/json/`);
        const data = await res.json();
        if (data.erro) {
          setError('CEP não encontrado.');
          setNeighborhood('');
          setCity('');
          setState('');
        } else {
          setNeighborhood(data.bairro || '');
          setCity(data.localidade || '');
          setState(data.uf || '');
          setStreet(data.logradouro || '');
          setError('');
        }
      } catch {
        setError('Erro ao consultar CEP.');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!street || !number || !neighborhood || !city || !state || !zipCode) {
      setError('Preencha todos os campos.');
      return;
    }
    const deliveryAddress = { street, number, neighborhood, city, state, zipCode };
    if (onSubmit) onSubmit(deliveryAddress);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="CEP" value={zipCode} onChange={handleZipChange} required />
      <Input label="Rua" value={street} onChange={(e) => setStreet(e.target.value)} required />
      <Input label="Número" value={number} onChange={(e) => setNumber(e.target.value)} required />
      <Input label="Bairro" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} required />
      <Input label="Cidade" value={city} onChange={(e) => setCity(e.target.value)} required />
      <Input label="Estado" value={state} onChange={(e) => setState(e.target.value)} required />

      {error && <p className="text-error text-center">{error}</p>}

      <Button type="submit" className="w-full">Salvar Endereço</Button>
    </form>
  );
}
