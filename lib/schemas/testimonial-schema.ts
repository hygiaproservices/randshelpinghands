import { z } from "zod";

export const testimonialSchema = z.object({
  clientName: z.string().min(2, "Name must be at least 2 characters"),
  content: z.string().min(10, "Testimonial must be at least 10 characters"),
  rating: z.coerce.number().int().min(1).max(5).optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
