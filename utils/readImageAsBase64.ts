import { fileIsImage } from "@/utils//makeImageData";

export const readImageAsBase64 = (
  cb: (base64: string) => void,
  file?: File
) => {
  if (!file) return;
  if (!fileIsImage(file)) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    if (typeof event.target?.result == "string") {
      cb(event.target?.result);
    }
  };
};
