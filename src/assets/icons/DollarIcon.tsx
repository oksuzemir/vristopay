import React from "react";

const DollarIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
 <svg
    xmlns="http://www.w3.org/2000/svg"
    width="81"
    height="81"
    fill="none"
    viewBox="0 0 81 81"
    className={className}
  >
    <g filter="url(#filter0_d_2_362)">
      <path
        stroke="#C7E254"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
        d="M66.556 15.442C60.414 7.852 51.024 3 40.5 3 21.999 3 7 17.999 7 36.5a33.34 33.34 0 0 0 5.641 18.611M74 36.5C74 55.002 59.002 70 40.5 70c-3.867 0-7.582-.656-11.038-1.861M40.5 51.389h3.722c2.482 0 7.445-1.489 7.445-7.445 0-5.955-4.963-7.444-7.445-7.444h-7.444c-2.482 0-7.445-1.489-7.445-7.444 0-5.956 4.963-7.445 7.445-7.445H40.5m0 29.778H29.333m11.167 0v7.444m0-37.222h11.167m-11.167 0v-7.444"
        shapeRendering="crispEdges"
      ></path>
    </g>
    <defs>
      <filter
        id="filter0_d_2_362"
        width="80"
        height="80"
        x="0.5"
        y="0.5"
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
        <feGaussianBlur stdDeviation="2"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="out"></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_2_362"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_2_362"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
  </svg>
  );
};

export default DollarIcon;