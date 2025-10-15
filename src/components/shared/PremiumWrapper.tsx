import { ReactNode, useState } from "react";
import { Lock } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useFeatureAccess } from "@/hooks/useFeatureAccess";
import UpgradeModal from "../dashboard/sidebar/UpgradeModal";
import { PlanFeatures } from "@/types/subscriptions";

interface PremiumWrapperProps {
  feature: keyof PlanFeatures;
  children: ReactNode;
  asDisabled?: boolean;
}

export function PremiumWrapper({ feature, children, asDisabled = true }: PremiumWrapperProps) {
  const { hasAccess } = useFeatureAccess(feature);
  const [showModal, setShowModal] = useState(false);

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => setShowModal(true)}
            className={`relative group ${
              asDisabled ? "opacity-60 pointer-events-auto cursor-pointer" : ""
            }`}
          >
            {children}

            {/* Candado flotante */}
            <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm">
              <Lock size={14} className="text-gray-500" />
            </div>

            {/* Overlay si querés que no se pueda interactuar */}
            {asDisabled && (
              <div className="absolute inset-0 bg-white/40 dark:bg-gray-800/40 rounded-lg backdrop-blur-sm" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="text-sm bg-white text-black">
          Disponible solo en el plan{" "}
          <span className="font-semibold text-[#0388bd]">Premium</span>
        </TooltipContent>
      </Tooltip>

      {showModal && <UpgradeModal open={true} onOpenChange={() => setShowModal(false)} />}
    </>
  );
}
