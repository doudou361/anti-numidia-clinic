import * as React from "react";
import { useBooking } from "./BookingContext";
import { fr } from "../../content/fr";
import { availabilityConfig } from "../../data/availability";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => {
  let day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; 
};

export function StepDate() {
  const { state, setDate, setStep } = useBooking();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isNextMonthLimit = () => {
    const today = new Date();
    return year > today.getFullYear() || (year === today.getFullYear() && month > today.getMonth());
  };

  const isPrevMonthLimit = () => {
    const today = new Date();
    return year === today.getFullYear() && month === today.getMonth();
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const isDayDisabled = (day: number) => {
    const d = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (d < today) return true;
    if (d.getDay() === 4) return true; // Thursday

    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (availabilityConfig.blockedDates.includes(dateString as never)) return true;

    return false;
  };

  const handleSelectDate = (day: number) => {
    if (isDayDisabled(day)) return;
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setDate(dateString);
    setTimeout(() => {
      setStep(3);
    }, 150);
  };

  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  return (
    <div className="flex flex-col gap-6 py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-ink capitalize">{monthNames[month]} {year}</h3>
        <div className="flex gap-2">
          <button 
            onClick={handlePrevMonth} 
            disabled={isPrevMonthLimit()}
            className="w-8 h-8 rounded-full border border-rose/30 flex items-center justify-center text-ink disabled:opacity-30 disabled:pointer-events-none hover:bg-blush"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={handleNextMonth} 
            disabled={isNextMonthLimit()}
            className="w-8 h-8 rounded-full border border-rose/30 flex items-center justify-center text-ink disabled:opacity-30 disabled:pointer-events-none hover:bg-blush"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-4 text-center">
        {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map(d => (
          <div key={d} className="font-sans text-[11px] uppercase tracking-wider text-muted font-medium pb-2">
            {d}
          </div>
        ))}
        
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {days.map(day => {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const disabled = isDayDisabled(day);
          const isSelected = state.date === dateString;
          const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
          
          return (
            <div key={day} className="flex items-center justify-center relative group">
              <button
                onClick={() => handleSelectDate(day)}
                disabled={disabled}
                aria-disabled={disabled}
                title={disabled && new Date(year, month, day).getDay() === 4 ? fr.booking.stepDate.closedTooltip : undefined}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-sans text-sm transition-colors",
                  isSelected ? "bg-rose-deep text-porcelain" : "text-ink hover:bg-blush",
                  isToday && !isSelected && "border border-rose",
                  disabled && "opacity-40 hover:bg-transparent cursor-not-allowed line-through decoration-rose/30 text-muted"
                )}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
