import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/AuthContext";
import { ProductContext } from "../../contexts/product/ProductContext";
import Button from "../../components/ui/Button";
import Modal from "../../components/ui/Modal";
import LoginForm from "../../components/auth/LoginForm";

import {
  BookOpen, Code, Brain, ArrowRight, Star, Users, ThumbsUp, ShoppingCart
} from "lucide-react";
import image from "../../assets/logo.jpg";

export default function Home() {
  const { user, logout } = useAuth();
  const { products } = useContext(ProductContext);
  const navigate = useNavigate();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginSuccess = (loggedInUser) => {
    setIsLoginModalOpen(false);
    if (loggedInUser.role === "admin") {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
              Domine o Futuro da <span className="text-primary">Tecnologia</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-text-muted mb-8 leading-relaxed">
              Livros especializados em programação, algoritmos,
              inteligência artificial e muito mais. Conteúdo de
              qualidade para estudantes e profissionais.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm">
                <Users size={16} />
                Editor como Usuário
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs sm:text-sm">
                <Star size={16} />
                Editor como Admin
              </span>
            </div>

            {/* Login e Ações */}
            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
                >
                  Entrar na Plataforma
                  <ArrowRight size={20} />
                </Button>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
                  >
                    Criar Conta
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-surface rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 max-w-md">
                <p className="text-base sm:text-lg font-semibold mb-2">
                  Bem-vindo, {user.name}!
                </p>
                <p className="text-sm sm:text-base text-text-muted mb-4">
                  Você está logado como{" "}
                  <span className="text-primary font-bold">{user.role}</span>
                </p>
                <Button onClick={logout} className="w-full">
                  Sair da Conta
                </Button>
              </div>
            )}
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative max-w-md">
              <img
                src={image}
                alt="Tecnologia e Conhecimento"
                className="hidden md:block w-full h-auto rounded-2xl shadow-2xl transform rotate-2 transition-transform duration-700 hover:rotate-0"
              />
              <div className="hidden md:block absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl -z-10 blur-xl opacity-70"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface border-t border-gray-200 dark:border-gray-700 py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-12">
            Por que escolher nossa plataforma?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Conteúdo Especializado</h3>
              <p className="text-sm sm:text-base text-text-muted">
                Livros técnicos escritos por especialistas em tecnologia e programação.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-success" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Aprendizado Prático</h3>
              <p className="text-sm sm:text-base text-text-muted">
                Exemplos reais e exercícios para consolidar seu conhecimento.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-accent" size={28} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">Tecnologia de Ponta</h3>
              <p className="text-sm sm:text-base text-text-muted">
                Conteúdo atualizado com as últimas tendências em IA e desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Produtos */}
      <section className="py-12 sm:py-16 container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">Destaques da Semana</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="bg-surface rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg sm:text-xl font-semibold">{p.title}</h3>
              <p className="text-sm sm:text-base text-text-muted">{p.author}</p>
              <p className="mt-2 font-bold">R$ {p.price}</p>
              <Button className="mt-4 flex items-center gap-2 text-sm sm:text-base">
                <ShoppingCart size={18} /> Comprar
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-surface py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 sm:mb-12">O que dizem nossos leitores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ana", text: "Amei os livros, conteúdo muito bem explicado!" },
              { name: "Carlos", text: "Me ajudou a passar em concursos de TI." },
              { name: "Beatriz", text: "Plataforma incrível, super recomendo!" },
            ].map((d, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <ThumbsUp size={24} className="text-primary mx-auto mb-4" />
                <p className="italic mb-2 text-sm sm:text-base">"{d.text}"</p>
                <p className="font-semibold text-sm sm:text-base">{d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-12 sm:py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Pronto para dominar a tecnologia?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes e profissionais que já estão transformando suas carreiras.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                variant="secondary"
                className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg"
              >
                Começar Agora
              </Button>
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                variant="outline"
                className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg border-white text-white hover:bg-white hover:text-primary"
              >
                Acesso Admin
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Login */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Acesse sua Conta"
      >
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        <p className="text-center text-xs sm:text-sm mt-4 text-text-muted">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            onClick={() => setIsLoginModalOpen(false)}
            className="font-semibold text-primary hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </Modal>
    </div>
  );
}
