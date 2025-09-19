import React from "react";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad de Calendup</h1>
      
      <p>
        En <strong>Calendup</strong> valoramos tu privacidad y nos comprometemos a proteger tus datos personales. 
        Esta política describe cómo recopilamos, usamos y protegemos tu información.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Responsable del tratamiento</h2>
      <p>
        El responsable de tus datos es <strong>CalendUp</strong>, con email de contacto 
        <a href="mailto:calendupoficial@gmail.com" className="text-blue-600 ml-1">calendupoficial@gmail.com</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Datos que recopilamos</h2>
      <ul className="list-disc ml-6">
        <li>Nombre y apellido</li>
        <li>Email y teléfono</li>
        <li>Datos de turnos: fecha, hora y profesional elegido</li>
        <li>Datos de uso de la plataforma</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Finalidad del tratamiento</h2>
      <p>
        Usamos tus datos para gestionar turnos, enviarte notificaciones y recordatorios, y mejorar tu experiencia en Calendup.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Base legal</h2>
      <p>
        Tratamos tus datos con tu consentimiento, otorgado al registrarte o agendar un turno en la plataforma.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Destinatarios de los datos</h2>
      <p>
        Tus datos no se cederán a terceros, salvo proveedores de servicios necesarios como correo electrónico, hosting y base de datos.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Derechos del usuario</h2>
      <p>
        Podés solicitar acceso, rectificación, supresión u oposición al tratamiento de tus datos enviando un correo a 
        <a href="mailto:calendupoficial@gmail.com" className="text-blue-600 ml-1">calendupoficial@gmail.com</a>.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Seguridad y almacenamiento</h2>
      <p>
        Tus datos se almacenan en servidores seguros, con acceso restringido y backups automáticos.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Conservación de los datos</h2>
      <p>
        Los datos se conservarán mientras tengas turnos activos o hasta que solicites su eliminación.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Contacto</h2>
      <p>
        Para consultas sobre privacidad, escribinos a 
        <a href="mailto:calendupoficial@gmail.com" className="text-blue-600 ml-1">calendupoficial@gmail.com</a>.
      </p>
    </div>
  );
};

