import { Mail, MapPin, Phone, Star } from "lucide-react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { UserWithProfile } from "@/types/settings";
import { getAverageRating } from "@/utils/getAverageRating";
import { State } from "country-state-city";

interface ProfessionalModalProps {
  professional: UserWithProfile | null | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfessionalModal({ professional, open, onOpenChange }: ProfessionalModalProps) {
  
  const province = State.getStateByCodeAndCountry(professional?.profile?.province || "", professional?.profile?.country || "" )
  const location = `${professional?.profile?.city}, ${province?.name}`
  const name = `${professional?.profile?.name || ""} ${professional?.profile?.lastName || ""}`
  const rating = getAverageRating(professional?.Reviews)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Perfil Profesional</DialogTitle>
          <DialogDescription>Información completa del profesional</DialogDescription>
        </DialogHeader>
        {professional && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={professional.profile?.profilePicture || "placeholder.svg"} alt={professional.profile?.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl">
                   {name
                    .split(" ")
                    .filter(n => n.length > 0) // evitar strings vacíos
                    .map(n => n[0].toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{professional.profile?.name}</h3>
                <p className="text-blue-600 font-medium text-lg">{professional.profile?.jobTitle}</p>
                <div className="flex items-center mt-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">{rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  Ubicación
                </h4>
                <p className="text-gray-600">{location}</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-blue-600" />
                  Teléfono
                </h4>
                <p className="text-gray-600">{professional.profile?.phone}</p>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-3 flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Email
                </h4>
                <p className="text-gray-600">{professional.email}</p>
              </Card>
            </div>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Descripción</h4>
              <p className="text-gray-600 leading-relaxed">{professional.profile?.bio}</p>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-3">Servicios</h4>
              <div className="flex flex-wrap gap-2">
                {professional?.AppointmentTypes?.map((appType) => (
                  <Badge key={appType.appointmentTypeId} className="bg-blue-100 text-blue-800 border-blue-200">
                    {appType.name}
                  </Badge>
                ))}
              </div>
            </Card>

            <div className="flex space-x-4 pt-4">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                size="lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Reservar Turno
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contactar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>

    )
}