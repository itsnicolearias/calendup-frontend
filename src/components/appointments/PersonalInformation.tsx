import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { FileText, Mail, Phone, User } from 'lucide-react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface PersonalInformationProps {
  formData: {
    name: string
    lastName: string
    email: string
    phone: string
    reason: string
  }
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function PersonalInformation({ formData, handleInputChange}: PersonalInformationProps) {
  return (
    <div>
         <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <User className="w-5 h-5 mr-2 text-[#0388bd]" />
                    Tus datos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Nombre *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Tu nombre"
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Apellido *
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Tu apellido"
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email *
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="tu@email.com"
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Teléfono
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+54 11 1234-5678"
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="reason" className="text-sm font-medium text-gray-700">
                        Motivo de consulta
                      </Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          placeholder="Describe brevemente el motivo de tu consulta"
                          className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
    </div>
  )
}

export default PersonalInformation