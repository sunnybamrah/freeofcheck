// Inline SVG icons (no asset imports -> safe to prerender with tsx).
// All decorative by default; pass aria-label to make one meaningful.
interface IconProps {
  className?: string;
  size?: number;
  title?: string;
}

function base(size: number, title?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    role: title ? "img" : "presentation",
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
  };
}

export function CheckCircle({ className, size = 20, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function AlertTriangle({ className, size = 20, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function HelpCircle({ className, size = 20, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export function InfoCircle({ className, size = 20, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="11" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

export function MinusCircle({ className, size = 20, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <circle cx="12" cy="12" r="10" strokeDasharray="3 3" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export function ChevronDown({ className, size = 18, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function ExternalLink({ className, size = 16, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export function SearchIcon({ className, size = 18, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function CloseIcon({ className, size = 18, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ShieldCheck({ className, size = 20, title }: IconProps) {
  return (
    <svg className={className} {...base(size, title)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
