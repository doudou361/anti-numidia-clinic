import { fr } from "../../content/fr";
import { services } from "../../data/services";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import * as Icons from "lucide-react";

interface ServicesProps {
  onBookService: (serviceId: string) => void;
}

export function Services({ onBookService }: ServicesProps) {
  return (
    <Section variant="porcelain" id="soins">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <span className="font-sans font-medium text-[11px] uppercase tracking-[0.14em] text-muted mb-4 block text-center">
            {fr.services.eyebrow}
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-center mb-16 lg:mb-24">
            {fr.services.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = (Icons as any)[service.iconName] || Icons.Asterisk;
            return (
              <Reveal key={service.id} delay={i * 0.1}>
                <button
                  onClick={() => onBookService(service.id)}
                  className="w-full text-left bg-blush rounded-[20px] p-8 group transition-all duration-300 hover:scale-[1.015] hover:border hover:border-rose/50 border border-transparent flex flex-col h-full"
                >
                  <div className="text-rose mb-6">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-3">{service.name}</h3>
                  <div className="flex items-center gap-3 mt-auto pt-6">
                    <span className="font-sans font-medium text-[11px] uppercase tracking-[0.14em] text-muted bg-porcelain px-3 py-1.5 rounded-full">
                      {service.durationLabel}
                    </span>
                    {service.note && (
                      <span className="font-sans text-xs text-muted/70 italic">
                        {service.note}
                      </span>
                    )}
                  </div>
                  <div className="mt-8 font-medium text-sm text-rose-deep group-hover:underline underline-offset-4 decoration-rose/30 transition-all">
                    {fr.services.cta}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
