// hooks/useFeatureAccess.ts

import { useUser } from "@/contexts/UserContext";
import { PlanFeatures } from "@/types/subscriptions";

export function useFeatureAccess(feature: keyof PlanFeatures) {
  const { user } = useUser();
  const plan = user?.Subscription.plan;

  const planName = plan?.name
  const isPremium = plan?.planId === process.env.NEXT_PUBLIC_PREMIUM_PLAN_ID;
  const isFreeUser = !isPremium;

  const hasAccess = plan?.features?.[feature];

  return { hasAccess, isPremium, isFreeUser, planName };
}
