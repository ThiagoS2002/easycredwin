import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CheckoutModal from "@/components/CheckoutModal";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  isHighlight?: boolean;
  isFeatured?: boolean;
};

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: "1",
      title: "Checklist 30 Dias – Crédito Fácil para Negativado",
      description: "PDF de 18 páginas com checklist diário.",
      price: 7.9,
      isHighlight: true,
    },
    {
      id: "2",
      title: "Guia Completo Empréstimo para Negativado 2026",
      description: "Lista atualizada dos melhores lugares que aprovam negativados.",
      price: 9.9,
      isHighlight: true,
    },
    {
      id: "3",
      title: "Renda Extra em Casa 2026 – 10 Formas Reais",
      description: "Comece a ganhar dinheiro extra ainda esta semana.",
      price: 19.9,
      isHighlight: true,
    },
    {
      id: "4",
      title: "Método Score 700+ em 30 Dias",
      description: "Aumente seu score rápido e grátis.",
      price: 29.9,
      isHighlight: true,
    },
    {
      id: "5",
      title: "Pacote EasyCred Premium – Crédito + Renda Extra",
      description: "Tudo que você precisa em um só lugar.",
      price: 67.9,
      isFeatured: true,
    },
    {
      id: "6",
      title: "Mini Curso Consignado para Negativado",
      description: "Aprenda como conseguir crédito consignado.",
      price: 14.9,
    },
    {
      id: "7",
      title: "Planilha Controle Financeiro + Bônus",
      description: "Controle total da sua renda e gastos.",
      price: 12.9,
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* HERO */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">
          EasyCred – <span className="text-green-400">Crédito Fácil</span>,
          Dinheiro na Conta e <span className="text-green-400">Renda Extra</span>
        </h1>
        <p className="text-gray-400">
          Métodos testados para ganhar dinheiro e conseguir crédito.
        </p>
      </section>

      {/* PRODUTOS EM ALTA */}
      <section className="px-6 mb-16">
        <h2 className="text-xl font-bold mb-6">🔥 EM ALTA – Alta Demanda</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </section>

      {/* TODOS OS PRODUTOS */}
      <section className="px-6 mb-20">
        <h2 className="text-xl font-bold mb-6 text-center">
          Catálogo Completo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-20">
        <div className="bg-green-900/20 border border-green-500 p-8 rounded-xl max-w-xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            Pacote completo por apenas R$67,90
          </h3>
          <p className="text-gray-400 mb-6">
            Tudo que você precisa em um só lugar para começar hoje.
          </p>
          <button
            onClick={() => setSelectedProduct(products[4])}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-bold"
          >
            Quero o Pacote Premium
          </button>
        </div>
      </section>

      {/* CHECKOUT */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}