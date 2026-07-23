import { z } from "zod";

const algerianPhoneRegex = /^(?:\+213|00213|0)([5-7]\d{8})$/;

export const bookingDetailsSchema = z.object({
  fullName: z.string().min(3, "Nom trop court"),
  phone: z.string().transform(val => val.replace(/[\s.-]/g, '')).refine(
    val => algerianPhoneRegex.test(val),
    "Entrez un numéro algérien valide, ex. 0555 12 34 56"
  ),
  message: z.string().max(300, "Message trop long").optional(),
  consent: z.boolean().refine(val => val === true, "Le consentement est requis"),
});

export type BookingDetailsData = z.infer<typeof bookingDetailsSchema>;
