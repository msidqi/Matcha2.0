import React from "react";

interface PositionIconProps {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
}

const PositionIcon = ({
  height = "22",
  width = "22",
  color = "#383333",
  className,
}: PositionIconProps): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M1.71 11.175C.8 10.947.678 9.703 1.526 9.301L20.47.328c.849-.403 1.734.482 1.331 1.331l-8.973 18.945c-.402.848-1.646.725-1.874-.186L9.25 13.606a1 1 0 00-.728-.728l-6.812-1.703z"
      fill={color}
      fillOpacity=".5"
    />
  </svg>
);

export default PositionIcon;
