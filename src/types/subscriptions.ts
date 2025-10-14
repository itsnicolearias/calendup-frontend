import { Calendar, Check, Zap } from "lucide-react";

export interface PlanAttributes {
  planId?: string;
  name: string;
  price: number;
  currency: string;
  features: {
    maxAppointmentsPerMonth?: number;
    services: boolean,
    customBranding: boolean,
    calendarAvailable: boolean,
    zoomAvailable: boolean,
    meetAvailable: boolean,
    prioritySupport: boolean,
    appointmentsPays: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // flexibilidad para más features en el futuro
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SubscriptionAttributes {
  subscriptionId?: string;
  userId: string;
  planId: string;
  status: "active" | "canceled" | "paused";
  startDate: Date;
  endDate?: Date;
  type?: "monthly" | "annual";
  createdAt?: Date;
  updatedAt?: Date;
  plan: PlanAttributes;
}

export const freeBenefits = [
    "Hasta 50 turnos mensuales",
    "Link único de agendamiento",
    "Cancelación automática por email",
    "Recordatorios básicos",
    "Acceso desde cualquier dispositivo",
  ]

 export const premiumBenefits = [
    { icon: Zap, text: "Turnos ilimitados", highlight: true },
    //{ icon: CreditCard, text: "Cobros con Mercado Pago", highlight: true },
    { icon: Calendar, text: "Sincronización Google Calendar", highlight: true },
    { icon: Check, text: "Links automáticos Meet/Zoom", highlight: false },
    { icon: Check, text: "Recordatorios automáticos", highlight: false },
    { icon: Check, text: "Soporte prioritario", highlight: false },
    { icon: Check, text: "Perfil destacado en el portal", highlight: false },
    //{ icon: Check, text: "Estadísticas avanzadas", highlight: false },
  ]