import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { getAvailableSlots } from "@/services/appointments";
import {
  AvailabilityResponse,
  AvailableCalendarProps,
} from "@/types/appointments";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
    <div className="flex flex-col gap-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        onMonthChange={setCurrentMonth}
        locale={es}
        disabled={(date) => !isDayAvailable(date)}
        className="rounded-md border shadow"
      />

      {selectedDate && availableHours.length > 0 && (
        <div className="mt-2 w-full">
          <h4 className="text-base font-medium mb-1">
            Seleccioná un horario disponible para el{" "}
            {format(selectedDate, "PPP", { locale: es })}:
          </h4>
          <Select onValueChange={handleTimeChange} value={selectedHour}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar horario" />
            </SelectTrigger>
            <SelectContent>
              {availableHours.map((hour) => (
                <SelectItem key={hour} value={hour}>
                  {hour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
