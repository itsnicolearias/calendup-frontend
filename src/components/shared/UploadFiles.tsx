import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface ImagePreviewProps {
  label?: string;
  onChange: (file: File | null) => void; // pasa el archivo al formulario
  currentImageUrl?: string; // para mostrar la imagen existente
}

export default function ImagePreview({ label, onChange, currentImageUrl }: ImagePreviewProps) {
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file); // pasa el archivo al formulario
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(currentImageUrl || null);
    }
  };

  return (
    <div className="flex flex-col">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <Image
          src={preview}
          alt="Vista previa"
          width={24}
          height={24}
          className="w-24 h-24 rounded-full object-cover mt-2"
        />
      )}
    </div>
  );
}
