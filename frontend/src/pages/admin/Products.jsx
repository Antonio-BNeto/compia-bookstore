import { useContext } from "react";
import { ProductContext } from "../../contexts/product/ProductContext";
import Button from "../../components/ui/Button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function Products() {
  const { products } = useContext(ProductContext);

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          Adicionar Produto
        </Button>
      </div>

      {/* Tabela de Produtos */}
      <div className="bg-surface rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="p-4 font-semibold">Título</th>
              <th className="p-4 font-semibold">Autor</th>
              <th className="p-4 font-semibold">Preço</th>
              <th className="p-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-4">{product.title}</td>
                <td className="p-4 text-text-muted">{product.author}</td>
                <td className="p-4 font-mono">R$ {product.price.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit size={16} />
                    </Button>
                    <Button variant="destructive" size="icon">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}