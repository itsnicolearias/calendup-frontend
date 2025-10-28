// src/components/subscription/CancelSubscriptionModal.tsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cancelSubscription } from "@/services/subscriptions";

interface CancelSubscriptionModalProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  token: string;
  onCancelled: () => void; // callback para mostrar el segundo modal
}

export const CancelSubscriptionModal = ({ open, onClose, onCancelled, userId, token }: CancelSubscriptionModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    try {
      setLoading(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await cancelSubscription(userId, token)

      if (res.message === "Subscription cancelled successfully"){
        setLoading(false);
        onClose();
        onCancelled(); // abre el modal de éxito
      }
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setLoading(false);

    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            ¿Estás seguro que deseas cancelar tu suscripción?
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Al cancelar tu suscripción perderás los beneficios del plan Premium, pero podrás seguir utilizando el plan gratuito sin problemas.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="text-gray-600 border-gray-300">
            No, volver
          </Button>
          <Button
            onClick={handleCancel}
            disabled={loading}
            className="bg-[#0388bd] text-white hover:bg-[#036a92] transition-colors"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Sí, cancelar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
