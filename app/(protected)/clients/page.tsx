import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminSearch } from "@/components/admin/admin-search";
import { Users, ChevronRight, Plus } from "lucide-react";

export const metadata: Metadata = { title: "Clients" };

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const search = params.search || "";
  const page = Number(params.page) || 1;
  const limit = 20;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { phone: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [clients, total] = await Promise.all([
    prisma.client.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: { _count: { select: { bookings: true } } },
    }),
    prisma.client.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} client{total === 1 ? "" : "s"} total
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/clients/new" />}>
          <Plus className="mr-1 size-4" />
          Add Client
        </Button>
      </div>

      <div className="mt-6">
        <AdminSearch placeholder="Search by name, phone, or email..." />
      </div>

      {/* List */}
      <div className="mt-6 space-y-2">
        {clients.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="size-10 text-muted-foreground/40" />
              <p className="mt-4 text-sm text-muted-foreground">
                No clients found.
              </p>
            </CardContent>
          </Card>
        ) : (
          clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="flex items-center justify-between rounded-lg bg-surface-container-lowest p-4 transition-colors hover:bg-surface-container-low">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{client.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {client.phone}
                  {client.email && ` · ${client.email}`}
                </p>
              </div>
              <div className="ml-4 flex shrink-0 items-center gap-4">
                <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary">
                  {client._count.bookings} booking
                  {client._count.bookings !== 1 ? "s" : ""}
                </span>
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
                  href={`/clients?page=${page - 1}${search ? `&search=${search}` : ""}`}
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
                  href={`/clients?page=${page + 1}${search ? `&search=${search}` : ""}`}
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
