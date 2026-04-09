// =================================================================
// Application Constants
// =================================================================

export const APP_NAME = "R&S Helping Hands";

export const CONTACT = {
  PHONE: "07780346808",
  PHONE_HREF: "tel:+447780346808",
  WHATSAPP: "447780346808",
  WHATSAPP_HREF: "https://wa.me/447780346808",
  EMAIL: "rubybenjaminaboh@gmail.com",
  EMAIL_HREF: "mailto:rubybenjaminaboh@gmail.com",
} as const;

export const SERVICE_AREA = "Liverpool";

export const SERVICES = [
  {
    title: "Friendly Visits & Conversation",
    description:
      "Regular companionship visits for social interaction and emotional support.",
  },
  {
    title: "Help with Shopping & Errands",
    description:
      "Assistance with grocery shopping, picking up prescriptions, and running errands.",
  },
  {
    title: "Accompaniment to Appointments",
    description:
      "Escorting clients to medical appointments, social events, or community activities.",
  },
  {
    title: "Walks & Light Activity",
    description:
      "Gentle walks and light physical activity to promote wellbeing.",
  },
  {
    title: "Light Household Help",
    description: "Tidying, simple meal preparation, and basic household tasks.",
  },
] as const;

export const VALUE_PROPOSITIONS = [
  "Over 3 years hands-on care",
  "DBS checked",
  "Reliable, patient, and compassionate",
  "One-to-one personalised support",
  "Flexible visits to suit your needs",
  "Free initial visit available",
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Visit", href: "/book-a-visit" },
] as const;

export const PAGINATION_LIMIT = 10;
