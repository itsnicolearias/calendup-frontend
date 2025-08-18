// components/ProfessionalCard.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { UserWithProfile } from "@/types/settings"
import { getOneUser } from "@/services/users"

export default function ProfessionalCard({ professionalId }: { professionalId: string }) {
  const [professional, setProfessional] = useState<Partial<UserWithProfile> | null>(null)

  const imageUrl = professional?.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${professional?.profile?.name || ""} ${professional?.profile?.lastName || ""}`
      )}&background=197387&color=fff`;

  useEffect(() => {
    if (!professionalId) return
    const fetchData = async () => {
      try {
        const data = await getOneUser(professionalId)
        setProfessional(data!)
      } catch (error) {
        console.error("Error al obtener profesional:", error)
      }
    }
    fetchData()
  }, [professionalId])

  if (!professional) return null

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-center">{professional.profile?.name} {professional.profile?.lastName}</CardTitle>
      </CardHeader>
      <CardContent>

          <div className="mb-4">
            <Image
              src={imageUrl}
              alt="Foto de perfil"
              width={150}
              height={150}
              className="rounded-full object-cover mx-auto"
            />
          </div>

        <p className="text-center font-medium text-gray-700">{professional?.profile?.jobTitle}</p>
        <p className="text-center font-medium text-gray-700">{professional?.profile?.bio}</p>
      </CardContent>
    </Card>
  )
}
