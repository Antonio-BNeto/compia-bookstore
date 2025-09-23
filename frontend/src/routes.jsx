import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./shared/components/Loader";
import { ProtectedRoute } from "./shared/router/ProtectedRoute";

// Layouts (cria depois com Header/Footer simples)
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

// Páginas públicas
const HomePage = lazy(() => import("./pages/public/Home"));

// Páginas de autenticação
const LoginPage = lazy(() => import("./pages/auth/Login"));

// Páginas admin
const AdminDashboardPage = lazy(() => import("./pages/admin/Dashboard"));

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
          </Route>

          {/* Rotas de autenticação */}
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
          </Route>

          {/* Rotas admin (protegidas) */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
