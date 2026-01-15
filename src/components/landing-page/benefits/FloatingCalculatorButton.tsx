"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Timer, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import TimeSavingsCalculatorModal from "./TimeSavingsCalculatorModal"

export default function FloatingCalculatorButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <>
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div
                onClick={() => setIsModalOpen(true)}
                className="w-auto sm:w-auto min-w-[200px] bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:opacity-90 text-white shadow-2xl rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-bold relative overflow-hidden group cursor-pointer"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#ac043f] to-[#0388bd]"
                  animate={{
                    x: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{ opacity: 0.3 }}
                />

                <div className="relative flex items-center justify-center gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <Timer className="w-6 h-6 sm:w-7 sm:h-7" />
                  </motion.div>
                  <span className="hidden sm:inline">¿Cuánto tiempo ahorrás con CalendUp?</span>
                  <span className="sm:hidden">Calculá tu ahorro</span>
                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    →
                  </motion.span>
                </div>

                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMinimized(true)
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show button to reopen if minimized */}
      <AnimatePresence>
        {isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          >
            <Button
              onClick={() => setIsMinimized(false)}
              className="rounded-full w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:opacity-90 shadow-2xl p-0"
            >
              <Timer className="w-6 h-6 sm:w-7 sm:h-7" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <TimeSavingsCalculatorModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
