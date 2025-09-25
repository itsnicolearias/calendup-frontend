"use client"
import ResetPassword from "@/components/auth/ResetPassword";
import { useRouter, useSearchParams } from "next/navigation";


export default function Page() {
    const searchParams = useSearchParams()
    const token = searchParams.get("reset-token")

    if (!token){
        throw new Error;
    }

    const router = useRouter()

    const handleSuccess= () => {
        router.push("/auth/login")
    }

  return (
    <div>
      <ResetPassword token={token} onSuccess={handleSuccess} />
    </div>
  )
}
