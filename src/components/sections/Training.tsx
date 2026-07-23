import { fr } from "../../content/fr";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

interface TrainingProps {
  onBookTraining: () => void;
}

export function Training({ onBookTraining }: TrainingProps) {
  return (
    <Section variant="blush" id="formations">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl md:text-5xl text-ink mb-8">{fr.training.title}</h2>
          <div className="flex flex-col gap-6 text-lg text-muted mb-12">
            <p>{fr.training.p1}</p>
            <p>{fr.training.p2}</p>
          </div>
          <Button variant="primary" onClick={onBookTraining}>
            {fr.training.cta}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
