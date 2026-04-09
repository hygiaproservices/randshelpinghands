import { HeroSection } from "@/components/pages/home/hero-section";
import { IntroSection } from "@/components/pages/home/intro-section";
import { ServicesSection } from "@/components/pages/home/services-section";
import { WhyChooseUsSection } from "@/components/pages/home/why-choose-us-section";
import { TestimonialsSection } from "@/components/pages/home/testimonials-section";
import { CtaSection } from "@/components/pages/home/cta-section";
import { ContactBar } from "@/components/pages/home/contact-bar";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <CtaSection />
      <ContactBar />
    </>
  );
}
