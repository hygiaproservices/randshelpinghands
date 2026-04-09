"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { APP_NAME, NAV_LINKS, CONTACT } from "@/lib/consts";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface-bright/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-semibold tracking-tight text-primary">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-container-high/60",
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button size="sm" render={<a href={CONTACT.PHONE_HREF} />}>
            <Phone className="size-3.5" data-icon="inline-start" />
            Call Us
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }>
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 bg-surface-container-low">
              <div className="flex flex-col gap-6 pt-8">
                <span className="font-heading text-lg font-semibold text-primary">
                  {APP_NAME}
                </span>
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        pathname === link.href
                          ? "bg-surface-container-high text-primary"
                          : "text-muted-foreground hover:bg-surface-container/60",
                      )}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4">
                  <Button
                    className="w-full"
                    render={<a href={CONTACT.PHONE_HREF} />}>
                    <Phone className="size-4" data-icon="inline-start" />
                    Call Us
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
