
import { services } from "../../data/services";
import { useBooking } from "./BookingContext";
import { cn } from "../../lib/utils";

export function StepService() {
  const { state, setService, setStep } = useBooking();

  const handleSelect = (id: string) => {
    setService(id);
    setTimeout(() => {
      setStep(2);
    }, 180);
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      {services.map((service) => {
        const isSelected = state.serviceId === service.id;
        return (
          <button
            key={service.id}
            onClick={() => handleSelect(service.id)}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-[16px] border transition-all text-left group",
              isSelected 
                ? "border-rose-deep bg-rose/5" 
                : "border-rose/20 bg-porcelain hover:border-rose/50 hover:bg-blush"
            )}
          >
            <div className="flex flex-col gap-1">
              <span className={cn("font-display text-xl transition-colors", isSelected ? "text-rose-deep" : "text-ink")}>
                {service.name}
              </span>
              <span className="font-sans text-xs text-muted">
                {service.durationLabel} {service.note && `· ${service.note}`}
              </span>
            </div>
            <div className={cn(
              "w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-colors",
              isSelected ? "border-rose-deep" : "border-rose/30 group-hover:border-rose/60"
            )}>
              {isSelected && <div className="w-2.5 h-2.5 bg-rose-deep rounded-full" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
