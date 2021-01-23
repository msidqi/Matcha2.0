import React from "react";

interface DropDownIconProps {
  height?: string;
  width?: string;
  className?: string;
}

const DropDownIcon = ({
  height = "21",
  width = "50",
  className,
}: DropDownIconProps): JSX.Element => (
  <svg
    className={className}
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="50" height="21" rx="10.5" fill="#383333" fillOpacity=".6" />
    <circle cx="11.5" cy="10.5" r="4.5" fill="#F8F8F8" />
    <circle cx="25.5" cy="10.5" r="4.5" fill="#F8F8F8" />
    <circle cx="39.5" cy="10.5" r="4.5" fill="#F8F8F8" />
  </svg>
);

export default DropDownIcon;
