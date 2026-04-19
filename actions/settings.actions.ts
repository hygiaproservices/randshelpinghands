"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function updateSettings(formData: FormData) {
  const entries = Array.from(formData.entries()).filter(([key]) =>
    key.startsWith("setting_"),
  );

  for (const [key, value] of entries) {
    const settingKey = key.replace("setting_", "");
    await prisma.settings.upsert({
      where: { key: settingKey },
      create: { key: settingKey, value: value as string },
      update: { value: value as string },
    });
  }

  revalidatePath("/settings");
  return { success: true as const };
}
