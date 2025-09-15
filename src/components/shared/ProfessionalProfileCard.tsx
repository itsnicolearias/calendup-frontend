import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Award, LanguagesIcon, Mail, MapPin, Phone, Star } from 'lucide-react'
import { languageOptions, UserWithProfile } from '@/types/settings'
import { RatingResponse } from '@/types/review'
import { Separator } from '../ui/separator'
import { State } from 'country-state-city'

function ProfessionalProfileCard({ professional, rating }: { professional: Partial<UserWithProfile>, rating: RatingResponse | undefined }) {
  const user = professional.profile

  const province = State.getStateByCodeAndCountry(user?.province || "", user?.country || "" )

  const location = `${user?.city}, ${province?.name}`

  const languageMap = Object.fromEntries(languageOptions.map(l => [l.value, l.label]))

    return (
    <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl sticky top-24">
              <CardContent className="p-6">
                {/* Professional Header */}
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white text-2xl">
                      {user?.name![0]}
                      {user?.lastName![0]}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{user?.name} {user?.lastName}</h1>
                  <p className="text-[#0388bd] font-medium text-lg mb-2">{user?.jobTitle}</p>
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold mr-1">{rating?.averageRating}</span>
                    <span className="text-gray-500 text-sm">({rating?.totalReviews} reseñas)</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Contact Info */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-[#0388bd]" />
                    <div>
                      <p className="font-medium">{location}</p>
                      <p className="text-sm">{user?.address}</p>
                    </div>
                  </div>
                  { user?.phone && (
                    <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-[#0388bd]" />
                    <span>{user?.phone}</span>
                  </div>
                  )}
                  
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-[#0388bd]" />
                    <span>{professional.email}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Description */}
                {user?.bio ?? (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Sobre el profesional</h3>
                  
                    <>
                    <p className="text-gray-600 text-sm leading-relaxed">{user?.bio ?? user?.bio }</p>
                  :
                    <p className="text-gray-600 text-sm leading-relaxed">No hay informacion disponible</p>
                    </>
                
                  
                </div>
                 )}

                {/* Education */}
                { user?.education && user.education.length > 0 && (
                  <>
                  <div className="mb-6">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-[#0388bd]" />
                    Formación
                  </h3>
                  <ul className="space-y-1">
                    {user?.education.map((edu, index) => (
                      <li key={index} className="text-gray-600 text-sm">
                        • {edu.title} - {edu.institution}
                      </li>
                    ))}
                  </ul>
                </div>
                  </>
                )}
                

                {/* Languages */}
                { user?.languages && user.languages.length > 0 && (
                  <>
                  <div className="mb-6">
                    
                  <h3 className="font-semibold mb-3 flex items-center">
                    <LanguagesIcon className="w-4 h-4 mr-2 text-[#0388bd]" />
                    Idiomas
                    </h3>
                  <div className="flex flex-wrap gap-2">
                    <ul className="space-y-1">
                      {user?.languages.map((lang, index) => (
                      <>
                      
                      <li key={index} className="text-gray-600 text-sm">
                        • {languageMap[lang] || lang}
                      </li>
                      </>
                      ))}
                    </ul>                          
                  </div>
                </div>
                  </>
                )}
                

                {/* Insurance 
                <div>
                  <h3 className="font-semibold mb-3">Obras Sociales</h3>
                  <div className="flex flex-wrap gap-2">
                    {professional.insurances.map((insurance, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800 border-green-200">
                        {insurance}
                      </Badge>
                    ))}
                  </div>
                </div>
                */}
              </CardContent>
            </Card>
          </div>
  )
}

export default ProfessionalProfileCard