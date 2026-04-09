import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import { CONTACT, SERVICE_AREA } from "@/lib/consts";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with R&S Helping Hands for a friendly, no-pressure chat about companionship support in Liverpool.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            Get in Touch
          </p>
          <h1 className="mt-4 font-heading text-[2.5rem] leading-tight tracking-tight md:text-[3rem]">
            Contact Us
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Have a question or want to learn more? We&apos;d love to hear from
            you. No pressure, just a friendly chat.
          </p>
        </div>
      </section>

      {/* Form + Details */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-5">
          {/* Contact Form */}
          <div className="rounded-lg bg-surface-container-lowest p-8 lg:col-span-3">
            <h2 className="font-heading text-xl font-semibold">
              Send a Message
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the form below and we&apos;ll get back to you as soon as
              we can.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-8 lg:col-span-2">
            <div className="space-y-6">
              <h2 className="font-heading text-xl font-semibold">
                Other Ways to Reach Us
              </h2>

              <a
                href={CONTACT.PHONE_HREF}
                className="flex items-start gap-4 rounded-lg bg-surface-container-lowest p-5 transition-colors hover:bg-surface-container">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <p className="text-sm text-muted-foreground">
                    {CONTACT.PHONE}
                  </p>
                </div>
              </a>

              <a
                href={CONTACT.WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-lg bg-surface-container-lowest p-5 transition-colors hover:bg-surface-container">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <MessageCircle className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">
                    Chat with us anytime
                  </p>
                </div>
              </a>

              <a
                href={CONTACT.EMAIL_HREF}
                className="flex items-start gap-4 rounded-lg bg-surface-container-lowest p-5 transition-colors hover:bg-surface-container">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-tertiary/10 text-tertiary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {CONTACT.EMAIL}
                  </p>
                </div>
              </a>
            </div>

            <div className="space-y-4 rounded-lg bg-surface-container-lowest p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Service Area</p>
                  <p className="text-sm text-muted-foreground">
                    {SERVICE_AREA} and surrounding areas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <p className="text-sm font-semibold">Availability</p>
                  <p className="text-sm text-muted-foreground">
                    Monday to Saturday, flexible hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
