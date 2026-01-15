"use client"

import { Sparkles } from "lucide-react"
import FreePlanCard from "./FreePlanCard"
import PremiumPlanCard from "./PremiumPlanCard"

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
            Planes para profesionales como vos
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
            Elegí el plan que mejor se adapta a tu forma de trabajar
          </p>

          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Empieza gratis y gestioná tus turnos en minutos.
            <br />
            Cuando tu agenda crezca, pasá a CalendUp Premium y llevá tu negocio al siguiente nivel.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Plan Gratis */}
          <div className="w-full">
            <FreePlanCard />
          </div>

          {/* Plan Premium */}
          <div className="w-full">
            <PremiumPlanCard />
          </div>
        </div>

        {/* FAQ o información adicional */}
        <div className="mt-16 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-4xl mx-auto border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">¿Tenés dudas?</h2>
            <p className="text-gray-600 mb-6">Estamos acá para ayudarte a elegir el mejor plan para tu negocio.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">💳</div>
                <p className="text-sm font-semibold text-gray-800">Sin permanencia</p>
                <p className="text-xs text-gray-600">Cancelá cuando quieras</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔒</div>
                <p className="text-sm font-semibold text-gray-800">100% Seguro</p>
                <p className="text-xs text-gray-600">Tus datos están protegidos</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💬</div>
                <p className="text-sm font-semibold text-gray-800">Soporte dedicado</p>
                <p className="text-xs text-gray-600">Te ayudamos siempre que lo necesites</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
