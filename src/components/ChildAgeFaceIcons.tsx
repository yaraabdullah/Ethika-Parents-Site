"use client";

type P = { size?: number; className?: string };

/** 3–5 Toddler — big head, chubby round body, tiny arms & legs */
export function ChildFace3_5({ size = 64, className }: P) {
  const bg = "#CCF2E6"; const fig = "#1C7A52"; const face = "#CCF2E6";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head */}
      <circle cx="32" cy="19" r="10" fill={fig} />
      {/* Eyes */}
      <circle cx="28.5" cy="17.5" r="1.4" fill={face} />
      <circle cx="35.5" cy="17.5" r="1.4" fill={face} />
      {/* Smile */}
      <path d="M29 21.5 Q32 25.5 35 21.5" stroke={face} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Body — round */}
      <ellipse cx="32" cy="36" rx="9" ry="8" fill={fig} />
      {/* Arms — short, lifted */}
      <rect x="11" y="31" width="12" height="5" rx="2.5" fill={fig} />
      <rect x="41" y="31" width="12" height="5" rx="2.5" fill={fig} />
      {/* Legs — very short */}
      <rect x="25.5" y="43" width="5" height="10" rx="2.5" fill={fig} />
      <rect x="33.5" y="43" width="5" height="10" rx="2.5" fill={fig} />
    </svg>
  );
}

/** 6–9 Child — medium body, arms spread wide */
export function ChildFace6_9({ size = 64, className }: P) {
  const bg = "#E2DAFC"; const fig = "#3B30A8"; const face = "#E2DAFC";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head */}
      <circle cx="32" cy="17" r="8.5" fill={fig} />
      {/* Eyes */}
      <circle cx="29" cy="15.5" r="1.3" fill={face} />
      <circle cx="35" cy="15.5" r="1.3" fill={face} />
      {/* Smile */}
      <path d="M29 19.5 Q32 23 35 19.5" stroke={face} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Body */}
      <rect x="25" y="26.5" width="14" height="14" rx="5" fill={fig} />
      {/* Arms — wider spread */}
      <rect x="9" y="28" width="16" height="5" rx="2.5" fill={fig} />
      <rect x="39" y="28" width="16" height="5" rx="2.5" fill={fig} />
      {/* Legs */}
      <rect x="25.5" y="40" width="5" height="14" rx="2.5" fill={fig} />
      <rect x="33.5" y="40" width="5" height="14" rx="2.5" fill={fig} />
    </svg>
  );
}

/** 10–13 Preteen — taller, slimmer, longer arms & legs */
export function ChildFace10_13({ size = 64, className }: P) {
  const bg = "#FAF0D0"; const fig = "#7A4E10"; const face = "#FAF0D0";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head */}
      <circle cx="32" cy="14.5" r="7.5" fill={fig} />
      {/* Eyes */}
      <circle cx="29.5" cy="13" r="1.2" fill={face} />
      <circle cx="34.5" cy="13" r="1.2" fill={face} />
      {/* Smile */}
      <path d="M29.5 17 Q32 20 34.5 17" stroke={face} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Body — slimmer */}
      <rect x="26" y="23" width="12" height="16" rx="4.5" fill={fig} />
      {/* Arms — long */}
      <rect x="8" y="25" width="18" height="5" rx="2.5" fill={fig} />
      <rect x="38" y="25" width="18" height="5" rx="2.5" fill={fig} />
      {/* Legs — longer */}
      <rect x="26" y="39" width="5" height="17" rx="2.5" fill={fig} />
      <rect x="33" y="39" width="5" height="17" rx="2.5" fill={fig} />
    </svg>
  );
}

/** 14–16 Teen — tallest, slim proportions */
export function ChildFace14_16({ size = 64, className }: P) {
  const bg = "#FADAD4"; const fig = "#962E1E"; const face = "#FADAD4";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head */}
      <circle cx="32" cy="13" r="7" fill={fig} />
      {/* Eyes */}
      <circle cx="29.5" cy="11.5" r="1.1" fill={face} />
      <circle cx="34.5" cy="11.5" r="1.1" fill={face} />
      {/* Smile */}
      <path d="M29.5 15.5 Q32 18 34.5 15.5" stroke={face} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Body — slim */}
      <rect x="27" y="21" width="10" height="17" rx="4" fill={fig} />
      {/* Arms — widest spread */}
      <rect x="7" y="23" width="20" height="5" rx="2.5" fill={fig} />
      <rect x="37" y="23" width="20" height="5" rx="2.5" fill={fig} />
      {/* Legs — longest */}
      <rect x="26.5" y="38" width="5" height="19" rx="2.5" fill={fig} />
      <rect x="32.5" y="38" width="5" height="19" rx="2.5" fill={fig} />
    </svg>
  );
}
