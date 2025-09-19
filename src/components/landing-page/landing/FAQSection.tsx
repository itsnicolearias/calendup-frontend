import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'
import { faqs } from '../data/landing-data'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function FAQSection() {
    const router = useRouter();

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-[#0388bd] border-blue-200 text-lg px-4 py-2 mb-4">
              ❓ Preguntas Frecuentes
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Tienes dudas sobre{" "}
              <span className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                CalendUp?
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aquí encontrarás respuestas a las preguntas más comunes sobre nuestra plataforma de agendamiento.
            </p>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gray-200">
                    <AccordionTrigger className="text-left hover:text-[#0388bd] transition-colors py-6">
                      <span className="text-lg font-semibold">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed pb-6">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">¿No encontraste lo que buscabas?</p>
            <Button
              className="hover:bg-gray-900 bg-[#0388bd] text-white px-8 py-3"
              onClick={() => router.push("/")}
            >
              Contactar Soporte
            </Button>
          </div>
        </div>
      </section>
    </div>

  )
}

export default FAQSection