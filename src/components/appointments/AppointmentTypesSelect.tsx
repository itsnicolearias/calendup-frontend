import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AppointmentType } from "@/types/appointments"

interface AppointmentTypesSelectProps {
  types: AppointmentType[]
  selected: string | null
  onSelect: (appointmentTypeId: string | null) => void
}

export default function AppointmentTypesSelect({ types, selected, onSelect }: AppointmentTypesSelectProps) {
  if (types.length === 0) return null

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Selecciona un tipo de turno:</Label>
      <div className="grid gap-3">
        {types.map((type) => (
          <Card
            key={type.appointmentTypeId}
            className={`cursor-pointer rounded-xl border p-3 transition hover:shadow-sm ${
              selected === type.appointmentTypeId ? "border-primary" : "border-muted"
            }`}
            onClick={() => onSelect(type.appointmentTypeId)}
          >
            <CardContent className="flex items-center space-x-3 p-0">
              <input
                type="radio"
                checked={selected === type.appointmentTypeId}
                onChange={() => onSelect(type.appointmentTypeId)}
                className="h-4 w-4 accent-primary"
              />
              <div className="flex-1">
                <p className="font-medium">{type.name}</p>
                {type.price !== undefined && (
                  <p className="text-sm text-muted-foreground">Precio: ${type.price}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
