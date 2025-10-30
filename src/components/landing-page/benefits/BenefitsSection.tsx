"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { benefits, extraBenefits } from "../data/benefits-data"

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
              ¿Por qué elegir CalendUp?
            </h2>
            { /**<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Más de 10,000 profesionales ya transformaron su forma de trabajar
            </p> **/ }
          </motion.div>
        </div>

        {/* Main benefits */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className={`h-2 bg-gradient-to-r ${benefit.gradient}`} />
                <CardContent className={`p-6 md:p-8 bg-gradient-to-br ${benefit.bgGradient}`}>
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <benefit.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Extra benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-[#ac043f] to-[#0388bd] rounded-2xl md:rounded-3xl p-[2px] shadow-xl">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                Y además...
              </h3>
              <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                {extraBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#ac043f] to-[#0388bd] flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
