import { fr } from "../../content/fr";
import { clinicConfig } from "../../config/clinic";
import { Section } from "../layout/Section";
import { Reveal } from "../ui/Reveal";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";

export function Practical() {
  return (
    <Section variant="porcelain" id="cabinet">
      <div className="container mx-auto px-4 max-w-6xl">
        <Reveal>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-16 text-center">{fr.practical.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-10">
              
              <div className="flex gap-4">
                <MapPin className="text-rose shrink-0 mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-lg text-ink whitespace-pre-line leading-relaxed">
                    {fr.practical.address}
                  </p>
                  <a 
                    href={clinicConfig.GOOGLE_MAPS_LINK} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-block mt-4 text-sm font-medium text-rose-deep hover:underline underline-offset-4"
                  >
                    {fr.practical.actions.maps}
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="text-rose shrink-0 mt-1" size={24} strokeWidth={1.5} />
                <div className="w-full max-w-sm">
                  <div className="flex justify-between py-2 border-b border-rose/10">
                    <span className="text-ink">{fr.practical.hours.days}</span>
                    <span className="text-muted">{fr.practical.hours.time}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-rose/10">
                    <span className="text-rose-deep font-medium">Jeudi</span>
                    <span className="text-rose-deep font-medium">{fr.practical.hours.closed}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-ink">{fr.practical.hours.friday}</span>
                    <span className="text-muted">{fr.practical.hours.fridayTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
                <a 
                  href={`tel:${clinicConfig.PHONE.replace(/\s+/g, '')}`} 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose/30 text-ink hover:bg-blush transition-colors"
                >
                  <Phone size={18} />
                  <span>{fr.practical.actions.phone}</span>
                </a>
                <a 
                  href={`https://wa.me/${clinicConfig.WHATSAPP.replace(/\D/g, '')}`} 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-rose/30 text-ink hover:bg-blush transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>{fr.practical.actions.whatsapp}</span>
                </a>
              </div>

            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="aspect-square lg:aspect-auto lg:h-full rounded-[24px] bg-blush border border-rose/20 flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
              <MapPin className="text-rose/40 mb-4" size={48} strokeWidth={1} />
              <p className="text-muted mb-6">Retrouvez-nous facilement sur Google Maps</p>
              <a 
                href={clinicConfig.GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noreferrer" 
                className="text-sm font-medium text-rose-deep hover:underline"
              >
                {fr.practical.actions.maps}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
