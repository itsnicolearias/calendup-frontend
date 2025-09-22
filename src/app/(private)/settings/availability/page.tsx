import AvailabilityConfig from "@/components/settings/AvaiabilityConfig";

export default function AvailabilitySettingsPage() {
  return (
   <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-xl font-bold mb-2">Disponibilidad horaria</h1>
        <p className="text-muted-foreground">
          Define los días y horarios en los que estarás disponible para turnos.
        </p>
      </div>

      <div className="border rounded-md p-4 md:p-6 overflow-x-auto">
        <AvailabilityConfig />
      </div>
    </div>
  );
}
