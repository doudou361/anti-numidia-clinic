
import { fr } from "../../content/fr";
import { Section } from "../layout/Section";
import { Button } from "../ui/Button";
import { Nuancier } from "../ui/Nuancier";
import { Reveal } from "../ui/Reveal";

interface HeroProps {
  onBook: () => void;
}

export function Hero({ onBook }: HeroProps) {
  return (
    <Section variant="porcelain" className="relative pt-32 pb-0 lg:pt-48 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 max-w-7xl flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left column */}
        <div className="flex-1 w-full lg:w-7/12 flex flex-col items-start pt-10">
          <Reveal delay={0.1}>
            <span className="font-sans font-medium text-[11px] uppercase tracking-[0.14em] text-muted mb-6 block">
              {fr.hero.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[clamp(44px,7vw,88px)] leading-[1.1] text-ink mb-10">
              <span className="block">{fr.hero.h1_line1}</span>
              <span className="block">{fr.hero.h1_line2}</span>
              <span className="block italic text-rose font-light mt-2">{fr.hero.h1_line3}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={onBook} variant="primary">{fr.hero.ctaPrimary}</Button>
              <a href="#soins">
                <Button variant="ghost">{fr.hero.ctaSecondary}</Button>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right column */}
        <div className="w-full lg:w-5/12 relative mt-12 lg:mt-0 pb-20">
          <Reveal delay={0.4}>
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              <div className="absolute inset-0 rounded-[24px] border border-rose translate-x-3 translate-y-3" />
              <div className="absolute inset-0 rounded-[24px] bg-blush overflow-hidden z-10 flex items-center justify-center">
                <img 
                  src="/images/hero.jpg" 
                  alt="Patiente souriante" 
                  className="w-full h-full object-cover" 
                  draggable={false} 
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="w-full mt-auto">
        <Nuancier className="justify-start px-4 md:px-8 max-w-7xl mx-auto" animatedLoad />
      </div>
    </Section>
  );
}
