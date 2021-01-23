import React from "react";

interface LikeIconProps {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
}

const LikeIcon = ({
  width = "47",
  height = "39",
  color = "#46CB5C",
  className,
}: LikeIconProps): JSX.Element => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 47 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip99)">
      <path
        d="M14.5 14.5l8.5 5.95 8.51-5.95"
        stroke={color}
        strokeWidth="29"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip99">
        <path fill="#ff" d="M0 0h46.01v38.15H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default LikeIcon;
