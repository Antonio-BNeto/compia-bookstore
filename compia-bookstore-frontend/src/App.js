import { Routes, Route } from 'react-router-dom';

// Importe o Layout
import Layout from './components/layout/Layout';

// Importe suas páginas
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminDashboardPage from './pages/admin/DashboardPage'; // Exemplo de rota de admin

function App() {
  return (
    <Routes>
        {/* Todas as rotas agora estão dentro de um Layout */}
        <Route path="/" element={<Layout />}>
          {/* A página inicial será renderizada no <Outlet /> do Layout */}
          <Route index element={<HomePage />} />
          
          {/* Outras páginas que usam o mesmo Layout */}
          <Route path="produto/:id" element={<ProductDetailPage />} />
          <Route path="carrinho" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          
          {/* Exemplo de como agrupar rotas de admin */}
          <Route path="admin" element={<AdminDashboardPage />} />
          {/* <Route path="admin/produtos" element={<AdminProductsPage />} /> */}

          {/* Adicione uma rota para "página não encontrada" */}
          <Route path="*" element={<h2>Página não encontrada!</h2>} />
        </Route>
      </Routes>
  );
}

export default App;