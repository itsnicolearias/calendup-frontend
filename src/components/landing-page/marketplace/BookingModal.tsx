import { MapPin, Star, User } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useState } from "react";
import { UserWithProfile } from "@/types/settings";
import { getAverageRating } from "@/utils/getAverageRating";
import AvailableCalendar from "@/components/shared/AvailableCalendar";
import { createAppointment } from "@/services/appointments";
import { toast } from "sonner";
import { State } from "country-state-city";
import ServiceSelection from "@/components/shared/ServiceSelection";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getModeText } from "@/types/appointments";

interface BookingModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    professional: UserWithProfile | null;
}

export default function BookingModal({ open, onOpenChange, professional }: BookingModalProps) {

    const province = State.getStateByCodeAndCountry(professional?.profile?.province || "",  professional?.profile?.country || "")
    const location = `${professional?.profile?.city}, ${province?.name}`
    const name = `${professional?.profile?.name || ""} ${professional?.profile?.lastName || ""}`
    const rating = getAverageRating(professional?.Reviews)

    const [selectedDate, setSelectedDate] = useState<string>()
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [selectedType, setSelectedType] = useState<string | null>(null)
    const [bookingForm, setBookingForm] = useState({
      name: "",
      lastName: "",
      professionalId: professional?.userId,
      email: "",
      reason: "",
      date: "",
      time: "",
      phone: "",
      appointmentTypeId: "",
      selectedAppMode: "",
      })

    const handleBookingFormChange = (field: string, value: string) => {
        setBookingForm((prev) => ({ ...prev, [field]: value }))
      }

      const handleCancel = () => {
        setSelectedDate(undefined)
        setSelectedTime("")
        setSelectedType(null)
        onOpenChange(false)
      }
    
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      bookingForm.date = selectedDate || "";

      if (selectedType){
        bookingForm.appointmentTypeId = selectedType
      } else {
        bookingForm.appointmentTypeId = selectedType!
      }

      bookingForm.professionalId = professional?.userId || ""
console.log(bookingForm)
      await createAppointment(bookingForm);
      toast.success("Turno solicitado con éxito", {
        description: "Te enviaremos un email con los detalles.",
        duration: 5000,
      });

      onOpenChange(false)
      handleCancel()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
    }
      }

      const handleSelect = (date: string, hour: string) => {
      setSelectedDate(date)
      setSelectedTime(hour)
      setBookingForm((prev) => ({ ...prev, date, time: hour }))
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
                            <AvatarImage src={professional.profile?.profilePicture || "placeholder.svg"} alt={professional.profile?.name} />
                            <AvatarFallback className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white text-lg">
                               {name
                                .split(" ")
                                .filter(n => n.length > 0) // evitar strings vacíos
                                .map(n => n[0].toUpperCase())
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-grow">
                            <h3 className="text-xl font-bold text-gray-900">{professional.profile?.name}</h3>
                            <p className="text-[#0388bd] font-medium">{professional.profile?.jobTitle}</p>
                            <div className="flex items-center mt-1">
                              <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                              <span className="text-gray-600 text-sm">{location}</span>
                            </div>
                          </div>
                          <div className="text-right">

                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              <span className="text-sm font-medium">{rating}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
        
                    <form onSubmit={handleBookingSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                        {professional?.AppointmentTypes && professional?.AppointmentTypes.length > 0 && (
                          <div>
                            <ServiceSelection  appointmentTypes={professional.AppointmentTypes} selectedTypeId={selectedType} setSelectedType={setSelectedType} isModal={true} />
                          </div>
                        )}

                         
                         
                        
                        {/* Calendar and Time Selection */}
                        <div className="space-y-6">
                           {/* ver si esta card es necesaria */}

                                <AvailableCalendar onSelect={handleSelect} professionalId={professional.userId} isModal={true} />
                    
        
                        </div>

        
                        {/* Form Fields */}
                        <div className="space-y-6">
                          <Card>
                            <CardContent className="p-6">
                              <h4 className="text-lg font-semibold mb-4 flex items-center">
                                <User className="w-5 h-5 mr-2 text-[#0388bd]" />
                                Datos Personales
                              </h4>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor="booking-nombre">Nombre *</Label>
                                    <Input
                                      id="booking-nombre"
                                      value={bookingForm.name}
                                      onChange={(e) => handleBookingFormChange("name", e.target.value)}
                                      placeholder="Tu nombre"
                                      required
                                      className="mt-1"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="booking-lastName">Apellido *</Label>
                                    <Input
                                      id="booking-lastName"
                                      value={bookingForm.lastName}
                                      onChange={(e) => handleBookingFormChange("lastName", e.target.value)}
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
                                    value={bookingForm.phone}
                                    onChange={(e) => handleBookingFormChange("phone", e.target.value)}
                                    placeholder="+54 11 1234-5678"
                                    className="mt-1"
                                  />
                                </div>
        
                                <div>
                                  <Label htmlFor="booking-notas">Notas adicionales</Label>
                                  <Input
                                    id="booking-notas"
                                    value={bookingForm.reason}
                                    onChange={(e) => handleBookingFormChange("reason", e.target.value)}
                                    placeholder="Información adicional sobre tu consulta (opcional)"
                                    className="mt-1"
                                    //rows={3}
                                  />
                                </div>

                                {/* Tipo de modalidad */}
                                { professional.profile?.appMode === "combined" && (
                                <>
                                  <div className="">
                                  <label className="" htmlFor="booking-mode">Modalidad de turno</label>
                                  <Select
                                    defaultValue={bookingForm.selectedAppMode}
                                    required={true}
                                    onValueChange={(value: string) => {
                                      setBookingForm((prev) => ({
                                        ...prev,
                                        selectedAppMode: value,
                                      }));
                                    }}
                                  >
                                    <SelectTrigger className="mt-1">
                                      <SelectValue placeholder="Seleccionar modalidad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="in_person">Presencial</SelectItem>
                                        <SelectItem value="online">Online</SelectItem>                    
                                    </SelectContent>
                                  </Select>
                                </div>
                                </>
                                )}
                              </div>
                            </CardContent>
                          </Card>
        
                          {/* Booking Summary */}
                          {selectedDate && selectedTime && (
                            <Card className="bg-green-50 border-green-200">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-green-800 mb-2">Resumen del turno</h4>
                                <div className="space-y-1 text-sm text-green-700">
                                  <p>
                                    <strong>Fecha:</strong>{" "}
                                    {selectedDate}
                                  </p>
                                  <p>
                                    <strong>Hora:</strong> {selectedTime}
                                  </p>
                                  <p>
                                    <strong>Profesional:</strong> {professional.profile?.name}
                                  </p>
                                  <p>
                                    <strong>Servicio:</strong> {professional.profile?.jobTitle}
                                  </p>
                                  { professional?.profile?.appMode && (
                                    <p>
                                      <strong>Modalidad:</strong> {bookingForm.selectedAppMode ? bookingForm.selectedAppMode : getModeText(professional.profile.appMode!)}
                                    </p>
                                  )}
                                  
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </div>
        
                      {/* Action Buttons */}
                      <div className="flex space-x-4 pt-6 border-t">
                        <Button type="button" variant="outline" onClick={() => handleCancel()} className="flex-1">
                          Cancelar
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            !selectedDate ||
                            !selectedTime ||
                            !bookingForm.name ||
                            !bookingForm.lastName ||
                            !bookingForm.email
                          }
                          className="flex-1 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white"
                        >
                          Confirmar turno
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </DialogContent>
            </Dialog>


    )
}