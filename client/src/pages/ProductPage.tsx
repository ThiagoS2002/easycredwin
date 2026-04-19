import { useState } from "react";
import { useRoute, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import CheckoutModal from "@/components/CheckoutModal";
import type { Product } from "../../../drizzle/schema";
import {
  CheckCircle2, ArrowLeft, ShoppingCart, ShieldCheck,
  Clock, Star, Zap, MessageCircle, Lock
} from "lucide-react";

export default function ProductPage() {
  const [, params] = useRoute("/produto/:slug");
  const slug = params?.slug ?? "";
  const [showCheckout, setShowCheckout] = useState(false);

  const { data: product, isLoading, error } = trpc.products.getBySlug.useQuery(
    { slug },
    { enabled: !!slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="text-muted-foreground">Produto não encontrado.</p>
          <Link href="/" className="text-primary hover:underline text-sm flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Voltar para a loja
          </Link>
        </div>
      </div>
    );
  }

  const price = Number(product.price);
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
  const features = (product.features as string[]) ?? [];
  const savings = originalPrice ? originalPrice - price : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          {/* Breadcrumb */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Voltar para a loja
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left: Details */}
            <div className="lg:col-span-3 space-y-6">
              {/* Badge */}
              {product.badge && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-xs font-bold text-primary">
                  <Zap className="w-3 h-3" />
                  {product.badge}
                </span>
              )}

              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-snug">
                  {product.title}
                </h1>
                <p className="mt-2 text-muted-foreground">{product.shortDescription}</p>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  <span className="text-foreground font-semibold">4.9</span>
                  <span className="text-muted-foreground">(+9.284 avaliações)</span>
                </div>
              </div>

              {/* What you receive */}
              <div>
                <h2 className="text-base font-bold text-foreground mb-4">O que você recebe:</h2>
                <ul className="space-y-3">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, label: "Garantia 7 dias" },
                  { icon: <Clock className="w-4 h-4" />, label: "Entrega imediata" },
                  { icon: <Lock className="w-4 h-4" />, label: "Pagamento seguro" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-white/8 bg-card text-center">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Purchase box */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 rounded-xl border border-white/10 bg-card p-6 space-y-5">
                {/* Price */}
                <div>
                  {originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground line-through">
                        R$ {originalPrice.toFixed(2).replace(".", ",")}
                      </span>
                      {savings && (
                        <span className="text-xs font-bold text-red-400 bg-red-500/15 px-2 py-0.5 rounded-full">
                          Economia de R$ {savings.toFixed(2).replace(".", ",")}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="text-4xl font-extrabold text-foreground">
                    R$ {price.toFixed(2).replace(".", ",")}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Pagamento único • Acesso imediato</p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3.5 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors text-base shadow-lg shadow-primary/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Comprar Agora
                </button>

                {/* Trust signals */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  {[
                    { icon: <ShieldCheck className="w-3.5 h-3.5 text-primary" />, text: "Garantia incondicional de 7 dias" },
                    { icon: <Zap className="w-3.5 h-3.5 text-primary" />, text: "Entrega automática em menos de 60s" },
                    { icon: <Lock className="w-3.5 h-3.5 text-primary" />, text: "Pagamento 100% seguro via Mercado Pago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      {item.icon}
                      {item.text}
                    </div>
                  ))}
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/5521981672064"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 flex items-center justify-center gap-2 border border-white/10 hover:bg-white/5 text-muted-foreground font-medium rounded-lg transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-primary" />
                  Dúvidas? Fale no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showCheckout && (
        <CheckoutModal
          product={product as Product}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}
