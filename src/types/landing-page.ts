import { Grid, Stethoscope, Scissors, Briefcase, Dumbbell, GraduationCap, LucideIcon } from "lucide-react"
import { UserWithProfile } from "./settings"

export const baseCategories = [
  { id: "salud", name: "Salud", icon: Stethoscope },
  { id: "belleza", name: "Belleza", icon: Scissors },
  { id: "legal", name: "Legal", icon: Briefcase },
  { id: "fitness", name: "Fitness", icon: Dumbbell },
  { id: "educacion", name: "Educación", icon: GraduationCap },
]

export type CategoryType = {
  id: string,
  name: string,
  icon: LucideIcon,
  count: number
}

export function getCategories(professionals: UserWithProfile[]) {
  return [
    {
      id: "todos",
      name: "Todos",
      icon: Grid,
      count: professionals.length,
    },
    ...baseCategories.map((cat) => {
      const count = professionals.filter((p) =>
        categoryMap[cat.id]?.includes(p.profile?.jobTitle ?? "")
      ).length
      return { ...cat, count }
    }),
  ]
}



export const categoryMap: Record<string, string[]> = {
  salud: [
    "Medico",
    "Odontologo",
    "Psicologo",
    "Nutricionista",
    "Fisioterapeuta",
    "Kinesiologo",
    "Enfermero",
    "Terapista ocupacional",
  ],
  belleza: [
    "Esteticista",
    "Podologo",
    "Masajista",
    "Peluquero",
    "Cosmetologo",
  ],
  legal: [
    "Abogado",
    "Contador",
    "Escribano",
    "Asesor financiero",
  ],
  fitness: [
    "Entrenador personal",
    "Coach",
    "Instructor de yoga",
    "Profesor de pilates",
  ],
  educacion: [
    "Profesor",
    "Arquitecto",
    "Ingeniero",
    "Diseñador grafico",
    "Desarrollador",
    "Consultor",
  ],
};
