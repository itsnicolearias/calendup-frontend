"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, TrendingUp, Calendar, Sparkles } from "lucide-react"
//import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { motion } from "framer-motion"
import { CalculatorResult } from "@/types/calculator"
import SocialShareButtons from "./SocialShareButtons"
import { benefitsShareUrl, shareText } from "../data/benefits-data"

interface CalculatorResultCardProps {
  result: CalculatorResult
  onShare?: () => void
}

export default function CalculatorResultCard({ result }: CalculatorResultCardProps) {

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
      <div className="bg-gradient-to-br from-[#ac043f] to-[#0388bd] rounded-2xl p-[2px] shadow-2xl">
        <Card className="border-0 rounded-2xl overflow-hidden">
          <CardHeader className="text-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pb-4">
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent flex items-center justify-center gap-2 flex-wrap">
              <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-pink-500" />
              ¡Tu ahorro potencial!
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">Estos son los resultados personalizados para tu profesión</p>
          </CardHeader>
          <CardContent className="space-y-6 pt-1">
            {/* Estadísticas principales */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-4 md:p-5 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">Por semana</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold">{result.hoursPerWeek.toFixed(1)}h</p>
                <p className="text-xs text-white/80 mt-1">de tiempo ahorrado</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-4 md:p-5 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">Por mes</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold">{result.hoursPerMonth.toFixed(0)}h</p>
                <p className="text-xs text-white/80 mt-1">más productividad</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white p-4 md:p-5 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">Por año</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold">{result.hoursPerYear.toFixed(0)}h</p>
                <p className="text-xs text-white/80 mt-1">recuperadas</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-cyan-500 to-teal-500 text-white p-4 md:p-5 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm font-medium">Días laborales</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold">{result.daysPerYear.toFixed(1)}</p>
                <p className="text-xs text-white/80 mt-1">al año</p>
              </motion.div>
            </div>

            {/* Mensaje motivacional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border-l-4 border-pink-500 p-4 rounded-lg"
            >
              <p className="text-sm text-gray-700 leading-relaxed">
                💡 <strong className="text-purple-600">Con ese tiempo podrías:</strong> atender{" "}
                {Math.floor(result.hoursPerYear / 1.5)} clientes más al año o disfrutar {result.daysPerYear.toFixed(0)}{" "}
                días libres extra para dedicarlos a tu familia, hobbies o descanso.
              </p>
            </motion.div>
            {/* Valor económico 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-4 md:p-6 rounded-xl text-center"
            >
            
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <p className="text-sm font-medium text-green-700">Valor estimado del tiempo ahorrado</p>
              </div>
              <p className="text-3xl md:text-4xl font-bold text-green-600">
                ${result.economicValue.toLocaleString("es-AR")}
              </p>
              <p className="text-sm text-green-600 mt-1">ARS por año</p>
            </motion.div>
*/}
            {/* Gráfico 
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-50 rounded-xl p-4"
            >
              <h4 className="text-center font-semibold mb-4 text-gray-900">Comparación de tiempo semanal</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData(result)}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}h`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData(result).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
*/}
            

            {/* Botones de compartir en redes sociales */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <SocialShareButtons shareText={shareText(result)} shareUrl={benefitsShareUrl} result={result} />
            </motion.div>

            {/* Datos del cálculo */}
            <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
              <p>
                <strong>Profesión:</strong> {result.professionalType}
              </p>
              <p>
                <strong>Método actual:</strong> {result.bookingMethod}
              </p>
              <p>
                <strong>Turnos semanales:</strong> {result.weeklyAppointments}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
