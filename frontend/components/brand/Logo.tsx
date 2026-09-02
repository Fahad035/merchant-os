interface LogoProps {
  /** Pixel size of the square mark. */
  size?: number;
  /** Show the "MerchantOS" wordmark next to the mark. */
  withWordmark?: boolean;
  className?: string;
}

/**
 * MerchantOS mark: a shield (governance / audit trail) with a checkmark
 * (approved AI decision) — the visual shorthand for "AI you can verify",
 * which is the product's actual differentiator.
 */
export default function Logo({
  size = 32,
  withWordmark = false,
  className = "",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="MerchantOS logo"
      >
        <defs>
          <linearGradient
            id="merchantos-mark-gradient"
            x1="0"
            y1="0"
            x2="40"
            y2="40"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#5B5CF0" />
            <stop offset="1" stopColor="#9857E0" />
          </linearGradient>
        </defs>

        <rect
          width="40"
          height="40"
          rx="10"
          fill="url(#merchantos-mark-gradient)"
        />

        <path
          d="M20 8.5L28.5 11.3V18.6C28.5 24.3 25 28.9 20 31.5C15 28.9 11.5 24.3 11.5 18.6V11.3L20 8.5Z"
          fill="white"
          fillOpacity="0.16"
          stroke="white"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />

        <path
          d="M15.5 19.6L18.6 22.7L24.8 15.8"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {withWordmark && (
        <span className="text-base font-bold tracking-tight">
          MerchantOS
        </span>
      )}
    </span>
  );
}