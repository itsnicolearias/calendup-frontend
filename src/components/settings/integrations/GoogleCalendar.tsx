"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import { deleteIntegration, integrateGoogle, updateIntegration } from "@/services/integrations"
import { useSearchParams } from "next/navigation"
import { IntegrationParams } from "@/types/integrations"
import { format } from "date-fns"

interface GoogleCalendarParams {
    token: string
    isConnected: boolean
    setIsConnected: (connect: boolean) => void;
    integrationData: IntegrationParams

}

export default function GoogleCalendarIntegration({ token, isConnected, setIsConnected, integrationData }: GoogleCalendarParams) {
  //const [isConnected, setIsConnected] = useState(false)
  const [connectedEmail, setConnectedEmail] = useState("")
  const [syncAppointments, setSyncAppointments] = useState<boolean | undefined>(false)
  const [showGoogleEvents, setShowGoogleEvents] = useState<boolean | undefined>(false)
  //const [selectedCalendar, setSelectedCalendar] = useState("primary")
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)

  const searchParams = useSearchParams()
  const success = searchParams.get("success")

  useEffect(() => {
  if (integrationData) {
    setShowGoogleEvents(integrationData.showEventsInAgenda)
    setSyncAppointments(integrationData.syncAppWithCalendar)
    setLastSync(integrationData.updatedAt)
  }
}, [integrationData])


  // ✅ Mostrar mensaje luego del redirect
  useEffect(() => {
    if (success === "google") {
      toast.success("Conectado con Google Calendar")
      //setIsConnected(true)
      setLastSync(new Date())
      // Opcional: refetch del perfil para mostrar correo real
    }
    /*if (status === "error" && provider === "google") {
      toast.error("Error al conectar con Google Calendar")
    }*/
  }, [success])

  const handleConnect = async () => {

    const url = await integrateGoogle(token)
    if (url) {
        window.location.href = url;
    }

  }

  const handleDisconnect = async () => {

    await deleteIntegration(integrationData.integrationId, token)
    setIsConnected(false)
    setConnectedEmail("")
    setLastSync(null)
    toast.success("Desconectado de Google Calendar")
  }

  const handleManualSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setLastSync(new Date())
      setIsSyncing(false)
      toast.success("Sincronización completada")
    }, 2000)
  }

  const saveChanges = async (data: Partial<IntegrationParams>) => {
    try {
      await updateIntegration(data, token, integrationData.integrationId)
    
        if (data.showEventsInAgenda){
          setShowGoogleEvents(true)
        }
    
        if (data.syncAppWithCalendar){
          setSyncAppointments(true)
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
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle>Google Calendar</CardTitle>
              <CardDescription>Sincroniza tus turnos con Google Calendar</CardDescription>
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
              <Calendar className="w-4 h-4 mr-2" />
              Conectar con Google Calendar
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

        {/* Opciones de sincronización */}
        {isConnected && (
          <div className="space-y-4 pt-4 border-t">
            <h4 className="font-semibold text-sm">Configuración de sincronización</h4>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sync-appointments" className="flex-1 text-sm cursor-pointer">
                Sincronizar mis turnos con Google Calendar
              </Label>
              <Switch 
                id="sync-appointments" 
                checked={syncAppointments} 
                onCheckedChange={(checked: boolean) => {
                  void saveChanges({ syncAppWithCalendar: checked })
                }}
                />
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="show-google-events" className="flex-1 text-sm cursor-pointer">
                Mostrar mis eventos de Google Calendar en la agenda
              </Label>
              <Switch 
                id="show-google-events" 
                checked={showGoogleEvents} 
                onCheckedChange={(checked: boolean) => {
                  void saveChanges({ showEventsInAgenda: checked })
                }}
                />
            </div>

            {/** 
            <div className="space-y-2">
              <Label htmlFor="calendar-select" className="text-sm">
                Calendario de destino
              </Label>
              <Select value={selectedCalendar} onValueChange={setSelectedCalendar}>
                <SelectTrigger id="calendar-select">
                  <SelectValue placeholder="Seleccionar calendario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Calendario principal</SelectItem>
                  <SelectItem value="work">Trabajo</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="calendup">Calendup</SelectItem>
                </SelectContent>
              </Select>
            </div>
*/}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted rounded-lg">
              <div>
                <p className="text-sm font-medium">Última sincronización</p>
                <p className="text-xs text-muted-foreground">{lastSync ? format(lastSync, "yyyy-MM-dd") : "Nunca"}</p>
              </div>
              <Button
                onClick={handleManualSync}
                variant="outline"
                size="sm"
                disabled={isSyncing}
                className="w-full sm:w-auto bg-transparent"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Sincronizando..." : "Sincronizar ahora"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
