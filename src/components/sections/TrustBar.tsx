import { fr } from "../../content/fr";
import { Section } from "../layout/Section";
import { AnimatedNumber } from "../ui/AnimatedNumber";

export function TrustBar() {
  return (
    <Section variant="blush" className="py-10 lg:py-16 border-y border-rose/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 divide-x divide-rose/20 items-center justify-center text-center">
          {fr.trustBar.stats.map((stat, idx) => (
            <div key={idx} className="px-4 flex flex-col gap-2">
              <span className="font-display text-4xl lg:text-5xl text-rose-deep">
                {stat.isNumber ? (
                  <AnimatedNumber value={stat.value as number} suffix={stat.suffix as string} />
                ) : (
                  stat.text
                )}
              </span>
              <span className="font-sans text-sm text-ink uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
