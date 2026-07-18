import type { SVGProps } from "react";

export function LogoutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 12h11m0 0-3.5-3.5M21 12l-3.5 3.5"
      />
    </svg>
  );
}

export function FilterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.22222 13.3333H9.77778V11.5555H6.22222V13.3333ZM0 2.66666V4.44443H16V2.66666H0ZM2.66667 8.88888H13.3333V7.1111H2.66667V8.88888Z"
        fill="#545F7D"
      />
    </svg>
  );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function BriefcaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity="0.4"
        d="M10 9H16V13.5C16 14.3 15.3 15 14.5 15H1.5C0.7 15 0 14.3 0 13.5V9H6V10.5C6 10.6326 6.05268 10.7598 6.14645 10.8536C6.24021 10.9473 6.36739 11 6.5 11H9.5C9.63261 11 9.75979 10.9473 9.85355 10.8536C9.94732 10.7598 10 10.6326 10 10.5V9Z"
        fill="#213F7D"
      />
      <path
        d="M14.5 4H12V2.5C12 1.7 11.3 1 10.5 1H5.5C4.7 1 4 1.7 4 2.5V4H1.5C0.7 4 0 4.7 0 5.5V8H16V5.5C16 4.7 15.3 4 14.5 4ZM10 4H6V3H10V4Z"
        fill="#213F7D"
      />
    </svg>
  );
}

export function BlacklistUserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      {...props}
    >
      <circle cx="9" cy="8" r="3.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 19.5a5.5 5.5 0 0 1 11 0"
      />
      <circle cx="17.5" cy="16.5" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m15 14 5 5" />
    </svg>
  );
}

export function ActivateUserIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      {...props}
    >
      <circle cx="9" cy="8" r="3.5" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.5 19.5a5.5 5.5 0 0 1 11 0"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.5 16 2 2 4-4" />
    </svg>
  );
}
