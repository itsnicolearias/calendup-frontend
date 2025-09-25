"use client"
import ForgotPassword from "@/components/auth/ForgotPassword";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter()

  const handleBackToLogin = () => {
    router.push("/auth/login")
  }
    
  return (
    <div>
      <ForgotPassword onBack={handleBackToLogin} />
    </div>
  )
}
