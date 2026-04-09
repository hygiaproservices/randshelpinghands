import type { Metadata } from "next";
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
    "Learn about Ruby and R&S Helping Hands — over 3 years of companionship care experience for older adults in Liverpool.",
};

const CREDENTIALS = [
  {
    icon: <ShieldCheck className="size-5" />,
    label: "DBS Checked",
    description: "Enhanced DBS clearance for your peace of mind",
  },
  {
    icon: <Clock className="size-5" />,
    label: "3+ Years Experience",
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

      {/* Ruby's Story */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-start gap-12 md:grid-cols-5">
            {/* Photo placeholder */}
            <div className="flex items-center justify-center md:col-span-2">
              <div className="rounded-lg bg-surface-container-lowest p-12 text-center">
                <div className="mx-auto flex size-36 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-heading text-5xl text-primary">R</span>
                </div>
                <p className="mt-6 font-heading text-lg font-semibold">Ruby</p>
                <p className="text-sm text-muted-foreground">
                  Founder & Companion
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-6 md:col-span-3">
              <h2 className="font-heading text-[1.75rem] leading-tight tracking-tight">
                My Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hello, my name is Ruby. I provide kind, reliable companionship
                  for older adults in {SERVICE_AREA}, offering support that
                  helps them feel less alone and more confident living in their
                  own home.
                </p>
                <p>
                  With over 3 years of care experience and team leadership, I
                  bring both compassion and professional understanding to every
                  visit. I&apos;ve worked alongside healthcare teams, supported
                  families through difficult transitions, and learned that the
                  smallest acts of kindness often make the biggest difference.
                </p>
                <p>
                  I understand how important it is to feel safe, respected, and
                  listened to. Whether it&apos;s a cup of tea and a chat, help
                  with shopping, or a walk in the park, I&apos;m there to make
                  each day a little brighter.
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
            More Than Just a Service
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
            My goal is to provide not just help, but genuine companionship and
            peace of mind for both clients and their families. Everyone deserves
            to feel valued, heard, and cared for — and that&apos;s what{" "}
            {APP_NAME} is all about.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
              Credentials
            </p>
            <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight">
              Trust & Expertise
            </h2>
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
            I&apos;d love to hear from you. No pressure, just a friendly
            conversation about how I can help.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" render={<Link href="/book-a-visit" />}>
              Book a Free Visit
            </Button>
            <Button
              variant="outline"
              size="lg"
              render={<Link href="/contact" />}>
              Contact Me
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
