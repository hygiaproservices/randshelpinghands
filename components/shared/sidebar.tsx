"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  CalendarCheck,
  Users,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { APP_NAME } from "@/lib/consts";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/store/sidebar.store";

const SIDEBAR_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Enquiries", href: "/enquiries", icon: MessageSquare },
  { label: "Bookings", href: "/bookings", icon: CalendarCheck },
  { label: "Clients", href: "/clients", icon: Users },
  { label: "Testimonials", href: "/testimonials-manage", icon: Star },
  { label: "Settings", href: "/settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "sticky top-0 z-40 flex h-screen flex-col bg-surface-container-lowest transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-60",
      )}>
      {/* Brand */}
      <div className="flex h-16 items-center gap-2 px-4">
        {!collapsed && (
          <Link
            href="/dashboard"
            className="font-heading text-lg font-semibold tracking-tight text-primary">
            {APP_NAME}
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <TooltipProvider delay={0}>
          {SIDEBAR_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/");
            const Icon = link.icon;

            const linkClasses = cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-surface-container-high/60 hover:text-foreground",
              collapsed && "justify-center px-0",
            );

            if (collapsed) {
              return (
                <Tooltip key={link.href}>
                  <TooltipTrigger
                    render={<Link href={link.href} className={linkClasses} />}>
                    <Icon className="size-5 shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent side="right">{link.label}</TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Link key={link.href} href={link.href} className={linkClasses}>
                <Icon className="size-5 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </TooltipProvider>
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="w-full"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <ChevronLeft className="size-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}
