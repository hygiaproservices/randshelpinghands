import type { Metadata } from "next";
import Link from "next/link";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what clients and families say about R&S Helping Hands companionship services in Liverpool.",
};

const TESTIMONIALS = [
  {
    name: "Margaret T.",
    relationship: "Daughter of client",
    content:
      "Ruby is wonderful. She brightens up my mum's week with her visits. Always cheerful, patient, and so kind. We feel so much relief knowing she's there.",
    rating: 5,
  },
  {
    name: "David & Karen P.",
    relationship: "Son & daughter-in-law",
    content:
      "Finding Ruby was a blessing. Dad looks forward to their walks together and actually gets excited about her visits. That means the world to us.",
    rating: 5,
  },
  {
    name: "Joan S.",
    relationship: "Client",
    content:
      "I was nervous about having someone new in my home, but Ruby put me at ease straight away. She treats me like a friend, not a client.",
    rating: 5,
  },
  {
    name: "Mary W.",
    relationship: "Client",
    content:
      "Having someone to chat with and help me with my shopping has made such a difference. I feel less isolated and more like myself again.",
    rating: 5,
  },
  {
    name: "James H.",
    relationship: "Son of client",
    content:
      "Mum's demeanour has completely changed since Ruby started visiting. She's more talkative, more engaged. We can't thank Ruby enough.",
    rating: 5,
  },
  {
    name: "Patricia L.",
    relationship: "Client",
    content:
      "Ruby always remembers the little things — my favourite biscuits, which programmes I like. It's those details that show she genuinely cares.",
    rating: 5,
  },
];

export default function TestimonialsPage() {
  return (
    <>
      {/* Header */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-tertiary">
            Kind Words
          </p>
          <h1 className="mt-4 font-heading text-[2.5rem] leading-tight tracking-tight md:text-[3rem]">
            Testimonials
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Hear from the families and clients we&apos;ve had the privilege of
            supporting.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="bg-surface-container-low px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="relative rounded-lg bg-surface-container-lowest p-8">
                <Quote className="absolute right-6 top-6 size-8 text-primary/10" />
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-tertiary text-tertiary"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.relationship}
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
            Ready to Experience the Difference?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join the families who trust R&S Helping Hands for kind, reliable
            companionship.
          </p>
          <div className="mt-8">
            <Button size="lg" render={<Link href="/book-a-visit" />}>
              Book a Free Visit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
