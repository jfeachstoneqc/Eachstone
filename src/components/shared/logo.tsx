import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  wordmark?: boolean;
}

/**
 * Eachstone logo — refined mountain silhouette with EACHSTONE wordmark.
 * The mountain has a main peak, ridge detail, and subtle snow line.
 */
export function Logo({ className, wordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {/* Mountain mark */}
      <svg
        viewBox="0 0 32 24"
        fill="none"
        className="h-6 w-auto shrink-0"
        aria-hidden="true"
      >
        {/* Main mountain — filled with current color */}
        <path
          d="M1 23L10.5 3L16 13L20 6L31 23Z"
          fill="currentColor"
          opacity="0.12"
        />
        {/* Mountain outline */}
        <path
          d="M1 23L10.5 3L16 13L20 6L31 23"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Ridge detail line */}
        <path
          d="M6 23L10.5 14L14 19"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {wordmark && (
        <span className="font-[family-name:var(--font-syne)] text-[13px] font-bold uppercase tracking-[0.18em] leading-none">
          Eachstone
        </span>
      )}
    </div>
  );
}
