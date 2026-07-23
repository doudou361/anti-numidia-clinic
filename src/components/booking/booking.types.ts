export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface BookingState {
  isOpen: boolean;
  step: BookingStep;
  serviceId?: string;
  date?: string; // YYYY-MM-DD
  time?: string; // HH:MM
  details?: {
    fullName: string;
    phone: string;
    message?: string;
  };
  reference?: string; // On success
}

export interface BookingContextType {
  state: BookingState;
  open: (serviceId?: string) => void;
  close: () => void;
  setStep: (step: BookingStep) => void;
  setService: (id: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setDetails: (details: BookingState["details"]) => void;
  setSuccess: (reference: string) => void;
  reset: () => void;
}
