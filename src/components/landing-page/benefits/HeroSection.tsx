"use client"

import { Button } from "@/components/ui/button"
import { Clock, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface HeroSectionProps {
  onCalculateClick: () => void
}

export default function HeroSection({ onCalculateClick }: HeroSectionProps) {
  return (
    <>
    <section className="relative overflow-hidden bg-gradient-to-br from-[#ac043f] to-[#0388bd] text-white py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Muchos profesionales ya confían en CalendUp</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Descubrí cuánto tiempo podés{" "}
              <span className="bg-gradient-to-r from-[#3d8cac] to-[#6babc4] bg-clip-text text-transparent">
                ahorrar
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Gestioná tus turnos automáticamente y recuperá horas valiosas cada semana para dedicarlas a lo que
              realmente importa
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onCalculateClick}
                className="bg-white text-[#0388bd] hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all group"
              >
                <Clock className="w-5 h-5 mr-2" />
                Calcular mi ahorro
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Calculadora gratuita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Sin registro</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>Resultado inmediato</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Círculos animados de fondo */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full animate-pulse" />
              <div className="absolute inset-8 bg-white/20 backdrop-blur-sm rounded-full animate-pulse" style={{ animationDelay: "150ms" }} />
              <div className="absolute inset-16 bg-white/30 backdrop-blur-sm rounded-full animate-pulse"  style={{ animationDelay: "300ms" }}/>

              {/* Icono central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-2xl pointer-events-none">
                  <Clock className="w-24 h-24 md:w-32 md:h-32 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-10 right-10 bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold">8h</div>
                <div className="text-xs">por semana</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute bottom-10 left-10 bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-xl"
              >
                <div className="text-2xl font-bold">32h</div>
                <div className="text-xs">por mes</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-br from-pink-400/30 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-gradient-to-tr from-blue-400/30 to-transparent rounded-full blur-3xl pointer-events-none" />
    </section>

    </>

  )
}
