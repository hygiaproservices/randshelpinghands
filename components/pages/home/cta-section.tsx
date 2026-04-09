import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="bg-surface-container-low px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
          Get Started
        </p>
        <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight md:text-[2.5rem]">
          Your First Visit Is Free
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          No obligation, no pressure. Let&apos;s have a friendly chat to see how
          we can help you or your loved one.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" render={<Link href="/book-a-visit" />}>
            Book a Free Visit
          </Button>
          <Button variant="outline" size="lg" render={<Link href="/contact" />}>
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
