"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Video } from "lucide-react"
import { IntegrationParams } from "@/types/integrations"

interface GoogleMeetParams {
    token: string
    isConnected: boolean
    integrationData: IntegrationParams
}

export default function GoogleMeetIntegration({ token, isConnected, integrationData }: GoogleMeetParams) {
  //const [connectedEmail, setConnectedEmail] = useState("")
  const [autoCreateLinks, setAutoCreateLinks] = useState<boolean | undefined>(false)
  const [includeInEmails, setIncludeInEmails] = useState<boolean | undefined>(false)

  useEffect(() => {
  if (integrationData){
    setAutoCreateLinks(integrationData.autoCreateMeetLinks)
    setIncludeInEmails(integrationData.autoSendMeetLinks)
  }
}, [integrationData])


  

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <CardTitle>Google Meet</CardTitle>
              <CardDescription>Genera enlaces automáticos para videollamadas</CardDescription>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-500" : ""}>
            {isConnected ? "Conectado" : "Desconectado"}
          </Badge>
        </div>
      </CardHeader>

  <CardContent className="space-y-6">
        {/* Estado de conexión 

        <div className="space-y-3">
          {!isConnected ? (
            <Button onClick={handleConnect} className="w-full sm:w-auto bg-[#0388bd] hover:bg-[#026d9a]">
              <Video className="w-4 h-4 mr-2" />
              Conectar con Google Meet
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted rounded-lg">
                <div>
                  <p className="text-sm font-medium">Cuenta conectada</p>
                  <p className="text-sm text-muted-foreground">{connectedEmail}</p>
                </div>
                <Button onClick={handleDisconnect} variant="outline" size="sm">
                  Desconectar
                </Button>
              </div>
            </div>
          )}
        </div>*/}

        {/* Opciones de configuración */}
        {isConnected && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold text-sm">Configuración</h4>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-create-meet" className="flex-1 text-sm cursor-pointer">
                Crear enlaces de Google Meet automáticamente para turnos online
              </Label>
              <Switch id="auto-create-meet" checked={autoCreateLinks} onCheckedChange={setAutoCreateLinks} />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="include-meet-emails" className="flex-1 text-sm cursor-pointer">
                Incluir enlace en los emails de confirmación
              </Label>
              <Switch id="include-meet-emails" checked={includeInEmails} onCheckedChange={setIncludeInEmails} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
