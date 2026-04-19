import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSearch } from "@/components/admin/admin-search";
import { StatusSelect } from "@/components/admin/status-select";
import {
  updateTestimonialStatus,
  toggleTestimonialFeatured,
} from "@/actions/testimonial.actions";
import { Star, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Manage Testimonials" };

const STATUS_TABS = [
  { label: "All", value: "all" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

function getStatusStyles(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-primary/10 text-primary";
    case "APPROVED":
      return "bg-secondary/10 text-secondary";
    case "REJECTED":
      return "bg-red-500/10 text-red-600 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default async function TestimonialsManagePage({
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
      status: status as "PENDING" | "APPROVED" | "REJECTED",
    }),
    ...(search && {
      OR: [
        { clientName: { contains: search, mode: "insensitive" as const } },
        { content: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [testimonials, total] = await Promise.all([
    prisma.testimonial.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.testimonial.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Testimonials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} testimonial{total === 1 ? "" : "s"} total
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/testimonials-manage/new" />}>
          <Plus className="mr-1 size-4" />
          Add Testimonial
        </Button>
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
                  href={`/testimonials-manage?status=${tab.value}${search ? `&search=${search}` : ""}`}
                />
              }>
              {tab.label}
            </Button>
          ))}
        </div>
        <AdminSearch placeholder="Search by name or content..." />
      </div>

      {/* List */}
      <div className="mt-6 space-y-3">
        {testimonials.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Star className="size-10 text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground">
                No testimonials found.
              </p>
            </CardContent>
          </Card>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg bg-surface-container-lowest p-4">
              <div className="flex items-start justify-between gap-4">
                <Link
                  href={`/testimonials-manage/${testimonial.id}`}
                  className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">
                      {testimonial.clientName}
                    </p>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        getStatusStyles(testimonial.status),
                      )}>
                      {testimonial.status}
                    </span>
                    {testimonial.isFeatured && (
                      <Star className="size-3.5 fill-amber-500 text-amber-500" />
                    )}
                  </div>
                  {testimonial.rating && (
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-3",
                            i < testimonial.rating!
                              ? "fill-amber-500 text-amber-500"
                              : "text-muted-foreground/30",
                          )}
                        />
                      ))}
                    </div>
                  )}
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </Link>
                <div className="flex shrink-0 items-center gap-3">
                  <FeaturedToggle
                    id={testimonial.id}
                    isFeatured={testimonial.isFeatured}
                  />
                  <StatusSelect
                    id={testimonial.id}
                    currentStatus={testimonial.status}
                    options={STATUS_OPTIONS}
                    action={updateTestimonialStatus}
                  />
                  <Link href={`/testimonials-manage/${testimonial.id}`}>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </Link>
                </div>
              </div>
            </div>
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
                  href={`/testimonials-manage?page=${page - 1}&status=${status}${search ? `&search=${search}` : ""}`}
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
                  href={`/testimonials-manage?page=${page + 1}&status=${status}${search ? `&search=${search}` : ""}`}
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

function FeaturedToggle({
  id,
  isFeatured,
}: {
  id: string;
  isFeatured: boolean;
}) {
  return (
    <form action={toggleTestimonialFeatured}>
      <input type="hidden" name="id" value={id} />
      <input
        type="hidden"
        name="isFeatured"
        value={isFeatured ? "false" : "true"}
      />
      <button
        type="submit"
        className="rounded-md p-1.5 transition-colors hover:bg-surface-container-high"
        title={isFeatured ? "Remove from featured" : "Add to featured"}>
        <Star
          className={cn(
            "size-4",
            isFeatured
              ? "fill-amber-500 text-amber-500"
              : "text-muted-foreground/40",
          )}
        />
      </button>
    </form>
  );
}
