"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createTestimonial } from "@/actions/testimonial.actions";

type FormState = { success: false; errors: Record<string, string[]> } | null;

export default function NewTestimonialPage() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const result = await createTestimonial(formData);
      return result ?? null;
    },
    null,
  );

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-heading text-2xl font-semibold">
        Add New Testimonial
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Add a client testimonial. It will be set to &ldquo;Pending&rdquo; status
        by default.
      </p>

      <form action={formAction} className="mt-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clientName">Client Name *</Label>
          <Input id="clientName" name="clientName" required />
          {state?.errors?.clientName && (
            <p className="text-xs text-red-600">{state.errors.clientName[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Testimonial *</Label>
          <Textarea
            id="content"
            name="content"
            required
            rows={6}
            placeholder="What did the client say about our service?"
          />
          {state?.errors?.content && (
            <p className="text-xs text-red-600">{state.errors.content[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Input
            id="rating"
            name="rating"
            type="number"
            min={1}
            max={5}
            placeholder="Optional"
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create Testimonial"}
        </Button>
      </form>
    </div>
  );
}
