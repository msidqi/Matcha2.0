import { ImagePreviewProps } from "@/interfaces";

export const makeImageData = (imageFile: File) => {
  const objectURL = URL.createObjectURL(imageFile);
  const imageData: ImagePreviewProps = {
    title: imageFile.name,
    objectURL: objectURL,
    size:
      imageFile.size > 1024
        ? imageFile.size > 1048576
          ? Math.round(imageFile.size / 1048576) + "mb"
          : Math.round(imageFile.size / 1024) + "kb"
        : imageFile.size + "b",
  };
  return imageData;
};

export const deleteImageData = (objectURL: string) => {
  URL.revokeObjectURL(objectURL);
};

export const fileIsImage = (image: any) => image?.type?.match("image.*");
