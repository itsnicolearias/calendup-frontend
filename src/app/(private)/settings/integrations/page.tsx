"use client"

import GoogleCalendarIntegration from "@/components/settings/integrations/GoogleCalendar"
import GoogleMeetIntegration from "@/components/settings/integrations/GoogleMeet"
import MeetingPreferences from "@/components/settings/integrations/MeetingPreferences"
import ZoomIntegration from "@/components/settings/integrations/Zoom"
import { PremiumWrapper } from "@/components/shared/PremiumWrapper"
import { useUser } from "@/contexts/UserContext"
import { IntegrationParams } from "@/types/integrations"
import { useEffect, useState } from "react"


export  default function IntegrationsPage() {
    const [isGoogleConnected, setIsGoogleConnected] = useState(false)
    const [isZoomConnected, setIsZoomConnected] = useState(false)
    const [zoomIntegration, setzoomIntegration] = useState<IntegrationParams>()
    const [googleIntegration, setGoogleIntegration] = useState<IntegrationParams>()
    const [defaultMeetIntegration, setDefaultMeetIntegration] = useState<IntegrationParams>()
    const [token, setToken] = useState<string | null>(null)

     useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  }, [])
  
    const { user } = useUser()


    useEffect(() => {
    if (!user || !user.Integrations) return

    const integrations =  user?.Integrations;
    const google = integrations?.find((i) => i.provider === "google")
    const zoom = integrations?.find((i) => i.provider === "zoom")  

    if (google && !isGoogleConnected){

        setIsGoogleConnected(true)
        setGoogleIntegration(google)
    }    

    if (zoom && !isZoomConnected){
        setIsZoomConnected(true)
        setzoomIntegration(zoom)
    }

      const i = integrations.find((i) => (i.provider === "google" || i.provider === "zoom") && i.active === true)
      setDefaultMeetIntegration(i)

    }, [user?.Integrations])
    
    


  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Integraciones</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Conecta tus herramientas favoritas para sincronizar tus turnos, reuniones y eventos automáticamente.
        </p>
      </div>

      {/* Lista de integraciones */}
      <div className="space-y-6">
        <PremiumWrapper feature="calendarAvailable" asDisabled={false} > 
          <GoogleCalendarIntegration 
            token={token!}
            isConnected={isGoogleConnected}
            setIsConnected={setIsGoogleConnected}
            integrationData={googleIntegration!}
        />
        </PremiumWrapper>

        <PremiumWrapper feature="meetAvailable" asDisabled={false} >
          <GoogleMeetIntegration 
            token={token!}
            isConnected={isGoogleConnected}
            integrationData={googleIntegration!}
        />
        </PremiumWrapper>
        
        <PremiumWrapper feature="zoomAvailable"asDisabled={false}  >
          <ZoomIntegration
            token={token!}
            isConnected={isZoomConnected}
            setIsConnected={setIsZoomConnected} 
            integrationData={zoomIntegration!}
        />
        </PremiumWrapper>
        
        { isGoogleConnected && isZoomConnected && googleIntegration && zoomIntegration && (
          <MeetingPreferences
            googleIntegrationId={googleIntegration?.integrationId}
            zoomIntegrationId={zoomIntegration?.integrationId}
            defaultIntegration={defaultMeetIntegration?.provider === "google" ? "google-meet" : "zoom"}
            token={token} 
          />
        )}
        
      </div>

      {/* Mensaje informativo */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 <strong>Próximamente:</strong> WhatsApp Business, Outlook Calendar, Microsoft Teams y más integraciones.
        </p>
      </div>
    </div>
  )
}
