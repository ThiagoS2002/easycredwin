import { useState } from "react";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import CheckoutModal from "@/components/CheckoutModal";
import type { Product } from "../../../drizzle/schema";
import {
  Flame, TrendingUp, CheckCircle2, Star, ShieldCheck, Zap,
  MessageCircle, RefreshCw, DollarSign, Clock, ChevronDown, ChevronUp,
  BadgeCheck, Users, Award
} from "lucide-react";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const products = [
  {
    id: "1",
    title: "Checklist 30 Dias – Crédito Fácil para Negativado",
    description: "PDF de 18 páginas com checklist diário.",
    price: 7.9,
    isHighlight: true,
    isFeatured: false,
  },
  {
    id: "2",
    title: "Guia Completo Empréstimo para Negativado 2026",
    description: "Lista atualizada dos melhores lugares que aprovam negativados.",
    price: 9.9,
    isHighlight: true,
    isFeatured: true,
  },
  {
    id: "3",
    title: "Renda Extra em Casa 2026 – 10 Formas Reais",
    description: "Comece a ganhar dinheiro extra ainda esta semana.",
    price: 19.9,
    isHighlight: true,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Método Score 700+ em 30 Dias",
    description: "Aumente seu score rápido e grátis.",
    price: 29.9,
    isHighlight: false,
    isFeatured: true,
  },
  {
    id: "5",
    title: "Pacote EasyCred Premium – Crédito + Renda Extra",
    description: "Tudo que você precisa em um só lugar.",
    price: 67.9,
    isHighlight: false,
    isFeatured: true,
  },
];