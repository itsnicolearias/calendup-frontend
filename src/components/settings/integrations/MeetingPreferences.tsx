"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Settings } from "lucide-react"

export default function MeetingPreferences() {
  const [defaultPlatform, setDefaultPlatform] = useState<"google-meet" | "zoom">("google-meet")

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Settings className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <CardTitle>Preferencias generales</CardTitle>
            <CardDescription>Configura tu plataforma predeterminada para reuniones online</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <RadioGroup
          value={defaultPlatform}
          onValueChange={(value) => setDefaultPlatform(value as "google-meet" | "zoom")}
        >
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <RadioGroupItem value="google-meet" id="google-meet" />
            <Label htmlFor="google-meet" className="flex-1 cursor-pointer">
              Usar Google Meet por defecto para reuniones online
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <RadioGroupItem value="zoom" id="zoom" />
            <Label htmlFor="zoom" className="flex-1 cursor-pointer">
              Usar Zoom por defecto para reuniones online
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
