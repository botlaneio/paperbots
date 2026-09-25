import { useId, type SVGProps } from "react";
import { cn } from "@/lib/utils";
import "./paperbots-mark.css";

/**
 * BotLane "Scanner" mark — rounded plate, visor slot, red scanning lamp.
 *
 * Reconstructed from botlaneio/botsign `BotlaneMark.tsx` geometry and color
 * stops (viewBox 64, plate rx 17, slot 12/25/40/14 rx 7, lamp r 5 at 21,32;
 * blink 7.2s + scan 11s). Gradient directions are inferred — replace the SVG
 * body with the verbatim botsign source when it is available.
 *
 * Size with a height class (`h-6 w-auto`). Animation respects
 * `prefers-reduced-motion`.
 */
export interface PaperBotsMarkProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  animated?: boolean;
  decorative?: boolean;
  title?: string;
}

export function PaperBotsMark({
  animated = false,
  decorative = false,
  title = "Paper Bots",
  className,
  ...rest
}: PaperBotsMarkProps) {
  const uid = useId().replace(/:/g, "");
  const plate = `pb-plate-${uid}`;
  const slot = `pb-slot-${uid}`;
  const lamp = `pb-lamp-${uid}`;
  const glow = `pb-glow-${uid}`;

  return (
    <svg
      {...rest}
      viewBox="0 0 64 64"
      className={cn("pbm", animated && "pbm-anim", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
      focusable="false"
    >
      <defs>
        <linearGradient id={plate} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#EFEEE9" />
          <stop offset="1" stopColor="#CFCEC8" />
        </linearGradient>
        <linearGradient id={slot} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#08090A" />
          <stop offset="0.6" stopColor="#15181C" />
          <stop offset="1" stopColor="#2A2F36" />
        </linearGradient>
        <radialGradient id={lamp} cx="0.4" cy="0.38" r="0.62">
          <stop offset="0" stopColor="#FFD8CF" />
          <stop offset="0.45" stopColor="#FF5E4D" />
          <stop offset="1" stopColor="#C9402F" />
        </radialGradient>
        <filter id={glow} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      {/* Plate */}
      <rect x="1" y="1" width="62" height="62" rx="17" fill={`url(#${plate})`} />
      <rect x="1" y="1" width="62" height="62" rx="17" fill="none" stroke="#A9A8A2" strokeOpacity="0.55" strokeWidth="1" />
      <rect x="2.5" y="2.5" width="59" height="59" rx="15.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.85" strokeWidth="1" />

      {/* Visor slot */}
      <rect x="12" y="25" width="40" height="14" rx="7" fill={`url(#${slot})`} />
      <rect x="12.5" y="25.5" width="39" height="13" rx="6.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="1" />

      {/* Scanning lamp */}
      <g className="pbm-dot">
        <g className="pbm-eye">
          <circle cx="21" cy="32" r="5" fill="#FF5E4D" opacity="0.85" filter={`url(#${glow})`} />
          <circle cx="21" cy="32" r="5" fill={`url(#${lamp})`} />
          <circle cx="19.6" cy="30.6" r="1.4" fill="#FFF1EC" opacity="0.75" />
        </g>
      </g>
    </svg>
  );
}

/** Mark + "Paper Bots" wordmark. Size with a height class (`h-6`). */
export function PaperBotsLockup({
  className,
  decorative = false,
  animated = false,
}: {
  className?: string;
  decorative?: boolean;
  animated?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "Paper Bots"}
    >
      <PaperBotsMark decorative animated={animated} className="h-full w-auto" />
      <span aria-hidden="true" className="text-base font-semibold leading-none tracking-tight text-foreground">
        Paper Bots
      </span>
    </span>
  );
}

/** Full-page loading state: the Scanner mark with its scan animation. */
export function PaperBotsLoading({ className }: { className?: string }) {
  return (
    <div role="status" className={cn("flex min-h-dvh w-full items-center justify-center", className)}>
      <PaperBotsMark decorative animated className="h-16 w-16" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
