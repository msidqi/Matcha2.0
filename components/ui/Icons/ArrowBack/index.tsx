import React from "react";

interface ArrowBackProps {
  height?: string;
  width?: string;
  color?: string;
}

const ArrowBack = ({
  height = "21",
  width = "13",
  color = "#F8F8F8",
}: ArrowBackProps): JSX.Element => (
  <svg
    height={height}
    width={width}
    viewBox="0 0 13 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.83886 0.782023C8.81517 -0.202162 10.3981 -0.202162 11.3744 0.782022C12.3507 1.76621 12.3507 3.36188 11.3744 4.34607L5.9845 9.77943C5.99475 9.88112 6 9.98429 6 10.0887C6 10.2371 5.9894 10.3829 5.96893 10.5256L11.3744 15.9746C12.3507 16.9588 12.3507 18.5545 11.3744 19.5387C10.3981 20.5228 8.81514 20.5228 7.83883 19.5387L0.767767 12.4106C0.262649 11.9014 0.0188662 11.2285 0.036418 10.5613C0.0124454 10.4073 0 10.2495 0 10.0887C0 9.92718 0.012563 9.7686 0.0367578 9.61392C0.0556952 8.99527 0.299374 8.38231 0.767794 7.91011L7.83886 0.782023Z"
      fill={color}
    />
  </svg>
);

export default ArrowBack;