// src/hooks/useControlledDateTime.ts
import { useEffect, useState } from "react";
import { parse, format } from "date-fns";

/**
 * Maneja fecha y hora de forma controlada (props) o no controlada (estado interno).
 * - selectedDate: string "yyyy-MM-dd" opcional
 * - selectedHour: string "HH:mm" opcional
 * - onSelect: callback (date: "yyyy-MM-dd", hour: "HH:mm")
 */
export function useControlledDateTime(
  selectedDate?: string,
  selectedHour?: string,
  onSelect?: (date: string, hour: string) => void
) {
  const parseDate = (s?: string) =>
    s ? parse(s, "yyyy-MM-dd", new Date()) : undefined;

  const [internalDate, setInternalDate] = useState<Date | undefined>(
    parseDate(selectedDate)
  );
  const [internalHour, setInternalHour] = useState<string>(
    selectedHour ?? ""
  );

  // Mantener internos en sync si las props cambian
  useEffect(() => {
    if (selectedDate) setInternalDate(parseDate(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    if (selectedHour !== undefined) setInternalHour(selectedHour);
  }, [selectedHour]);

  // Qué valor usar (props tienen prioridad)
  const currentDate = selectedDate ? parseDate(selectedDate) : internalDate;
  const currentHour = selectedHour ?? internalHour;

  // Llamar onSelect solo cuando tengamos ambos (fecha + hora)
  const tryEmitSelect = (date: Date | undefined, hour: string | undefined) => {
    if (!onSelect || !date || !hour) return;
    const dateStr = format(date, "yyyy-MM-dd");
    onSelect(dateStr, hour);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    if (selectedDate !== undefined) {
      // modo controlado: props presentes -> emitimos solo si hay hora
      tryEmitSelect(date, currentHour || undefined);
    } else {
      // modo no-controlado: guardamos internamente y emitimos si hay hora
      setInternalDate(date);
      tryEmitSelect(date, currentHour || undefined);
    }
  };

  const handleHourChange = (hour: string) => {
    if (selectedHour !== undefined) {
      // controlado: emitimos solo si hay fecha
      tryEmitSelect(currentDate, hour);
    } else {
      // no-controlado: actualizamos internamente y emitimos si hay fecha
      setInternalHour(hour);
      tryEmitSelect(currentDate, hour);
    }
  };

  return {
    currentDate,
    currentHour,
    handleDateChange,
    handleHourChange,
  };
}
