import React from "react";

interface AvatarIconProps {
  height?: string;
  width?: string;
  color?: string;
  className?: string;
}

const AvatarIcon = ({
  width = "12",
  height = "13",
  color = "#fff",
  className,
}: AvatarIconProps): JSX.Element => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0)">
      <path
        d="M5.91449 5.90947C6.70862 5.90947 7.39618 5.62465 7.95813 5.0627C8.5199 4.50085 8.80481 3.81338 8.80481 3.01916C8.80481 2.22522 8.51999 1.53766 7.95804 0.975615C7.39609 0.413848 6.70853 0.129028 5.91449 0.129028C5.12027 0.129028 4.4328 0.413848 3.87094 0.975706C3.30908 1.53756 3.02417 2.22512 3.02417 3.01916C3.02417 3.81338 3.30908 4.50094 3.87094 5.0628C4.43298 5.62456 5.12054 5.90947 5.91449 5.90947ZM4.36826 1.47293C4.79938 1.04181 5.30511 0.832244 5.91449 0.832244C6.52377 0.832244 7.0296 1.04181 7.46082 1.47293C7.89194 1.90414 8.10159 2.40997 8.10159 3.01916C8.10159 3.62853 7.89194 4.13427 7.46082 4.56548C7.0296 4.9967 6.52377 5.20626 5.91449 5.20626C5.3053 5.20626 4.79956 4.9966 4.36826 4.56548C3.93704 4.13436 3.72739 3.62853 3.72739 3.01916C3.72739 2.40997 3.93704 1.90414 4.36826 1.47293Z"
        fill="#383333"
        fill-opacity="0.5"
      />
      <path
        d="M10.9718 9.35644C10.9556 9.12261 10.9228 8.86755 10.8745 8.5982C10.8258 8.32684 10.7631 8.07031 10.688 7.83584C10.6104 7.5935 10.505 7.35418 10.3746 7.12484C10.2393 6.88681 10.0804 6.67953 9.90207 6.50897C9.71558 6.33053 9.48724 6.18707 9.22321 6.08243C8.96008 5.97833 8.66849 5.9256 8.35657 5.9256C8.23407 5.9256 8.1156 5.97586 7.88681 6.12482C7.746 6.21664 7.5813 6.32284 7.39746 6.44031C7.24026 6.54046 7.02731 6.63431 6.76428 6.71927C6.50766 6.80231 6.2471 6.84442 5.98984 6.84442C5.73276 6.84442 5.4722 6.80231 5.21539 6.71927C4.95264 6.6344 4.73959 6.54056 4.58267 6.4404C4.40057 6.32403 4.23578 6.21783 4.09286 6.12472C3.86426 5.97577 3.74579 5.92551 3.62329 5.92551C3.31128 5.92551 3.01978 5.97833 2.75674 6.08252C2.49289 6.18698 2.26447 6.33044 2.07779 6.50906C1.89944 6.67972 1.74051 6.8869 1.60538 7.12484C1.4751 7.35418 1.36963 7.59341 1.29199 7.83593C1.21701 8.0704 1.1543 8.32684 1.10559 8.5982C1.05725 8.86718 1.02457 9.12234 1.00836 9.35671C0.992432 9.58587 0.984375 9.82436 0.984375 10.0653C0.984375 10.6917 1.1835 11.1988 1.57617 11.5728C1.96399 11.9419 2.47705 12.129 3.10117 12.129H8.87924C9.50317 12.129 10.0162 11.9419 10.4041 11.5728C10.7969 11.1991 10.996 10.6918 10.996 10.0652C10.9959 9.82345 10.9878 9.58495 10.9718 9.35644ZM9.91928 11.0633C9.66302 11.3072 9.32281 11.4258 8.87915 11.4258H3.10117C2.65741 11.4258 2.3172 11.3072 2.06104 11.0634C1.80972 10.8242 1.68759 10.4976 1.68759 10.0653C1.68759 9.84048 1.69501 9.61846 1.70984 9.40533C1.7243 9.19622 1.75388 8.96652 1.79773 8.72244C1.84103 8.48138 1.89615 8.25515 1.9617 8.05035C2.0246 7.85397 2.11038 7.65951 2.21677 7.4722C2.3183 7.29367 2.43512 7.1405 2.56403 7.01709C2.6846 6.90164 2.83658 6.80716 3.01566 6.7363C3.18127 6.67074 3.3674 6.63486 3.56946 6.62945C3.59409 6.64255 3.63794 6.66754 3.70898 6.71387C3.85355 6.80807 4.02017 6.91556 4.20438 7.0332C4.41202 7.16559 4.67953 7.28515 4.99915 7.38833C5.3259 7.49398 5.65915 7.54763 5.98993 7.54763C6.32071 7.54763 6.65405 7.49398 6.98062 7.38842C7.30051 7.28506 7.56793 7.16559 7.77585 7.03302C7.96436 6.91253 8.12631 6.80816 8.27087 6.71387C8.34192 6.66763 8.38577 6.64255 8.4104 6.62945C8.61255 6.63486 8.79868 6.67074 8.96439 6.7363C9.14337 6.80716 9.29535 6.90173 9.41592 7.01709C9.54483 7.14041 9.66165 7.29358 9.76318 7.47229C9.86966 7.65951 9.95554 7.85406 10.0183 8.05026C10.084 8.25534 10.1392 8.48147 10.1824 8.72235C10.2262 8.96688 10.2558 9.19668 10.2703 9.40542V9.4056C10.2852 9.61791 10.2927 9.83984 10.2928 10.0653C10.2927 10.4977 10.1706 10.8242 9.91928 11.0633Z"
        fill="#383333"
        fill-opacity="0.5"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          width="12"
          height="12"
          fill={color}
          transform="translate(0 0.129028)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default AvatarIcon;
