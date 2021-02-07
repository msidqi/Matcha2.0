import React from "react";
import DeleteIcon from "@/components/ui/Icons/DeleteIcon";

export interface ImagePreviewProps {
  src: string;
  title?: string;
  onClickDelete: () => void;
  size?: string;
}
const ImagePreview = ({
  onClickDelete,
  src,
}: ImagePreviewProps): JSX.Element => (
  <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
    <article
      tabIndex={0}
      className="group hasImage w-full h-full rounded-lg focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white hover:shadow-sm "
    >
      <img
        alt="upload preview"
        src={src}
        className="img-preview w-full h-full sticky object-cover  bg-fixed"
      />

      <button
        onClick={onClickDelete}
        className="absolute -right-1 -bottom-1 rounded-xl"
      >
        <DeleteIcon />
      </button>
    </article>
  </li>
);

export default ImagePreview;
