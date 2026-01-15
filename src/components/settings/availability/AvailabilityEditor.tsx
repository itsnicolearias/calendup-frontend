"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DayAvailabilityEditor } from "./DayAvailabilityEditor"
import { dayLabels, ProfileFormValues } from "@/types/settings"
import type { Path } from "react-hook-form"

const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
const dayShort = ["L", "M", "X", "J", "V", "S", "D"]

interface AvailabilityEditorProps {
  saveChanges: (data: ProfileFormValues) => Promise<void>
}

export default function AvailabilityEditor({ saveChanges }: AvailabilityEditorProps) {
  const { setValue, getValues } = useFormContext<ProfileFormValues>()

  const [open, setOpen] = useState(false)
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [saving, setSaving] = useState(false)

  const handleApply = async () => {
    if (!start || !end || selectedDays.length === 0) return

    // 1. Actualizar disponibilidad en el form
    selectedDays.forEach((idx) => {
      const key = days[idx]
      setValue(`availability.${key}` as Path<ProfileFormValues>, [{ start, end }])
    })

    // 2. Guardar cambios en la BD
    try {
      setSaving(true)
      const formData = getValues()
      await saveChanges(formData)
    } finally {
      setSaving(false)
      setOpen(false)
      setStart("")
      setEnd("")
      setSelectedDays([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Botón global */}
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="bg-white border-[#0388bd] text-[#0388bd] hover:bg-[#0388bd] hover:text-white">
              Definir un solo horario
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Definir un solo horario</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Inputs de horas */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Inicio</Label>
                  <Input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
                </div>
                <div>
                  <Label>Fin</Label>
                  <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
                </div>
              </div>

              {/* Selector de días estilo alarma */}
              <div className="flex justify-center gap-2 flex-wrap">
                {dayShort.map((label, idx) => {
                  const active = selectedDays.includes(idx)
                  return (
                    <button
                      key={label}
                      type="button"
                      className={`w-10 h-10 flex items-center justify-center rounded-full border transition-colors
                        ${active
                          ? "bg-[#0388bd] text-white border-[#0388bd]"
                          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"}
                      `}
                      onClick={() =>
                        setSelectedDays((prev) =>
                          active ? prev.filter((d) => d !== idx) : [...prev, idx]
                        )
                      }
                    >
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Botón aplicar */}
              <Button
                className="w-full bg-[#0388bd] text-white hover:bg-[#02455f]"
                onClick={handleApply}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Aplicar horarios"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Editores por día */}
      {days.map((day) => (
        <DayAvailabilityEditor key={day} day={day} label={dayLabels[day]} />
      ))}
    </div>
  )
}
