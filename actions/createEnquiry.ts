"use server";

import { prisma } from "@/lib/prisma";
import { enquirySchema } from "@/lib/schemas/enquiry-schema";

export async function createEnquiry(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    preferredContactMethod: formData.get("preferredContactMethod") || undefined,
  };

  const result = enquirySchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await prisma.enquiry.create({
    data: result.data,
  });

  return { success: true as const };
}
