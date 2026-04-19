import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSearch } from "@/components/admin/admin-search";
import { MessageSquare, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Enquiries" };

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "New", value: "NEW" },
  { label: "Responded", value: "RESPONDED" },
  { label: "Closed", value: "CLOSED" },
];

function getStatusStyles(status: string) {
  switch (status) {
    case "NEW":
      return "bg-primary/10 text-primary";
    case "RESPONDED":
      return "bg-secondary/10 text-secondary";
    case "CLOSED":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default async function EnquiriesPage({
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
      status: status as "NEW" | "RESPONDED" | "CLOSED",
    }),
    ...(search && {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { email: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [enquiries, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.enquiry.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div>
        <h1 className="font-heading text-2xl font-semibold">Enquiries</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} enquir{total === 1 ? "y" : "ies"} total
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1">
          {STATUS_TABS.map((tab) => (
            <Button
              key={tab.value}
              variant={status === tab.value ? "default" : "ghost"}
              size="sm"
              nativeButton={false}
              render={
                <Link
                  href={`/enquiries?status=${tab.value}${search ? `&search=${search}` : ""}`}
                />
              }>
              {tab.label}
            </Button>
          ))}
        </div>
        <AdminSearch placeholder="Search by name or email..." />
      </div>

      {/* List */}
      <div className="mt-6 space-y-2">
        {enquiries.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <MessageSquare className="size-10 text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground">
                No enquiries found.
              </p>
            </CardContent>
          </Card>
        ) : (
          enquiries.map((enquiry) => (
            <Link
              key={enquiry.id}
              href={`/enquiries/${enquiry.id}`}
              className="flex items-center justify-between rounded-lg bg-surface-container-lowest p-4 transition-colors hover:bg-surface-container-low">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium">{enquiry.name}</p>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      getStatusStyles(enquiry.status),
                    )}>
                    {enquiry.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {enquiry.email}
                </p>
                <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                  {enquiry.message}
                </p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-3">
                <p className="text-xs text-muted-foreground">
                  {enquiry.createdAt.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
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
                  href={`/enquiries?page=${page - 1}&status=${status}${search ? `&search=${search}` : ""}`}
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
                  href={`/enquiries?page=${page + 1}&status=${status}${search ? `&search=${search}` : ""}`}
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
