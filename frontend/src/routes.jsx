import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./shared/components/Loader";
import { ProtectedRoute } from "./shared/router/ProtectedRoute";

import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

const Home = lazy(() => import("./pages/public/Home"));
const ProductDetails = lazy(() => import("./pages/public/ProductDetail"));
const Cart = lazy(() => import("./pages/public/Cart"));
const Checkout = lazy(() => import("./pages/public/Checkout"));
const Orders = lazy(() => import("./pages/public/Orders"));
const Products = lazy(() => import("./pages/public/Products"));
const Account = lazy(() => import("./pages/public/Account"));

const Login = lazy(() => import("./pages/auth/Login"));

const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/admin/Products"));
const AdminOrders = lazy(() => import("./pages/admin/Orders"));
const Customers = lazy(() => import("./pages/admin/Customers"));

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
            
            {/* Checkout aberto (sem login obrigatório) */}
            <Route path="/checkout" element={<Checkout />} />

            {/* Orders protegido (só logado) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/orders" element={<Orders />} />
              <Route path="/account" element={<Account />} />
            </Route>
          </Route>

          {/* === ROTAS DE AUTENTICAÇÃO === */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>

          {/* === ROTAS PROTEGIDAS (ADMIN) === */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<Customers />} />
            </Route>
          </Route>

          {/* === PÁGINA 404 === */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
