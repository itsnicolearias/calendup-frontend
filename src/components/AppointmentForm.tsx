"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AvailableCalendar from "./AvailableCalendar";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { createAppointment } from "@/services/appointments";
import ProfessionalCard from "./ProfessionalCard";

export default function Component() {
  const searchParams = useSearchParams();
  if (searchParams === null) {
    throw new Error();
  }
  const professionalId = searchParams.get("professionalId") || "";

  const [dateF, setDateF] = useState<string>();
  const [time, setTime] = useState<string>("");

  const handleSelect = (date: string, hour: string) => {
    setDateF(date);
    setTime(hour);

    setFormData((prev) => ({
      ...prev,
      date: date,
      time: hour,
    }));
  };

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    professionalId: professionalId,
    email: "",
    reason: "",
    date: "",
    time: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formData.date = dateF || "";

      await createAppointment(formData);
      toast.success("Turno solicitado con éxito", {
        description: "Te enviaremos un email con los detalles.",
        duration: 5000,
      });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 grid-cols-1 md:grid-cols-3 items-start"
      >
        {/* Formulario */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Solicitar Turno
            </CardTitle>
            <CardDescription className="text-center">
              Complete el formulario para reservar su cita
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ingrese su nombre"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input
                  id="apellido"
                  name="lastName"
                  type="text"
                  placeholder="Ingrese su apellido"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input
                id="celular"
                name="phone"
                type="tel"
                placeholder="Ingrese su número de celular"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo de consulta</Label>
              <Input
                id="motivo"
                name="reason"
                type="text"
                placeholder="Ingrese el motivo de consulta"
                required
                value={formData.reason}
                onChange={handleInputChange}
                className="placeholder:text-blue-600 placeholder:font-semibold border-2 border-black-400 focus:border-blue-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Calendario dentro del formulario */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center">
              Selecciona fecha y hora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AvailableCalendar
              onSelect={handleSelect}
              professionalId={formData.professionalId}
            />
          </CardContent>
        </Card>

        {/* Info del profesional */}
        <ProfessionalCard professionalId={professionalId} />

        {/* Botón de enviar en toda la fila */}
        <div className="md:col-span-3">
          <Button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Solicitar Turno
          </Button>
        </div>
      </form>
    </div>
  );
}
