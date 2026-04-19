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
  updateBookingStatus,
  updateBookingNotes,
  assignBookingClient,
  deleteBooking,
} from "@/actions/booking.actions";
import {
  ArrowLeft,
  Phone,
  Mail,
  CalendarDays,
  Clock,
  User,
  Briefcase,
  Users,
} from "lucide-react";

export const metadata: Metadata = { title: "Booking Details" };

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { client: true },
  });

  if (!booking) notFound();

  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  const deleteWithId = deleteBooking.bind(null, booking.id);

  return (
    <div>
      {/* Header */}
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/bookings" />}>
        <ArrowLeft className="mr-1 size-4" />
        Back to Bookings
      </Button>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">
            {booking.clientName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {booking.serviceType} &middot;{" "}
            {booking.preferredDate.toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <StatusSelect
          id={booking.id}
          currentStatus={booking.status}
          options={STATUS_OPTIONS}
          action={updateBookingStatus}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Booking Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Briefcase className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="text-xs text-muted-foreground">Service</dt>
                    <dd className="text-sm font-medium">
                      {booking.serviceType}
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      Preferred Date
                    </dt>
                    <dd className="text-sm font-medium">
                      {booking.preferredDate.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </dd>
                  </div>
                </div>
                {booking.preferredTime && (
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <dt className="text-xs text-muted-foreground">
                        Preferred Time
                      </dt>
                      <dd className="text-sm font-medium">
                        {booking.preferredTime}
                      </dd>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <dt className="text-xs text-muted-foreground">
                      Relationship
                    </dt>
                    <dd className="text-sm font-medium capitalize">
                      {booking.relationship.replace("-", " ")}
                    </dd>
                  </div>
                </div>
              </dl>
              {booking.notes && (
                <div className="mt-6 rounded-lg bg-surface-container-low p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Client Notes
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                    {booking.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Visit Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Visit Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={updateBookingNotes} className="space-y-3">
                <input type="hidden" name="id" value={booking.id} />
                <Textarea
                  name="visitNotes"
                  defaultValue={booking.visitNotes || ""}
                  placeholder="Add notes about this visit..."
                  rows={4}
                />
                <Button type="submit" size="sm">
                  Save Notes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Link to Client */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Linked Client</CardTitle>
            </CardHeader>
            <CardContent>
              {booking.client ? (
                <div className="flex items-center justify-between rounded-lg bg-surface-container-low p-4">
                  <div>
                    <p className="text-sm font-medium">{booking.client.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.client.phone}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    nativeButton={false}
                    render={<Link href={`/clients/${booking.client.id}`} />}>
                    View Client
                  </Button>
                </div>
              ) : (
                <form
                  action={assignBookingClient}
                  className="flex items-end gap-3">
                  <input type="hidden" name="id" value={booking.id} />
                  <div className="flex-1">
                    <label
                      htmlFor="clientId"
                      className="mb-1 block text-xs text-muted-foreground">
                      Assign to existing client
                    </label>
                    <select
                      name="clientId"
                      id="clientId"
                      className="w-full rounded-lg border-0 bg-surface-container-high px-3 py-2 text-sm outline-none">
                      <option value="">Select a client...</option>
                      {clients.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit" size="sm">
                    Assign
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Contact Name</p>
                  <p className="text-sm font-medium">{booking.clientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${booking.contactPhone}`}
                    className="text-sm text-primary hover:underline">
                    {booking.contactPhone}
                  </a>
                </div>
              </div>
              {booking.contactEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${booking.contactEmail}`}
                      className="break-all text-sm text-primary hover:underline">
                      {booking.contactEmail}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-red-600 dark:text-red-400">
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-xs text-muted-foreground">
                Permanently delete this booking. This cannot be undone.
              </p>
              <DeleteButton action={deleteWithId} entityName="booking" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
