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

  // Hook que maneja estado interno o controlado por props
  const {
    currentDate,
    currentHour,
    handleDateChange,
    handleHourChange,
  } = useControlledDateTime(selectedDate, selectedHour, onSelect);

  const cols = isModal
    ? "grid grid-cols-2 md:grid-cols-1 gap-8"
    : "grid grid-cols-2 md:grid-cols-2 gap-8";

  useEffect(() => {
    const month = currentMonth.getMonth() + 1;
    const year = currentMonth.getFullYear();
    const fetchSlots = async () => {
      const data: AvailabilityResponse = await getAvailableSlots(
        professionalId,
        year,
        month
      );
      setAvailability(data);
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
          <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
          Selecciona fecha y hora
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className={cols}>
          {/* Calendario */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fecha</h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={handleDateChange}
                onMonthChange={setCurrentMonth}
                locale={es}
                disabled={(date) => !isDayAvailable(date)}
                className="rounded-md border shadow w-100"
              />
            </div>
          </div>

          {/* Horarios */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hora</h4>
            {currentDate && availableHours.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableHours.map((hour) => (
                  <Button
                    key={hour}
                    type="button"
                    variant={currentHour === hour ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleHourChange(hour)}
                    className={
                      currentHour === hour
                        ? "bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white"
                        : "hover:border-[#0388bd] hover:text-[#0388bd]"
                    }
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Primero selecciona una fecha
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
