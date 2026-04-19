"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createClient } from "@/actions/client.actions";

type FormState = { success: false; errors: Record<string, string[]> } | null;

export default function NewClientPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const result = await createClient(formData);
      // If redirect happens (success), this won't run
      return result ?? null;
    },
    null,
  );

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold">Add New Client</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Create a client record to track bookings and medical information.
      </p>

      <form action={formAction} className="mt-8 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input id="name" name="name" required />
            {state?.errors?.name && (
              <p className="text-xs text-red-600">{state.errors.name[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input id="phone" name="phone" type="tel" required />
            {state?.errors?.phone && (
              <p className="text-xs text-red-600">{state.errors.phone[0]}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" />
          {state?.errors?.email && (
            <p className="text-xs text-red-600">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nextOfKin">Next of Kin</Label>
          <Input
            id="nextOfKin"
            name="nextOfKin"
            placeholder="Name and contact number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="medicalNotes">Medical Notes</Label>
          <Textarea
            id="medicalNotes"
            name="medicalNotes"
            placeholder="Relevant medical conditions, allergies, medications..."
            rows={4}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Client"}
        </Button>
      </form>
    </div>
  );
}
