import type { SVGProps } from "react";

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      {...props}
    >
      <circle cx="11" cy="11" r="7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function BellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.9985 0.533134C11.8909 0.53328 12.6959 1.06499 13.0483 1.8847C13.3569 2.60368 13.2632 3.4233 12.8198 4.05071C14.1884 4.45586 15.3981 5.2817 16.2749 6.41497C17.215 7.63014 17.717 9.12676 17.6997 10.663V12.5976L17.7124 13.1318C17.8389 15.7974 18.9561 18.3268 20.8579 20.2177C21.0323 20.3906 21.0857 20.6534 20.9917 20.8808L20.9907 20.8818C20.896 21.1069 20.6763 21.2548 20.4292 21.2538V21.2548H13.9751C13.68 22.6544 12.4456 23.6697 11.0005 23.6699C9.55524 23.6699 8.32116 22.6545 8.02588 21.2548H1.5708V21.2538C1.32378 21.2547 1.104 21.1069 1.00928 20.8818L1.0083 20.8808C0.914319 20.6534 0.967672 20.3906 1.14209 20.2177C3.17061 18.201 4.3072 15.4577 4.30029 12.5976V10.4921C4.30037 8.97954 4.81235 7.51204 5.75342 6.32806C6.62786 5.22583 7.82512 4.42899 9.17334 4.04681C8.73246 3.41996 8.63996 2.60211 8.94775 1.8847C9.30023 1.06487 10.106 0.533134 10.9985 0.533134ZM9.27295 21.2548C9.52683 21.9795 10.2132 22.4782 10.9995 22.4784C11.786 22.4784 12.4731 21.9796 12.7271 21.2548H9.27295ZM11.2642 5.00384C9.76373 4.93197 8.29948 5.47748 7.2124 6.51458C6.12478 7.55105 5.51025 8.98892 5.51221 10.4921V12.5966L5.50244 13.1298C5.39775 15.6483 4.49245 18.068 2.92236 20.0419H19.0767C17.3963 17.9291 16.4791 15.305 16.4878 12.5966V10.6601C16.5123 9.22586 15.9837 7.83802 15.0103 6.78411C14.0378 5.73124 12.6953 5.09315 11.2642 5.00481V5.00384ZM11.0005 1.75481C10.4377 1.75481 9.98108 2.21058 9.98096 2.77337C9.98096 3.18514 10.2296 3.55686 10.6108 3.71478C10.9436 3.85205 11.3203 3.80317 11.605 3.59368L11.7212 3.49407C12.0121 3.20191 12.0989 2.76395 11.9419 2.38372C11.784 2.00272 11.4121 1.75497 11.0005 1.75481Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.4"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M19 12H5m0 0 6-6m-6 6 6 6"
      />
    </svg>
  );
}

export function StarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    </svg>
  );
}

export function MoreVerticalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="5" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="12" cy="19" r="1.75" />
    </svg>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <circle cx="12" cy="12" r="4.5" />
      <path
        strokeLinecap="round"
        d="M12 2.5v2.25M12 19.25v2.25M4.22 4.22l1.6 1.6M18.18 18.18l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.22 19.78l1.6-1.6M18.18 5.82l1.6-1.6"
      />
    </svg>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.5 14.5a8.5 8.5 0 1 1-9-11 7 7 0 0 0 9 11Z"
      />
    </svg>
  );
}

export function UserPlaceholderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.04053 35.1796C6.47961 32.2202 7.79365 29.6264 9.97961 27.4C12.7405 24.6 16.0732 23.2 19.9796 23.2C23.886 23.2 27.2204 24.6 29.9796 27.4C32.1796 29.6266 33.5062 32.2204 33.9593 35.1796M28.1405 14.0204C28.1405 16.247 27.3468 18.1532 25.7593 19.7408C24.1734 21.3408 22.253 22.1408 20.0001 22.1408C17.7594 22.1408 15.8409 21.3408 14.2409 19.7408C12.6534 18.1533 11.8596 16.247 11.8596 14.0204C11.8596 11.7673 12.6534 9.84679 14.2409 8.25959C15.8409 6.67367 17.7596 5.87991 20.0001 5.87991C22.2532 5.87991 24.1737 6.67367 25.7593 8.25959C27.3468 9.84711 28.1405 11.7674 28.1405 14.0204Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="5.5" width="18" height="15.5" rx="2.5" />
      <path strokeLinecap="round" d="M8 3v4M16 3v4" />
      <g fill="currentColor" stroke="none">
        <circle cx="8" cy="12" r="1.15" />
        <circle cx="12" cy="12" r="1.15" />
        <circle cx="16" cy="12" r="1.15" />
        <circle cx="8" cy="16.5" r="1.15" />
        <circle cx="12" cy="16.5" r="1.15" />
      </g>
    </svg>
  );
}
