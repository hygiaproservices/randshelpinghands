import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSearch } from "@/components/admin/admin-search";
import { CalendarCheck, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Bookings" };

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Confirmed", value: "CONFIRMED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

function getStatusStyles(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
    case "CONFIRMED":
      return "bg-secondary/10 text-secondary";
    case "COMPLETED":
      return "bg-tertiary/10 text-tertiary";
    case "CANCELLED":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const status = params.status || "all";
  const search = params.search || "";
  const page = Number(params.page) || 1;
  const limit = 20;

  const where = {
    ...(status !== "all" && {
      status: status as "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED",
    }),
    ...(search && {
      OR: [
        { clientName: { contains: search, mode: "insensitive" as const } },
        { serviceType: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [bookings, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { client: { select: { name: true } } },
    }),
    prisma.booking.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div>
        <h1 className="font-heading text-2xl font-semibold">Bookings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} booking{total === 1 ? "" : "s"} total
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1">
          {STATUS_TABS.map((tab) => (
            <Button
              key={tab.value}
              variant={status === tab.value ? "default" : "ghost"}
              size="sm"
              nativeButton={false}
              render={
                <Link
                  href={`/bookings?status=${tab.value}${search ? `&search=${search}` : ""}`}
                />
              }>
              {tab.label}
            </Button>
          ))}
        </div>
        <AdminSearch placeholder="Search by name or service..." />
      </div>

      {/* List */}
      <div className="mt-6 space-y-2">
        {bookings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <CalendarCheck className="size-10 text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground">
                No bookings found.
              </p>
            </CardContent>
          </Card>
        ) : (
          bookings.map((booking) => (
            <Link
              key={booking.id}
              href={`/bookings/${booking.id}`}
              className="flex items-center justify-between rounded-lg bg-surface-container-lowest p-4 transition-colors hover:bg-surface-container-low">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">{booking.clientName}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      getStatusStyles(booking.status),
                    )}>
                    {booking.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {booking.serviceType}
                </p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p className="text-xs font-medium">
                    {booking.preferredDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  {booking.preferredTime && (
                    <p className="text-xs text-muted-foreground">
                      {booking.preferredTime}
                    </p>
                  )}
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          {page > 1 && (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <Link
                  href={`/bookings?page=${page - 1}&status=${status}${search ? `&search=${search}` : ""}`}
                />
              }>
              Previous
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <Link
                  href={`/bookings?page=${page + 1}&status=${status}${search ? `&search=${search}` : ""}`}
                />
              }>
              Next
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
