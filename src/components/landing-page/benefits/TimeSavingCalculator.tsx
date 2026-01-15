"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import {
  Brain,
  Apple,
  Activity,
  Dumbbell,
  Sparkles,
  Hand,
  Eye,
  Scissors,
  Palette,
  Heart,
  Zap,
  Flower2,
  Target,
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { BookingMethod, bookingMethods, CalculatorResult, ProfessionalType, professionalTypes } from "@/types/calculator"
import { useCelebrationSound } from "@/hooks/useCelebrationSound"
import CalculatorResultCard from "./CalculatorResultCard"
import { toast } from "sonner"

const iconMap = {
  Brain,
  Apple,
  Activity,
  Dumbbell,
  Sparkles,
  Hand,
  Eye,
  Scissors,
  Palette,
  Heart,
  Zap,
  Flower2,
  Target,
  User,
}

export default function TimeSavingsCalculator() {
  const [step, setStep] = useState(1)
  const [professionalType, setProfessionalType] = useState<ProfessionalType | null>(null)
  const [bookingMethod, setBookingMethod] = useState<BookingMethod | null>(null)
  const [weeklyAppointments, setWeeklyAppointments] = useState(30)
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const { playSuccess } = useCelebrationSound()

  const triggerConfetti = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    }

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fire(0.2, {
      spread: 60,
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  const calculateSavings = () => {
    if (!professionalType || !bookingMethod) return

    const profession = professionalTypes.find((p) => p.value === professionalType)
    const method = bookingMethods.find((m) => m.value === bookingMethod)
    if (!profession || !method) return

    const minutesPerBooking = method.timePerBooking
    const calendupMinutes = 1

    const weeklyMinutesSaved = (minutesPerBooking - calendupMinutes) * weeklyAppointments
    const hoursPerWeek = weeklyMinutesSaved / 60
    const hoursPerMonth = hoursPerWeek * 4
    const hoursPerYear = hoursPerWeek * 52
    const daysPerYear = hoursPerYear / 8

    //const hourlyRate = 5000
    //const economicValue = Math.round(hoursPerYear * hourlyRate)

    setResult({
      professionalType: profession.label,
      bookingMethod: method.label,
      weeklyAppointments,
      hoursPerWeek,
      hoursPerMonth,
      hoursPerYear,
      daysPerYear,
      //economicValue,
    })

    // Reproducir sonido y confetti
    setTimeout(() => {
      playSuccess()
      triggerConfetti()
    }, 300)
  }

  const handleShare = async () => {
    if (!result) return

    const text = `¡Ahorraría ${result.hoursPerWeek.toFixed(1)} horas por semana usando CalendUp! 🚀\n\nEso significa ${result.hoursPerYear.toFixed(0)} horas al año que podría usar para atender más clientes o disfrutar tiempo libre.\n\nCalculá tu ahorro: calendup.com/beneficios`

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mi ahorro con CalendUp",
          text: text,
        })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("No se pudo compartir el resultado.")
      }
    } else {
      navigator.clipboard.writeText(text)
      alert("¡Texto copiado al portapapeles!")
    }
  }

  const nextStep = () => {
    if (step === 3) {
      calculateSavings()
      setStep(4)
    } else {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const canProceed = () => {
    if (step === 1) return professionalType !== null
    if (step === 2) return bookingMethod !== null
    if (step === 3) return true
    return false
  }

  const resetCalculator = () => {
    setStep(1)
    setResult(null)
    setProfessionalType(null)
    setBookingMethod(null)
    setWeeklyAppointments(30)
  }

  if (result) {
    return (
      <div className="space-y-6">
        <CalculatorResultCard result={result} onShare={handleShare} />
        <Button variant="outline" onClick={resetCalculator} className="w-full bg-transparent">
          Calcular nuevamente
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-600">Paso {step} de 3</span>
          <span className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
            {Math.round((step / 3) * 100)}% completado
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ac043f] to-[#0388bd]"
            initial={{ width: 0 }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Professional Type */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                ¿Cuál es tu profesión?
              </h3>
              <p className="text-sm text-gray-600">Esto nos ayuda a calcular un estimado más preciso</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-2">
              {professionalTypes.map((type) => {
                const IconComponent = iconMap[type.icon as keyof typeof iconMap]
                const isSelected = professionalType === type.value
                return (
                  <button
                    key={type.value}
                    onClick={() => setProfessionalType(type.value)}
                    className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                      isSelected
                        ? "border-transparent bg-gradient-to-br from-[#ac043f] to-[#0388bd] text-white shadow-lg"
                        : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    <IconComponent className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-white" : "text-gray-600"}`} />
                    <p className={`text-xs font-medium ${isSelected ? "text-white" : "text-gray-900"}`}>{type.label}</p>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Step 2: Booking Method */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                ¿Cómo gestionás tus turnos actualmente?
              </h3>
              <p className="text-sm text-gray-600">Seleccioná tu método principal</p>
            </div>

            <RadioGroup value={bookingMethod || ""} onValueChange={(value) => setBookingMethod(value as BookingMethod)}>
              <div className="space-y-3">
                {bookingMethods.map((method) => {
                  const isSelected = bookingMethod === method.value
                  return (
                    <div
                      key={method.value}
                      className={`relative rounded-xl border-2 p-4 transition-all cursor-pointer ${
                        isSelected
                          ? "border-transparent bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 shadow-md"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                      onClick={() => setBookingMethod(method.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={method.value} id={method.value} className="border-2" />
                        <Label htmlFor={method.value} className="flex-1 cursor-pointer font-medium">
                          {method.label}
                        </Label>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-purple-500" />}
                      </div>
                      <p className="text-xs text-gray-500 ml-9 mt-1">~{method.timePerBooking} minutos por turno</p>
                    </div>
                  )
                })}
              </div>
            </RadioGroup>
          </motion.div>
        )}

        {/* Step 3: Weekly Appointments */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                ¿Cuántos turnos gestionás por semana?
              </h3>
              <p className="text-sm text-gray-600">Mové el control para ajustar la cantidad</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 md:p-8 space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#ac043f] to-[#0388bd] text-white shadow-xl mb-4">
                  <span className="text-4xl md:text-5xl font-bold">{weeklyAppointments}</span>
                </div>
                <p className="text-sm text-gray-600">turnos por semana</p>
              </div>

              <div className="space-y-2">
                <Slider
                  value={[weeklyAppointments]}
                  onValueChange={(value) => setWeeklyAppointments(value[0])}
                  min={10}
                  max={60}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>10 turnos</span>
                  <span>60 turnos</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-2xl font-bold text-gray-900">{weeklyAppointments * 4}</p>
                  <p className="text-xs text-gray-600">por mes</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-2xl font-bold text-gray-900">{weeklyAppointments * 52}</p>
                  <p className="text-xs text-gray-600">por año</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 pt-4">
        {step > 1 && (
          <Button variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>
        )}
        <Button
          onClick={nextStep}
          disabled={!canProceed()}
          className="flex-1 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:opacity-90 text-white font-semibold disabled:opacity-50"
        >
          {step === 3 ? "Ver mi ahorro" : "Siguiente"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
