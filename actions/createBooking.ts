"use server";

import { prisma } from "@/lib/prisma";
import { bookingSchema } from "@/lib/schemas/booking-schema";

export async function createBooking(formData: FormData) {
  const raw = {
    clientName: formData.get("clientName"),
    contactPhone: formData.get("contactPhone"),
    contactEmail: formData.get("contactEmail") || "",
    relationship: formData.get("relationship"),
    serviceType: formData.get("serviceType"),
    preferredDate: formData.get("preferredDate"),
    preferredTime: formData.get("preferredTime") || undefined,
    notes: formData.get("notes") || undefined,
  };

  const result = bookingSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await prisma.booking.create({
    data: {
      ...result.data,
      preferredDate: new Date(result.data.preferredDate),
    },
  });

  return { success: true as const };
}
