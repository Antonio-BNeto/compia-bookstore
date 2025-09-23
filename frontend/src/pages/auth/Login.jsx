import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <button onClick={() => login("user")} className="btn btn-primary">
        Entrar como Usuário
      </button>
      <button onClick={() => login("admin")} className="btn btn-secondary">
        Entrar como Admin
      </button>
    </div>
  );
}
