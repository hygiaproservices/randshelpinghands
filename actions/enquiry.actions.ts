"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateEnquiryStatus(formData: FormData) {
  const id = formData.get("id") as string;
  const status = formData.get("status") as "NEW" | "RESPONDED" | "CLOSED";

  await prisma.enquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/enquiries/${id}`);
  revalidatePath("/enquiries");
  revalidatePath("/dashboard");
}

export async function updateEnquiryNotes(formData: FormData) {
  const id = formData.get("id") as string;
  const internalNotes = formData.get("internalNotes") as string;

  await prisma.enquiry.update({
    where: { id },
    data: { internalNotes },
  });

  revalidatePath(`/enquiries/${id}`);
}

export async function deleteEnquiry(id: string) {
  await prisma.enquiry.delete({ where: { id } });
  revalidatePath("/enquiries");
  revalidatePath("/dashboard");
  redirect("/enquiries");
}
