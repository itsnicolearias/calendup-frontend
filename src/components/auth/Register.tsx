"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from "lucide-react"
import { registerUser } from "@/services/auth"
import { useRouter } from "next/navigation"
import { Separator } from "@radix-ui/react-select"
import { useUser } from "@/contexts/UserContext"
import { Providers } from "@/types/auth"
import { toast } from "sonner"

export default function Component() {

  const router = useRouter();
    
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })

    const { refreshUser } = useUser();
  
    const handleSocialRegister = async (provider: Providers) => {
  
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
  
      const popup = window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`,
        "GoogleLogin",
        `width=${width},height=${height},left=${left},top=${top}`
      );
  
      // Escuchar respuesta del popup
      const listener = async (event: MessageEvent) => {
        
        const { token } = event.data;
  
        if (token) {
          localStorage.setItem("token", token);
          //update global context
          await refreshUser()
          router.push("/dashboard/appointments");
          popup?.close();
          window.removeEventListener("message", listener);
        }
      };
      
      window.addEventListener("message", listener);
    };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await registerUser(formData);
    router.push("/auth/check-email")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('Error al registrar:', err);
    if (err.message === "Email is already registered"){
        toast.error("El usuario ya existe en nuestra plataforma")
      }
    
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-full flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
              Crear Cuenta
            </CardTitle>
            <CardDescription className="text-center text-gray-600">Completa tus datos para registrarte</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nombre
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="firstName"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 focus:border-[#0388bd] focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellido" className="text-sm font-medium text-gray-700">
                    Apellido
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="apellido"
                      name="lastName"
                      type="text"
                      placeholder="Tu apellido"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="pl-10 h-12 border-gray-200 focus:border-[#0388bd] focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 h-12 border-gray-200 focus:border-[#0388bd] focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-[#0388bd] focus:ring-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">La contraseña debe tener al menos 8 caracteres</p>
              </div>


            <div className="flex items-start space-x-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 text-[#0388bd] border-gray-300 rounded focus:ring-blue-500 mt-1 flex-shrink-0"
                required
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 flex-1 min-w-0 whitespace-normal leading-snug"
              >
                Acepto los{" "}
                <a href="/auth/terms-and-conditions"className="text-[#0388bd] hover:text-gray-900 font-medium">términos y condiciones</a>{" "}
                y la{" "}
                <a href="/auth/privacy-policy"className="text-[#0388bd] hover:text-gray-900 font-medium">política de privacidad</a>
              </label>
            </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Crear Cuenta
              </Button>
            </form>
             <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">O continúa con</span>
              </div>
            </div>
            <div className="space-y-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSocialRegister("google")}
                            className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                            Continuar con Google
                          </Button>
            
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSocialRegister("microsoft")}
                            className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                              <path fill="#F25022" d="M1 1h10v10H1z" />
                              <path fill="#00A4EF" d="M13 1h10v10H13z" />
                              <path fill="#7FBA00" d="M1 13h10v10H1z" />
                              <path fill="#FFB900" d="M13 13h10v10H13z" />
                            </svg>
                            Continuar con Hotmail
                          </Button>
            
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleSocialRegister("facebook")}
                            className="w-full h-12 border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                              <path
                                fill="#1877F2"
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                              />
                            </svg>
                            Continuar con Facebook
                          </Button>
                        </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿Ya tienes una cuenta?{" "}
                <a href="/auth/login" className="text-[#0388bd] hover:text-gray-900 font-medium">
                  Inicia sesión aquí
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
