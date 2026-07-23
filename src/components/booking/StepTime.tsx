import * as React from "react";
import { useBooking } from "./BookingContext";
import { fr } from "../../content/fr";
import { services } from "../../data/services";
import { availabilityConfig } from "../../data/availability";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";

const generateSlots = (serviceDuration: number, dateStr: string) => {
  const slots = [];
  let current = new Date(`${dateStr}T${availabilityConfig.open}`);
  const close = new Date(`${dateStr}T${availabilityConfig.close}`);
  
  while (current < close) {
    const end = new Date(current.getTime() + serviceDuration * 60000);
    if (end <= close) {
      const timeStr = current.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      if (timeStr !== "12:30" && timeStr !== "13:00") {
        slots.push(timeStr);
      }
    }
    current = new Date(current.getTime() + availabilityConfig.slotMinutes * 60000);
  }
  return slots;
};

export function StepTime() {
  const { state, setTime, setStep } = useBooking();
  
  const service = services.find(s => s.id === state.serviceId);
  const duration = service?.duration || 30;
  
  const slots = React.useMemo(() => {
    if (!state.date) return [];
    return generateSlots(duration, state.date);
  }, [state.date, duration]);

  const morningSlots = slots.filter(s => parseInt(s) < 12);
  const afternoonSlots = slots.filter(s => parseInt(s) >= 12);

  const handleSelectTime = (time: string) => {
    setTime(time);
    setStep(4);
  };

  if (slots.length === 0) {
    return (
      <div className="flex flex-col items-center text-center py-12 gap-6">
        <p className="text-muted">{fr.booking.stepTime.empty}</p>
        <Button variant="secondary" onClick={() => setStep(2)}>
          {fr.booking.stepTime.backToCalendar}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-2">
      {morningSlots.length > 0 && (
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-[11px] uppercase tracking-wider text-muted font-medium">
            {fr.booking.stepTime.morning}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {morningSlots.map(time => (
              <button
                key={time}
                onClick={() => handleSelectTime(time)}
                className={cn(
                  "py-2.5 rounded-[12px] border transition-colors text-sm font-medium",
                  state.time === time 
                    ? "bg-rose-deep border-rose-deep text-porcelain" 
                    : "bg-porcelain border-rose/30 text-ink hover:border-rose hover:bg-blush"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {afternoonSlots.length > 0 && (
        <div className="flex flex-col gap-4">
          <h4 className="font-sans text-[11px] uppercase tracking-wider text-muted font-medium">
            {fr.booking.stepTime.afternoon}
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {afternoonSlots.map(time => (
              <button
                key={time}
                onClick={() => handleSelectTime(time)}
                className={cn(
                  "py-2.5 rounded-[12px] border transition-colors text-sm font-medium",
                  state.time === time 
                    ? "bg-rose-deep border-rose-deep text-porcelain" 
                    : "bg-porcelain border-rose/30 text-ink hover:border-rose hover:bg-blush"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
