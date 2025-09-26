"use client";

import { useSearchParams } from "next/navigation";
import RegisterPage from "../../../../components/auth/Register";
import FreePlanFeatures from "@/components/auth/FreePlanFeatures";
import { Suspense } from "react";

function RegisterWrapper() {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan-name");

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
      <Suspense fallback={<div>Cargando...</div>}>
        <RegisterPage />
      </Suspense>

      {planName === "free" && (
        <div className="w-full max-w-md lg:sticky lg:top-8">
          <FreePlanFeatures />
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <RegisterWrapper />
    </Suspense>
  );
}
