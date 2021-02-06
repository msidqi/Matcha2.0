import { fileIsImage } from "@/utils//makeImageData";

type Base64Image = {
  base64Data: string;
  name: string;
  size: number;
  type: string;
};

export const readImageAsBase64 = (file?: File): Promise<Base64Image> => {
  return new Promise<Base64Image>((resolve, reject) => {
    if (!file) reject("file not found");
    else if (!fileIsImage(file)) reject("file is not an image");
    else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      const { name, size, type } = file;
      reader.onload = ({ target }) => {
        if (typeof target?.result !== "string") reject("incorrect format");
        else resolve({ base64Data: target.result, name, size, type });
      };
    }
  });
};
