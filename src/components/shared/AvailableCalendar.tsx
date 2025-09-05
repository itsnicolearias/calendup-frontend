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

export default function AvailableCalendar({
  onSelect,
  professionalId,
}: AvailableCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [availability, setAvailability] = useState<AvailabilityResponse>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>("");

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
  }, [currentMonth]);

  useEffect(() => {
  if (selectedDate && selectedHour) {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    onSelect(dateStr, selectedHour);
  }
}, [selectedDate]);

  const isDayAvailable = (date: Date) => {
    const formatted = format(date, "yyyy-MM-dd");
    return Object.keys(availability).includes(formatted);
  };

  const handleTimeChange = (hour: string) => {
    setSelectedHour(hour);
    if (!selectedDate) return;
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    onSelect(dateStr, hour);
  };

  const availableHours =
    availability[format(selectedDate ?? new Date(), "yyyy-MM-dd")] || [];

  return (
    <div>
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-blue-600" />
          Selecciona fecha y hora
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Fecha</h3>
            <div className="flex justify-center">
              <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              onMonthChange={setCurrentMonth}
              locale={es}
              disabled={(date) => !isDayAvailable(date)}
              className="rounded-md border shadow w-100"
            />
            </div>
          </div>
          
            
            <div>
            <h4 className="text-lg font-semibold mb-4">Hora</h4>
            {selectedDate && availableHours.length > 0 ? (
              <div className="grid grid-cols-2 gap-2"> 
              {availableHours.map((hour) => (
                  <Button
                    key={hour}
                    type="button"
                    variant={selectedHour === hour ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTimeChange(hour)}
                    className={
                      selectedHour === hour
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "hover:border-blue-500 hover:text-blue-600"
                    }
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              
            ) : (
              <p className="text-gray-500 text-center py-8">Primero selecciona una fecha</p>
            )}
            </div>
        </div>
      </CardContent>
    </Card>
    
      
    </div>
  );
}
