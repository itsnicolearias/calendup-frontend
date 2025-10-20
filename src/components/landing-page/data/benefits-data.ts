import { CalculatorResult } from "@/types/calculator"
import { Award, Clock, Shield, TrendingUp, Users, Zap } from "lucide-react"

export const benefits = [
  {
    icon: Clock,
    title: "Ahorrá tiempo valioso",
    description: "Automatizá la gestión de turnos y recuperá hasta 10 horas por semana para dedicarlas a tu negocio",
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-50 to-rose-50",
  },
  {
    icon: Award,
    title: "Experiencia profesional",
    description: "Ofrecé una experiencia moderna y fluida que encanta a tus clientes desde el primer contacto",
    gradient: "from-purple-500 to-indigo-500",
    bgGradient: "from-purple-50 to-indigo-50",
  },
  {
    icon: TrendingUp,
    title: "Aumentá tus ingresos",
    description: "Usá el tiempo ahorrado para atender más clientes y hacer crecer tu negocio de forma sostenible",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
]

export const extraBenefits = [
  {
    icon: Zap,
    title: "Confirmación automática",
    description: "Sin ida y vuelta por WhatsApp",
  },
  {
    icon: Users,
    title: "Agenda organizada",
    description: "Visualizá todos tus turnos en un solo lugar",
  },
  {
    icon: Shield,
    title: "Recordatorios automáticos",
    description: "Reducí las ausencias de clientes",
  },
]

export const chartData =  (result: CalculatorResult) => [
    { name: "Con CalendUp", value: 5, color: "#ec4899" },
    { name: "Gestión Manual", value: result.hoursPerWeek, color: "#e5e7eb" },
]

export const shareText = (result: CalculatorResult) =>  `¡Ahorraría ${result.hoursPerWeek.toFixed(1)} horas por semana usando CalendUp! 🚀

Eso significa ${result.hoursPerYear.toFixed(0)} horas al año que podría usar para atender más clientes o disfrutar tiempo libre.

Calculá tu ahorro en calendup.com/beneficios`

export const benefitsShareUrl = `${process.env.NEXT_PUBLIC_FRONT_URL}/benefits-calculator`