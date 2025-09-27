import { useState } from 'react';
import { useProducts } from '../../contexts/product/ProductContext';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ProductForm from '../../components/admin/ProductForm';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export default function AdminProducts() {
  const { products, loading, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (productId, productTitle) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${productTitle}"?`)) {
      deleteProduct(productId);
    }
  };

  const handleOpenNewModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };
  
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  if (loading) return <div>Carregando produtos...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Produtos</h1>
        <Button onClick={handleOpenNewModal} icon={<PlusCircle size={18} />}>Adicionar Produto</Button>
      </div>
      <div className="bg-surface rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-00">
            <tr>
              <th className="p-4 font-semibold">Produto</th>
              <th className="p-4 font-semibold">Categoria</th>
              <th className="p-4 font-semibold">Estoque (Físico)</th>
              <th className="p-4 font-semibold">Preço (Físico)</th>
              <th className="p-4 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              const physicalFormat = product.formats.find(f => f.type === 'Físico') || {};
              return (
                <tr key={product.id} className="border-t">
                  <td className="p-4 flex items-center gap-4">
                    <img src={product.image} alt={product.title} className="w-12 h-16 object-cover rounded"/>
                    <div>
                        <p className="font-medium">{product.title}</p>
                        <p className="text-sm text-text-muted">{product.author}</p>
                    </div>
                  </td>
                  <td className="p-4 text-text-muted">{product.category}</td>
                  <td className="p-4">{physicalFormat.stock ?? 'N/A'}</td>
                  <td className="p-4">R$ {physicalFormat.price?.toFixed(2) ?? 'N/A'}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button onClick={() => handleOpenEditModal(product)} variant="outline" size="icon" title="Editar"><Edit size={16} /></Button>
                      <Button onClick={() => handleDelete(product.id, product.title)} variant="destructive" size="icon" title="Excluir"><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title={editingProduct ? 'Editar Produto' : 'Adicionar Produto'}>
        <ProductForm productToEdit={editingProduct} onSuccess={handleModalClose} />
      </Modal>
    </div>
  );
}