"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Clock, Users, Shield, CheckCircle, ArrowRight, Menu, X, HelpCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Component() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("inicio")

  
  const router = useRouter();

  const features = [
    {
      icon: Clock,
      title: "Define tus horarios en segundos",
      description: "Configura tu disponibilidad y duración de turnos de forma rápida y sencilla.",
    },
    {
      icon: Users,
      title: "Múltiples tipos de servicios",
      description: "Ofrece distintos servicios con nombre, descripción y precio personalizado.",
    },
    {
      icon: CheckCircle,
      title: "Confirmaciones automáticas",
      description: "El sistema confirma y recuerda turnos automáticamente, sin llamadas ni mensajes.",
    },
    {
      icon: ArrowRight,
      title: "Link único de agendamiento",
      description: "Comparte tu enlace personalizado y empieza a recibir reservas desde el primer día.",
    },
    {
      icon: Calendar,
      title: "Calendario completo",
      description: "Visualiza tu agenda mes a mes desde cualquier dispositivo, en cualquier momento.",
    },
    {
      icon: Shield,
      title: "Seguridad total",
      description: "Protege tus datos y los de tus clientes con la máxima seguridad y privacidad.",
    },
  ]

  const faqs = [
    {
      question: "¿Cómo funciona CalendUp?",
      answer:
        "CalendUp es muy simple: creas tu perfil profesional, configuras tus horarios y servicios, y obtienes un link único. Compartes ese link con tus clientes y ellos pueden reservar turnos directamente sin necesidad de crear una cuenta. El sistema gestiona automáticamente la disponibilidad y envía confirmaciones por email.",
    },
    {
      question: "¿Es gratis usar CalendUp?",
      answer:
        "Ofrecemos un plan gratuito con funcionalidades básicas que incluye hasta 30 turnos por mes. También tenemos planes premium con características avanzadas como recordatorios automáticos, múltiples servicios, y personalización completa del perfil.",
    },
    {
      question: "¿Mis clientes necesitan crear una cuenta?",
      answer:
        "No, esa es una de las principales ventajas de CalendUp. Tus clientes solo necesitan tu link de agendamiento, seleccionan el servicio, fecha y hora disponible, completan sus datos básicos y listo. El proceso toma menos de 2 minutos.",
    },
    {
      question: "¿Puedo personalizar mis horarios de trabajo?",
      answer:
        "Absolutamente. Puedes configurar diferentes horarios para cada día de la semana, establecer descansos, definir la duración de cada tipo de servicio, y bloquear fechas específicas cuando no estés disponible.",
    },
    {
      question: "¿Qué pasa si dos clientes intentan reservar el mismo horario?",
      answer:
        "CalendUp actualiza la disponibilidad en tiempo real. Una vez que un cliente reserva un horario, este se bloquea automáticamente para otros usuarios, evitando completamente los solapamientos.",
    },
    {
      question: "¿Es seguro para mis datos y los de mis clientes?",
      answer:
        "Sí, la seguridad es nuestra prioridad. Utilizamos encriptación SSL, cumplimos con las normativas de protección de datos, y nunca compartimos información personal. Todos los datos se almacenan de forma segura en servidores certificados.",
    },
    {
      question: "¿Puedo integrar CalendUp con otras herramientas?",
      answer:
        "Sí, ofrecemos integraciones con Google Calendar, Outlook, Zoom para videollamadas, y sistemas de pago como Mercado Pago.",
    },
    {
      question: "¿Qué tipo de profesionales pueden usar CalendUp?",
      answer:
        "CalendUp es ideal para cualquier profesional que maneje citas: médicos, dentistas, psicólogos, abogados, consultores, estilistas, entrenadores personales, terapeutas, y muchos más. Si tu trabajo requiere agendar turnos, CalendUp es para ti.",
    },
  ]

  const handleNavClick = (section: string) => {
    setCurrentSection(section)
    setMobileMenuOpen(false)

    if (section === "profesionales"){
      router.push("/professionals-marketplace")
    }
  }

  const renderContent = () => {
    switch (currentSection) {
      case "faq":
        return <FAQSection />
      default:
        return <MainContent />
    }
  }

  const FAQSection = () => (
    <div className="min-h-screen pt-20">
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-lg px-4 py-2 mb-4">
              ❓ Preguntas Frecuentes
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ¿Tienes dudas sobre{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
                    <AccordionTrigger className="text-left hover:text-blue-600 transition-colors py-6">
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
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              onClick={() => setCurrentSection("inicio")}
            >
              Contactar Soporte
            </Button>
          </div>
        </div>
      </section>
    </div>
  )

  const MainContent = () => (
    <>
      {/* Hero Section */}
      <section id="inicio" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-lg px-4 py-2">
                📅 Nueva plataforma de agendamiento
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Gestiona tu agenda sin{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                complicaciones
              </span>{" "}
              con CalendUp
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Recibe reservas automáticamente, organiza tus turnos y comparte tu link único con tus clientes para que
              agenden al instante.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/auth/register")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-200"
              >
                Comenzar Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 bg-transparent"
              >
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-lg px-4 py-2 mb-4">
              🌟 Ventajas para profesionales
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para gestionar tu agenda
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              CalendUp te permite concentrarte en tu trabajo mientras tu agenda se gestiona sola y tus clientes reservan
              fácilmente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
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
    </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick("inicio")}>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CalendUp
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavClick("inicio")}
                className={`font-medium transition-colors ${currentSection === "inicio" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                Inicio
              </button>
              <button
                onClick={() => handleNavClick("profesionales")}
                className={`font-medium transition-colors ${currentSection === "profesionales" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                Buscar Profesionales
              </button>
              <button
                onClick={() => handleNavClick("precios")}
                className={`font-medium transition-colors ${currentSection === "precios" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                Precios
              </button>
              <button
                onClick={() => handleNavClick("contacto")}
                className={`font-medium transition-colors ${currentSection === "contacto" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}`}
              >
                Contacto
              </button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={() => router.push("/auth/login")}>
                Ingresar
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => handleNavClick("inicio")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Inicio
                </button>
                <button
                  onClick={() => handleNavClick("profesionales")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Buscar Profesionales
                </button>
                <button
                  onClick={() => handleNavClick("precios")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Precios
                </button>
                <button
                  onClick={() => handleNavClick("contacto")}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Contacto
                </button>
                <Button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Ingresar
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Dynamic Content */}
      {renderContent()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold">CalendUp</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                La plataforma más sencilla para gestionar tu agenda profesional y recibir reservas automáticamente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => handleNavClick("inicio")} className="hover:text-white transition-colors">
                    Características
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavClick("precios")} className="hover:text-white transition-colors">
                    Precios
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Demo
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => handleNavClick("faq")}
                    className="hover:text-white transition-colors flex items-center"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Preguntas Frecuentes
                  </button>
                </li>
                <li>
                  <Button onClick={() => handleNavClick("contacto")} className="hover:text-white transition-colors">
                    Contacto
                  </Button>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Términos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CalendUp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
