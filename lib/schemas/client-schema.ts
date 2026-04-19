import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().min(6, "Please enter a valid phone number"),
  address: z.string().optional(),
  nextOfKin: z.string().optional(),
  medicalNotes: z.string().optional(),
});

export type ClientFormValues = z.infer<typeof clientSchema>;
