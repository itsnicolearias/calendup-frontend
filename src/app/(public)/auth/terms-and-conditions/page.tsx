import React from "react";

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Términos y Condiciones de Calendup</h1>

      <p>
        Bienvenido a <strong>Calendup</strong>. Al utilizar nuestra plataforma, aceptás estos Términos y Condiciones. 
        Te recomendamos leerlos atentamente.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Uso de la plataforma</h2>
      <p>
        Calendup permite a los usuarios agendar turnos con profesionales registrados. 
        Los usuarios se comprometen a utilizar la plataforma de manera legal y responsable.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Registro y seguridad</h2>
      <p>
        Al registrarte, garantizás que la información proporcionada es verdadera y completa. 
        Es responsabilidad del usuario mantener la confidencialidad de su cuenta y contraseña.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Datos personales</h2>
      <p>
        El tratamiento de tus datos personales se realiza de acuerdo con nuestra 
        <a href="/auth/privacy-policy" className="text-blue-600 ml-1">Política de Privacidad</a>. 
        Al usar Calendup, aceptás que tus datos sean recopilados y tratados conforme a esa política.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Responsabilidad</h2>
      <p>
        Calendup no se hace responsable por inconvenientes derivados de la falta de puntualidad de los profesionales, 
        cambios de horarios o errores humanos. La plataforma facilita la gestión de turnos, pero la relación profesional-usuario 
        es directa entre las partes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Propiedad intelectual</h2>
      <p>
        Todo el contenido de la plataforma, incluyendo nombres, logos, diseños y código fuente, es propiedad de Calendup 
        o de sus proveedores. No está permitido reproducir, distribuir o modificar sin autorización expresa.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">6. Modificaciones</h2>
      <p>
        Calendup puede actualizar estos Términos y Condiciones en cualquier momento. Las modificaciones serán efectivas 
        a partir de su publicación en la plataforma.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">7. Ley aplicable</h2>
      <p>
        Estos Términos y Condiciones se rigen por las leyes de la República Argentina. 
        Cualquier conflicto será sometido a los tribunales competentes de la Ciudad Autónoma de Buenos Aires.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contacto</h2>
      <p>
        Para consultas sobre estos Términos y Condiciones, escribinos a 
        <a href="mailto:calendupoficial@gmail.com" className="text-blue-600 ml-1">calendupoficial@gmail.com</a>.
      </p>
    </div>
  );
};

