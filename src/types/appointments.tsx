import { CalendarCheck, CheckCircle, Clock } from "lucide-react";
import { RatingResponse } from "./review";
import { UserWithProfile } from "./settings";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed"| "cancelledByUser" ;

export interface Appointment {
    appointmentId: string
    professionalId: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    date: string;
    time: string;
    reason?: string;
    createdAt: Date;
    updatedAt: Date;
    status: AppointmentStatus;
    professional: UserWithProfile
    appointmentTypeId: string | null;
    appointmentCode: string;
    AppointmentType?: AppointmentType | null;
    selectedAppMode?: AppointmentMode | string;
}

export type AppointmentMode = "in_person" | "online" | "combined" ;

export interface GetOneAppointment {
  appointment: Appointment
  rating: RatingResponse
}

export interface GetAllApiResponse<T> {
    count: number;
    pagesQuantity: number;
    rows: T[]
}

export type AvailabilityResponse  = {
  availableSlots: Record<string, string[]>,
  holidays: Holidays
}

export type Holidays = { date: string; type: string; name: string }[]

export interface AvailableCalendarProps {
  onSelect: (date: string, time: string) => void;
  professionalId: string
  isModal: boolean
  selectedDate?: string; // ahora viene del padre
  selectedHour?: string; // ahora viene del padre
}

export interface AppointmentType {
  appointmentTypeId: string
  name: string;
  description?: string;
  price?: number | null;
  deleted: boolean;
}

export interface ReviewBody {
  reviewId?: string;
  professionalId: string;
  appointmentId: string;
  rating: number; // 1 a 5
  comment?: string | null;
  deleted?: boolean;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
}

export interface GetAllAppResponse<T> {
    appointments: {
      count: number;
      pagesQuantity: number;
      rows: T[]
    },
    createdThisMonth: number;
    
}

export const ModesConfig = {
  combined: { color: "bg-green-100 text-green-800 border-green-200", label: "Modalidad combinada", icon: <CheckCircle className="w-4 h-4" /> },
  in_person: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "presencial", icon: <CalendarCheck className="w-4 h-4" /> },
  online:   { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "online", icon: <Clock className="w-4 h-4" />  },
} as const


export function getModeText(mode: AppointmentMode) {
  return ModesConfig[mode]?.label ?? mode
}