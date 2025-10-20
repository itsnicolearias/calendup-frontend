export type ProfessionalType =
  | "psychologist"
  | "nutritionist"
  | "kinesiologist"
  | "personal-trainer"
  | "esthetician"
  | "manicurist"
  | "lash-artist"
  | "barber"
  | "makeup-artist"
  | "hairdresser"
  | "massage-therapist"
  | "physiotherapist"
  | "holistic-therapist"
  | "life-coach"
  | "other"

export type BookingMethod = "whatsapp" | "paper" | "google-calendar" | "other-app"

export interface ProfessionData {
  value: ProfessionalType
  label: string
  icon: string
  avgWeeklyAppointments: number
  avgSessionDuration: number
  avgTimePerManualBooking: number
}

export const professionalTypes: ProfessionData[] = [
  {
    value: "psychologist",
    label: "Psicólogo/a",
    icon: "Brain",
    avgWeeklyAppointments: 25,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 10,
  },
  {
    value: "nutritionist",
    label: "Nutricionista",
    icon: "Apple",
    avgWeeklyAppointments: 30,
    avgSessionDuration: 45,
    avgTimePerManualBooking: 8,
  },
  {
    value: "kinesiologist",
    label: "Kinesiólogo/a",
    icon: "Activity",
    avgWeeklyAppointments: 35,
    avgSessionDuration: 45,
    avgTimePerManualBooking: 7,
  },
  {
    value: "personal-trainer",
    label: "Entrenador/a personal",
    icon: "Dumbbell",
    avgWeeklyAppointments: 40,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 6,
  },
  {
    value: "esthetician",
    label: "Esteticista",
    icon: "Sparkles",
    avgWeeklyAppointments: 30,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 8,
  },
  {
    value: "manicurist",
    label: "Manicurista",
    icon: "Hand",
    avgWeeklyAppointments: 45,
    avgSessionDuration: 45,
    avgTimePerManualBooking: 5,
  },
  {
    value: "lash-artist",
    label: "Lashista",
    icon: "Eye",
    avgWeeklyAppointments: 35,
    avgSessionDuration: 90,
    avgTimePerManualBooking: 7,
  },
  {
    value: "barber",
    label: "Barbero/a",
    icon: "Scissors",
    avgWeeklyAppointments: 50,
    avgSessionDuration: 30,
    avgTimePerManualBooking: 5,
  },
  {
    value: "makeup-artist",
    label: "Maquillador/a",
    icon: "Palette",
    avgWeeklyAppointments: 20,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 10,
  },
  {
    value: "hairdresser",
    label: "Peluquero/a",
    icon: "Scissors",
    avgWeeklyAppointments: 45,
    avgSessionDuration: 45,
    avgTimePerManualBooking: 6,
  },
  {
    value: "massage-therapist",
    label: "Masajista",
    icon: "Heart",
    avgWeeklyAppointments: 30,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 8,
  },
  {
    value: "physiotherapist",
    label: "Fisioterapeuta",
    icon: "Zap",
    avgWeeklyAppointments: 35,
    avgSessionDuration: 45,
    avgTimePerManualBooking: 7,
  },
  {
    value: "holistic-therapist",
    label: "Terapeuta holístico/a",
    icon: "Flower2",
    avgWeeklyAppointments: 20,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 10,
  },
  {
    value: "life-coach",
    label: "Coach de vida",
    icon: "Target",
    avgWeeklyAppointments: 15,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 12,
  },
  {
    value: "other",
    label: "Otro",
    icon: "User",
    avgWeeklyAppointments: 25,
    avgSessionDuration: 60,
    avgTimePerManualBooking: 8,
  },
]

export interface BookingMethodData {
  value: BookingMethod
  label: string
  timePerBooking: number
}

export const bookingMethods: BookingMethodData[] = [
  { value: "whatsapp", label: "WhatsApp", timePerBooking: 10 },
  { value: "paper", label: "Agenda de papel", timePerBooking: 8 },
  { value: "google-calendar", label: "Google Calendar", timePerBooking: 7 },
  { value: "other-app", label: "Otra aplicación", timePerBooking: 6 },
]

export interface CalculatorResult {
  professionalType: string
  bookingMethod: string
  weeklyAppointments: number
  hoursPerWeek: number
  hoursPerMonth: number
  hoursPerYear: number
  daysPerYear: number
  //economicValue: number
}
