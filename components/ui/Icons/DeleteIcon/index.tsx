import React from "react";

interface DeleteIconProps {
  height?: string;
  width?: string;
  color?: string;
  insideColor?: string;
}

const DeleteIcon = ({
  width = "34",
  height = "33",
  color = "#F64264",
  insideColor = "#F8F8F8",
}: DeleteIconProps): JSX.Element => (
  <svg
    className="pointer-events-none fill-current w-6 h-6 ml-auto"
    width={width}
    height={height}
    viewBox="0 0 34 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="17.0166" cy="16.1963" r="16.1833" fill={color} />
    <rect
      width="2.6589"
      height="18.6123"
      rx="1.32945"
      transform="matrix(0.709716 0.704488 -0.709716 0.704488 22.6832 8.75336)"
      fill={insideColor}
    />
    <rect
      width="2.65878"
      height="18.6114"
      rx="1.32939"
      transform="matrix(0.709228 -0.704979 0.709228 0.704979 9.46448 10.5186)"
      fill={insideColor}
    />
  </svg>
);

export default DeleteIcon;
