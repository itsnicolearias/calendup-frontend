import type { Metadata } from "next";
import "./../globals.css";
import { Toaster } from "sonner"
import PublicNavbar from "@/components/landing-page/landing/Navbar";

export const metadata: Metadata = {
  title: "CalendUp",
  description: "Plataforma de gestion de turnos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <PublicNavbar />
    {children}
    <Toaster richColors position="bottom-right" />
    </>
  );
}
