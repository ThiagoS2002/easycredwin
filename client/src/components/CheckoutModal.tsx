import { useState } from "react";
import { X, ShieldCheck, Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "../../../drizzle/schema";

interface CheckoutModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  if (!product) return null;

  const price = Number(product.price);
  const features = (product.features as string[]) ?? [];

  const paymentLinks: Record<string, string> = {
    "1": "https://mpago.la/1Kprthd",
    "2": "https://mpago.la/2JgdNpa",
    "3": "https://mpago.la/26q7L2i",
    "4": "https://mpago.la/2xJT4MM",
    "5": "https://mpago.la/2v8tw43",
    "6": "https://mpago.la/28DjZDA",
    "7": "https://mpago.la/2dJyXeH",
    "8": "https://mpago.la/2aKZJj8",
    "9": "https://mpago.la/31PsszG",
  };

  const validateEmail = (v: string) => {
    if (!v) return "E-mail é obrigatório";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "E-mail inválido";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const err = validateEmail(email);
    if (err) {
      setEmailError(err);
      return;
    }

    setEmailError("");

    const link = paymentLinks[String(product.id)];

    if (!link) {
      toast.error("Link de pagamento não configurado.");
      return;
    }

    window.location.href = link;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Compra segura</p>
              <p className="text-sm font-semibold text-foreground">Checkout EasyCred</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* INFO PRODUTO */}
        <div className="p-5 bg-primary/5 border-b border-white/5">
          <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
            Você está comprando
          </p>
          <p className="text-sm font-semibold text-foreground leading-snug">
            {product.title}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              {features.length} itens incluídos
            </span>
            <span className="text-xl font-extrabold text-foreground">
              R$ {price.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Seu e-mail <span className="text-primary">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
              placeholder="seu@email.com"
              className={`w-full h-11 px-3 rounded-lg bg-background border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                emailError
                  ? "border-red-500/50 focus:ring-red-500"
                  : "border-white/10"
              }`}
            />
            {emailError && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {emailError}
              </p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              O acesso ao produto será vinculado a este e-mail.
            </p>
          </div>

          <button
            type="submit"
            className="w-full h-12 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors text-sm"
          >
            <Lock className="w-4 h-4" />
            Pagar com Mercado Pago
          </button>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-primary" />
              Pagamento seguro
            </span>
            <span>•</span>
            <span>Garantia de 7 dias</span>
            <span>•</span>
            <span>Entrega imediata</span>
          </div>
        </form>
      </div>
    </div>
  );
}