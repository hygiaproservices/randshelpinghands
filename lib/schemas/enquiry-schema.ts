import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  preferredContactMethod: z.enum(["phone", "email", "whatsapp"]).optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
