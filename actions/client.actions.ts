"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { clientSchema } from "@/lib/schemas/client-schema";

export async function createClient(formData: FormData) {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email") || "",
    phone: formData.get("phone"),
    address: formData.get("address") || undefined,
    nextOfKin: formData.get("nextOfKin") || undefined,
    medicalNotes: formData.get("medicalNotes") || undefined,
  };

  const result = clientSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const client = await prisma.client.create({ data: result.data });
  revalidatePath("/clients");
  revalidatePath("/dashboard");
  redirect(`/clients/${client.id}`);
}

export async function updateClient(formData: FormData) {
  const id = formData.get("id") as string;
  const raw = {
    name: formData.get("name"),
    email: formData.get("email") || "",
    phone: formData.get("phone"),
    address: formData.get("address") || undefined,
    nextOfKin: formData.get("nextOfKin") || undefined,
    medicalNotes: formData.get("medicalNotes") || undefined,
  };

  const result = clientSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await prisma.client.update({
    where: { id },
    data: result.data,
  });

  revalidatePath(`/clients/${id}`);
  revalidatePath("/clients");
  return { success: true as const };
}

export async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
  revalidatePath("/clients");
  revalidatePath("/dashboard");
  redirect("/clients");
}
