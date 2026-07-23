
import { m } from "framer-motion";
import { cn } from "../../lib/utils";

interface NuancierProps {
  className?: string;
  count?: number;
  activeIndex?: number; // for progress, -1 means no active
  animatedLoad?: boolean;
}

const SHADES = [
  "#FBF7F5", "#FAF4F1", "#F9F1ED", "#F7EEE9", 
  "#F6EBE5", "#F4E8E1", "#F3E5DD", "#F1E2D9", 
  "#F0DFD5", "#EEDCD1", "#EDD9CD", "#EBD6C9"
];

export function Nuancier({ className, count = 12, activeIndex = -1, animatedLoad = false }: NuancierProps) {
  const shades = SHADES.slice(0, count);

  return (
    <div className={cn("flex items-end gap-[2px]", className)}>
      {shades.map((shade, i) => {
        const isActive = activeIndex >= 0 && i <= activeIndex;
        const color = activeIndex >= 0 ? (isActive ? SHADES[0] : SHADES[SHADES.length - 1]) : shade;
        
        return (
          <m.div
            key={i}
            initial={animatedLoad ? { y: 20, opacity: 0 } : false}
            animate={animatedLoad ? { y: 0, opacity: 1 } : false}
            transition={animatedLoad ? { 
              duration: 0.4, 
              delay: i * 0.05, 
              ease: [0.22, 0.61, 0.36, 1] 
            } : {}}
            className={cn(
              "w-4 h-12 rounded-t-full rounded-b-sm transition-colors duration-500",
              activeIndex >= 0 && !isActive && "opacity-40"
            )}
            style={{ backgroundColor: color }}
          />
        );
      })}
    </div>
  );
}
