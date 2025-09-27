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
    const zip = e.target.value.replace(/\D/g, ''); // remove qualquer caractere que não seja número
    setZipCode(zip);

    if (zip.length === 8) { // CEP completo
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
    setError('');

    if (!street || !number || !neighborhood || !city || !state || !zipCode) {
      setError('Preencha todos os campos.');
      return;
    }

    const deliveryAddress = { street, number, neighborhood, city, state, zipCode };

    if (onSubmit) {
      onSubmit(deliveryAddress);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="CEP"
        type="text"
        placeholder="Digite seu CEP"
        value={zipCode}
        onChange={handleZipChange}
        required
      />
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
        placeholder="Bairro"
        value={neighborhood}
        onChange={(e) => setNeighborhood(e.target.value)}
        required
      />
      <Input
        label="Cidade"
        type="text"
        placeholder="Cidade"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <Input
        label="Estado"
        type="text"
        placeholder="Estado"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />

      {error && <p className="text-sm text-error text-center -my-2">{error}</p>}

      <Button type="submit" className="w-full text-lg py-3">
        Finalizar Compra
      </Button>
    </form>
  );
}
