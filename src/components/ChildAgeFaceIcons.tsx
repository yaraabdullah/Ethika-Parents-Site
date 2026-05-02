"use client";

type P = { size?: number; className?: string };

/** 3–5 Toddler — bald round head, wide chubby body */
export function ChildFace3_5({ size = 64, className }: P) {
  const bg = "#FEF3C7"; const fig = "#D97706"; // amber — matches StarIcon / LightningIcon
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Body / shoulders — wide ellipse rises behind head */}
      <ellipse cx="32" cy="50" rx="16" ry="16" fill={fig} />
      {/* Ears */}
      <ellipse cx="18.5" cy="25" rx="2.8" ry="3.5" fill={fig} />
      <ellipse cx="45.5" cy="25" rx="2.8" ry="3.5" fill={fig} />
      {/* Head — large, bald (baby proportions) */}
      <circle cx="32" cy="24" r="13" fill={fig} />
    </svg>
  );
}

/** 6–9 Child — round head, small hair bump, medium shoulders */
export function ChildFace6_9({ size = 64, className }: P) {
  const bg = "#CCFBF1"; const fig = "#0D9488"; // teal — matches WaveIcon
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Body / shoulders */}
      <ellipse cx="32" cy="48" rx="17" ry="14" fill={fig} />
      {/* Ears */}
      <ellipse cx="20" cy="23" rx="2.6" ry="3.5" fill={fig} />
      <ellipse cx="44" cy="23" rx="2.6" ry="3.5" fill={fig} />
      {/* Head */}
      <circle cx="32" cy="22" r="11" fill={fig} />
      {/* Hair — small bump */}
      <ellipse cx="32" cy="12.5" rx="7" ry="3.5" fill={fig} />
    </svg>
  );
}

/** 10–13 Preteen — slightly taller, wider hair, broader shoulders */
export function ChildFace10_13({ size = 64, className }: P) {
  const bg = "#EDE9FE"; const fig = "#7C3AED"; // violet — matches MoonIcon
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Body / shoulders — broader */}
      <ellipse cx="32" cy="47" rx="19" ry="14" fill={fig} />
      {/* Ears */}
      <ellipse cx="21" cy="21" rx="2.6" ry="3.5" fill={fig} />
      <ellipse cx="43" cy="21" rx="2.6" ry="3.5" fill={fig} />
      {/* Head */}
      <circle cx="32" cy="21" r="10" fill={fig} />
      {/* Hair — medium, wider */}
      <ellipse cx="32" cy="12" rx="9" ry="4" fill={fig} />
    </svg>
  );
}

/** 14–16 Teen — taller head, fullest hair, widest shoulders */
export function ChildFace14_16({ size = 64, className }: P) {
  const bg = "#FFE4E6"; const fig = "#E11D48"; // rose — matches HeartIcon
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Body / shoulders — widest */}
      <ellipse cx="32" cy="46" rx="21" ry="14" fill={fig} />
      {/* Ears */}
      <ellipse cx="22" cy="20" rx="2.6" ry="3.5" fill={fig} />
      <ellipse cx="42" cy="20" rx="2.6" ry="3.5" fill={fig} />
      {/* Head */}
      <circle cx="32" cy="19" r="9" fill={fig} />
      {/* Hair — full, side volume */}
      <ellipse cx="32" cy="11" rx="10" ry="4.5" fill={fig} />
      <ellipse cx="22.5" cy="16" rx="3" ry="6" fill={fig} />
      <ellipse cx="41.5" cy="16" rx="3" ry="6" fill={fig} />
    </svg>
  );
}
