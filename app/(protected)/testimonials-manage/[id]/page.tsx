import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusSelect } from "@/components/admin/status-select";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  updateTestimonialStatus,
  toggleTestimonialFeatured,
  deleteTestimonial,
} from "@/actions/testimonial.actions";
import { TestimonialEditForm } from "./testimonial-edit-form";
import { ArrowLeft, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Testimonial Details" };

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export default async function TestimonialDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) notFound();

  const deleteWithId = deleteTestimonial.bind(null, testimonial.id);

  return (
    <div>
      {/* Header */}
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/testimonials-manage" />}>
        <ArrowLeft className="mr-1 size-4" />
        Back to Testimonials
      </Button>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">
            {testimonial.clientName}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            {testimonial.rating && (
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < testimonial.rating!
                        ? "fill-amber-500 text-amber-500"
                        : "text-muted-foreground/30",
                    )}
                  />
                ))}
              </div>
            )}
            <span className="text-sm text-muted-foreground">
              Submitted{" "}
              {testimonial.createdAt.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <StatusSelect
          id={testimonial.id}
          currentStatus={testimonial.status}
          options={STATUS_OPTIONS}
          action={updateTestimonialStatus}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Testimonial Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Testimonial</CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="border-l-2 border-secondary/30 pl-4 text-sm italic text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
            </CardContent>
          </Card>

          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Edit Testimonial</CardTitle>
            </CardHeader>
            <CardContent>
              <TestimonialEditForm testimonial={testimonial} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Featured Toggle */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Featured</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-xs text-muted-foreground">
                Featured testimonials appear on the public website.
              </p>
              <form action={toggleTestimonialFeatured}>
                <input type="hidden" name="id" value={testimonial.id} />
                <input
                  type="hidden"
                  name="isFeatured"
                  value={testimonial.isFeatured ? "false" : "true"}
                />
                <Button
                  type="submit"
                  variant={testimonial.isFeatured ? "default" : "outline"}
                  size="sm"
                  className="w-full">
                  <Star
                    className={cn(
                      "mr-1 size-4",
                      testimonial.isFeatured && "fill-current",
                    )}
                  />
                  {testimonial.isFeatured ? "Featured" : "Mark as Featured"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-red-600 dark:text-red-400">
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-xs text-muted-foreground">
                Permanently delete this testimonial. This cannot be undone.
              </p>
              <DeleteButton action={deleteWithId} entityName="testimonial" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
