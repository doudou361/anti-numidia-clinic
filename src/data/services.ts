export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  durationLabel: string;
  note?: string;
  iconName: string;
}

export const services: Service[] = [
  {
    id: "consultation",
    name: "Consultation & plan de traitement",
    duration: 30,
    durationLabel: "30 min",
    note: "Point d'entrée",
    iconName: "Stethoscope",
  },
  {
    id: "blanchiment-americain",
    name: "Blanchiment américain 🇺🇸",
    duration: 45,
    durationLabel: "45 min",
    note: "15 000 DA (au lieu de 20 000 DA)",
    iconName: "Sparkles",
  },
  {
    id: "blanchiment-pap",
    name: "Blanchiment PAP+",
    duration: 60,
    durationLabel: "60 min",
    note: "20 000 DA (Détartrage non inclus)",
    iconName: "Sparkles",
  },
  {
    id: "blanchiment-pap-premium",
    name: "PAP+ Premium ✨",
    duration: 90,
    durationLabel: "90 min",
    note: "22 000 DA - Inclus Détartrage + Polissage",
    iconName: "Sparkles",
  },
  {
    id: "esthetique-sourire",
    name: "Facettes & esthétique du sourire",
    duration: 45,
    durationLabel: "45 min",
    note: "Sur devis",
    iconName: "Smile",
  },
  {
    id: "soins-generaux",
    name: "Soins dentaires & détartrage",
    duration: 45,
    durationLabel: "45 min",
    note: "Détartrage: 4 000 DA à 6 000 DA",
    iconName: "Activity",
  },
  {
    id: "orthodontie",
    name: "Orthodontie & alignement",
    duration: 45,
    durationLabel: "45 min",
    iconName: "MoveDiagonal",
  },
  {
    id: "soins-visage",
    name: "Soins esthétiques non-chirurgicaux",
    duration: 45,
    durationLabel: "45 min",
    iconName: "Droplets",
  }
];
