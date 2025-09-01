import { Clock, MapPin, Star, User } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { es } from "date-fns/locale";
import { useState } from "react";
import { professionals, timeSlots } from "@/lib/mock-data";


interface BookingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    professional: typeof professionals[number] | null;
    timeSlots: typeof timeSlots;

}

export default function BookingModal({ open, onOpenChange, professional, timeSlots }: BookingModalProps) {
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [selectedTime, setSelectedTime] = useState("")

    const [bookingForm, setBookingForm] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        notas: "",
      })

    const handleBookingFormChange = (field: string, value: string) => {
        setBookingForm((prev) => ({ ...prev, [field]: value }))
      }
    
      const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Booking submitted:", {
          professional: professional,
          date: selectedDate,
          time: selectedTime,
          form: bookingForm,
        })
        onOpenChange(false)
      }

      

    return (
            <Dialog open={open} onOpenChange={onOpenChange}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Reservar Turno</DialogTitle>
                  <DialogDescription>Completa los datos para confirmar tu cita</DialogDescription>
                </DialogHeader>
        
                {professional && (
                  <div className="space-y-6">
                    {/* Professional Info */}
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={professional.image || "/placeholder.svg"} alt={professional.name} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
                              {professional.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900">{professional.name}</h3>
                            <p className="text-blue-600 font-medium">{professional.specialty}</p>
                            <div className="flex items-center mt-1">
                              <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                              <span className="text-gray-600 text-sm">{professional.location}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">{professional.price}</div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm font-medium">{professional.rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
        
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Calendar and Time Selection */}
                        <div className="space-y-6">
                          <Card>
                            <CardContent className="p-6">
                              <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                                Seleccionar Fecha
                              </h4>
                              <div className="flex justify-center">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  disabled={(date) => date < new Date() || date.getDay() === 0}
                                  className="rounded-md border shadow-sm"
                                  locale={es}
                                />
                              </div>
                              {selectedDate && (
                                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
                                  <p className="text-sm text-blue-800">
                                    Fecha seleccionada:{" "}
                                    {selectedDate.toLocaleDateString("es-ES", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
        
                          {selectedDate && (
                            <Card>
                              <CardContent className="p-6">
                                <h4 className="text-lg font-semibold mb-4 flex items-center">
                                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                                  Horarios Disponibles
                                </h4>
                                <div className="grid grid-cols-3 gap-2">
                                  {timeSlots.map((time) => (
                                    <Button
                                      key={time}
                                      type="button"
                                      variant={selectedTime === time ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => setSelectedTime(time)}
                                      className={
                                        selectedTime === time
                                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                                          : "hover:border-blue-500 hover:text-blue-600"
                                      }
                                    >
                                      {time}
                                    </Button>
                                  ))}
                                </div>
                                {selectedTime && (
                                  <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
                                    <p className="text-sm text-green-800">Hora seleccionada: {selectedTime}</p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          )}
                        </div>
        
                        {/* Form Fields */}
                        <div className="space-y-6">
                          <Card>
                            <CardContent className="p-6">
                              <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <User className="w-5 h-5 mr-2 text-blue-600" />
                                Datos Personales
                              </h4>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="booking-nombre">Nombre *</Label>
                                    <Input
                                      id="booking-nombre"
                                      value={bookingForm.nombre}
                                      onChange={(e) => handleBookingFormChange("nombre", e.target.value)}
                                      placeholder="Tu nombre"
                                      required
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="booking-apellido">Apellido *</Label>
                                    <Input
                                      id="booking-apellido"
                                      value={bookingForm.apellido}
                                      onChange={(e) => handleBookingFormChange("apellido", e.target.value)}
                                      placeholder="Tu apellido"
                                      required
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
        
                                <div>
                                  <Label htmlFor="booking-email">Email *</Label>
                                  <Input
                                    id="booking-email"
                                    type="email"
                                    value={bookingForm.email}
                                    onChange={(e) => handleBookingFormChange("email", e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="mt-1"
                                  />
                                </div>
        
                                <div>
                                  <Label htmlFor="booking-telefono">Teléfono *</Label>
                                  <Input
                                    id="booking-telefono"
                                    type="tel"
                                    value={bookingForm.telefono}
                                    onChange={(e) => handleBookingFormChange("telefono", e.target.value)}
                                    placeholder="+54 11 1234-5678"
                                    required
                                    className="mt-1"
                                  />
                                </div>
        
                                <div>
                                  <Label htmlFor="booking-notas">Notas adicionales</Label>
                                  <Input
                                    id="booking-notas"
                                    value={bookingForm.notas}
                                    onChange={(e) => handleBookingFormChange("notas", e.target.value)}
                                    placeholder="Información adicional sobre tu consulta (opcional)"
                                    className="mt-1"
                                    //rows={3}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
        
                          {/* Booking Summary */}
                          {selectedDate && selectedTime && (
                            <Card className="bg-green-50 border-green-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-green-800 mb-2">Resumen de la Cita</h4>
                                <div className="space-y-1 text-sm text-green-700">
                                  <p>
                                    <strong>Fecha:</strong>{" "}
                                    {selectedDate.toLocaleDateString("es-ES", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </p>
                                  <p>
                                    <strong>Hora:</strong> {selectedTime}
                                  </p>
                                  <p>
                                    <strong>Profesional:</strong> {professional.name}
                                  </p>
                                  <p>
                                    <strong>Servicio:</strong> {professional.specialty}
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>
        
                      {/* Action Buttons */}
                      <div className="flex space-x-4 pt-6 border-t">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            !selectedDate ||
                            !selectedTime ||
                            !bookingForm.nombre ||
                            !bookingForm.apellido ||
                            !bookingForm.email ||
                            !bookingForm.telefono
                          }
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        >
                          Confirmar Reserva
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </DialogContent>
            </Dialog>


    )
}