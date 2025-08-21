export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

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
}

export interface AppointmentType {
  appointmentTypeId: string
  name: string;
  description?: string;
  price?: number | null;
  sessionType: "in person" | "online";
  deleted: boolean;
}