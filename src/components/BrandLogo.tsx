interface BrandLogoProps {
  inverted?: boolean;
  compact?: boolean;
}

export function BrandLogo({ inverted = false, compact = false }: BrandLogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        width={compact ? 30 : 34}
        height={compact ? 30 : 34}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M32 6L55 19.2V37.8L32 51L25 47V37.2L32 41.2L46.5 32.8V24.2L32 15.8L17.5 24.2V52.5L9 47.6V19.2L32 6Z"
          fill={inverted ? '#FFFFFF' : '#1546C0'}
        />
        <path
          d="M32 23.5L41.5 29L32 34.5L22.5 29L32 23.5Z"
          fill={inverted ? '#93C5FD' : '#0A1628'}
        />
        <path
          d="M55 37.8L32 51V58.5L55 45.3V37.8Z"
          fill={inverted ? '#64748B' : '#94A3B8'}
        />
      </svg>
      <span
        className={`font-[var(--font-display)] text-lg font-bold tracking-tight ${
          inverted ? 'text-white' : 'text-[#0A1628]'
        }`}
      >
        Prime <span className={inverted ? 'font-medium text-slate-300' : 'font-medium text-[#475569]'}>Facilix</span>
      </span>
    </span>
  );
}
