"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { testimonialSchema } from "@/lib/schemas/testimonial-schema";

export async function createTestimonial(formData: FormData) {
  const raw = {
    clientName: formData.get("clientName"),
    content: formData.get("content"),
    rating: formData.get("rating") || undefined,
  };

  const result = testimonialSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const testimonial = await prisma.testimonial.create({ data: result.data });
  revalidatePath("/testimonials-manage");
  redirect(`/testimonials-manage/${testimonial.id}`);
}

export async function updateTestimonial(formData: FormData) {
  const id = formData.get("id") as string;
  const raw = {
    clientName: formData.get("clientName"),
    content: formData.get("content"),
    rating: formData.get("rating") || undefined,
  };

  const result = testimonialSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await prisma.testimonial.update({
    where: { id },
    data: result.data,
  });

  revalidatePath(`/testimonials-manage/${id}`);
  revalidatePath("/testimonials-manage");
  revalidatePath("/testimonials");
  return { success: true as const };
}

export async function updateTestimonialStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as "PENDING" | "APPROVED" | "REJECTED";

  await prisma.testimonial.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/testimonials-manage/${id}`);
  revalidatePath("/testimonials-manage");
  revalidatePath("/testimonials");
  revalidatePath("/dashboard");
}

export async function toggleTestimonialFeatured(formData: FormData) {
  const id = formData.get("id") as string;
  const isFeatured = formData.get("isFeatured") === "true";

  await prisma.testimonial.update({
    where: { id },
    data: { isFeatured },
  });

  revalidatePath(`/testimonials-manage/${id}`);
  revalidatePath("/testimonials-manage");
  revalidatePath("/testimonials");
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/testimonials-manage");
  revalidatePath("/testimonials");
  revalidatePath("/dashboard");
  redirect("/testimonials-manage");
}
