import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

function CTASection() {
    const router = useRouter();

  return (
    <div>
       {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para simplificar tu agenda?</h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Únete a miles de profesionales que ya confían en CalendUp para gestionar sus turnos de manera eficiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-200"
              onClick={() => router.push("/auth/register")}
            >
              Crear mi cuenta gratis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 bg-transparent"
            >
              Contactar ventas
            </Button>
          </div>
        </div>
      </section> 
    </div>
  )
}

export default CTASection