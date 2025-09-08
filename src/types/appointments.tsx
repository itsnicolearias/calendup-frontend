import { UserWithProfile } from "./settings";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

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
}

export interface GetAllApiResponse<T> {
    count: number;
    pagesQuantity: number;
    rows: T[]
}

export type AvailabilityResponse = {
  [date: string]: string[];
};

export interface AvailableCalendarProps {
  onSelect: (date: string, time: string) => void;
  professionalId: string
  isModal: boolean
}

export interface AppointmentType {
  appointmentTypeId: string
  name: string;
  description?: string;
  price?: number | null;
  sessionType: "in person" | "online";
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