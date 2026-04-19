"use client";

import { useTransition } from "react";

export function StatusSelect({
  id,
  currentStatus,
  options,
  action,
}: {
  id: string;
  currentStatus: string;
  options: { value: string; label: string }[];
  action: (formData: FormData) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const formData = new FormData();
    formData.set("id", id);
    formData.set("status", e.target.value);
    startTransition(async () => {
      await action(formData);
    });
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className="rounded-lg border-0 bg-surface-container-high px-3 py-2 text-sm font-medium outline-none transition-opacity disabled:opacity-50">
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
