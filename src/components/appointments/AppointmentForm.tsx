"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AvailableCalendar from "../shared/AvailableCalendar";
import { useSearchParams } from "next/navigation";
import { createAppointment } from "@/services/appointments";
import { UserWithProfile } from "@/types/settings";
import { getOneUser } from "@/services/users";
import { RatingResponse } from "@/types/review";
import ProfessionalProfileCard from "../shared/ProfessionalProfileCard";
import ServiceSelection from "../shared/ServiceSelection";
import { ArrowRight, CalendarIcon } from "lucide-react";
import PersonalInformation from "./PersonalInformation";
import BookingSummary from "./BookingSummary";
import BookingConfirmed from "./BookingConfirmed";
import ErrorModal from "../shared/ErrorModal";

export default function Component() {
  const searchParams = useSearchParams();
  if (searchParams === null) {
    throw new Error();
  }
  const professionalId = searchParams.get("professionalId") || "";

  const [dateF, setDateF] = useState<string>();
  const [time, setTime] = useState<string>("");
  const [professional, setProfessional] = useState<Partial<UserWithProfile> | undefined>(undefined)
  const [ratingData, setRatingData] = useState<RatingResponse>()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
      name: "",
      lastName: "",
      professionalId: professionalId,
      email: "",
      reason: "",
      date: "",
      time: "",
      phone: "",
      appointmentTypeId: "",
    });


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getOneUser(professionalId)

        setProfessional(data?.professional)
        setRatingData(data?.rating)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("No se pudo cargar la información del profesional. Por favor, intenta nuevamente más tarde.")     
      }
      
    }
    fetchData()
  }, [professionalId])

  //if (!professional) return <p>Cargando...</p>

  if (professional && !professional?.profile?.profileCompleted) {
    return (
      <ErrorModal title="Perfil Incompleto" message="El profesional seleccionado no ha completado su perfil. Por favor, intenta con otro profesional." />
    )
  }

  const handleSelect = (date: string, hour: string) => {
    setDateF(date);
    setTime(hour);

    setFormData((prev) => ({
      ...prev,
      date: date,
      time: hour,
    }));
  };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setBookingConfirmed(false)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      formData.date = dateF || "";

      if (selectedType){
        formData.appointmentTypeId = selectedType;
      }

      formData.appointmentTypeId = selectedType!;

      await createAppointment(formData);
      setBookingConfirmed(true)
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const isFormValid = () => {
    return formData.name && formData.lastName && formData.email && dateF && time
  }

  const resetBooking = () => {
    setDateF(undefined)
    setTime("")
    setSelectedType("")
    setFormData({
      name: "",
      lastName: "",
      professionalId: professionalId,
      email: "",
      reason: "",
      date: "",
      time: "",
      phone: "",
      appointmentTypeId: "",
    })
    setBookingConfirmed(false)
  }

  if (bookingConfirmed){
    return (
      <BookingConfirmed professional={professional!} selectedDate={dateF!} selectedTime={time} selectedService={selectedType!} resetBooking={resetBooking}  />
    )
  }

  return (
    <>
    { error && (
      
      <ErrorModal 
        title="Profesional no encontrado" 
        message={error}
        />

    )}

    { !error && professional && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                CalendUp - Solicitar Turno
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Professional Profile - Left Column */}
          <ProfessionalProfileCard professional={professional} rating={ratingData} />

          {/* Main Form - Right Columns */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              { professional.AppointmentTypes && professional.AppointmentTypes.length > 0 && (
                <ServiceSelection appointmentTypes={professional.AppointmentTypes} selectedTypeId={selectedType ? selectedType : null} setSelectedType={setSelectedType} isModal={false} />
              )}
              

             
              {/* Date and Time Selection */}
              <AvailableCalendar onSelect={handleSelect} professionalId={professional.userId!} isModal={false}  />

              {/* Personal Information */}
              <PersonalInformation formData={formData} handleInputChange={handleInputChange} />

              {/* Booking Summary */}
              {dateF && time && (
                <BookingSummary professional={professional} selectedType={selectedType} selectedDate={dateF!} selectedTime={time} />
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid()}
                className="w-full h-14 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white text-lg font-semibold rounded-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isFormValid() ? (
                  <>
                    Confirmar Turno
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                ) : (
                  "Completa todos los campos requeridos"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )}
    </>
      
  )
}
