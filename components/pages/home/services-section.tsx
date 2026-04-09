import Link from "next/link";
import { Users, ShoppingBag, Calendar, Footprints, Home } from "lucide-react";
import { SERVICES } from "@/lib/consts";
import { ServiceCard } from "@/components/shared/service-card";
import { Button } from "@/components/ui/button";

const SERVICE_ICONS = [
  <Users key="visits" className="size-6" />,
  <ShoppingBag key="shopping" className="size-6" />,
  <Calendar key="appointments" className="size-6" />,
  <Footprints key="walks" className="size-6" />,
  <Home key="household" className="size-6" />,
];

export function ServicesSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            What We Offer
          </p>
          <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight md:text-[2.5rem]">
            Our Services
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Personalised companionship tailored to suit your needs, from social
            visits to practical help around the home.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={SERVICE_ICONS[index]}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" render={<Link href="/services" />}>
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
