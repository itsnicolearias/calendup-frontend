"use client"
import { useSearchParams } from "next/navigation";
import RegisterPage from "../../../../components/auth/Register";
import FreePlanFeatures from "@/components/auth/FreePlanFeatures";
import { Suspense } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  
    const planName = searchParams.get("plan-name");


  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
      {planName && planName === "free" ? (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
          <RegisterPage />
          <div className="w-full max-w-md lg:sticky lg:top-8">
            <FreePlanFeatures />
          </div>
        </div>
      ) : (
        <RegisterPage />
      )}
      </Suspense>
      
    </>
  )
}
