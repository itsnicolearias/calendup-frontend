import { useState } from "react";
import { apiFetch } from "./api";

interface UseS3UploadResult {
  uploadFile: (file: File) => Promise<string | undefined>;
  isUploading: boolean;
  error: string | null;
}

export function useS3Upload(): UseS3UploadResult {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | undefined> => {
    setIsUploading(true);
    setError(null);

    try {
      // 1️⃣ Pedimos una URL firmada al backend
      const res = await apiFetch<{signedUrl: string, fileUrl: string}>(`/get-signed-url?fileName=${encodeURIComponent(file.name)}&fileType=${file.type}`)

      const { signedUrl, fileUrl } = res

      // 2️⃣ Subimos el archivo a S3 usando la URL firmada
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });
      console.log(uploadRes)
      if (!uploadRes.ok) throw new Error("Error al subir el archivo");

      // 3️⃣ Devolvemos la URL pública del archivo
      return fileUrl;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      return undefined;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading, error };
}
