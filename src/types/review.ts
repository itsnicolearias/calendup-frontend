import { UserWithProfile } from "./settings";

export interface Review {
  reviewId: string;
  professionalId: string;
  appointmentId: string;
  rating: number; // 1 a 5
  comment?: string | null;
  deleted: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface GetProfessionalResponse {
  professional: UserWithProfile,
  rating: RatingResponse
}

export interface RatingResponse {
  averageRating: number | undefined,
  totalReviews: number | undefined,
}