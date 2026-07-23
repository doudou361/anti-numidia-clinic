
import { useBooking } from "./BookingContext";
import { Dialog, DialogContent } from "../ui/Dialog";
import { X, ArrowLeft } from "lucide-react";
import { Nuancier } from "../ui/Nuancier";
import { fr } from "../../content/fr";
import { StepService } from "./StepService";
import { StepDate } from "./StepDate";
import { StepTime } from "./StepTime";
import { StepDetails } from "./StepDetails";
import { StepConfirm } from "./StepConfirm";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";

export function BookingModal() {
  const { state, close, setStep } = useBooking();

  const handleClose = () => {
    if (state.step > 1 && state.step < 5) {
      if (window.confirm(fr.booking.closeWarning)) {
        close();
      }
    } else {
      close();
    }
  };

  const handleBack = () => {
    if (state.step > 1) {
      setStep((state.step - 1) as any);
    }
  };

  const stepLabels = {
    1: fr.booking.stepService.label,
    2: fr.booking.stepDate.label,
    3: fr.booking.stepTime.label,
    4: fr.booking.stepDetails.label,
    5: fr.booking.stepConfirm.label,
  };

  const progressIndex = state.step < 5 ? state.step - 1 : 3;

  return (
    <Dialog open={state.isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent 
        className="flex flex-col h-[90vh] sm:h-auto max-h-[800px] p-0 overflow-hidden"
        onInteractOutside={(e) => {
          e.preventDefault();
          handleClose();
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose/10 bg-porcelain z-10 shrink-0">
          <div className="w-8 h-8 rounded-full bg-rose/20 text-rose-deep flex items-center justify-center font-display font-medium text-xs">
            N
          </div>
          {state.step < 5 && (
            <div className="font-sans text-[11px] uppercase tracking-wider text-muted font-medium">
              Étape {state.step} sur 4
            </div>
          )}
          {state.step === 5 && (
            <div className="font-sans text-[11px] uppercase tracking-wider text-muted font-medium">
              {fr.booking.stepConfirm.label}
            </div>
          )}
          <button 
            onClick={handleClose}
            className="p-2 -mr-2 text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-deep rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nuancier Progress */}
        {state.step < 5 && (
          <div className="w-full flex justify-center py-2 bg-porcelain z-10 shrink-0 scale-75 origin-top">
            <Nuancier count={4} activeIndex={progressIndex} />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-porcelain relative">
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={state.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                className="w-full h-full"
              >
                {state.step === 1 && <StepService />}
                {state.step === 2 && <StepDate />}
                {state.step === 3 && <StepTime />}
                {state.step === 4 && <StepDetails />}
                {state.step === 5 && <StepConfirm />}
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </div>

        {/* Footer */}
        {state.step > 1 && state.step < 5 && (
          <div className="px-6 py-4 border-t border-rose/10 bg-porcelain z-10 shrink-0 flex justify-between items-center">
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-deep rounded-full px-4 py-2 -ml-4"
            >
              <ArrowLeft size={16} />
              {fr.booking.back}
            </button>
            <div className="text-xs font-medium text-ink uppercase tracking-[0.14em]">
              {stepLabels[state.step as keyof typeof stepLabels]}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
