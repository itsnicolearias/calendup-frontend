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

export interface AppointmentsResponse {
    count: number;
    pagesQuantity: number;
    rows: []
}