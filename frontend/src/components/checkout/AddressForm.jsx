import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Loader2 } from 'lucide-react';

export default function AddressForm({ onAddressChange }) {
  const [address, setAddress] = useState({
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const [loadingCep, setLoadingCep] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleZipChange = async (e) => {
    let zip = e.target.value.replace(/\D/g, '');
    zip = zip.replace(/(\d{5})(\d)/, '$1-$2');
    zip = zip.slice(0, 9);

    setAddress(prev => ({ ...prev, zipCode: zip }));

    const unmaskedZip = zip.replace(/\D/g, '');
    if (unmaskedZip.length === 8) {
      setLoadingCep(true);
      setError('');
      try {
        const res = await fetch(`https://viacep.com.br/ws/${unmaskedZip}/json/`);
        const data = await res.json();
        if (data.erro) {
          setError('CEP não encontrado.');
          setAddress(prev => ({
            ...prev,
            street: '',
            neighborhood: '',
            city: '',
            state: ''
          }));
        } else {
          setAddress(prev => ({
            ...prev,
            street: data.logradouro || '',
            neighborhood: data.bairro || '',
            city: data.localidade || '',
            state: data.uf || '',
          }));
        }
      } catch {
        setError('Erro ao consultar CEP.');
      } finally {
        setLoadingCep(false);
      }
    }
  };

  // 🔑 Sempre que o address mudar e o CEP for válido, envia para o pai
  useEffect(() => {
    const unmaskedZip = address.zipCode.replace(/\D/g, '');
    if (unmaskedZip.length === 8 && onAddressChange) {
      onAddressChange(address);
    }
  }, [address, onAddressChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { street, number, neighborhood, city, state, zipCode } = address;
    if (!street || !number || !neighborhood || !city || !state || !zipCode) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    
    if (onAddressChange) onAddressChange(address);
    alert("Endereço confirmado com sucesso!");
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-6">Endereço de Entrega</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Linha 1: CEP e Bairro */}
          <Input 
            label="CEP" 
            name="zipCode" 
            value={address.zipCode} 
            onChange={handleZipChange} 
            placeholder="00000-000"
            required 
            maxLength={9}
            icon={loadingCep ? <Loader2 size={18} className="animate-spin" /> : null}
          />
          <Input 
            label="Bairro" 
            name="neighborhood" 
            value={address.neighborhood} 
            onChange={handleChange} 
            placeholder="Ex: Centro"
            required 
          />

          {/* Linha 2: Rua e Número */}
          <Input 
            label="Rua" 
            name="street" 
            value={address.street} 
            onChange={handleChange} 
            placeholder="Ex: Av. Floriano Peixoto"
            required 
          />
          <Input 
            label="Número" 
            name="number" 
            value={address.number} 
            onChange={handleChange} 
            placeholder="Ex: 123"
            required 
          />

          {/* Linha 3: Cidade e Estado */}
          <Input 
            label="Cidade" 
            name="city" 
            value={address.city} 
            onChange={handleChange} 
            placeholder="Ex: Campina Grande"
            required 
          />
          <Input 
            label="Estado" 
            name="state" 
            value={address.state} 
            onChange={handleChange} 
            placeholder="Ex: PB"
            required 
          />

          {/* Linha 4: Complemento */}
          <div className="md:col-span-2">
            <Input 
              label="Complemento (Opcional)" 
              name="complement" 
              value={address.complement} 
              onChange={handleChange} 
              placeholder="Ex: Apto 101, Bloco B"
            />
          </div>
        </div>

        {error && <p className="text-error text-center pt-4">{error}</p>}

        <Button type="submit" className="w-full mt-6">Confirmar Endereço</Button>
      </form>
    </div>
  );
}