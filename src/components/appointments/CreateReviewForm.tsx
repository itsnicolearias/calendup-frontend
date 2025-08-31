"use client";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createReview } from "@/services/reviews";
import { useSearchParams } from "next/navigation";
import { getOneUser } from "@/services/users";

export default function CreateReviewForm() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [professionalName, setprofessionalName] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_LENGTH = 300;

  const searchParams = useSearchParams();
  if (searchParams === null) {
    throw new Error();
  }
  const professionalId = searchParams.get("professionalId") || "";
  const token = searchParams.get("authorization") || "";


    useEffect(() => {
      async function fetchData() {
        const data = await getOneUser(professionalId)

        const name = `${data?.professional.profile?.name} ${data?.professional.profile?.lastName}`
  
        setprofessionalName(name)

      }
      fetchData()
    }, [professionalId])
  


  const handleSubmit = async () => {
    if (rating === 0) {
      toast("Debes seleccionar una calificación");
      return;
    }
    if (comment.length > MAX_LENGTH) {
      toast("El comentario no puede superar los 300 caracteres");
      return;
    }
    setLoading(true);
    try {

      await createReview({ rating, comment, professionalId: professionalId }, token);
      toast("¡Gracias por tu calificación!");
      setRating(0);
      setComment("");
    } catch (error) {
      toast("Error al enviar la calificación" );
      console.error(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-2xl space-y-4">
      <h2 className="text-xl font-semibold text-center">
        ¿Qué te pareció el turno con <span className="text-[#197387]">{professionalName}</span>?
      </h2>

      {/* ⭐ Selector de estrellas */}
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={32}
            className={`cursor-pointer transition-colors ${
              (hover || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* Texto con la selección */}
      {rating > 0 && (
        <p className="text-center text-sm text-gray-600">Tu calificación: {rating} / 5</p>
      )}

      {/* Comentario opcional */}
      <div>
        <Textarea
          placeholder="Escribe un comentario (opcional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={MAX_LENGTH + 1} // evita que se escriba más de 301 chars
        />
        <p
          className={`text-xs mt-1 text-right ${
            comment.length > MAX_LENGTH ? "text-red-500" : "text-gray-400"
          }`}
        >
          {comment.length}/{MAX_LENGTH}
        </p>
      </div>

      {/* Botón de enviar */}
      <Button
        className="w-full bg-[#197387] hover:bg-[#14605f]"
        onClick={handleSubmit}
        disabled={loading || comment.length > MAX_LENGTH}
      >
        {loading ? "Enviando..." : "Enviar calificación"}
      </Button>
    </div>
  );
}
