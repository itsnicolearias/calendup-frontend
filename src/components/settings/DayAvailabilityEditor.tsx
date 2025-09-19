import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DayAvailabilityProps {
  day: string;
  label: string;
}

export function DayAvailabilityEditor({ day, label }: DayAvailabilityProps) {
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `availability.${day}` as const,
  });

  return (
    <div className="border p-4 rounded-lg space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="capitalize font-semibold">{label}</h3>
        <Button type="button" onClick={() => append({ start: "", end: "" })} className="bg-[#0388bd]">
          + Agregar horario
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">Sin horarios definidos.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-5 gap-2 items-end">
          <div className="col-span-2">
            <Label>Inicio</Label>
            <Input
              type="time"
              {...register(`availability.${day}.${index}.start`)}
            />
          </div>
          <div className="col-span-2">
            <Label>Fin</Label>
            <Input
              type="time"
              {...register(`availability.${day}.${index}.end`)}
            />
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            Eliminar
          </Button>
        </div>
      ))}
    </div>
  );
}
