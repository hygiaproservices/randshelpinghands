import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusSelect } from "@/components/admin/status-select";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  updateEnquiryStatus,
  updateEnquiryNotes,
  deleteEnquiry,
} from "@/actions/enquiry.actions";
import { ArrowLeft, Mail, Phone, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = { title: "Enquiry Details" };

const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "RESPONDED", label: "Responded" },
  { value: "CLOSED", label: "Closed" },
];

export default async function EnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enquiry = await prisma.enquiry.findUnique({ where: { id } });

  if (!enquiry) notFound();

  const deleteWithId = deleteEnquiry.bind(null, enquiry.id);

  return (
    <div>
      {/* Header */}
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/enquiries" />}>
        <ArrowLeft className="mr-1 size-4" />
        Back to Enquiries
      </Button>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">
            {enquiry.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Submitted{" "}
            {enquiry.createdAt.toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <StatusSelect
          id={enquiry.id}
          currentStatus={enquiry.status}
          options={STATUS_OPTIONS}
          action={updateEnquiryStatus}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Message */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MessageSquare className="size-4" />
                Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {enquiry.message}
              </p>
            </CardContent>
          </Card>

          {/* Internal Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Internal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateEnquiryNotes} className="space-y-3">
                <input type="hidden" name="id" value={enquiry.id} />
                <Textarea
                  name="internalNotes"
                  defaultValue={enquiry.internalNotes || ""}
                  placeholder="Add private notes about this enquiry..."
                  rows={4}
                />
                <Button type="submit" size="sm">
                  Save Notes
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="text-sm text-primary hover:underline">
                    {enquiry.email}
                  </a>
                </div>
              </div>
              {enquiry.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${enquiry.phone}`}
                      className="text-sm text-primary hover:underline">
                      {enquiry.phone}
                    </a>
                  </div>
                </div>
              )}
              {enquiry.preferredContactMethod && (
                <div className="flex items-center gap-3">
                  <Clock className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Preferred Contact
                    </p>
                    <p className="text-sm capitalize">
                      {enquiry.preferredContactMethod}
                    </p>
                  </div>
                </div>
              )}
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
                Permanently delete this enquiry. This cannot be undone.
              </p>
              <DeleteButton action={deleteWithId} entityName="enquiry" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
