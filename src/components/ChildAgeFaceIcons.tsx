"use client";

type P = { size?: number; className?: string };

const SKIN = "#FFCBA4";
const HAIR = "#5C3317";

/** 3–5 Toddler — sitting baby with a rubber duck */
export function ChildFace3_5({ size = 64, className }: P) {
  const bg = "#FEF3C7"; const suit = "#F59E0B"; const dark = "#D97706";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Duck body */}
      <ellipse cx="51" cy="51" rx="5" ry="4" fill="#FCD34D" />
      {/* Duck head */}
      <circle cx="51" cy="47" r="3" fill="#FCD34D" />
      {/* Duck beak */}
      <path d="M 53 46.5 L 57 46 L 53 47.5 Z" fill="#F97316" />
      {/* Duck eye */}
      <circle cx="52" cy="46" r="0.8" fill="#1C1C1C" />
      {/* Sitting legs */}
      <ellipse cx="24" cy="51" rx="8" ry="4.5" fill={dark} transform="rotate(-20 24 51)" />
      <ellipse cx="40" cy="51" rx="8" ry="4.5" fill={dark} transform="rotate(20 40 51)" />
      {/* Shoes */}
      <ellipse cx="18" cy="54" rx="4.5" ry="3" fill={HAIR} />
      <ellipse cx="46" cy="54" rx="4.5" ry="3" fill={HAIR} />
      {/* Body / onesie */}
      <ellipse cx="32" cy="41" rx="11" ry="10" fill={suit} />
      {/* Left arm */}
      <ellipse cx="20" cy="42" rx="6" ry="3.5" fill={suit} transform="rotate(-30 20 42)" />
      <circle cx="16" cy="46" r="3" fill={SKIN} />
      {/* Right arm */}
      <ellipse cx="44" cy="42" rx="6" ry="3.5" fill={suit} transform="rotate(30 44 42)" />
      <circle cx="48" cy="46" r="3" fill={SKIN} />
      {/* Neck */}
      <rect x="29" y="31" width="6" height="5" rx="2.5" fill={SKIN} />
      {/* Head */}
      <circle cx="32" cy="22" r="11" fill={SKIN} />
      {/* Hair — baby tuft */}
      <ellipse cx="32" cy="12" rx="4" ry="3" fill={HAIR} />
      <path d="M 32 9 Q 31 6 32 5" stroke={HAIR} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** 6–9 Child — standing, wearing a colorful backpack */
export function ChildFace6_9({ size = 64, className }: P) {
  const bg = "#CCFBF1"; const shirt = "#0D9488"; const pants = "#0F766E"; const pack = "#134E4A";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Backpack — behind body */}
      <rect x="35" y="27" width="13" height="17" rx="3" fill={pack} />
      <rect x="36.5" y="36" width="10" height="6" rx="1.5" fill="#1A5C54" />
      {/* Backpack top handle */}
      <path d="M 39 27 Q 41.5 24 44 27" fill="none" stroke={pack} strokeWidth="2" strokeLinecap="round" />
      {/* Shirt */}
      <rect x="24" y="28" width="16" height="14" rx="5" fill={shirt} />
      {/* Pants */}
      <rect x="24.5" y="40" width="15" height="13" rx="3" fill={pants} />
      {/* Left arm */}
      <rect x="16" y="28" width="9" height="13" rx="4.5" fill={shirt} transform="rotate(12 16 28)" />
      <circle cx="15" cy="42" r="3" fill={SKIN} />
      {/* Right arm */}
      <rect x="39" y="28" width="8" height="11" rx="4" fill={shirt} transform="rotate(-8 47 28)" />
      <circle cx="47" cy="39" r="3" fill={SKIN} />
      {/* Left leg */}
      <rect x="25" y="51" width="6" height="13" rx="3" fill={pants} />
      {/* Right leg */}
      <rect x="33" y="51" width="6" height="13" rx="3" fill={pants} />
      {/* Shoes */}
      <ellipse cx="28" cy="63" rx="5.5" ry="3" fill={HAIR} />
      <ellipse cx="36" cy="63" rx="5.5" ry="3" fill={HAIR} />
      {/* Neck */}
      <rect x="29.5" y="22" width="5" height="7" rx="2.5" fill={SKIN} />
      {/* Head */}
      <circle cx="32" cy="16" r="10" fill={SKIN} />
      {/* Hair */}
      <path d="M 22 16 Q 22 5 32 5 Q 42 5 42 16 Q 38 10 32 10 Q 26 10 22 16 Z" fill={HAIR} />
    </svg>
  );
}

/** 10–13 Preteen — standing with over-ear headphones */
export function ChildFace10_13({ size = 64, className }: P) {
  const bg = "#EDE9FE"; const shirt = "#7C3AED"; const pants = "#1E1B4B"; const phones = "#5B21B6";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Shirt */}
      <rect x="25" y="27" width="14" height="14" rx="5" fill={shirt} />
      {/* Pants */}
      <rect x="25.5" y="39" width="13" height="15" rx="3" fill={pants} />
      {/* Left arm */}
      <rect x="16" y="27" width="10" height="13" rx="5" fill={shirt} transform="rotate(14 16 27)" />
      <circle cx="14" cy="41" r="3" fill={SKIN} />
      {/* Right arm */}
      <rect x="38" y="27" width="10" height="13" rx="5" fill={shirt} transform="rotate(-14 48 27)" />
      <circle cx="50" cy="41" r="3" fill={SKIN} />
      {/* Left leg */}
      <rect x="26" y="52" width="6" height="12" rx="3" fill={pants} />
      {/* Right leg */}
      <rect x="33" y="52" width="6" height="12" rx="3" fill={pants} />
      {/* Shoes */}
      <ellipse cx="29" cy="63" rx="5" ry="2.5" fill={HAIR} />
      <ellipse cx="36" cy="63" rx="5" ry="2.5" fill={HAIR} />
      {/* Neck */}
      <rect x="29.5" y="21" width="5" height="7" rx="2.5" fill={SKIN} />
      {/* Head */}
      <circle cx="32" cy="15" r="9" fill={SKIN} />
      {/* Hair */}
      <path d="M 23 15 Q 23 5 32 5 Q 41 5 41 15 Q 38 9 32 9 Q 26 9 23 15 Z" fill={HAIR} />
      {/* Headphone band */}
      <path d="M 21 16 Q 21 4 32 4 Q 43 4 43 16" fill="none" stroke={phones} strokeWidth="2.8" strokeLinecap="round" />
      {/* Left ear cup */}
      <ellipse cx="21" cy="17" rx="4" ry="4.5" fill={phones} />
      {/* Right ear cup */}
      <ellipse cx="43" cy="17" rx="4" ry="4.5" fill={phones} />
    </svg>
  );
}

/** 14–16 Teen — standing, holding a smartphone */
export function ChildFace14_16({ size = 64, className }: P) {
  const bg = "#FFE4E6"; const shirt = "#E11D48"; const pants = "#1E3A5F";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="28" fill={bg} />
      {/* Shirt */}
      <rect x="25" y="26" width="14" height="15" rx="5" fill={shirt} />
      {/* Pants */}
      <rect x="25.5" y="39" width="13" height="17" rx="3" fill={pants} />
      {/* Left arm — hangs down */}
      <rect x="16" y="27" width="10" height="14" rx="5" fill={shirt} transform="rotate(10 16 27)" />
      <circle cx="14" cy="42" r="3" fill={SKIN} />
      {/* Right arm — slightly forward holding phone */}
      <rect x="39" y="26" width="10" height="13" rx="5" fill={shirt} transform="rotate(-18 49 26)" />
      <circle cx="51" cy="39" r="3" fill={SKIN} />
      {/* Smartphone */}
      <rect x="48" y="37" width="8" height="13" rx="1.5" fill="#111827" />
      <rect x="49" y="38.5" width="6" height="9" rx="0.8" fill="#60A5FA" />
      <circle cx="52" cy="49" r="0.8" fill="#374151" />
      {/* Left leg */}
      <rect x="26" y="54" width="6" height="12" rx="3" fill={pants} />
      {/* Right leg */}
      <rect x="33" y="54" width="6" height="12" rx="3" fill={pants} />
      {/* Shoes */}
      <ellipse cx="29" cy="65" rx="5.5" ry="2.8" fill={HAIR} />
      <ellipse cx="36" cy="65" rx="5.5" ry="2.8" fill={HAIR} />
      {/* Neck */}
      <rect x="29.5" y="20" width="5" height="7" rx="2.5" fill={SKIN} />
      {/* Head */}
      <circle cx="32" cy="14" r="9" fill={SKIN} />
      {/* Hair */}
      <path d="M 23 14 Q 23 4 32 4 Q 41 4 41 14 Q 38 8 32 8 Q 26 8 23 14 Z" fill={HAIR} />
    </svg>
  );
}
