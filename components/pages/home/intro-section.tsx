import Link from "next/link";
import { Button } from "@/components/ui/button";

export function IntroSection() {
  return (
    <section className="bg-surface-container-low px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-tertiary">
              About Ruby
            </p>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight md:text-[2.5rem]">
              A Friendly Face You Can Trust
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Hello, I&apos;m Ruby. With over 3 years of hands-on care
                experience and team leadership, I understand how important it is
                to feel safe, respected, and listened to.
              </p>
              <p>
                I started R&S Helping Hands because I believe every older adult
                deserves genuine companionship — not just a service, but someone
                who truly cares about their wellbeing and happiness.
              </p>
            </div>
            <div className="mt-8">
              <Button variant="outline" render={<Link href="/about" />}>
                Read My Story
              </Button>
            </div>
          </div>

          {/* Placeholder for Ruby's photo */}
          <div className="flex items-center justify-center rounded-lg bg-surface-container-lowest p-12">
            <div className="text-center">
              <div className="mx-auto flex size-32 items-center justify-center rounded-full bg-primary/10">
                <span className="font-heading text-4xl text-primary">R</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Ruby — Founder & Companion
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
