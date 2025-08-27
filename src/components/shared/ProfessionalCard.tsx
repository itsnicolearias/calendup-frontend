import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Profile } from "@/types/settings"
import Image from "next/image";
import RatingStars from "../appointments/RatingStars";

interface ProfessionalCardProps {
  profile: Partial<Profile> | undefined,
  averageRating?: number | undefined,
  totalReviews?: number | undefined
}

export default function ProfessionalCard({ profile, averageRating, totalReviews }: ProfessionalCardProps) {

  const imageUrl = profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${profile?.name || ""} ${profile?.lastName || ""}`
      )}&background=197387&color=fff`;

  return (
<Card className="w-80">
      <CardHeader>
        <CardTitle className="text-center">{profile?.name} {profile?.lastName}</CardTitle>
      </CardHeader>
      <CardContent>

          <div className="mb-4">
            <Image
              src={imageUrl}
              alt="Foto de perfil"
              width={150}
              height={150}
              className="rounded-full object-cover mx-auto"
              unoptimized={true}
            />
          </div>

        <p className="text-center font-medium text-gray-700">{profile?.jobTitle}</p>
        <p className="text-center font-medium text-gray-700">{profile?.bio}</p>
        <RatingStars averageRating={averageRating} totalReviews={totalReviews} />
      </CardContent>
    </Card>
  )
}
