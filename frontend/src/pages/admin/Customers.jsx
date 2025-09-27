import { useMemo } from 'react';
import { useUsers } from '../../contexts/user/UserContext';
import { Link } from 'react-router-dom';

export default function Customers() {
  const { users, loading } = useUsers();
  
  const customers = useMemo(() => {
    return users.filter(user => user.role === 'user');
  }, [users]);

  if (loading) return <div>Carregando clientes...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Clientes Cadastrados</h1>
      <div className="bg-surface rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Nome do Cliente</th>
              <th className="p-4 font-semibold">Username</th>
              <th className="p-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map(customer => (
                <tr key={customer.id} className="border-t">
                  <td className="p-4 font-mono text-sm">{customer.id}</td>
                  <td className="p-4 font-medium">{customer.name}</td>
                  <td className="p-4 text-text-muted">{customer.username}</td>
                  <td className="p-4">
                    <Link to={`/admin/orders?customerId=${customer.id}`} className="text-primary hover:underline text-sm">Ver pedidos</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center p-8 text-text-muted">Nenhum cliente encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}