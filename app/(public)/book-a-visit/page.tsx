import type { Metadata } from "next";
import { CalendarCheck, Phone, Shield } from "lucide-react";
import { CONTACT } from "@/lib/consts";
import { BookingForm } from "@/components/forms/booking-form";

export const metadata: Metadata = {
  title: "Book a Visit",
  description:
    "Book a free initial visit with R&S Helping Hands. Companionship for older adults in Liverpool.",
};

export default function BookAVisitPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            Get Started
          </p>
          <h1 className="mt-4 font-heading text-[2.5rem] leading-tight tracking-tight md:text-[3rem]">
            Book a Visit
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Request a visit below. Your first consultation is completely free,
            with no obligation.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-5">
          {/* Booking Form */}
          <div className="rounded-lg bg-surface-container-lowest p-8 lg:col-span-3">
            <h2 className="font-heading text-xl font-semibold">
              Request a Visit
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us a bit about what you&apos;re looking for and we&apos;ll be
              in touch to arrange your visit.
            </p>
            <div className="mt-8">
              <BookingForm />
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8 lg:col-span-2">
            {/* Free visit callout */}
            <div className="rounded-lg bg-tertiary/10 p-6">
              <div className="flex items-start gap-3">
                <CalendarCheck className="mt-0.5 size-5 shrink-0 text-tertiary" />
                <div>
                  <p className="text-sm font-semibold text-tertiary">
                    Free Initial Visit
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your first visit is completely free with no commitment. It's
                    a chance for us to meet, have a chat, and see how we can
                    help.
                  </p>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="space-y-4 rounded-lg bg-surface-container-lowest p-6">
              <h3 className="text-sm font-semibold">What Happens Next?</h3>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    1
                  </span>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll get in touch to confirm your preferred date
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    2
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Ruby will visit for a friendly, no-pressure introduction
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    3
                  </span>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll agree a care plan tailored to your needs
                  </p>
                </li>
              </ol>
            </div>

            {/* Prefer to call */}
            <div className="rounded-lg bg-surface-container-lowest p-6">
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <p className="text-sm font-semibold">Prefer to Talk?</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Give us a call on{" "}
                    <a
                      href={CONTACT.PHONE_HREF}
                      className="font-medium text-primary hover:underline">
                      {CONTACT.PHONE}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* DBS */}
            <div className="rounded-lg bg-surface-container-lowest p-6">
              <div className="flex items-start gap-3">
                <Shield className="mt-0.5 size-5 shrink-0 text-secondary" />
                <div>
                  <p className="text-sm font-semibold">Your Safety Matters</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ruby is fully DBS checked with over 3 years of professional
                    care experience.
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
