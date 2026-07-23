import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingDetailsSchema, type BookingDetailsData } from "./booking.schema";
import { useBooking } from "./BookingContext";
import { fr } from "../../content/fr";
import { services } from "../../data/services";
import { Field } from "../ui/Field";
import { Button } from "../ui/Button";
import { Loader2 } from "lucide-react";

export function StepDetails() {
  const { state, setStep, setDetails, setSuccess } = useBooking();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const service = services.find(s => s.id === state.serviceId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingDetailsData>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: state.details,
  });

  const onSubmit = async (data: BookingDetailsData) => {
    setIsSubmitting(true);
    setDetails(data);
    
    try {
      const payload = {
        serviceId: state.serviceId,
        serviceName: service?.name,
        date: state.date,
        time: state.time,
        fullName: data.fullName,
        phone: data.phone,
        message: data.message,
        consent: data.consent,
        locale: "fr",
        source: "website"
      };

      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (result.ok) {
        setSuccess(result.reference || `NDH-${Math.floor(Math.random()*1000000)}`);
      } else {
        alert(fr.booking.stepConfirm.failureTitle);
      }
    } catch (e) {
      alert(fr.booking.stepConfirm.failureTitle);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedDate = state.date 
    ? new Date(state.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 py-2">
      <div className="bg-blush rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-sm text-ink">
          <span className="font-medium">{service?.name}</span>
          <span className="text-muted mx-2">·</span>
          <span>{formattedDate}</span>
          <span className="text-muted mx-2">·</span>
          <span>{state.time}</span>
        </div>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-xs font-medium text-rose-deep hover:underline"
        >
          {fr.booking.stepDetails.modify}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <Field
          label={fr.booking.stepDetails.nameLabel}
          placeholder={fr.booking.stepDetails.namePlaceholder}
          {...register("fullName")}
          error={errors.fullName?.message}
          autoComplete="name"
        />

        <Field
          label={fr.booking.stepDetails.phoneLabel}
          placeholder={fr.booking.stepDetails.phonePlaceholder}
          {...register("phone")}
          error={errors.phone?.message}
          inputMode="tel"
        />

        <Field
          as="textarea"
          label={fr.booking.stepDetails.messageLabel}
          placeholder={fr.booking.stepDetails.messagePlaceholder}
          {...register("message")}
          error={errors.message?.message}
        />

        <label className="flex items-start gap-3 mt-2 cursor-pointer group">
          <input
            type="checkbox"
            {...register("consent")}
            className="mt-1 w-4 h-4 rounded border-rose/30 text-rose-deep focus:ring-rose-deep focus:ring-offset-porcelain"
          />
          <div className="flex flex-col gap-1 text-sm text-muted">
            <span className="group-hover:text-ink transition-colors">{fr.booking.stepDetails.consent}</span>
            {errors.consent && <span className="text-xs text-rose-deep">{errors.consent.message}</span>}
          </div>
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting} className="mt-4">
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isSubmitting && fr.booking.confirm}
      </Button>
    </form>
  );
}
