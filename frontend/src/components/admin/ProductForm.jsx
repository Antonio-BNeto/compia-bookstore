import { useState, useEffect } from 'react';
import { useProducts } from '../../contexts/product/ProductContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function ProductForm({ productToEdit, onSuccess }) {
  const { addProduct, updateProduct } = useProducts();
  
  const [product, setProduct] = useState({
    title: '', author: '', description: '', category: '', image: '',
    formats: [{ sku: '', type: 'Físico', price: 0, stock: 0 }],
  });
  
  const isEditing = Boolean(productToEdit);

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFormatChange = (index, e) => {
    const { name, value } = e.target;
    const newFormats = [...product.formats];
    newFormats[index][name] = value;
    setProduct(prev => ({ ...prev, formats: newFormats }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(productToEdit.id, product);
      alert('Produto atualizado com sucesso!');
    } else {
      addProduct(product);
      alert('Produto criado com sucesso!');
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Título" name="title" value={product.title} onChange={handleChange} required />
      <Input label="Autor" name="author" value={product.author} onChange={handleChange} required />
      <Input label="Categoria" name="category" value={product.category} onChange={handleChange} required />
      <Input label="Caminho da Imagem" name="image" value={product.image} onChange={handleChange} placeholder="/assets/books/nome.jpg" required />
      
      <h3 className="text-lg font-semibold pt-4 border-t mt-4">Formatos</h3>
      {product.formats.map((format, index) => (
          <div key={index} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-md">
              <Input label="SKU" name="sku" value={format.sku} onChange={(e) => handleFormatChange(index, e)} />
              <Input label="Tipo" name="type" value={format.type} onChange={(e) => handleFormatChange(index, e)} />
              <Input label="Preço" name="price" type="number" value={format.price} onChange={(e) => handleFormatChange(index, e)} />
              <Input label="Estoque" name="stock" type="number" value={format.stock ?? ''} onChange={(e) => handleFormatChange(index, e)} />
          </div>
      ))}
      <Button type="submit" className="w-full !mt-6">{isEditing ? 'Salvar Alterações' : 'Criar Produto'}</Button>
    </form>
  );
}