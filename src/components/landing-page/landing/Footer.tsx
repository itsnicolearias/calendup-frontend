"use client";

import { Calendar, HelpCircle } from "lucide-react";

interface FooterProps {
  onNavClick: (section: string) => void;
}

export default function Footer({ onNavClick }: FooterProps) {
  const navProduct = [
    { label: "Características", section: "inicio" },
    { label: "Precios", section: "precios" },
    { label: "Demo", href: "#" },
  ];

  const navSupport = [
    { label: "Preguntas Frecuentes", section: "faq", icon: <HelpCircle className="w-4 h-4 mr-2" /> },
    { label: "Contacto", section: "contacto" },
    { label: "Términos y condiciones", href: "/auth/terms-and-conditions" },
  ];

  const handleClick = (item: typeof navProduct[number] | typeof navSupport[number]) => {
    if ("section" in item) onNavClick(item.section!);
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + Descripción */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold">CalendUp</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              La plataforma más sencilla para gestionar tu agenda profesional y recibir reservas automáticamente.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Producto</h3>
            <ul className="space-y-2 text-gray-400">
              {navProduct.map((item, index) =>
                item.href ? (
                  <li key={index}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={index}>
                    <button
                      onClick={() => handleClick(item)}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              {navSupport.map((item, index) =>
                item.href ? (
                  <li key={index}>
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={index}>
                    <button
                      onClick={() => handleClick(item)}
                      className="hover:text-white transition-colors flex items-center"
                    >
                      {item.icon && item.icon}
                      {item.label}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 CalendUp. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
