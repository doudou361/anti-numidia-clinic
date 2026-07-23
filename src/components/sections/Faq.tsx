import * as React from "react";
import { fr } from "../../content/fr";
import { faqs } from "../../data/faq";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { Plus, Minus } from "lucide-react";

export function Faq() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <Section variant="blush">
      <div className="container mx-auto px-4 max-w-3xl">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl text-center mb-12">{fr.faq.title}</h2>
          
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div 
                  key={i} 
                  className="bg-porcelain rounded-[16px] border border-rose/10 overflow-hidden transition-all duration-300"
                >
                  <button
                    className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:bg-rose/5"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-ink pr-8">{faq.question}</span>
                    <div className="text-rose shrink-0">
                      {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                  </button>
                  <div 
                    className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                    style={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="p-6 pt-0 text-muted leading-relaxed border-t border-rose/10 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
