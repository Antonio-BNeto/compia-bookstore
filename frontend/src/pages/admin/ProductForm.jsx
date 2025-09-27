import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/product/ProductContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function ProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useProducts();
  
  const [product, setProduct] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    rating: 0,
    image: '',
    formats: [{ sku: '', type: 'Físico', price: 0, stock: 0 }],
  });
  
  const isEditing = Boolean(productId);

  useEffect(() => {
    if (isEditing) {
      const existingProduct = products.find(p => p.id === parseInt(productId));
      if (existingProduct) {
        setProduct(existingProduct);
      }
    }
  }, [productId, products, isEditing]);

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
      updateProduct(parseInt(productId), product);
      alert('Produto atualizado com sucesso!');
    } else {
      addProduct(product);
      alert('Produto criado com sucesso!');
    }
    navigate('/admin/products');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h1>
      <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-lg shadow-sm space-y-4">
        <Input label="Título" name="title" value={product.title} onChange={handleChange} required />
        <Input label="Autor" name="author" value={product.author} onChange={handleChange} required />
        <Input label="Categoria" name="category" value={product.category} onChange={handleChange} required />
        <Input label="Caminho da Imagem" name="image" value={product.image} onChange={handleChange} placeholder="/assets/books/nome-arquivo.jpg" required />
        
        <h3 className="text-lg font-semibold pt-4 border-t mt-4">Formatos</h3>
        {product.formats.map((format, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-md">
                <Input label="SKU" name="sku" value={format.sku} onChange={(e) => handleFormatChange(index, e)} />
                <Input label="Tipo" name="type" value={format.type} onChange={(e) => handleFormatChange(index, e)} />
                <Input label="Preço" name="price" type="number" value={format.price} onChange={(e) => handleFormatChange(index, e)} />
                <Input label="Estoque" name="stock" type="number" value={format.stock} onChange={(e) => handleFormatChange(index, e)} />
            </div>
        ))}

        <Button type="submit" className="w-full">{isEditing ? 'Salvar Alterações' : 'Criar Produto'}</Button>
      </form>
    </div>
  );
}