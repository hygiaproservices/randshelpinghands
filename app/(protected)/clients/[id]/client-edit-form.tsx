"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateClient } from "@/actions/client.actions";

type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  address: string | null;
  nextOfKin: string | null;
  medicalNotes: string | null;
};

type FormState =
  | { success: true }
  | { success: false; errors: Record<string, string[]> }
  | null;

export function ClientEditForm({ client }: { client: Client }) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const result = await updateClient(formData);
      return result ?? null;
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={client.id} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" defaultValue={client.name} required />
          {state && !state.success && state.errors?.name && (
            <p className="text-xs text-red-600">{state.errors.name[0]}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={client.phone}
            required
          />
          {state && !state.success && state.errors?.phone && (
            <p className="text-xs text-red-600">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={client.email || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          defaultValue={client.address || ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nextOfKin">Next of Kin</Label>
        <Input
          id="nextOfKin"
          name="nextOfKin"
          defaultValue={client.nextOfKin || ""}
          placeholder="Name and contact number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medicalNotes">Medical Notes</Label>
        <Textarea
          id="medicalNotes"
          name="medicalNotes"
          defaultValue={client.medicalNotes || ""}
          rows={4}
          placeholder="Relevant medical conditions, allergies, medications..."
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
        {state?.success && (
          <p className="text-sm text-secondary">Changes saved.</p>
        )}
      </div>
    </form>
  );
}
