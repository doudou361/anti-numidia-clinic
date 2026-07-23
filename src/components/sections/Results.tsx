import * as React from "react";
import { fr } from "../../content/fr";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";

export function Results() {
  const [sliderPos, setSliderPos] = React.useState(50);
  const [activePairIndex, setActivePairIndex] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  
  const pairs = [1, 2, 3, 4, 5];

  const handleMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons === 1) handleMove(e.clientX);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 5));
    if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 5));
  };

  return (
    <Section variant="porcelain" id="resultats">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal>
          <div 
            ref={sliderRef}
            className="relative aspect-[4/3] md:aspect-[3/2] bg-blush rounded-[24px] overflow-hidden select-none cursor-ew-resize border border-rose/20 touch-none"
            onPointerMove={onPointerMove}
            onPointerDown={(e) => {
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
              handleMove(e.clientX);
            }}
            onPointerUp={(e) => {
              (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            }}
          >
            {/* Before */}
            <div className="absolute inset-0 bg-[#EBD6C9]">
              <img 
                src={`/images/results/${pairs[activePairIndex]}-before.jpg`} 
                alt="Avant"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
            {/* After */}
            <div 
              className="absolute inset-0 bg-[#FAF4F1] overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <img 
                src={`/images/results/${pairs[activePairIndex]}-after.jpg`} 
                alt="Après"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Slider Handle - modeled after one shade tab */}
            <button 
              className="absolute top-0 bottom-0 w-1 bg-porcelain flex flex-col items-center justify-center -ml-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-deep"
              style={{ left: `${sliderPos}%` }}
              onKeyDown={onKeyDown}
              aria-label="Ajuster la comparaison"
              aria-valuenow={Math.round(sliderPos)}
            >
              {/* Nuancier Tab as handle */}
              <div className="w-6 h-16 bg-porcelain rounded-full border border-rose/20 shadow-sm flex items-center justify-center relative -ml-2.5">
                 <div className="w-1 h-8 bg-rose/10 rounded-full" />
              </div>
            </button>
          </div>
          
          <div className="grid grid-cols-5 gap-2 md:gap-4 mt-6 max-w-2xl mx-auto">
            {pairs.map((num, idx) => (
              <button 
                key={num} 
                onClick={() => setActivePairIndex(idx)}
                className={`aspect-[4/3] md:aspect-[3/2] rounded-[12px] overflow-hidden border-2 transition-all ${activePairIndex === idx ? 'border-rose-deep shadow-md' : 'border-rose/10 opacity-70 hover:opacity-100'}`}
              >
                <img 
                  src={`/images/results/${num}-after.jpg`} 
                  alt={`Résultat ${num}`} 
                  className="w-full h-full object-cover" 
                  draggable={false} 
                />
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-muted mt-8">
            {fr.results.caption}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
