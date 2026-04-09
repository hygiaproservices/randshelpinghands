import type { Metadata } from "next";
import type { Enquiry, Booking } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  CalendarCheck,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function getStats() {
  const [newEnquiries, upcomingBookings, totalClients, pendingTestimonials] =
    await Promise.all([
      prisma.enquiry.count({ where: { status: "NEW" } }),
      prisma.booking.count({
        where: { status: "CONFIRMED", preferredDate: { gte: new Date() } },
      }),
      prisma.client.count(),
      prisma.testimonial.count({ where: { status: "PENDING" } }),
    ]);

  return { newEnquiries, upcomingBookings, totalClients, pendingTestimonials };
}

async function getRecentEnquiries(): Promise<Enquiry[]> {
  return prisma.enquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

async function getUpcomingBookings(): Promise<Booking[]> {
  return prisma.booking.findMany({
    where: { preferredDate: { gte: new Date() } },
    orderBy: { preferredDate: "asc" },
    take: 5,
  });
}

export default async function DashboardPage() {
  const stats = await getStats();
  const recentEnquiries = await getRecentEnquiries();
  const upcomingBookings = await getUpcomingBookings();

  const statCards = [
    {
      label: "New Enquiries",
      value: stats.newEnquiries,
      icon: MessageSquare,
      href: "/enquiries",
    },
    {
      label: "Upcoming Bookings",
      value: stats.upcomingBookings,
      icon: CalendarCheck,
      href: "/bookings",
    },
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      href: "/clients",
    },
    {
      label: "Pending Reviews",
      value: stats.pendingTestimonials,
      icon: Star,
      href: "/testimonials-manage",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back. Here&apos;s an overview of your activity.
      </p>

      {/* Stats cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent enquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Enquiries</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/enquiries" />}>
              View all
              <ArrowRight className="ml-1 size-3.5" />
            </Button>
          </CardHeader>
          <CardContent>
            {recentEnquiries.length === 0 ? (
              <p className="text-sm text-muted-foreground">No enquiries yet.</p>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((enquiry) => (
                  <div
                    key={enquiry.id}
                    className="flex items-center justify-between rounded-lg bg-surface-container-lowest p-3">
                    <div>
                      <p className="text-sm font-medium">{enquiry.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {enquiry.email}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        enquiry.status === "NEW"
                          ? "bg-primary/10 text-primary"
                          : enquiry.status === "RESPONDED"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                      }`}>
                      {enquiry.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              render={<Link href="/bookings" />}>
              View all
              <ArrowRight className="ml-1 size-3.5" />
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No upcoming bookings.
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg bg-surface-container-lowest p-3">
                    <div>
                      <p className="text-sm font-medium">
                        {booking.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.serviceType} &middot;{" "}
                        {booking.preferredDate.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                        {booking.preferredTime &&
                          ` at ${booking.preferredTime}`}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        booking.status === "PENDING"
                          ? "bg-amber-500/10 text-amber-700"
                          : booking.status === "CONFIRMED"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-muted text-muted-foreground"
                      }`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
