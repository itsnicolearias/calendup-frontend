import CreateReviewForm from "@/components/appointments/CreateReviewForm";
import { Suspense } from "react";

export default function Page() {
  return (
      <Suspense fallback={<div>Cargando...</div>}>
        <CreateReviewForm />
      </Suspense>
  )
}
