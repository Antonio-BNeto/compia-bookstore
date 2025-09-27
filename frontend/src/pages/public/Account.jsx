import { useAuth } from "../../contexts/auth/AuthContext";
import Button from "../../components/ui/Button";
import { User, Mail, Shield, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Account() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return <p>Carregando informações da conta...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Minha Conta</h1>
            
            <div className="bg-surface p-6 md:p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                        <User size={48} className="text-primary" />
                    </div>
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-semibold">{user.name}</h2>
                        <p className="text-text-muted">Informações da sua conta</p>
                    </div>
                </div>

                <hr className="my-8 dark:border-gray-700" />

                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <Mail size={20} className="text-text-muted" />
                        <div>
                            <p className="font-semibold">Nome de Usuário</p>
                            <p className="text-text-muted">{user.username}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Shield size={20} className="text-text-muted" />
                        <div>
                            <p className="font-semibold">Perfil de Acesso</p>
                            <p className="text-text-muted capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>

                <hr className="my-8 dark:border-gray-700" />

                <Button 
                    onClick={handleLogout} 
                    variant="destructive"
                    className="w-full"
                    icon={<LogOut size={18}/>}
                >
                    Sair da Conta
                </Button>
            </div>
        </div>
    );
}