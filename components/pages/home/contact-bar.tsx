import { Phone, MessageCircle, Mail } from "lucide-react";
import { CONTACT } from "@/lib/consts";

export function ContactBar() {
  return (
    <section className="px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8">
        <a
          href={CONTACT.PHONE_HREF}
          className="flex items-center gap-3 rounded-lg bg-surface-container-lowest px-6 py-4 text-sm font-medium transition-colors hover:bg-surface-container-low">
          <Phone className="size-5 text-primary" />
          {CONTACT.PHONE}
        </a>
        <a
          href={CONTACT.WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg bg-surface-container-lowest px-6 py-4 text-sm font-medium transition-colors hover:bg-surface-container-low">
          <MessageCircle className="size-5 text-secondary" />
          Chat on WhatsApp
        </a>
        <a
          href={CONTACT.EMAIL_HREF}
          className="flex items-center gap-3 rounded-lg bg-surface-container-lowest px-6 py-4 text-sm font-medium transition-colors hover:bg-surface-container-low">
          <Mail className="size-5 text-tertiary" />
          {CONTACT.EMAIL}
        </a>
      </div>
    </section>
  );
}
