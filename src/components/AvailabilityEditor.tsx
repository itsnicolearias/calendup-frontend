import { dayLabels } from "@/types/settings";
import { DayAvailabilityEditor } from "./DayAvailabilityEditor";

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

export default function AvailabilityEditor() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Disponibilidad semanal</h2>
      {days.map((day) => (
        <DayAvailabilityEditor key={day} day={day} label={dayLabels[day]} />
      ))}
    </div>
  );
}
