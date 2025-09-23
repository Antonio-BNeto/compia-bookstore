import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./shared/components/Loader";
import { ProtectedRoute } from "./shared/router/ProtectedRoute";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Páginas públicas
const HomePage = lazy(() => import("./pages/public/Home"));
const ProductDetailsPage = lazy(() => import("./pages/public/ProductDetails"));
const CartPage = lazy(() => import("./pages/public/Cart"));
const CheckoutPage = lazy(() => import("./pages/public/Checkout"));
const OrdersPage = lazy(() => import("./pages/public/Orders"));
const ProductsPage = lazy(() => import("./pages/public/Products")); // <- nova página

// Páginas de autenticação
const LoginPage = lazy(() => import("./pages/auth/Login"));
const RegisterPage = lazy(() => import("./pages/auth/Register"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPassword"));

// Páginas admin
const DashboardPage = lazy(() => import("./pages/admin/Dashboard"));
const AdminProductsPage = lazy(() => import("./pages/admin/Products"));
const AdminOrdersPage = lazy(() => import("./pages/admin/Orders"));
const CustomersPage = lazy(() => import("./pages/admin/Customers"));
const UsersPage = lazy(() => import("./pages/admin/Users"));

// Compartilhadas
const NotFoundPage = lazy(() => import("./shared/components/NotFound"));

export default function RoutesWrapper() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* Rotas públicas */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/orders" element={<OrdersPage />} />

            {/* Página de produtos - precisa estar logado */}
            <Route element={<ProtectedRoute />}>
              <Route path="/products" element={<ProductsPage />} />
            </Route>
          </Route>

          {/* Rotas de autenticação */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          {/* Rotas protegidas (admin) */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<DashboardPage />} />
              <Route path="/admin/products" element={<AdminProductsPage />} />
              <Route path="/admin/orders" element={<AdminOrdersPage />} />
              <Route path="/admin/customers" element={<CustomersPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
            </Route>
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
