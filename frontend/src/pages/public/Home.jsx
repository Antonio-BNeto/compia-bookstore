import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/AuthContext";
import { BookOpen, Code, Brain, ArrowRight, Star, Users } from "lucide-react";
import image from "../../assets/logo.jpg"; // Ajuste o caminho conforme necessário

export default function Home() {
  const { user, login, logout } = useAuth();

  return (
    <div className="min-h-screen bg-bg text-text">
      
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Domine o Futuro da <span className="text-primary">Tecnologia</span>
            </h1>

            <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed">
              Livros especializados em programação, algoritmos,
              inteligência artificial e muito mais. Conteúdo de
              qualidade para estudantes e profissionais.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                <Users size={16} />
                Editor como Usuário
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm">
                <Star size={16} />
                Editor como Admin
              </span>
            </div>

            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => login("user")}
                  className="flex items-center gap-2 px-8 py-3 text-lg"
                >
                  Entrar como Usuário
                  <ArrowRight size={20} />
                </Button>
                <Button
                  onClick={() => login("admin")}
                  variant="outline"
                  className="flex items-center gap-2 px-8 py-3 text-lg"
                >
                  Entrar como Admin
                  <ArrowRight size={20} />
                </Button>
              </div>
            ) : (
              <div className="bg-surface rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 max-w-md">
                <p className="text-lg font-semibold mb-2">
                  Bem-vindo, {user.name}!
                </p>
                <p className="text-text-muted mb-4">
                  Você está logado como <span className="text-primary">{user.role}</span>
                </p>
                <Button onClick={logout} className="w-full">
                  Sair da Conta
                </Button>
              </div>
            )}
          </div>

          {/* Image Content */}
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
      <section className="bg-surface border-t border-gray-200 dark:border-gray-700 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Por que escolher nossa plataforma?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Conteúdo Especializado</h3>
              <p className="text-text-muted">
                Livros técnicos escritos por especialistas em tecnologia e programação.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-success" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Aprendizado Prático</h3>
              <p className="text-text-muted">
                Exemplos reais e exercícios para consolidar seu conhecimento.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Tecnologia de Ponta</h3>
              <p className="text-text-muted">
                Conteúdo atualizado com as últimas tendências em IA e desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para dominar a tecnologia?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Junte-se a milhares de estudantes e profissionais que já estão transformando suas carreiras.
          </p>
          {!user && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => login("user")}
                variant="secondary"
                className="px-8 py-3 text-lg"
              >
                Começar Agora
              </Button>
              <Button
                onClick={() => login("admin")}
                variant="outline"
                className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary"
              >
                Acesso Admin
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}