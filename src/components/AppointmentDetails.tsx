import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash } from "lucide-react";
import { Appointment } from "@/types/appointments";

interface AppointmentDetailsProps {
  appointment: Appointment;
  draft: Partial<Appointment>;
  onDraftChange: (patch: Partial<Appointment>) => void;
  onEdit: (field: keyof Appointment) => void; // para abrir modal en fecha/hora
  onCancel: () => void;
  onSaveChanges: () => void;
}

export function AppointmentDetails({
  appointment,
  draft,
  onDraftChange,
  onEdit,
  onCancel,
  onSaveChanges
}: AppointmentDetailsProps) {
  const val = <K extends keyof Appointment>(k: K) =>
    (draft[k] ?? appointment[k]) as Appointment[K];

  return (
    <div className="container mx-auto py-4">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Detalles del turno</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          {/* Fecha */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-medium">{val("date") || "—"}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onEdit("date")}>
              <Pencil className="w-4 h-4 mr-1" /> Editar
            </Button>
          </div>

          {/* Hora */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="text-sm text-gray-500">Hora</p>
              <p className="font-medium">{val("time") || "—"}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => onEdit("time")}>
              <Pencil className="w-4 h-4 mr-1" /> Editar
            </Button>
          </div>

          {/* Nombre */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="w-full">
              <p className="text-sm text-gray-500">Nombre</p>
              <Input
                value={String(val("name") ?? "")}
                onChange={(e) => onDraftChange({ name: e.target.value })}
              />
            </div>
          </div>

          {/* Apellido */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="w-full">
              <p className="text-sm text-gray-500">Apellido</p>
              <Input
                value={String(val("lastName") ?? "")}
                onChange={(e) => onDraftChange({ lastName: e.target.value })}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="w-full">
              <p className="text-sm text-gray-500">Email</p>
              <Input
                type="email"
                value={String(val("email") ?? "")}
                onChange={(e) => onDraftChange({ email: e.target.value })}
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="w-full">
              <p className="text-sm text-gray-500">Teléfono</p>
              <Input
                value={String(val("phone") ?? "")}
                onChange={(e) => onDraftChange({ phone: e.target.value })}
              />
            </div>
          </div>

          {/* Motivo */}
          <div className="flex items-center justify-between border-b pb-3">
            <div className="w-full">
              <p className="text-sm text-gray-500">Motivo de consulta</p>
              <Input
                value={String(val("reason") ?? "")}
                onChange={(e) => onDraftChange({ reason: e.target.value })}
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={onSaveChanges} className="sm:flex-1">
              Guardar cambios
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="sm:flex-1">
                  <Trash className="w-4 h-4 mr-1" /> Cancelar turno
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Cancelar turno?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. El turno se cancelará y el profesional será notificado.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Volver</AlertDialogCancel>
                  <AlertDialogAction onClick={onCancel}>
                    Sí, cancelar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
