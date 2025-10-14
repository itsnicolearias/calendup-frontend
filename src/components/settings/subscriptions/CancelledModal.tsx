import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface SubscriptionCancelledModalProps {
  open: boolean;
  onClose: () => void;
}

export const SubscriptionCancelledModal = ({ open, onClose }: SubscriptionCancelledModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 rounded-2xl text-center">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-12 w-12 text-[#197387]" />
          </div>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Tu suscripción ha sido cancelada
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            Ahora estás en el <strong>plan gratuito</strong>.  
            Podrás seguir utilizando Calendup con las funcionalidades básicas y volver a activar tu plan Premium cuando desees.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            className="bg-[#197387] text-white hover:bg-[#14605E] transition-colors"
          >
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
