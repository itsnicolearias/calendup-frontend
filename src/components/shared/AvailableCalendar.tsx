"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getAvailableSlots } from "@/services/appointments";
import {
  AvailabilityResponse,
  AvailableCalendarProps,
} from "@/types/appointments";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon } from "lucide-react";
import { useControlledDateTime } from "@/utils/useControlledDateTime";

/**
 * Si pasás selectedDate y selectedHour → el componente se comporta como controlado (ideal para edición).
 * Si no pasás nada → usa estado interno con useState (ideal para creación).
 * 
 */
export default function AvailableCalendar({
  onSelect,
  professionalId,
  isModal,
  selectedDate,
  selectedHour,
}: AvailableCalendarProps) {
  const [availability, setAvailability] = useState<AvailabilityResponse>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const { currentDate, currentHour, handleDateChange, handleHourChange } =
    useControlledDateTime(selectedDate, selectedHour, onSelect);

  useEffect(() => {
    const month = currentMonth.getMonth() + 1;
    const year = currentMonth.getFullYear();
    const fetchSlots = async () => {
      const data: AvailabilityResponse | undefined = await getAvailableSlots(
        professionalId,
        year,
        month
      );
      if (data) {
        setAvailability(data);
      }
    };
    fetchSlots();
  }, [currentMonth, professionalId]);

  const isDayAvailable = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    return Object.keys(availability).includes(formatted);
  };

  const availableHours =
    availability[format(currentDate ?? new Date(), "yyyy-MM-dd")] || [];

  return (
     <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-[#0388bd]" />
          Selecciona fecha y hora
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div
          className={
            isModal
              ? "flex flex-col gap-8 lg:grid lg:grid-cols-1 lg:gap-12"
              : "grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12"
          }
        >
          {/* Calendario */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-base sm:text-lg font-semibold mb-4">Fecha</h3>
            <div className="w-full overflow-x-auto sm:overflow-visible">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={handleDateChange}
                onMonthChange={setCurrentMonth}
                locale={es}
                disabled={(date) => !isDayAvailable(date)}
                className="rounded-md border shadow w-full max-w-md mx-auto"
              />
            </div>
          </div>

          {/* Horarios */}
          <div className="flex flex-col">
            <h4 className="text-base sm:text-lg font-semibold mb-4">Hora</h4>
            {currentDate && availableHours.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableHours.map((hour) => (
                  <Button
                    key={hour}
                    type="button"
                    variant={currentHour === hour ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleHourChange(hour)}
                    className={
                      currentHour === hour
                        ? "bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white w-full"
                        : "hover:border-[#0388bd] hover:text-[#0388bd] w-full"
                    }
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-6 sm:py-8">
                Primero selecciona una fecha
              </p>
            )}
          </div>
        </div>
      </CardContent>
      </Card> 
  );
}
