import {
  Clock,
  ShieldCheck,
  Heart,
  Smile,
  Star,
  CalendarCheck,
} from "lucide-react";
import { VALUE_PROPOSITIONS } from "@/lib/consts";

const TRUST_ICONS = [
  <Clock key="0" className="size-5" />,
  <ShieldCheck key="1" className="size-5" />,
  <Heart key="2" className="size-5" />,
  <Smile key="3" className="size-5" />,
  <Star key="4" className="size-5" />,
  <CalendarCheck key="5" className="size-5" />,
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-surface-container-low px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Why Choose Us
          </p>
          <h2 className="mt-4 font-heading text-[2rem] leading-tight tracking-tight md:text-[2.5rem]">
            What Makes Us Different
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_PROPOSITIONS.map((proposition, index) => (
            <div
              key={proposition}
              className="flex items-start gap-4 rounded-lg bg-surface-container-lowest p-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                {TRUST_ICONS[index]}
              </div>
              <p className="text-sm font-medium leading-relaxed">
                {proposition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
