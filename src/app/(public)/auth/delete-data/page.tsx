export default function DeleteDataPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Política de Eliminación de Datos de Usuario
        </h1>

        <p className="text-gray-700 mb-4">
          En <span className="font-semibold text-[#197387]">CalendUp </span> 
          respetamos tu privacidad y te damos control sobre tus datos. 
          Si iniciaste sesión con tu cuenta de Facebook, podés solicitar 
          la eliminación de tu información en cualquier momento.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          Cómo solicitar la eliminación de tus datos
        </h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            Envía un correo electrónico a{" "}
            <a
              href="mailto:calendupoficial@gmail.com"
              className="text-[#197387] font-medium underline"
            >
              calendupoficial@gmail.com
            </a>{" "}
            con el asunto: <span className="italic">Eliminar mis datos</span>.
          </li>
          <li>
            Incluye la dirección de correo asociada a tu cuenta de Facebook.
          </li>
          <li>
            Nuestro equipo eliminará permanentemente tus datos (incluyendo
            nombre, correo y turnos asociados) en un plazo máximo de{" "}
            <span className="font-medium">30 días</span>.
          </li>
        </ol>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-3">
          Datos que recolectamos y usamos
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Nombre y correo electrónico (para identificarte y enviarte notificaciones).</li>
          <li>Turnos solicitados o gestionados dentro de la plataforma.</li>
        </ul>

        <p className="text-gray-700 mt-8">
          Si tenés dudas, podés escribirnos a{" "}
          <a
            href="mailto:calendupoficial@gmail.com"
            className="text-[#197387] font-medium underline"
          >
            calendupoficial@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  )
}
