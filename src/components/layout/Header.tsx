import * as React from "react";
import { fr } from "../../content/fr";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface HeaderProps {
  onBook: () => void;
}

export function Header({ onBook }: HeaderProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled || mobileMenuOpen ? "bg-blush/80 backdrop-blur-md border-b border-rose/30" : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Numidia Dental House" 
              className="h-12 md:h-14 w-auto object-contain mix-blend-multiply scale-[2.1] origin-left" 
              style={{ filter: 'brightness(1.1) contrast(1.2)' }}
              draggable={false} 
            />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#soins" className="hover:text-rose-deep transition-colors">{fr.header.nav.services}</a>
            <a href="#blanchiment" className="hover:text-rose-deep transition-colors">{fr.header.nav.whitening}</a>
            <a href="#resultats" className="hover:text-rose-deep transition-colors">{fr.header.nav.results}</a>
            <a href="#formations" className="hover:text-rose-deep transition-colors">{fr.header.nav.training}</a>
            <a href="#cabinet" className="hover:text-rose-deep transition-colors">{fr.header.nav.clinic}</a>
          </nav>

          <div className="hidden md:block">
            <Button onClick={onBook}>{fr.header.cta}</Button>
          </div>

          <button 
            className="md:hidden p-2 text-ink hover:text-rose-deep transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-blush pt-24 px-6 flex flex-col md:hidden animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col gap-6 text-center mt-12">
            <a href="#soins" onClick={closeMenu} className="font-display text-4xl hover:text-rose-deep">{fr.header.nav.services}</a>
            <a href="#blanchiment" onClick={closeMenu} className="font-display text-4xl hover:text-rose-deep">{fr.header.nav.whitening}</a>
            <a href="#resultats" onClick={closeMenu} className="font-display text-4xl hover:text-rose-deep">{fr.header.nav.results}</a>
            <a href="#formations" onClick={closeMenu} className="font-display text-4xl hover:text-rose-deep">{fr.header.nav.training}</a>
            <a href="#cabinet" onClick={closeMenu} className="font-display text-4xl hover:text-rose-deep">{fr.header.nav.clinic}</a>
          </nav>
          <div className="mt-auto mb-12">
            <Button className="w-full py-4 text-base" onClick={() => { closeMenu(); onBook(); }}>
              {fr.header.cta}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
