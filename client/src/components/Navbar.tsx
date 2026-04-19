import { Link } from "wouter";
import { ShieldCheck, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-background/90">
      <div className="container">
        <nav className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-base text-foreground tracking-tight">EasyCred</span>
              <span className="text-[10px] text-primary font-medium">.net</span>
            </div>
          </Link>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center gap-1">
            <a href="/#em-alta" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5">
              Em Alta
            </a>
            <a href="/#catalogo" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5">
              Produtos
            </a>
            <a href="/#por-que" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5">
              Por Que EasyCred
            </a>
            <a href="/#faq" className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-white/5">
              FAQ
            </a>
          </div>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/5521981672064"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Suporte
            </a>
            <a
              href="/#catalogo"
              className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Ver Produtos
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/5 py-3 space-y-1">
            <a href="/#em-alta" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors">Em Alta</a>
            <a href="/#catalogo" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors">Produtos</a>
            <a href="/#por-que" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors">Por Que EasyCred</a>
            <a href="/#faq" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors">FAQ</a>
            <a href="https://wa.me/5521981672064" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors">
              <MessageCircle className="w-4 h-4" />
              Suporte WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
