import "dotenv/config";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

async function seed() {
  console.log("Seeding admin user...");

  const email = "ruby.benjaminaboh@randshelpinghands.co.uk";

  // Check if user already exists
  const existing = await prisma.user.findFirst({ where: { email } });
  if (existing) {
    console.log(`User already exists: ${email} — updating role to CRIMSON`);
    await prisma.user.update({
      where: { id: existing.id },
      data: { role: "CRIMSON" },
    });
    console.log("Done.");
    process.exit(0);
  }

  const user = await auth.api.signUpEmail({
    body: {
      name: "Ruby Benjamin-Aboh",
      email,
      password: "Randshelping2025!",
    },
  });

  // Update user role to CRIMSON (owner)
  await prisma.user.update({
    where: { id: user.user.id },
    data: { role: "CRIMSON" },
  });

  console.log(`Admin user created: ${user.user.email} (CRIMSON role)`);
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
