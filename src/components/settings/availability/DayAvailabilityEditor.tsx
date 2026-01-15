import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";

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
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={day}>
        <AccordionTrigger className="capitalize font-semibold">
          {label}
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <Button
              type="button"
              onClick={() => append({ start: "", end: "" })}
              className="bg-[#0388bd] text-white w-full sm:w-auto"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Agregar horario
            </Button>

            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground">Sin horarios definidos.</p>
            )}

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end"
              >
                <div className="sm:col-span-2">
                  <Label>Inicio</Label>
                  <Input
                    type="time"
                    {...register(`availability.${day}.${index}.start`)}
                    className="rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label>Fin</Label>
                  <Input
                    type="time"
                    {...register(`availability.${day}.${index}.end`)}
                    className="rounded-xl"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => remove(index)}
                  className="sm:col-span-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
