import * as React from "react";
import { useBooking } from "./BookingContext";
import { fr } from "../../content/fr";
import { services } from "../../data/services";
import { Button } from "../ui/Button";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { toast } from "sonner";
import { clinicConfig } from "../../config/clinic";

export function StepConfirm() {
  const { state, close, reset } = useBooking();
  const service = services.find(s => s.id === state.serviceId);
  const formattedDate = state.date 
    ? new Date(state.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';

  React.useEffect(() => {
    toast.success(fr.booking.stepConfirm.toastSuccess);
  }, []);

  const handleWhatsapp = () => {
    const text = encodeURIComponent(`Bonjour, je souhaite confirmer ma demande de rendez-vous (Réf: ${state.reference}) pour un ${service?.name} le ${formattedDate} à ${state.time}.`);
    window.open(`https://wa.me/${clinicConfig.WHATSAPP.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const handleDone = () => {
    close();
    setTimeout(reset, 300);
  };

  return (
    <div className="flex flex-col items-center text-center py-6 gap-8">
      <LazyMotion features={domAnimation}>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <m.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full text-rose overflow-visible"
            initial="hidden"
            animate="visible"
          >
            <m.path
              d="M50 15 C30 15 15 30 15 50 C15 70 30 85 50 85 C70 85 85 70 85 50 C85 30 70 15 50 15 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              variants={{
                hidden: { pathLength: 0, opacity: 0 },
                visible: { 
                  pathLength: 1, 
                  opacity: 1,
                  transition: { duration: 0.6, ease: "easeOut" } 
                }
              }}
            />
          </m.svg>
          <div className="font-display text-4xl text-rose-deep">N</div>
        </div>
      </LazyMotion>

      <div className="flex flex-col gap-2">
        <h3 className="font-display text-3xl text-ink">{fr.booking.stepConfirm.successTitle}</h3>
        <p className="font-sans text-muted">Réf: {state.reference}</p>
      </div>

      <div className="bg-blush rounded-[16px] p-6 w-full text-left text-sm text-ink flex flex-col gap-2 border border-rose/10">
        <div className="font-medium">{service?.name}</div>
        <div className="text-muted capitalize">{formattedDate} à {state.time}</div>
      </div>

      <p className="font-sans text-sm font-medium text-rose-deep">
        {fr.booking.stepConfirm.successNote}
      </p>

      <div className="flex flex-col w-full gap-3 mt-4">
        <Button variant="primary" onClick={handleWhatsapp}>
          {fr.booking.stepConfirm.confirmWhatsapp}
        </Button>
        <Button variant="ghost" onClick={handleDone}>
          {fr.booking.back} à l'accueil
        </Button>
      </div>
    </div>
  );
}
