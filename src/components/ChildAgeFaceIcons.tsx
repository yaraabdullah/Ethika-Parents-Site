"use client";

type P = { size?: number; className?: string };

/** 3–5 Toddler — big head, chubby two-tone body, stubby limbs */
export function ChildFace3_5({ size = 64, className }: P) {
  const bg = "#CCF2E6"; const shirt = "#1C7A52"; const pants = "#145C3D"; const f = bg;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head — large toddler proportions */}
      <circle cx="32" cy="18" r="12" fill={shirt} />
      {/* Eyes */}
      <circle cx="28" cy="15.5" r="1.8" fill={f} />
      <circle cx="36" cy="15.5" r="1.8" fill={f} />
      {/* Smile */}
      <path d="M27.5 20.5 Q32 25 36.5 20.5" stroke={f} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="29.5" y="28.5" width="5" height="4" rx="1" fill={shirt} />
      {/* Shirt — wide chubby */}
      <rect x="20" y="32" width="24" height="12" rx="7" fill={shirt} />
      {/* Pants */}
      <rect x="21" y="41" width="22" height="9" rx="4" fill={pants} />
      {/* Left arm */}
      <rect x="7" y="31" width="14" height="6" rx="3" fill={shirt} />
      {/* Right arm */}
      <rect x="43" y="31" width="14" height="6" rx="3" fill={shirt} />
      {/* Left leg */}
      <rect x="23" y="49" width="7" height="11" rx="3.5" fill={pants} />
      {/* Right leg */}
      <rect x="34" y="49" width="7" height="11" rx="3.5" fill={pants} />
    </svg>
  );
}

/** 6–9 Child — medium proportions, arms spread wide */
export function ChildFace6_9({ size = 64, className }: P) {
  const bg = "#E2DAFC"; const shirt = "#3B30A8"; const pants = "#2E2680"; const f = bg;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head */}
      <circle cx="32" cy="16" r="10" fill={shirt} />
      {/* Eyes */}
      <circle cx="28.5" cy="14" r="1.6" fill={f} />
      <circle cx="35.5" cy="14" r="1.6" fill={f} />
      {/* Smile */}
      <path d="M28.5 18.5 Q32 22.5 35.5 18.5" stroke={f} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="29.5" y="25" width="5" height="4" rx="1" fill={shirt} />
      {/* Shirt */}
      <rect x="22" y="28.5" width="20" height="12" rx="6" fill={shirt} />
      {/* Pants */}
      <rect x="22.5" y="38" width="19" height="8" rx="4" fill={pants} />
      {/* Left arm — wide spread */}
      <rect x="5" y="29.5" width="18" height="5.5" rx="2.75" fill={shirt} />
      {/* Right arm — wide spread */}
      <rect x="41" y="29.5" width="18" height="5.5" rx="2.75" fill={shirt} />
      {/* Left leg */}
      <rect x="24" y="45" width="6.5" height="14" rx="3.25" fill={pants} />
      {/* Right leg */}
      <rect x="33.5" y="45" width="6.5" height="14" rx="3.25" fill={pants} />
    </svg>
  );
}

/** 10–13 Preteen — taller, slimmer, longer limbs */
export function ChildFace10_13({ size = 64, className }: P) {
  const bg = "#FAF0D0"; const shirt = "#7A4E10"; const pants = "#5C3A0C"; const f = bg;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head */}
      <circle cx="32" cy="14.5" r="9" fill={shirt} />
      {/* Eyes */}
      <circle cx="29" cy="13" r="1.4" fill={f} />
      <circle cx="35" cy="13" r="1.4" fill={f} />
      {/* Smile */}
      <path d="M29 16.5 Q32 20 35 16.5" stroke={f} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="29.5" y="22.5" width="5" height="3.5" rx="1" fill={shirt} />
      {/* Shirt — slimmer */}
      <rect x="24" y="25.5" width="16" height="13" rx="5" fill={shirt} />
      {/* Pants */}
      <rect x="24.5" y="36.5" width="15" height="8" rx="3.5" fill={pants} />
      {/* Left arm */}
      <rect x="7" y="27" width="17" height="5" rx="2.5" fill={shirt} />
      {/* Right arm */}
      <rect x="40" y="27" width="17" height="5" rx="2.5" fill={shirt} />
      {/* Left leg */}
      <rect x="25.5" y="43.5" width="6" height="16" rx="3" fill={pants} />
      {/* Right leg */}
      <rect x="32.5" y="43.5" width="6" height="16" rx="3" fill={pants} />
    </svg>
  );
}

/** 14–16 Teen — tallest, slimmest, widest arm span */
export function ChildFace14_16({ size = 64, className }: P) {
  const bg = "#FADAD4"; const shirt = "#962E1E"; const pants = "#7A2418"; const f = bg;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Head — smallest, most adult proportions */}
      <circle cx="32" cy="13" r="8" fill={shirt} />
      {/* Eyes */}
      <circle cx="29.5" cy="11.5" r="1.2" fill={f} />
      <circle cx="34.5" cy="11.5" r="1.2" fill={f} />
      {/* Smile */}
      <path d="M29.5 15 Q32 18 34.5 15" stroke={f} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="29.5" y="20.5" width="5" height="3" rx="1" fill={shirt} />
      {/* Shirt — slim */}
      <rect x="25" y="23.5" width="14" height="13" rx="4.5" fill={shirt} />
      {/* Pants */}
      <rect x="25.5" y="34.5" width="13" height="8" rx="3.5" fill={pants} />
      {/* Left arm — widest spread */}
      <rect x="6" y="25" width="19" height="5" rx="2.5" fill={shirt} />
      {/* Right arm — widest spread */}
      <rect x="39" y="25" width="19" height="5" rx="2.5" fill={shirt} />
      {/* Left leg */}
      <rect x="26" y="41.5" width="5.5" height="18" rx="2.75" fill={pants} />
      {/* Right leg */}
      <rect x="32.5" y="41.5" width="5.5" height="18" rx="2.75" fill={pants} />
    </svg>
  );
}
