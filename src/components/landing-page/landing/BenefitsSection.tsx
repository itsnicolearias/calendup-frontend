import { Badge } from '@/components/ui/badge'
import { Calendar, CheckCircle } from 'lucide-react'
import React from 'react'

function BenefitsSection() {
  return (
    <div>
      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-lg px-4 py-2 mb-4">
                💡 Simplifica tu trabajo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                CalendUp te permite concentrarte en tu trabajo
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Mientras tu agenda se gestiona sola y tus clientes reservan fácilmente, sin complicaciones ni pérdida de
                tiempo.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Sin necesidad de llamadas o mensajes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Confirmaciones automáticas por email</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Evita solapamientos de turnos</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  <span className="text-gray-700">Acceso desde cualquier dispositivo</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-3xl p-8 text-white">
                <div className="text-center">
                  <Calendar className="w-20 h-20 mx-auto mb-6 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">Tu agenda, siempre organizada</h3>
                  <p className="text-blue-100 mb-6">
                    Visualiza todos tus turnos, gestiona tu disponibilidad y mantén a tus clientes informados
                    automáticamente.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-3xl font-bold">24/7</div>
                      <div className="text-blue-200 text-sm">Disponible</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">0%</div>
                      <div className="text-blue-200 text-sm">Complicaciones</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default BenefitsSection