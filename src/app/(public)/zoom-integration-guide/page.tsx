"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Shield, Video, Plug, Power } from "lucide-react"
import Image from "next/image"

export default function ZoomIntegrationPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-[#0388bd]">
        Guía de integración con Zoom — Calendup
      </h1>
      <p className="text-base mb-10">
        Bienvenido/a a la guía oficial de integración de <strong>Calendup</strong> con{" "}
        <strong>Zoom</strong>. Aquí encontrarás instrucciones detalladas para conectar,
        usar y eliminar la integración paso a paso.
      </p>

      {/* --- Sección 1: Conexión --- */}
      <Card className="mb-8">
        <CardHeader className="flex items-center gap-2">
          <Plug className="text-[#0388bd]" />
          <CardTitle>1. Conectar Calendup con Zoom</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ol className="list-decimal list-inside space-y-2">
            <li>Inicia sesión en tu cuenta de <strong>Calendup</strong>.</li>
            <li>Dirígete a <strong>Configuracion → Integraciones → Zoom</strong>.</li>
            <li>Haz clic en el botón <strong>“Conectar con Zoom”</strong>.</li>
            <li>Serás redirigido a la página de autorización de Zoom.</li>
            <li>Revisa los permisos y selecciona <strong>“Permitir”</strong>.</li>
            <li>Serás redirigido nuevamente a Calendup, donde verás la confirmación.</li>
          </ol>

          <div className="border rounded-md p-4 bg-gray-50 text-center text-sm text-gray-500">
            <Image
              src="/connect-zoom.jpg"
              alt="Agregar integración de Zoom"
              width={800}
              height={450}
              className="mx-auto rounded-md border"
            />
          </div>
          <div className="border rounded-md p-4 bg-gray-50 text-center text-sm text-gray-500">
             <Image
              src="/authorize-zoom.jpg"
              alt="Autorizar integración de Zoom"
              width={800}
              height={450}
              className="mx-auto rounded-md border"
            />
          </div>
        </CardContent>
      </Card>

      {/* --- Sección 2: Uso --- */}
      <Card className="mb-8">
        <CardHeader className="flex items-center gap-2">
          <Video className="text-[#0388bd" />
          <CardTitle>2. Cómo usar la integración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">➕ Crear reuniones de Zoom desde Calendup</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Al crear o editar un turno, activa la opción <strong>“Generar enlace de Zoom”</strong>.</li>
            <li>Calendup creará automáticamente la reunión en tu cuenta de Zoom.</li>
            <li>El cliente recibirá el enlace junto con los detalles del turno.</li>
          </ol>

          <div className="border rounded-md p-4 bg-gray-50 text-center text-sm text-gray-500">
            🖼️ Agrega aquí una captura del formulario de turno con la opción de Zoom
          </div>

          <h3 className="font-semibold text-lg">🔍 Ver y gestionar tus reuniones</h3>
          <p>
            Cada turno con Zoom mostrará un botón de <strong>“Unirse a la reunión”</strong> o{" "}
            <strong>“Abrir en Zoom”</strong>. Puedes consultar toda la información desde tu panel.
          </p>

          <h3 className="font-semibold text-lg">🔔 Recordatorios automáticos</h3>
          <p>
            Calendup envía recordatorios por correo con el enlace de Zoom al profesional y al cliente antes de cada cita.
          </p>
        </CardContent>
      </Card>

      {/* --- Sección 3: Desconexión --- */}
      <Card className="mb-8">
        <CardHeader className="flex items-center gap-2">
          <Power className="text-[#197387]" />
          <CardTitle>3. Desconectar o eliminar la integración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold text-lg">Opción 1: Desde Calendup</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Ve a <strong>Configuracion → Integraciones → Zoom</strong>.</li>
            <li>Haz clic en <strong>“Desconectar”</strong>.</li>
            <li>Se eliminará el token de conexión y dejarás de generar reuniones de Zoom.</li>
          </ol>

          <div className="border rounded-md p-4 bg-gray-50 text-center text-sm text-gray-500">
            <Image
              src="/delete-zoom.jpg"
              alt="Desconectar integración de Zoom"
              width={800}
              height={450}
              className="mx-auto rounded-md border"
            />
          </div>

          <Separator className="my-6" />

          <h3 className="font-semibold text-lg">Opción 2: Desde Zoom App Marketplace</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>Inicia sesión en tu cuenta de Zoom.</li>
            <li>Ve a <strong>Admin → Advanced → App Marketplace → Installed Apps</strong>.</li>
            <li>Busca <strong>Calendup</strong> y selecciona <strong>Remove / Desinstalar</strong>.</li>
            <li>Confirma la eliminación.</li>
          </ol>
        </CardContent>
      </Card>

      {/* --- Sección 4: Seguridad --- */}
      <Card className="mb-8">
        <CardHeader className="flex items-center gap-2">
          <Shield className="text-[#197387]" />
          <CardTitle>4. Seguridad y permisos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc list-inside space-y-2">
            <li>Calendup utiliza los permisos mínimos necesarios para crear, listar y eliminar reuniones.</li>
            <li>No accede a grabaciones, contactos ni datos de chat.</li>
            <li>Los tokens de acceso se almacenan <strong>encriptados</strong> y se eliminan al desconectarse.</li>
          </ul>
          <Button variant="link" className="text-[#0388bd] p-0">
            Ver detalles de seguridad →
          </Button>
        </CardContent>
      </Card>

      {/* --- Sección 5: Soporte --- */}
      <Card>
        <CardHeader>
          <CardTitle>5. Soporte</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Si necesitas ayuda para conectar o eliminar la integración, contacta a nuestro equipo:
          </p>
          <p className="mt-2">
            📧 <a href="mailto:calendupoficial@gmail.com" className="text-[#0388bd] hover:underline">calendupoficial@gmail.com</a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
