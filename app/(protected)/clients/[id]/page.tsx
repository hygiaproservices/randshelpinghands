import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteClient } from "@/actions/client.actions";
import { ClientEditForm } from "./client-edit-form";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  UserRound,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Client Details" };

function getBookingStatusStyles(status: string) {
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

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      bookings: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });

  if (!client) notFound();

  const deleteWithId = deleteClient.bind(null, client.id);

  return (
    <div>
      {/* Header */}
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={<Link href="/clients" />}>
        <ArrowLeft className="mr-1 size-4" />
        Back to Clients
      </Button>

      <div className="mt-4">
        <h1 className="font-heading text-2xl font-semibold">{client.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Client since{" "}
          {client.createdAt.toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Edit Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientEditForm client={client} />
            </CardContent>
          </Card>

          {/* Booking History */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Booking History</CardTitle>
              <span className="text-xs text-muted-foreground">
                {client.bookings.length} booking
                {client.bookings.length !== 1 ? "s" : ""}
              </span>
            </CardHeader>
            <CardContent>
              {client.bookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <CalendarCheck className="size-8 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No bookings yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {client.bookings.map((booking) => (
                    <Link
                      key={booking.id}
                      href={`/bookings/${booking.id}`}
                      className="flex items-center justify-between rounded-lg bg-surface-container-low p-3 transition-colors hover:bg-surface-container-high">
                      <div>
                        <p className="text-sm font-medium">
                          {booking.serviceType}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.preferredDate.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            getBookingStatusStyles(booking.status),
                          )}>
                          {booking.status}
                        </span>
                        <ChevronRight className="size-4 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <a
                    href={`tel:${client.phone}`}
                    className="text-sm text-primary hover:underline">
                    {client.phone}
                  </a>
                </div>
              </div>
              {client.email && (
                <div className="flex items-center gap-3">
                  <Mail className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${client.email}`}
                      className="break-all text-sm text-primary hover:underline">
                      {client.email}
                    </a>
                  </div>
                </div>
              )}
              {client.address && (
                <div className="flex items-center gap-3">
                  <MapPin className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm">{client.address}</p>
                  </div>
                </div>
              )}
              {client.nextOfKin && (
                <div className="flex items-center gap-3">
                  <UserRound className="size-4 shrink-0 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Next of Kin</p>
                    <p className="text-sm">{client.nextOfKin}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {client.medicalNotes && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Medical Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {client.medicalNotes}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base text-red-600 dark:text-red-400">
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-3 text-xs text-muted-foreground">
                Permanently delete this client and unlink all bookings.
              </p>
              <DeleteButton action={deleteWithId} entityName="client" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
