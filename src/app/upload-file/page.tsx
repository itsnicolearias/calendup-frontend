"use client"
import { useS3Upload } from "@/services/s3-upload";
import React, { useState } from "react";

export default function UploadImagePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { uploadFile, isUploading, error } = useS3Upload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const url = await uploadFile(file);
    if (url) setImageUrl(url);
  };

  return (
    <div className="p-4">
      <h1>Subir imagen</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {isUploading && <p>Subiendo...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-4 w-48 h-48 object-cover" />}
    </div>
  );
}
