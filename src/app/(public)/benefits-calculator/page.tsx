"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import HeroSection from "@/components/landing-page/benefits/HeroSection"
import BenefitsSection from "@/components/landing-page/benefits/BenefitsSection"
import TimeSavingsCalculatorModal from "@/components/landing-page/benefits/TimeSavingsCalculatorModal"

export default function BenefitsPage() {
  const [calculatorOpen, setCalculatorOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        onCalculateClick={() => setCalculatorOpen(true)} />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Stats Section */}

      {/* CTA Section */}
      <section className="relative overflow-hidden py-16 md:py-20 px-4 bg-gradient-to-br from-[#ac043f] to-[#0388bd] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Empezá gratis hoy</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            ¿Listo para transformar tu agenda?
          </h2>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Empezá gratis hoy y descubrí cómo CalendUp puede ayudarte a ahorrar tiempo y hacer crecer tu negocio
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              onClick={() => setCalculatorOpen(true)}
              className="bg-white text-[#0388bd] hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all group"
            >
              Calcular mi ahorro
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl w-full sm:w-auto backdrop-blur-sm"
              >
                Empezar gratis
              </Button>
            </Link>
          </div>

          <p className="text-sm text-white/70">
            ✓ Sin tarjeta de crédito · ✓ Configuración en 5 minutos · ✓ Soporte en español
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* Calculator Modal */}
      <TimeSavingsCalculatorModal open={calculatorOpen} onOpenChange={setCalculatorOpen} />
    </div>
  )
}
