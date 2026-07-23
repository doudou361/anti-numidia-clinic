import * as React from "react";
import type { BookingState, BookingContextType, BookingStep } from "./booking.types";

const BookingContext = React.createContext<BookingContextType | undefined>(undefined);

const initialState: BookingState = {
  isOpen: false,
  step: 1,
};

type Action = 
  | { type: 'OPEN'; serviceId?: string }
  | { type: 'CLOSE' }
  | { type: 'SET_STEP'; step: BookingStep }
  | { type: 'SET_SERVICE'; id: string }
  | { type: 'SET_DATE'; date: string }
  | { type: 'SET_TIME'; time: string }
  | { type: 'SET_DETAILS'; details: BookingState['details'] }
  | { type: 'SET_SUCCESS'; reference: string }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; payload: Partial<BookingState> };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'OPEN': 
      // If a serviceId is provided, we skip step 1. If not, go to step 1.
      return { 
        ...state, 
        isOpen: true, 
        step: action.serviceId ? 2 : (state.step === 5 ? 1 : state.step), 
        serviceId: action.serviceId || state.serviceId 
      };
    case 'CLOSE': return { ...state, isOpen: false };
    case 'SET_STEP': return { ...state, step: action.step };
    case 'SET_SERVICE': return { ...state, serviceId: action.id };
    case 'SET_DATE': return { ...state, date: action.date };
    case 'SET_TIME': return { ...state, time: action.time };
    case 'SET_DETAILS': return { ...state, details: action.details };
    case 'SET_SUCCESS': return { ...state, step: 5, reference: action.reference };
    case 'RESET': return { ...initialState, isOpen: state.isOpen };
    case 'HYDRATE': return { ...state, ...action.payload };
    default: return state;
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ndh-booking-storage');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.step && parsed.step < 5) {
          dispatch({ type: 'HYDRATE', payload: parsed });
        }
      }
    } catch(e) {}
  }, []);

  React.useEffect(() => {
    if (state.step < 5) {
      sessionStorage.setItem('ndh-booking-storage', JSON.stringify({
        step: state.step,
        serviceId: state.serviceId,
        date: state.date,
        time: state.time,
        details: state.details,
      }));
    } else {
      sessionStorage.removeItem('ndh-booking-storage');
    }
  }, [state]);

  const value: BookingContextType = {
    state,
    open: (id) => dispatch({ type: 'OPEN', serviceId: id }),
    close: () => dispatch({ type: 'CLOSE' }),
    setStep: (step) => dispatch({ type: 'SET_STEP', step }),
    setService: (id) => dispatch({ type: 'SET_SERVICE', id }),
    setDate: (date) => dispatch({ type: 'SET_DATE', date }),
    setTime: (time) => dispatch({ type: 'SET_TIME', time }),
    setDetails: (details) => dispatch({ type: 'SET_DETAILS', details }),
    setSuccess: (ref) => dispatch({ type: 'SET_SUCCESS', reference: ref }),
    reset: () => dispatch({ type: 'RESET' }),
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = React.useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used within BookingProvider");
  return context;
}
