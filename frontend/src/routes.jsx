import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./shared/components/Loader";
import { ProtectedRoute } from "./shared/router/ProtectedRoute";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Páginas (sugestão: pode remover o sufixo 'Page' para ficar mais curto)
const Home = lazy(() => import("./pages/public/Home"));
const ProductDetails = lazy(() => import("./pages/public/ProductDetail"));
const Cart = lazy(() => import("./pages/public/Cart"));
const Checkout = lazy(() => import("./pages/public/Checkout"));
const Orders = lazy(() => import("./pages/public/Orders"));
const Products = lazy(() => import("./pages/public/Products"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Users = lazy(() => import("./pages/admin/Users"));

const NotFound = lazy(() => import("./shared/components/NotFound"));

export default function RoutesWrapper() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          {/* === ROTAS PÚBLICAS === */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Rotas que exigem apenas login (qualquer papel) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
          </Route>

          {/* === ROTAS DE AUTENTICAÇÃO === */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* === ROTAS PROTEGIDAS (ADMIN) === */}
          {/* SUGESTÃO: Rotas de admin agrupadas sob um único caminho pai */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* === PÁGINA 404 === */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}