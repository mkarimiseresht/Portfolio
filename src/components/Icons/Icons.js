import React from "react";

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const GitHubIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

export const LinkedInIcon = (props) => (
  <svg {...base} {...props} strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="7" y1="10" x2="7" y2="17" />
    <line x1="7" y1="6.5" x2="7" y2="6.51" />
    <line x1="12" y1="17" x2="12" y2="10" />
    <path d="M12 13a2.5 2.5 0 0 1 5 0v4" />
  </svg>
);

export const MailIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6.5 9 6.2 9-6.2" />
  </svg>
);

export const SunIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.5v2.2M12 19.3v2.2M4.4 4.4l1.5 1.5M18 18l1.5 1.5M2.5 12h2.2M19.3 12h2.2M4.4 19.6l1.5-1.5M18 6l1.5-1.5" />
  </svg>
);

export const MoonIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
);

export const MenuIcon = (props) => (
  <svg {...base} {...props}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg {...base} {...props}>
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

export const ArrowUpRightIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const StarIcon = (props) => (
  <svg {...base} {...props} fill="currentColor" stroke="none">
    <path d="M12 2.5 14.7 9l7 .6-5.3 4.6 1.6 6.8L12 17.7 5.9 21l1.6-6.8L2.3 9.6l7-.6L12 2.5Z" />
  </svg>
);

export const ArrowUpIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);
