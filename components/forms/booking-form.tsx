"use client";

import { useActionState } from "react";
import { createBooking } from "@/actions/createBooking";
import { SERVICES } from "@/lib/consts";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

type FormState = {
  success: boolean;
  errors?: Record<string, string[] | undefined>;
} | null;

async function submitBooking(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  return createBooking(formData);
}

export function BookingForm() {
  const [state, action, isPending] = useActionState(submitBooking, null);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg bg-secondary/10 p-8 text-center">
        <CheckCircle className="size-10 text-secondary" />
        <h3 className="font-heading text-xl font-semibold">
          Booking Request Sent!
        </h3>
        <p className="text-sm text-muted-foreground">
          Thank you for your request. We&apos;ll be in touch shortly to confirm
          your visit.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="clientName">Full Name</Label>
          <Input
            id="clientName"
            name="clientName"
            required
            placeholder="Name of person needing care"
          />
          {state?.errors?.clientName && (
            <p className="text-xs text-destructive">
              {state.errors.clientName[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            name="contactPhone"
            type="tel"
            required
            placeholder="07xxx xxxxxx"
          />
          {state?.errors?.contactPhone && (
            <p className="text-xs text-destructive">
              {state.errors.contactPhone[0]}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">
          Email <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="contactEmail"
          name="contactEmail"
          type="email"
          placeholder="your@email.com"
        />
        {state?.errors?.contactEmail && (
          <p className="text-xs text-destructive">
            {state.errors.contactEmail[0]}
          </p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="relationship">Your Relationship</Label>
          <Select name="relationship" required>
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self">Self (I need the visits)</SelectItem>
              <SelectItem value="family-member">Family Member</SelectItem>
              <SelectItem value="carer">Carer / Professional</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {state?.errors?.relationship && (
            <p className="text-xs text-destructive">
              {state.errors.relationship[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Needed</Label>
          <Select name="serviceType" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((service) => (
                <SelectItem key={service.title} value={service.title}>
                  {service.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.serviceType && (
            <p className="text-xs text-destructive">
              {state.errors.serviceType[0]}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Input id="preferredDate" name="preferredDate" type="date" required />
          {state?.errors?.preferredDate && (
            <p className="text-xs text-destructive">
              {state.errors.preferredDate[0]}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredTime">
            Preferred Time{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Select name="preferredTime">
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12pm - 4pm)</SelectItem>
              <SelectItem value="evening">Evening (4pm - 7pm)</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">
          Additional Notes{" "}
          <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Any specific needs, preferences, or questions..."
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Request a Visit"}
      </Button>
    </form>
  );
}
