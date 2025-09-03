import { Review } from "@/types/review";

export const getAverageRating = (reviews: Review[] | undefined) => {
    if (reviews?.length === 0 || reviews === undefined) return 0; // evitar división por 0
    const simplifiedReviews = reviews.map(r => r.rating);

    const averageRating =  simplifiedReviews.reduce((acc, num) => acc + num, 0);
    return averageRating / reviews.length;

}