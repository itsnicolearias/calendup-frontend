import type { Metadata } from "next";
import "./../globals.css";
import { Toaster } from "sonner"
import PublicNavbar from "@/components/landing-page/landing/Navbar";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "CalendUp",
  description: "Plataforma de gestion de turnos",
   other: {
    "google-site-verification": "pwHIA3WjArT19ea0r1d2cHnWiqyU5vAAb9vLED1TZ9I",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
      <body>
        <PublicNavbar />
        {children}
        <Analytics />
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
    </>
  );
}
