import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { AppointmentStatus } from "@/types/appointments"
import { getStatusText } from "./status"

interface StatusDropdownProps {
  currentStatus: AppointmentStatus
  statuses: AppointmentStatus[] 
  onChange: (status: AppointmentStatus) => void
}

export function StatusDropdown({ currentStatus, statuses, onChange }: StatusDropdownProps) {
  // Filtramos el status actual para no mostrarlo en la lista
  const availableStatuses = statuses.filter(s => s !== currentStatus)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-black text-white hover:bg-white hover:text-black">
          {getStatusText(currentStatus)}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {availableStatuses.map(status => (
          <DropdownMenuItem key={status} onClick={() => onChange(status)}>
            {getStatusText(status)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
