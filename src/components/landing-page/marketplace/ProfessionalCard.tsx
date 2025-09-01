import { MapPin,  Star } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Dialog, DialogTrigger } from "../../ui/dialog";
import { professionals } from "@/lib/mock-data";

interface ProfessionalCardProps {
  professional: typeof professionals[number];
  isListView?: boolean;
  onViewProfile: (professional: typeof professionals[number]) => void;
  onBook: (professional: typeof professionals[number]) => void;
}

export default function ProfessionalCard({
  professional,
  isListView = false,
  onViewProfile,
  onBook,
}: ProfessionalCardProps) {
    return (
        
    <Card
      className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg cursor-pointer ${
        isListView ? "flex-row" : ""
      }`}
    >
      <CardContent className={`p-6 ${isListView ? "flex items-center space-x-6 w-full" : ""}`}>
        <div className={`${isListView ? "flex-shrink-0" : "text-center mb-4"}`}>
          <Avatar className={`${isListView ? "w-16 h-16" : "w-20 h-20 mx-auto mb-3"}`}>
            <AvatarImage src={professional.image || "/placeholder.svg"} alt={professional.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
              {professional.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className={`${isListView ? "flex-grow" : ""}`}>
          <div className={`${isListView ? "flex justify-between items-start" : ""}`}>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{professional.name}</h3>
              <p className="text-blue-600 font-medium mb-2">{professional.specialty}</p>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {professional.location}
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-semibold">{professional.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({professional.reviews} reseñas)</span>
                </div>
                <Badge
                  className={`text-xs ${
                    professional.availability.includes("hoy")
                      ? "bg-green-100 text-green-800 border-green-200"
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                  }`}
                >
                  {professional.availability}
                </Badge>
              </div>
            </div>

            <div className={`${isListView ? "text-right flex-shrink-0 ml-6" : "text-center"}`}>
              <div className="space-y-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
                      onClick={() => onViewProfile(professional)}
                    >
                      Ver Perfil
                    </Button>
                  </DialogTrigger>
                </Dialog>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={() => onBook(professional)}
                >
                  Reservar Turno
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    )


    
}