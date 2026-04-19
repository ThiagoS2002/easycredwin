import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CheckoutModal from "@/components/CheckoutModal";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const products = [
    {
      id: "1",
      title: "Checklist 30 Dias – Crédito Fácil para Negativado",
      description: "PDF de 18 páginas com checklist diário.",
      price: 7.9,
    },
    {
      id: "2",
      title: "Guia Completo Empréstimo para Negativado 2026",
      description: "Lista atualizada dos melhores lugares que aprovam negativados.",
      price: 9.9,
    },
    {
      id: "3",
      title: "Renda Extra em Casa 2026 – 10 Formas Reais",
      description: "Comece a ganhar dinheiro extra ainda esta semana.",
      price: 19.9,
    },
    {
      id: "4",
      title: "Método Score 700+ em 30 Dias",
      description: "Aumente seu score rápido e grátis.",
      price: 29.9,
    },
    {
      id: "5",
      title: "Pacote EasyCred Premium – Crédito + Renda Extra",
      description: "Tudo que você precisa em um só lugar.",
      price: 67.9,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* 🔥 EM ALTA */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <h2 className="text-xl font-bold mb-6">
          🔥 EM ALTA – Alta Demanda
        </h2>

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

      {/* 🔥 TODOS OS PRODUTOS */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-xl font-bold mb-6">
          📦 Todos os Produtos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={() => setSelectedProduct(product)}
            />
          ))}
        </div>
      </section>

      {/* 🔥 CTA FINAL */}
      <section className="max-w-4xl mx-auto px-4 mt-16 mb-20 text-center">
        <div className="bg-green-900/20 border border-green-500 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">
            Pacote completo por apenas R$ 67,90
          </h2>
          <p className="mb-6 text-gray-300">
            Receba todos os materiais + atualizações vitalícias.
          </p>

          <button
            onClick={() => setSelectedProduct(products[4])}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold"
          >
            Quero o Pacote Premium
          </button>
        </div>
      </section>

      {/* 🔥 MODAL */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}