import { RatingResponse } from "@/types/settings";
import { Star } from "lucide-react";



export default function RatingStars({ averageRating, totalReviews }: RatingResponse) {
  const filledStars = Math.floor(Number(averageRating));
  const hasHalf = Number(averageRating) % 1 >= 0.5;

  return (
    <div className="flex flex-col gap-1  justify-center items-center">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => {
          if (i < filledStars) {
            return <Star key={i} className="text-yellow-400 fill-yellow-400 w-5 h-5" />;
          } else if (i === filledStars && hasHalf) {
            return (
              <div key={i} className="relative w-5 h-5">
                <Star
                  className="absolute text-yellow-400 fill-yellow-400 w-5 h-5"
                  style={{ clipPath: "inset(0 50% 0 0)" }}
                />
                <Star className="absolute text-gray-300 w-5 h-5" />
              </div>
            );
          } else {
            return <Star key={i} className="text-gray-300 w-5 h-5" />;
          }
        })}
        <span className="ml-2 text-sm text-gray-600">
          {Number(averageRating).toFixed(1)} / 5
        </span>
      </div>
      <p className="text-xs text-gray-500">{totalReviews} reseñas</p>
    </div>
  );
}
