import { Star, Quote } from "lucide-react";

const FEATURED_TESTIMONIALS = [
  {
    name: "Margaret T.",
    content:
      "Ruby is wonderful. She brightens up my mum's week with her visits. Always cheerful, patient, and so kind. We feel so much relief knowing she's there.",
    rating: 5,
  },
  {
    name: "David & Karen P.",
    content:
      "Finding Ruby was a blessing. Dad looks forward to their walks together and actually gets excited about her visits. That means the world to us.",
    rating: 5,
  },
  {
    name: "Joan S.",
    content:
      "I was nervous about having someone new in my home, but Ruby put me at ease straight away. She treats me like a friend, not a client.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-tertiary">
            Testimonials
          </p>
          <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight md:text-[2.5rem]">
            What Families Say
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {FEATURED_TESTIMONIALS.map((testimonial) => (
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
              <p className="mt-6 text-sm font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
