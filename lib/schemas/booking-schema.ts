import { z } from "zod";

export const bookingSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  contactPhone: z.string().min(6, "Please enter a valid phone number"),
  contactEmail: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  relationship: z.enum(["self", "family-member", "carer", "other"]),
  serviceType: z.enum([
    "Friendly Visits & Conversation",
    "Help with Shopping & Errands",
    "Accompaniment to Appointments",
    "Walks & Light Activity",
    "Light Household Help",
  ]),
  preferredDate: z.string().min(1, "Please select a preferred date"),
  preferredTime: z.string().optional(),
  notes: z.string().optional(),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
