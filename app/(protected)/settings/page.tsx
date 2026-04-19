import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./settings-form";

export const metadata: Metadata = { title: "Settings" };

const DEFAULT_SETTINGS = [
  {
    key: "business_name",
    label: "Business Name",
    description: "The name displayed across the site",
  },
  {
    key: "business_phone",
    label: "Business Phone",
    description: "Primary contact phone number",
  },
  {
    key: "business_email",
    label: "Business Email",
    description: "Primary contact email address",
  },
  {
    key: "service_area",
    label: "Service Area",
    description: "Geographic area you serve",
  },
  {
    key: "tagline",
    label: "Tagline",
    description: "Short tagline or motto for the business",
  },
  {
    key: "office_hours",
    label: "Office Hours",
    description: "When you're available for enquiries",
  },
  {
    key: "cqc_registration",
    label: "CQC Registration Number",
    description: "Care Quality Commission registration (if applicable)",
  },
];

export default async function SettingsPage() {
  const existing = await prisma.settings.findMany();
  const settingsMap = new Map(existing.map((s) => [s.key, s.value]));

  const settings = DEFAULT_SETTINGS.map((s) => ({
    ...s,
    value: settingsMap.get(s.key) || "",
  }));

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Manage your business configuration.
      </p>

      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
