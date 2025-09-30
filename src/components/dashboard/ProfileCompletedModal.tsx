import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Copy } from "lucide-react"

interface ProfileCompletedProps {
  open: boolean
  schedulingLink: string
  onClose: () => void
}

export default function ProfileCompletedModal ({ open, schedulingLink, onClose }: ProfileCompletedProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(schedulingLink)
    toast.success("¡Link copiado al portapapeles!")
  }

  const shortLink = schedulingLink.length > 35
    ? schedulingLink.slice(0, 35) + "..."
    : schedulingLink




  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-[#0388bd]">
            🎉 ¡Felicidades!
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-center">
          <p className="text-gray-700 leading-relaxed">
            Has completado todos los campos necesarios en tu perfil 👏.  
            Aquí te entregamos tu <span className="font-semibold">link único de agendamiento</span> 🔗, 
            el cual puedes compartir con tus clientes para comenzar a recibir turnos 📅.  
            <br /><br />
            A partir de ahora tu perfil aparece en nuestro{" "}
            <a
              href="/professionals-marketplace"
              className="text-[#0388bd] font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              portal de profesionales
            </a>{" "}
            🌐, donde los usuarios pueden encontrarte y reservar turnos contigo 🙌.
          </p>

          <div className="flex items-center gap-2">
            <Input
              value={shortLink}
              className="flex-1 bg-gray-100 text-gray-600 truncate"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="shrink-0"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white font-semibold"
            onClick={onClose}
          >
            ¡Comenzar ahora!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
