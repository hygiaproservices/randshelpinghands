import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  ShoppingBag,
  Calendar,
  Footprints,
  Home,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { SERVICES, SERVICE_AREA } from "@/lib/consts";
import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our companionship services — friendly visits, shopping help, accompaniment to appointments, walks, and light household help in Liverpool.",
};

const SERVICE_ICONS = [
  <Users key="visits" className="size-6" />,
  <ShoppingBag key="shopping" className="size-6" />,
  <Calendar key="appointments" className="size-6" />,
  <Footprints key="walks" className="size-6" />,
  <Home key="household" className="size-6" />,
];

const WHAT_TO_EXPECT = [
  "A friendly, no-obligation initial visit to discuss your needs",
  "Personalised care plans tailored to each individual",
  "Consistent, reliable visits at times that suit you",
  "Regular communication with family members if desired",
  "Flexibility to adjust services as needs change",
  "Full DBS-checked companion for your peace of mind",
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            What We Offer
          </p>
          <h1 className="mt-4 font-heading text-[2.5rem] leading-tight tracking-tight md:text-[3rem]">
            Our Services
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            We offer a range of personalised companionship services, tailored to
            suit your needs. Every visit is different because every person is
            unique.
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={SERVICE_ICONS[index]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-start gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
                How It Works
              </p>
              <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight">
                What to Expect
              </h2>
              <p className="mt-4 text-muted-foreground">
                From the very first call, we keep things simple and friendly.
                There&apos;s no pressure and no complicated process — just
                honest, caring support.
              </p>
            </div>

            <div className="space-y-4">
              {WHAT_TO_EXPECT.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-secondary" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="size-5 text-primary" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Service Area
            </p>
          </div>
          <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight">
            Serving {SERVICE_AREA} and Surrounding Areas
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            We provide companionship services across {SERVICE_AREA} and its
            surrounding areas. If you&apos;re unsure whether we cover your
            location, get in touch — we&apos;re happy to have a chat.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" render={<Link href="/book-a-visit" />}>
              Book a Free Visit
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/contact" />}>
              Ask About Your Area
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
