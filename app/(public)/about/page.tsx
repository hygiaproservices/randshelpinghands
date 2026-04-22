import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Heart,
  Clock,
  Award,
  Users,
  Sparkles,
} from "lucide-react";
import { APP_NAME, SERVICE_AREA } from "@/lib/consts";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about R&S Helping Hands and our compassion-led approach to one-to-one companionship and support in Liverpool.",
};

const CREDENTIALS = [
  {
    icon: <ShieldCheck className="size-5" />,
    label: "DBS Checked",
    description: "Enhanced DBS clearance for your peace of mind",
  },
  {
    icon: <Clock className="size-5" />,
    label: "5+ Years Experience",
    description: "Hands-on care experience and team leadership",
  },
  {
    icon: <Heart className="size-5" />,
    label: "Genuinely Caring",
    description: "Compassion-first approach to every visit",
  },
  {
    icon: <Award className="size-5" />,
    label: "Professional Training",
    description: "Trained in person-centred care practices",
  },
  {
    icon: <Users className="size-5" />,
    label: "Family Focused",
    description: "Working closely with families for joined-up care",
  },
  {
    icon: <Sparkles className="size-5" />,
    label: "Personalised Approach",
    description: "No two visits are the same — tailored to you",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            About Us
          </p>
          <h1 className="mt-4 font-heading text-[2.5rem] leading-tight tracking-tight md:text-[3rem]">
            About {APP_NAME}
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-start gap-12 md:grid-cols-5">
            {/* Brand */}
            <div className="flex items-center justify-center md:col-span-2">
              <div className="rounded-lg bg-surface-container-lowest p-12 text-center">
                <Image
                  src="/logo_transparent.png"
                  alt="R&S Helping Hands logo"
                  width={180}
                  height={180}
                  className="mx-auto h-auto w-40"
                  priority
                />
                <p className="mt-6 font-heading text-lg font-semibold">
                  R&S Helping Hands
                </p>
                <p className="text-sm text-muted-foreground">
                  Founders & Companions
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-6 md:col-span-3">
              <h2 className="font-heading text-[1.75rem] leading-tight tracking-tight">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At R&S Helping Hands, everything we do is rooted in
                  compassion, dignity, and a deep respect for every
                  individual&apos;s independence and story.
                </p>
                <p>
                  As student nurses, we have had the privilege of supporting a
                  wide range of individuals. Alongside this, we bring over five
                  years of hands-on experience in the care sector, where we have
                  seen first-hand the quiet struggles many elderly and
                  vulnerable people face each day.
                </p>
                <p>
                  We have seen what it means to feel alone in a place that
                  should feel like home, to go without meaningful conversation,
                  and to receive support that meets physical needs but overlooks
                  emotional ones. These experiences stayed with us and shaped
                  our purpose.
                </p>
                <p>
                  We began to recognise a pattern: many individuals are living
                  alone, often distanced from family, carrying a loneliness that
                  is rarely spoken about and too often left unaddressed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-tertiary">
            Our Mission
          </p>
          <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight md:text-[2.5rem]">
            Why We Exist
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            {APP_NAME} was created to offer something more. We provide
            personalised one-to-one companionship and support that is centred
            not just on what someone needs, but on who they are. We take the
            time to build trust, to understand each individual, and to create
            meaningful moments through conversation, shared activities, or
            simply being present.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Our Promise
            </p>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight">
              Accessible, Affordable, High Standard Care
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
              We are deeply committed to keeping our services accessible and
              affordable, without compromising on quality. We believe true
              support goes beyond assistance. It is about presence, connection,
              and the reassurance that no one feels overlooked, unheard, or
              forgotten.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred.label}
                className="flex items-start gap-4 rounded-lg bg-surface-container-lowest p-6">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  {cred.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold">{cred.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {cred.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-[2rem] leading-tight tracking-tight">
            Ready to Chat?
          </h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;d love to hear from you. No pressure, just a warm and friendly
            conversation about how we can support you or someone you care about
            in {SERVICE_AREA}.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/book-a-visit" />}>
              Book a Free Visit
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/contact" />}>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
