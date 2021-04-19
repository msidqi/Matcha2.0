import React from "react";

interface ArrowNextProps {
  height?: string;
  width?: string;
  color?: string;
}

const ArrowNext = ({
  height = "20",
  width = "20",
  color = "#fff",
}: ArrowNextProps): JSX.Element => (
  <svg
    height={height}
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 492.004 492.004"
  >
    <defs>
      <filter id="shadow" x="0" y="0" width="100%" height="100%">
        <feDropShadow dx="0" dy="0" stdDeviation="0.5" />
      </filter>
    </defs>
    <path
      fill={color}
      filter="url(#shadow)"
      d="M382.678 226.804L163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
    />
  </svg>
);

export default ArrowNext;
