"use client";

import { useActionState } from "react";
import { createEnquiry } from "@/actions/createEnquiry";
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

async function submitEnquiry(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  return createEnquiry(formData);
}

export function ContactForm() {
  const [state, action, isPending] = useActionState(submitEnquiry, null);

  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg bg-secondary/10 p-8 text-center">
        <CheckCircle className="size-10 text-secondary" />
        <h3 className="font-heading text-xl font-semibold">Message Sent!</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for getting in touch. We&apos;ll get back to you as soon as
          possible.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" required placeholder="Your full name" />
        {state?.errors?.name && (
          <p className="text-xs text-destructive">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="your@email.com"
        />
        {state?.errors?.email && (
          <p className="text-xs text-destructive">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input id="phone" name="phone" type="tel" placeholder="07xxx xxxxxx" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
        <Select name="preferredContactMethod">
          <SelectTrigger>
            <SelectValue placeholder="Choose how you'd like us to reply" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="whatsapp">WhatsApp</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help..."
        />
        {state?.errors?.message && (
          <p className="text-xs text-destructive">{state.errors.message[0]}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
