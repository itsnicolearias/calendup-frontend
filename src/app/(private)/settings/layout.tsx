"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/NavBar"; // 👈 tu componente de navbar

const settingsNav = [
  { name: "Datos personales", href: "/settings/personal" },
  { name: "Disponibilidad", href: "/settings/availability" },
  { name: "Configuración de turnos", href: "/settings/appointments" },
  { name: "Seguridad", href: "/settings/security" },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🔹 Navbar global */}
      <Navbar />

      {/* 🔹 Sidebar + contenido */}
      <div className="flex flex-1 max-w-6xl mx-auto w-full p-6 gap-8">
        {/* Sidebar */}
        <aside className="w-64 border-r pr-4">
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
