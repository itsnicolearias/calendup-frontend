"use client";

import { useSearchParams } from "next/navigation";
import RegisterPage from "../../../../components/auth/Register";
import { Suspense } from "react";

function RegisterWrapper() {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan-name");

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
      <Suspense fallback={<div>Cargando...</div>}>
        <RegisterPage />
      </Suspense>
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
