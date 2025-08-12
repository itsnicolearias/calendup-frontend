import { useS3Upload } from "@/services/s3-upload";
import Image from "next/image";
import React, { useState } from "react";

interface UploadImageProps {
  label?: string;
  onUploadComplete?: (url: string) => void; // callback cuando termine
}

const UploadImage: React.FC<UploadImageProps> = ({ label = "Subir imagen", onUploadComplete }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { uploadFile, isUploading } = useS3Upload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];

    // Vista previa
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // Subir archivo
    const uploadedUrl = await uploadFile(file);

    if (uploadedUrl && onUploadComplete) {
      onUploadComplete(uploadedUrl);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
      />

      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="object-cover rounded border"
          height={32}
          width={32}
        />
      )}

      {isUploading && <p className="text-sm text-gray-500">Subiendo...</p>}
    </div>
  );
};

export default UploadImage;
