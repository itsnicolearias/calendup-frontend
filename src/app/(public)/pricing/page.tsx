"use client"
import FreePlanFeatures from "@/components/auth/FreePlanFeatures";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();

 return (
  <div className="flex flex-col items-center justify-center min-h-screen text-center">
    <div className="w-full max-w-md">
      <FreePlanFeatures />
    </div>

    <Button
      onClick={() => router.push("/auth/register?plan-name=free")}
      size="lg"
      className="mt-6 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white px-8 py-4 text-lg font-semibold rounded-xl transform hover:scale-105 transition-all duration-200"
    >
      Comenzar Gratis
      <ArrowRight className="ml-2 w-5 h-5" />
    </Button>
  </div>
)

}
