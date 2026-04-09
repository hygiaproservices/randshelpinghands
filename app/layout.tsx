import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "R&S Helping Hands | Companionship for Older Adults in Liverpool",
    template: "%s | R&S Helping Hands",
  },
  description:
    "Kind, reliable companionship for older adults in Liverpool. Over 3 years of hands-on care experience. DBS checked. Friendly visits, shopping help, accompaniment, and more.",
  keywords: [
    "companionship Liverpool",
    "elderly care Liverpool",
    "home companion",
    "older adults support",
    "DBS checked carer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} h-full`}
      suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
