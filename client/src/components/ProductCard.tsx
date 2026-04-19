import { Link } from "wouter";
import { CheckCircle2, ShoppingCart, Star, Zap } from "lucide-react";
import type { Product } from "../../../drizzle/schema";

interface ProductCardProps {
  product: Product;
  onBuy?: (product: Product) => void;
  featured?: boolean;
}

export default function ProductCard({ product, onBuy, featured = false }: ProductCardProps) {
  const price = Number(product.price);
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
  const features = (product.features as string[]) ?? [];
  const savings = originalPrice ? originalPrice - price : null;

  const badgeColors: Record<string, string> = {
    "MAIS VENDIDO": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "MELHOR OFERTA": "bg-primary/20 text-primary border-primary/30",
    "EM ALTA": "bg-orange-500/20 text-orange-400 border-orange-500/30",
    "POPULAR": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "MAIS BARATO": "bg-green-500/20 text-green-400 border-green-500/30",
    "COMPLETO": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  const badgeClass = product.badge ? (badgeColors[product.badge] ?? "bg-primary/20 text-primary border-primary/30") : "";

  return (
    <div
      className={`relative flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
        featured
          ? "border-primary/40 shadow-lg shadow-primary/10"
          : "border-white/8 hover:border-white/15"
      }`}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full border ${badgeClass}`}>
            {product.badge === "MAIS VENDIDO" && <Star className="w-2.5 h-2.5" />}
            {product.badge === "EM ALTA" && <Zap className="w-2.5 h-2.5" />}
            {product.badge}
          </span>
        </div>
      )}

      {/* Savings badge */}
      {savings && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
            -{Math.round((savings / originalPrice!) * 100)}% OFF
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <div className="mt-4">
          <h3 className="font-bold text-base text-foreground leading-snug mb-1">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
        </div>

        {/* Features */}
        <ul className="mt-4 space-y-2 flex-1">
          {features.slice(0, 4).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
          {features.length > 4 && (
            <li className="text-xs text-primary font-medium pl-5">
              +{features.length - 4} itens incluídos
            </li>
          )}
        </ul>

        {/* Price + CTA */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="flex items-end justify-between mb-3">
            <div>
              {originalPrice && (
                <span className="text-xs text-muted-foreground line-through block">
                  R$ {originalPrice.toFixed(2).replace(".", ",")}
                </span>
              )}
              <span className="text-2xl font-extrabold text-foreground">
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-md">
              Entrega imediata
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onBuy?.(product)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Comprar Agora
            </button>
            <Link
              href={`/produto/${product.slug}`}
              className="px-3 py-2.5 text-sm font-medium border border-white/10 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground"
            >
              Ver mais
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
