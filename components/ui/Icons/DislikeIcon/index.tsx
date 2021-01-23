import React from "react";

interface DislikeIconProps {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
}

const DislikeIcon = ({
  width = "41",
  height = "41",
  color = "#FF374B",
  className,
}: DislikeIconProps): JSX.Element => (
  <svg
    // width={width}
    // height={height}
    className={className}
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="6.976"
      height="48.834"
      rx="3.488"
      transform="scale(1.00389 .9961) rotate(45 16.076 42.929)"
      fill="#FF374B"
    />
    <rect
      width="6.976"
      height="48.834"
      rx="3.488"
      transform="scale(1.0053 .99467) rotate(-45 7.301 2.37)"
      fill={color}
    />
  </svg>
);

export default DislikeIcon;
