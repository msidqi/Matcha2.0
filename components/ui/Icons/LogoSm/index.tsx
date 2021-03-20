import React from "react";

interface LogoSmProps {
  height?: string;
  width?: string;
}

const LogoSm = ({
  height = "1.75rem",
  width = "1.75rem",
}: LogoSmProps): JSX.Element => (
  <svg
    key="LogoSm"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 123 123"
    height={height}
    width={width}
  >
    <defs>
      <linearGradient id="b-linearGradient" x1="100%" x2="0%" y1="0%" y2="100%">
        <stop offset="0%" stopColor="#33d398" />
        <stop offset="100%" stopColor="#059668" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        key="LogoSm"
        fill="url(#b-linearGradient)"
        d="M31.5 49.6C55 41.5 59 20.4 56 1c0-.7.6-1.2 1.2-1C79.7 11 105 35 105 71c0 27.6-21.4 52-52.5 52a50 50 0 01-28.2-92.7c.6-.4 1.4 0 1.4.7.3 3.7 1.3 13 5.4 18.6h.4z"
      />
    </g>
  </svg>
);

export default LogoSm;
