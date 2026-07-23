import * as React from "react";
import { m } from "framer-motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.48, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
