"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateBookingStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as
    | "PENDING"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";

  await prisma.booking.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/bookings/${id}`);
  revalidatePath("/bookings");
  revalidatePath("/dashboard");
}

export async function updateBookingNotes(formData: FormData) {
  const id = formData.get("id") as string;
  const visitNotes = formData.get("visitNotes") as string;

  await prisma.booking.update({
    where: { id },
    data: { visitNotes },
  });

  revalidatePath(`/bookings/${id}`);
}

export async function assignBookingClient(formData: FormData) {
  const id = formData.get("id") as string;
  const clientId = formData.get("clientId") as string;

  await prisma.booking.update({
    where: { id },
    data: { clientId: clientId || null },
  });

  revalidatePath(`/bookings/${id}`);
}

export async function deleteBooking(id: string) {
  await prisma.booking.delete({ where: { id } });
  revalidatePath("/bookings");
  revalidatePath("/dashboard");
  redirect("/bookings");
}
