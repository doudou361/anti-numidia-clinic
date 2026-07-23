
import { fr } from "../../content/fr";
import { clinicConfig } from "../../config/clinic";
import { Button } from "../ui/Button";

interface FooterProps {
  onBook: () => void;
}

export function Footer({ onBook }: FooterProps) {
  return (
    <footer className="bg-ink text-porcelain py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 text-center flex flex-col items-center gap-12">
        
        <div className="flex flex-col items-center gap-4">
          <div className="bg-blush p-4 rounded-3xl w-full max-w-[240px] flex justify-center">
            <img 
              src="/logo.png" 
              alt="Numidia Dental House" 
              className="h-20 md:h-24 w-auto object-contain mix-blend-multiply scale-[2.1]" 
              style={{ filter: 'brightness(1.1) contrast(1.2)' }}
              draggable={false} 
            />
          </div>
          <p className="font-sans text-porcelain/60 italic max-w-sm mt-4">{fr.hero.h1_line3}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm">
          <a href="#soins" className="hover:text-rose transition-colors">{fr.header.nav.services}</a>
          <a href="#cabinet" className="hover:text-rose transition-colors">{fr.header.nav.clinic}</a>
          <a href={clinicConfig.GOOGLE_MAPS_LINK} target="_blank" rel="noreferrer" className="hover:text-rose transition-colors">
            {fr.practical.actions.maps}
          </a>
          <a href="https://www.instagram.com/numidia_dental_clinic/" target="_blank" rel="noreferrer" className="hover:text-rose transition-colors">
            {fr.practical.actions.instagram}
          </a>
          <a href="https://www.facebook.com/p/Numidia-house-61557615332369/" target="_blank" rel="noreferrer" className="hover:text-rose transition-colors">
            {fr.practical.actions.facebook}
          </a>
        </div>

        <div className="pt-8 border-t border-porcelain/10 w-full max-w-md flex flex-col items-center gap-8">
          <Button onClick={onBook} variant="primary" className="px-8">{fr.footer.cta}</Button>
          <p className="text-xs text-porcelain/40 uppercase tracking-[0.14em]">
            {fr.footer.copyright}
          </p>
        </div>
        
      </div>
    </footer>
  );
}
