import z from "zod"
import { AppointmentType } from "./appointments"
import { Review } from "./review"

const timeRangeSchema = z.object({
  start: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
      message: "El formato de hora debe ser HH:mm",
    }),
  end: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/, {
      message: "El formato de hora debe ser HH:mm",
    }),
}).refine(({ start, end }) => start < end, {
  message: "La hora de inicio debe ser anterior a la hora de fin",
})

const availabilitySchema = z.object({
  monday: z.array(timeRangeSchema).optional(),
  tuesday: z.array(timeRangeSchema).optional(),
  wednesday: z.array(timeRangeSchema).optional(),
  thursday: z.array(timeRangeSchema).optional(),
  friday: z.array(timeRangeSchema).optional(),
  saturday: z.array(timeRangeSchema).optional(),
  sunday: z.array(timeRangeSchema).optional(),
})

const insuranceProviders = z.object({
  name: z.string().optional(),
  plan: z.string().optional(),
  notes: z.string().optional()
})

export const profileSchema = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  jobTitle: z.string().optional(),
  appointmentDuration: z.number().optional(),
  availability: availabilitySchema.optional(),
  insuranceProviders: z.array(insuranceProviders).optional(),
  defaultAppConfirmation: z.boolean().optional(),
  markAppAsCompleted: z.boolean().optional(),
  licenseNumber: z.string().optional(),
  profilePicture: z.string().optional(),
  languages: z.array(z.string()).optional(),
  education: z.array(
  z.object({
    title: z.string().min(1, "Título requerido"),
    institution: z.string().min(1, "Institución requerida"),
  })
  ).optional(),
  country: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional()
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export interface UserWithProfile {
  userId: string
  email?: string
  password?: string
  role?: UserRole
  verified?: boolean
  resetToken?: string
  resetTokenExpires?: Date
  createdAt?: Date
  updatedAt?: Date
  profile?: Profile
  AppointmentTypes?: AppointmentType[],
  Reviews?: Review[]
}

export interface Profile {
  //profileId: string
    //userId: string
    name?: string
    lastName?: string
    address?: string
    phone?: string
    jobTitle?: string
    bio?: string
    appointmentDuration?: number
    //createdAt?: Date
    //updatedAt?: Date
    availability?: Availability,
    insuranceProviders?: [],
    licenseNumber?: string,
    defaultAppConfirmation: boolean,
    profilePicture: string,
    markAppAsCompleted: boolean
    country: string
    province: string
    city: string
    education: Education[]
    languages: string[]
}

export type Education = {
  title: string
  institution: string
}

export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export interface TimeSlot {
  start: string // "09:00"
  end: string   // "13:00"
}

export type Availability = {
  [key in WeekDay]: TimeSlot[]
}

export interface ProfileFormProps {
  defaultValues?: ProfileFormValues
  onSubmit: (data: ProfileFormValues) => void
}

export enum UserRole {
    PROFESSIONAL = "professional",
    CLIENT = "client",
    ADMIN = "admin"
}

export const JobTitles = [
  // Salud
  "Medico",
  "Odontologo",
  "Psicologo",
  "Nutricionista",
  "Fisioterapeuta",
  "Kinesiologo",
  "Enfermero",
  "Terapista ocupacional",

  // Belleza
  "Esteticista",
  "Podologo",
  "Masajista",
  "Peluquero",
  "Cosmetologo",

  // Legal & Finanzas
  "Abogado",
  "Contador",
  "Escribano",
  "Asesor financiero",

  // Fitness & Bienestar
  "Entrenador personal",
  "Coach",
  "Instructor de yoga",
  "Profesor de pilates",

  // Educación & Creatividad
  "Profesor",
  "Arquitecto",
  "Ingeniero",
  "Diseñador grafico",
  "Desarrollador",
  "Consultor",
];



export const dayLabels: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export const languageOptions = [
  { value: "es", label: "Español" },
  { value: "en", label: "Inglés" },
  { value: "fr", label: "Francés" },
  { value: "de", label: "Alemán" },
  { value: "pt", label: "Portugués" },
  // podés usar una librería como `iso-639-1` para traer todos los idiomas
];

export type ChangePassword = {
  password: string;
  newPassword: string;
}