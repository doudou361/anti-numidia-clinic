import { fr } from "../../content/fr";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { Check, Info } from "lucide-react";

export function Whitening() {
  return (
    <Section variant="blush" id="blanchiment">
      <div className="container mx-auto px-4 max-w-7xl">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl lg:text-5xl text-ink mb-6">{fr.whitening.title}</h2>
            <p className="font-sans text-lg text-muted leading-relaxed">
              {fr.whitening.description}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {fr.whitening.packages.map((pkg, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="bg-porcelain rounded-[24px] p-8 border border-rose/20 flex flex-col h-full hover:shadow-md hover:border-rose/40 transition-all">
                <h3 className="font-display text-2xl text-ink mb-4">{pkg.name}</h3>
                <div className="flex items-baseline gap-3 mb-8">
                  <span className="text-3xl font-medium text-rose-deep">{pkg.price}</span>
                  <span className="text-sm text-muted line-through">{pkg.oldPrice}</span>
                </div>
                
                <ul className="flex flex-col gap-4 mb-4 flex-1">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-ink/80 text-sm md:text-base">
                      <Check size={18} className="text-rose-deep shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="bg-porcelain/60 rounded-[20px] p-6 border border-rose/10 flex gap-4 max-w-4xl mx-auto items-start">
            <Info size={24} className="text-rose-deep shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-ink mb-1">{fr.whitening.warningTitle}</h4>
              <p className="text-sm text-muted leading-relaxed">{fr.whitening.warning}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
