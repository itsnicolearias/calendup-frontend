import z from "zod"

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

export const profileSchema = z.object({
  name: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  jobTitle: z.string().optional(),
  appointmentDuration: z.number().optional(),
  availability: availabilitySchema.optional()
})

export type ProfileFormValues = z.infer<typeof profileSchema>

export interface UserWithProfile {
  //userId: string
  email?: string
  password?: string
  role?: UserRole
  verified?: boolean
  resetToken?: string
  resetTokenExpires?: Date
  createdAt?: Date
  updatedAt?: Date
  profile?: {
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
    availability?: Availability
  }
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
  "Psicólogo/a", "Nutricionista", "Fisioterapeuta", "Coach", "Médico/a", "Odontólogo/a",
  "Esteticista", "Podólogo/a", "Kinesiólogo/a", "Terapista ocupacional", "Masajista", "Mecanico/a", "Abogado/a", "Contador/a", "Arquitecto/a", "Ingeniero/a", "Diseñador/a gráfico/a"
]


export const dayLabels: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};