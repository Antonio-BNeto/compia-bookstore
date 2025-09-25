import { useState } from 'react';
import { useAuth } from '../../contexts/auth/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Mail, Lock } from 'lucide-react';

import { mockUsers } from '../../data/users';

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const foundUser = mockUsers.find(
      (user) => user.username.toLowerCase() === username.toLowerCase() && user.password === password
    );

    if (foundUser) {
      login(foundUser);
      // Se a função de callback foi fornecida, chame-a
      if (onLoginSuccess) {
        onLoginSuccess(foundUser);
      }
    } else {
      setError('Usuário ou senha inválidos.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input
        label="Usuário"
        type="text"
        placeholder="Digite seu usuário"
        icon={<Mail size={20} className="text-text-muted" />}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        error={error}
      />
      <Input
        label="Senha"
        type="password"
        placeholder="Sua senha"
        icon={<Lock size={20} className="text-text-muted" />}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      {error && <p className="text-sm text-error text-center -my-2">{error}</p>}

      <Button type="submit" className="w-full text-lg py-3">
        Entrar
      </Button>
    </form>
  );
}