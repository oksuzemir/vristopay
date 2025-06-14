import React from "react";

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="81"
    fill="none"
    viewBox="0 0 80 81"
  >
    <g
      stroke="#C7E254"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      filter="url(#filter0_d_2_367)"
    >
      <path d="M59.885 20.058a2 2 0 0 0-.628 0 8.507 8.507 0 0 1-8.199-8.53A8.507 8.507 0 0 1 59.588 3c4.726 0 8.528 3.835 8.528 8.529-.033 4.628-3.67 8.364-8.231 8.529M56.48 44.124c4.528.76 9.52-.033 13.024-2.38 4.661-3.108 4.661-8.199 0-11.306-3.537-2.347-8.595-3.14-13.124-2.347M20.116 20.058c.198-.033.43-.033.628 0a8.507 8.507 0 0 0 8.198-8.53A8.507 8.507 0 0 0 20.413 3c-4.727 0-8.529 3.835-8.529 8.529.034 4.628 3.67 8.364 8.232 8.529M23.52 44.124c-4.528.76-9.52-.033-13.024-2.38-4.661-3.108-4.661-8.199 0-11.306 3.537-2.347 8.595-3.14 13.124-2.347M40.05 44.752a2 2 0 0 0-.628 0 8.507 8.507 0 0 1-8.199-8.529 8.51 8.51 0 0 1 8.53-8.529c4.727 0 8.528 3.835 8.528 8.53-.033 4.627-3.67 8.396-8.231 8.528M30.43 55.166c-4.661 3.107-4.661 8.198 0 11.305 5.29 3.537 13.95 3.537 19.24 0 4.66-3.107 4.66-8.198 0-11.306-5.257-3.504-13.95-3.504-19.24 0"></path>
    </g>
    <defs>
      <filter
        id="filter0_d_2_367"
        width="80"
        height="80.124"
        x="0"
        y="0"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2_367"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2_367"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
  );
};

export default UsersIcon;