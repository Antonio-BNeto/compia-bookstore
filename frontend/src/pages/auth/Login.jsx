import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    navigate(user.role === "admin" ? "/admin" : "/");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-md p-8 space-y-6 bg-surface rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Acesse sua Conta</h1>
          <p className="text-text-muted mt-2">Bem-vindo de volta!</p>
        </div>

        <LoginForm onLoginSuccess={handleLoginSuccess} />

        <div className="text-sm text-center">
          <Link to="/forgot-password" className="text-primary hover:underline">
            Esqueceu a senha?
          </Link>
        </div>

        <p className="text-center text-text-muted">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
