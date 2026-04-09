import Link from "next/link";
import { APP_NAME } from "@/lib/consts";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28 md:py-36">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
          Companionship for Older Adults in Liverpool
        </p>

        <h1 className="mt-6 font-heading text-[3.5rem] leading-[1.1] tracking-tight md:text-[4.5rem]">
          {APP_NAME}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Kind, reliable companionship that helps older adults feel less alone
          and more confident living in their own home.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" render={<Link href="/book-a-visit" />}>
            Book a Free Visit
          </Button>
          <Button
            variant="secondary"
            size="lg"
            render={<Link href="/services" />}>
            Our Services
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-tertiary" />
            DBS Checked
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-secondary" />
            3+ Years Experience
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            Free Initial Visit
          </span>
        </div>
      </div>
    </section>
  );
}
