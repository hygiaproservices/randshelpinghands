"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateTestimonial } from "@/actions/testimonial.actions";

type Testimonial = {
  id: string;
  clientName: string;
  content: string;
  rating: number | null;
};

type FormState =
  | { success: true }
  | { success: false; errors: Record<string, string[]> }
  | null;

export function TestimonialEditForm({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const result = await updateTestimonial(formData);
      return result ?? null;
    },
    null,
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={testimonial.id} />

      <div className="space-y-2">
        <Label htmlFor="clientName">Client Name *</Label>
        <Input
          id="clientName"
          name="clientName"
          defaultValue={testimonial.clientName}
          required
        />
        {state && !state.success && state.errors?.clientName && (
          <p className="text-xs text-red-600">{state.errors.clientName[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Testimonial *</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={testimonial.content}
          required
          rows={6}
        />
        {state && !state.success && state.errors?.content && (
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
          defaultValue={testimonial.rating ?? ""}
          placeholder="Optional"
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
