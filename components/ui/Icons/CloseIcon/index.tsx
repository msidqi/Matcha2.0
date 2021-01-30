import React from "react";

interface CloseIconProps {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
  onClick: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const CloseIcon = ({
  height = "6",
  width = "6",
  color = "#6d7381",
  onClick,
  className,
}: CloseIconProps): JSX.Element => (
  <svg
    className={className}
    onClick={onClick}
    height={height}
    width={width}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width="1.057"
      height="7.397"
      rx=".528"
      transform="scale(1.00346 .99653) rotate(45 2.564 6.338)"
      fill={color}
    />
    <rect
      width="1.057"
      height="7.396"
      rx=".528"
      transform="scale(1.00244 .99756) rotate(-45 .902 .374)"
      fill={color}
    />
  </svg>
);

export default CloseIcon;
