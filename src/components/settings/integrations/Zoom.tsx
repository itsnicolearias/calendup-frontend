"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Video } from "lucide-react"
import { toast } from "sonner"
import { deleteIntegration, integrateZoom, updateIntegration } from "@/services/integrations"
import { IntegrationParams } from "@/types/integrations"
import { useSearchParams } from "next/navigation"

interface ZoomParams {
    token: string
    isConnected: boolean
    setIsConnected: (connect: boolean) => void;
    integrationData: IntegrationParams
}

export default function ZoomIntegration({ token, isConnected, setIsConnected, integrationData }: ZoomParams) {
  //const [isConnected, setIsConnected] = useState(false)
  const [connectedEmail, setConnectedEmail] = useState("")
  const [autoCreateMeetings, setAutoCreateMeetings] = useState<boolean | undefined>(false)
  const [includeInEmails, setIncludeInEmails] = useState<boolean | undefined>(false )
   
  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  
    // ✅ Mostrar mensaje luego del redirect
    useEffect(() => {
      if (success === "zoom") {
        toast.success("Conectado con Zoom")
        setIsConnected(true)
        // Opcional: refetch del perfil para mostrar correo real
      }
      /*if (status === "error" && provider === "google") {
        toast.error("Error al conectar con Google Calendar")
      }*/
    }, [success])

  useEffect(() => {
  if (integrationData) {
    setAutoCreateMeetings(integrationData.autoCreateMeetLinks)
    setIncludeInEmails(integrationData.autoSendMeetLinks)
  }
}, [integrationData])

  const handleConnect = async () => {
    const url = await integrateZoom(token)

    if (url) {
        window.location.href = url;
    }
    

  }

  const handleDisconnect = async () => {
    await deleteIntegration(integrationData.integrationId, token)
    setIsConnected(false)
    setConnectedEmail("")
    toast.success("Desconectado de Zoom")
  }

  const saveChanges = async (data: Partial<IntegrationParams>) => {
    try {
      await updateIntegration(data, token, integrationData.integrationId)

      if (data.autoCreateMeetLinks){
        setAutoCreateMeetings(true)
      }

      if (data.autoSendMeetLinks){
        setIncludeInEmails(true)
      }
      toast.success("Integracion actualizada correctamente");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Ha ocurrido un error al actualizar la integración");
    }
    
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Zoom</CardTitle>
              <CardDescription>Crea reuniones automáticas en Zoom</CardDescription>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className={isConnected ? "bg-green-500" : ""}>
            {isConnected ? "Conectado" : "Desconectado"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Estado de conexión */}
        <div className="space-y-3">
          {!isConnected ? (
            <Button onClick={handleConnect} className="w-full sm:w-auto bg-[#0388bd] hover:bg-[#026d9a]">
              <Video className="w-4 h-4 mr-2" />
              Conectar con Zoom
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
        </div>

        {/* Opciones de configuración */}
        {isConnected && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold text-sm">Configuración</h4>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="auto-create-zoom" className="flex-1 text-sm cursor-pointer">
                Crear reuniones en Zoom para turnos online
              </Label>
              <Switch 
                id="auto-create-zoom" 
                checked={autoCreateMeetings} 
                onCheckedChange={(checked: boolean) => {
                  setIncludeInEmails(checked)
                  void saveChanges({ autoCreateMeetLinks: checked })
                }}
                />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="include-zoom-emails" className="flex-1 text-sm cursor-pointer">
                Incluir enlace en los emails de confirmación
              </Label>
              <Switch
                id="include-zoom-emails"
                checked={includeInEmails}
                onCheckedChange={(checked: boolean) => {
                  setIncludeInEmails(checked)
                  void saveChanges({ autoSendMeetLinks: checked })
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
