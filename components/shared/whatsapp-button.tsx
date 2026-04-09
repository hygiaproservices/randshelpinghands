"use client";

import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/consts";

export function WhatsAppButton() {
  return (
    <a
      href={CONTACT.WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_32px_rgba(37,211,102,0.3)] transition-transform hover:scale-110 active:scale-95">
      <MessageCircle className="size-6" />
    </a>
  );
}
