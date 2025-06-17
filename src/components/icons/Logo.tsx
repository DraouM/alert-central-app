import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Alert Central Logo"
      {...props}
    >
      <path
        d="M16 5.33331L26.6667 24H5.33333L16 5.33331Z"
        className="stroke-primary group-hover/logo:stroke-accent transition-colors duration-300"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 13.3333V17.3333"
        className="stroke-primary group-hover/logo:stroke-accent transition-colors duration-300"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 21.3333H16.0133"
        className="stroke-primary group-hover/logo:stroke-accent transition-colors duration-300"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
