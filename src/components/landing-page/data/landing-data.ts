import { Clock, Users, CheckCircle, ArrowRight, Calendar, Shield } from "lucide-react";

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const features: Feature[] = [
  { icon: Clock, title: "Define tus horarios en segundos", description: "Configura tu disponibilidad y duración de turnos de forma rápida y sencilla." },
  { icon: Users, title: "Múltiples tipos de servicios", description: "Ofrece distintos servicios con nombre, descripción y precio personalizado." },
  { icon: CheckCircle, title: "Confirmaciones automáticas", description: "El sistema confirma y recuerda turnos automáticamente, sin llamadas ni mensajes." },
  { icon: ArrowRight, title: "Link único de agendamiento", description: "Comparte tu enlace personalizado y empieza a recibir reservas desde el primer día." },
  { icon: Calendar, title: "Calendario completo", description: "Visualiza tu agenda mes a mes desde cualquier dispositivo, en cualquier momento." },
  { icon: Shield, title: "Seguridad total", description: "Protege tus datos y los de tus clientes con la máxima seguridad y privacidad." },
];

export const faqs: FAQ[] = [
  { question: "¿Cómo funciona CalendUp?", answer: "CalendUp es muy simple: creas tu perfil profesional, configuras tus horarios y servicios, y obtienes un link único. Compartes ese link con tus clientes y ellos pueden reservar turnos directamente sin necesidad de crear una cuenta. El sistema gestiona automáticamente la disponibilidad y envía confirmaciones por email." },
  { question: "¿Es gratis usar CalendUp?", answer: "Ofrecemos un plan gratuito con funcionalidades básicas que incluye hasta 30 turnos por mes. También tenemos planes premium con características avanzadas como recordatorios automáticos, múltiples servicios, y personalización completa del perfil." },
  { question: "¿Mis clientes necesitan crear una cuenta?", answer: "No, esa es una de las principales ventajas de CalendUp. Tus clientes solo necesitan tu link de agendamiento, seleccionan el servicio, fecha y hora disponible, completan sus datos básicos y listo. El proceso toma menos de 2 minutos." },
  { question: "¿Puedo personalizar mis horarios de trabajo?", answer: "Absolutamente. Puedes configurar diferentes horarios para cada día de la semana, establecer descansos, definir la duración de cada tipo de servicio, y bloquear fechas específicas cuando no estés disponible." },
  { question: "¿Qué pasa si dos clientes intentan reservar el mismo horario?", answer: "CalendUp actualiza la disponibilidad en tiempo real. Una vez que un cliente reserva un horario, este se bloquea automáticamente para otros usuarios, evitando completamente los solapamientos." },
  { question: "¿Es seguro para mis datos y los de mis clientes?", answer: "Sí, la seguridad es nuestra prioridad. Utilizamos encriptación SSL, cumplimos con las normativas de protección de datos, y nunca compartimos información personal. Todos los datos se almacenan de forma segura en servidores certificados." },
  { question: "¿Puedo integrar CalendUp con otras herramientas?", answer: "Sí, ofrecemos integraciones con Google Calendar, Outlook, Zoom para videollamadas, y sistemas de pago como Mercado Pago." },
  { question: "¿Qué tipo de profesionales pueden usar CalendUp?", answer: "CalendUp es ideal para cualquier profesional que maneje citas: médicos, dentistas, psicólogos, abogados, consultores, estilistas, entrenadores personales, terapeutas, y muchos más. Si tu trabajo requiere agendar turnos, CalendUp es para ti." },
];
