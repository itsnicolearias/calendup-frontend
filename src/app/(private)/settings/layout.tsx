"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/NavBar";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const settingsNav = [
  { name: "Datos personales", href: "/settings/personal" },
  { name: "Suscripción", href: "/settings/subscriptions" },
  { name: "Disponibilidad", href: "/settings/availability" },
  { name: "Configuración de turnos", href: "/settings/appointments" },
  { name: "Seguridad", href: "/settings/security" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar global */}
      <Navbar />

      <div className="flex flex-col sm:flex-row flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 sm:gap-8">
        {/* Botón hamburguesa móvil */}
        <div className="sm:hidden mb-4">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md bg-gray-200 font-medium">
                ☰ Configuración
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-4">
              <nav className="space-y-1">
                {settingsNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      pathname === item.href && "bg-muted text-primary"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Layout desktop */}
        <aside className="hidden sm:block w-64 border-r pr-4">
    <h2 className="text-lg font-semibold mb-4">Configuración</h2>
    <nav className="space-y-1">
      {settingsNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
            pathname === item.href && "bg-muted text-primary"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  </aside>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
