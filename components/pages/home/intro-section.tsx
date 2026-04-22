import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function IntroSection() {
  return (
    <section className="bg-surface-container-low px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-tertiary">
              About Us
            </p>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight md:text-[2.5rem]">
              Support Centred on the Person
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                We bring over five years of hands-on care experience, alongside
                our journey as student nurses, to provide compassionate support
                that values dignity, independence, and connection.
              </p>
              <p>
                We created R&S Helping Hands because no one should feel
                overlooked, unheard, or forgotten. We focus on meaningful
                one-to-one companionship and calm, reassuring support.
              </p>
            </div>
            <div className="mt-8">
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/about" />}>
                Read Our Story
              </Button>
            </div>
          </div>

          {/* Brand image */}
          <div className="flex items-center justify-center rounded-lg bg-surface-container-lowest p-12">
            <div className="text-center">
              <Image
                src="/logo_transparent.png"
                alt="R&S Helping Hands logo"
                width={200}
                height={200}
                className="mx-auto h-auto w-40"
              />
              <p className="mt-4 text-sm text-muted-foreground">
                R&S — Founders & Companions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
