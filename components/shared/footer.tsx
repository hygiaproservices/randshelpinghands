import Link from "next/link";
import { Heart } from "lucide-react";
import { APP_NAME, CONTACT, NAV_LINKS, SERVICE_AREA } from "@/lib/consts";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-low">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <span className="font-heading text-xl font-semibold text-primary">
              {APP_NAME}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Kind, reliable companionship for older adults in {SERVICE_AREA}.
              Helping them feel less alone and more confident at home.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/80 transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={CONTACT.PHONE_HREF}
                className="text-sm text-foreground/80 transition-colors hover:text-primary">
                {CONTACT.PHONE}
              </a>
              <a
                href={CONTACT.EMAIL_HREF}
                className="text-sm text-foreground/80 transition-colors hover:text-primary">
                {CONTACT.EMAIL}
              </a>
              <a
                href={CONTACT.WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary transition-colors hover:text-secondary/80">
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Trust */}
          <div className="space-y-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Trust & Safety
            </h3>
            <div className="flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-tertiary/10 px-3 py-1.5 text-xs font-medium text-tertiary">
                DBS Checked
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary">
                3+ Years Experience
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
                Serving {SERVICE_AREA}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            &copy; {currentYear} {APP_NAME}. Made with
            <Heart className="size-3 fill-primary text-primary" />
            in {SERVICE_AREA}.
          </p>
          <p className="text-xs text-muted-foreground">
            Companionship for older adults
          </p>
        </div>
      </div>
    </footer>
  );
}
