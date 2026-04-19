import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CheckoutModal from "@/components/CheckoutModal";
import type { Product } from "../../../drizzle/schema";
import {
  Flame,
  TrendingUp,
  Star,
  ShieldCheck,
  Zap,
  MessageCircle,
  RefreshCw,
  DollarSign,
  Clock,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  Users,
  Award,
} from "lucide-react";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const products = [
    {
      id: "1",
      slug: "checklist-30-dias",
      title: "Checklist 30 Dias – Crédito Fácil para Negativado",
      shortDescription: "O primeiro passo mais barato e rápido do Brasil.",
      description: "PDF de 18 páginas com checklist diário.",
      price: 7.9,
      originalPrice: null,
      features: [
        "PDF de 18 páginas com checklist diário",
        "12 apps e sites que aprovam negativados em 2026",
        "Modelos de mensagem para falar com o atendente",
        "Tabela comparativa de taxas",
      ],
      badge: "MAIS BARATO",
      isHighlight: true,
      isFeatured: false,
    },
    {
      id: "2",
      slug: "guia-emprestimo-negativado-2026",
      title: "Guia Completo Empréstimo para Negativado 2026",
      shortDescription: "O guia mais vendido do EasyCred.",
      description: "Lista atualizada dos melhores lugares que aprovam negativados.",
      price: 9.9,
      originalPrice: null,
      features: [
        "Lista atualizada dos 12 melhores lugares que aprovam negativados",
        "Passo a passo para cada um",
        "Documentos necessários e o que falar no atendimento",
        "Dicas para aumentar a chance de aprovação em até 3x",
        "Bônus com opções extras",
      ],
      badge: "MAIS VENDIDO",
      isHighlight: true,
      isFeatured: true,
    },
    {
      id: "3",
      slug: "renda-extra-casa-2026",
      title: "Renda Extra em Casa 2026 – 10 Formas Reais",
      shortDescription: "Comece a ganhar dinheiro extra ainda esta semana.",
      description: "10 métodos testados para gerar renda extra.",
      price: 19.9,
      originalPrice: null,
      features: [
        "10 métodos testados",
        "Lista de sites que realmente pagam no Brasil em 2026",
        "Planilha pronta de controle de ganhos",
        "Passo a passo para cada forma",
      ],
      badge: "EM ALTA",
      isHighlight: true,
      isFeatured: true,
    },
    {
      id: "4",
      slug: "metodo-score-700-30-dias",
      title: "Método Score 700+ em 30 Dias",
      shortDescription: "Aumente seu score rápido e grátis.",
      description: "Estratégia prática para subir score e limpar nome.",
      price: 29.9,
      originalPrice: null,
      features: [
        "Estratégia completa com Cadastro Positivo + Open Finance",
        "Dicas que fazem o score subir na hora",
        "Checklist diário de 30 dias",
        "Macetes que os bancos não contam",
      ],
      badge: "POPULAR",
      isHighlight: false,
      isFeatured: true,
    },
    {
      id: "5",
      slug: "pacote-premium",
      title: "Pacote EasyCred Premium – Crédito + Renda Extra",
      shortDescription: "Tudo que você precisa em um só lugar.",
      description: "Pacote completo com economia e acesso imediato.",
      price: 67.9,
      originalPrice: 114.9,
      features: [
        "Guia Empréstimo Negativado",
        "Mini-Curso Consignado",
        "Método Score 700+",
        "Renda Extra 2026",
        "Checklist 30 Dias",
        "Atualizações incluídas",
      ],
      badge: "MELHOR OFERTA",
      isHighlight: true,
      isFeatured: true,
    },
  ] as unknown as Product[];

  const highlightProducts = products.filter((p) => p.isHighlight);
  const featuredProducts = products.filter((p) => p.isFeatured);

  const benefits = [
    {
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Conteúdo 100% Atualizado",
      desc: "Todo material é revisado mensalmente. Março 2026 – todas as informações verificadas e testadas.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Métodos Testados em Comunidades Reais",
      desc: "Testados em comunidades reais do Serasa, WhatsApp e grupos de negativados.",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Entrega Automática em 60 Segundos",
      desc: "Entrega automática pelo site em menos de 60 segundos após o pagamento.",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Suporte via WhatsApp",
      desc: "Atendimento humano via WhatsApp para tirar todas as suas dúvidas.",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "Preços Acessíveis",
      desc: "A partir de R$ 7,90. Conteúdo de qualidade que cabe no seu bolso.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Garantia Incondicional de 7 Dias",
      desc: "Se não gostar, devolvemos 100% do valor. Sem perguntas.",
    },
  ];

  const faqs = [
    {
      q: "O conteúdo é atualizado?",
      a: "Sim. Todo material é revisado mensalmente. Você sempre terá acesso às informações mais recentes sobre crédito, empréstimos e renda extra no Brasil.",
    },
    {
      q: "Como recebo o produto?",
      a: "Automaticamente no próprio site após o pagamento. Em menos de 60 segundos você já tem acesso ao seu material para baixar.",
    },
    {
      q: "Tem garantia?",
      a: "Sim, 7 dias. Se não gostar por qualquer motivo, devolvemos 100% do valor. Sem burocracia, sem perguntas.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        </div>

        <div className="container relative">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
              <Flame className="w-4 h-4 animate-pulse" />
              <span>EM ALTA</span>
              <span className="text-foreground/60 font-normal">•</span>
              <span className="text-foreground/80 font-normal">+9.284 vendas esta semana</span>
              <span className="text-foreground/60 font-normal">•</span>
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                4.9/5
              </span>
            </div>
          </div>

          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight max-w-4xl mx-auto">
            EasyCred – <span className="text-primary">Crédito Fácil</span>, Dinheiro na Conta e{" "}
            <span className="text-primary">Renda Extra</span> Mesmo Negativado
          </h1>

          <p className="mt-6 text-center text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Guias, mini-cursos e métodos comprovados por comunidades reais. Preços a partir de{" "}
            <strong className="text-foreground">R$ 7,90</strong>. Entrega instantânea via e-mail.{" "}
            <strong className="text-primary">+47 mil brasileiros</strong> já saíram do vermelho ou começaram a ganhar dinheiro extra com nossos materiais.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10">
            {[
              { value: "+47 mil", label: "Clientes satisfeitos" },
              { value: "R$ 7,90", label: "A partir de" },
              { value: "60s", label: "Entrega automática" },
              { value: "7 dias", label: "Garantia total" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-extrabold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#catalogo"
              className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              <TrendingUp className="w-5 h-5" />
              Ver Todos os Produtos
            </a>
            <a
              href="https://wa.me/5521981672064"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 border border-white/10 hover:bg-white/5 text-foreground font-semibold rounded-xl transition-colors text-base flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {highlightProducts.length > 0 && (
        <section id="em-alta" className="py-16 border-t border-white/5">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-orange-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">🔥 EM ALTA – Alta Demanda</h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Os produtos que mais estão vendendo agora no EasyCred.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {highlightProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onBuy={setSelectedProduct}
                  featured={product.isFeatured ?? false}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="catalogo" className="py-16 border-t border-white/5">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
              <Award className="w-3.5 h-3.5" />
              CATÁLOGO COMPLETO
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Todos os Nossos Produtos
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
              Escolha o material ideal para sua situação. Do mais acessível ao pacote completo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={setSelectedProduct}
                featured={product.slug === "pacote-premium"}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="por-que" className="py-16 border-t border-white/5 bg-card/30">
        <div className="container">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-3">
              <BadgeCheck className="w-3.5 h-3.5" />
              NOSSA DIFERENÇA
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Por Que EasyCred Funciona
            </h2>
            <p className="mt-2 text-muted-foreground text-sm max-w-xl mx-auto">
              Mais de 47 mil brasileiros já transformaram sua vida financeira com nossos materiais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-white/5 bg-card hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 text-primary">
                  {b.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-xl border border-primary/20 bg-primary/5 text-center">
            <p className="text-lg font-bold text-foreground">
              "Pacote completo por apenas R$ 67,90."
            </p>
            <p className="mt-2 text-sm text-muted-foreground max-w-lg mx-auto">
              Você recebe 5 materiais + atualizações para sempre. Mais de 9 mil alunos já transformaram a vida financeira com esses métodos. Entrega imediata. Garantia de 7 dias.
            </p>
            <button
              onClick={() => {
                const premium = products.find((p) => p.slug === "pacote-premium");
                if (premium) setSelectedProduct(premium);
              }}
              className="mt-4 px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg text-sm transition-colors"
            >
              Quero o Pacote Premium
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 border-t border-white/5">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Perguntas Frequentes
            </h2>
            <p className="mt-2 text-muted-foreground text-sm">
              Tire suas dúvidas antes de comprar.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/8 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="font-semibold text-sm text-foreground pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground mb-3">Ainda tem dúvidas?</p>
            <a
              href="https://wa.me/5521981672064"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary/30 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 mt-auto">
        <div className="container">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-base text-foreground">
                  EasyCred<span className="text-primary">.net</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A melhor plataforma de guias e mini-cursos sobre crédito e renda extra para brasileiros negativados.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-16">
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                  Produtos
                </h4>
                <ul className="space-y-2">
                  {products.slice(0, 4).map((p) => (
                    <li key={p.id}>
                      <a
                        href={`/produto/${p.slug}`}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                      >
                        {p.title.split("–")[0].trim()}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                  Suporte
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://wa.me/5521981672064"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3 h-3" />
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#por-que" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      Por que EasyCred
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2026 EasyCred.net – Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <ShieldCheck className="w-3 h-3 text-primary" />
                Pagamento seguro
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3 text-primary" />
                Entrega imediata
              </span>
            </div>
          </div>
        </div>
      </footer>

      {selectedProduct && (
        <CheckoutModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}