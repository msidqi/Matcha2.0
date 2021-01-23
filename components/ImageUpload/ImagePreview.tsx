import React from "react";

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
        <svg
          className="pointer-events-none fill-current w-6 h-6 ml-auto"
          width="34"
          height="33"
          viewBox="0 0 34 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="17.0166" cy="16.1963" r="16.1833" fill="#F64264" />
          <rect
            width="2.6589"
            height="18.6123"
            rx="1.32945"
            transform="matrix(0.709716 0.704488 -0.709716 0.704488 22.6832 8.75336)"
            fill="#F8F8F8"
          />
          <rect
            width="2.65878"
            height="18.6114"
            rx="1.32939"
            transform="matrix(0.709228 -0.704979 0.709228 0.704979 9.46448 10.5186)"
            fill="#F8F8F8"
          />
        </svg>
      </button>
    </article>
  </li>
);

export default ImagePreview;
