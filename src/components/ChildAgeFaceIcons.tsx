"use client";

type P = { size?: number; className?: string };

const SK = "#FFCBA4";
const SKS = "#D4905A";
const HR = "#5C3317";
const EY = "#1A0F08";
const CK = "#F9A8A8";

function eyePair(lx: number, rx: number, cy: number, r = 3.0) {
  return (
    <>
      <circle cx={lx} cy={cy} r={r} fill="white" stroke={EY} strokeWidth="0.7" />
      <circle cx={lx + 0.3} cy={cy + 0.1} r={r * 0.63} fill={EY} />
      <circle cx={lx + r * 0.3} cy={cy - r * 0.3} r={r * 0.27} fill="white" />
      <circle cx={rx} cy={cy} r={r} fill="white" stroke={EY} strokeWidth="0.7" />
      <circle cx={rx + 0.3} cy={cy + 0.1} r={r * 0.63} fill={EY} />
      <circle cx={rx + r * 0.3} cy={cy - r * 0.3} r={r * 0.27} fill="white" />
    </>
  );
}

/** 3–5 Toddler — sitting, blue onesie, rubber duck */
export function ChildFace3_5({ size = 64, className }: P) {
  const C = "#60A5FA";
  const CS = "#2563EB";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="29" fill="#FEF3C7" />

      {/* Duck */}
      <ellipse cx="50" cy="53" rx="5.5" ry="3.5" fill="#FCD34D" stroke="#D97706" strokeWidth="0.7" />
      <circle cx="50" cy="48.5" r="3" fill="#FCD34D" stroke="#D97706" strokeWidth="0.7" />
      <path d="M 52.5 48 L 56.5 47 L 52.5 49.5 Z" fill="#F97316" stroke="#EA580C" strokeWidth="0.4" />
      <circle cx="51.5" cy="47.5" r="0.9" fill="#111827" />
      <path d="M 47 52.5 Q 50 50.5 53 52" fill="none" stroke="#D97706" strokeWidth="0.8" strokeLinecap="round" />

      {/* Sitting left leg */}
      <path d="M 17 48 Q 11 52 10 57 Q 14 60 19 58 Q 23 56 21 50 Z" fill={C} stroke={CS} strokeWidth="0.8" />
      <ellipse cx="11.5" cy="58" rx="4.5" ry="2.8" fill={SK} stroke={SKS} strokeWidth="0.7" />
      {/* Sitting right leg */}
      <path d="M 32 48 Q 38 52 39 57 Q 35 60 30 58 Q 26 56 28 50 Z" fill={C} stroke={CS} strokeWidth="0.8" />
      <ellipse cx="37.5" cy="58" rx="4.5" ry="2.8" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Body */}
      <ellipse cx="25" cy="42" rx="10" ry="9" fill={C} stroke={CS} strokeWidth="0.9" />
      <circle cx="25" cy="49" r="1.2" fill={CS} opacity="0.5" />

      {/* Left arm */}
      <path d="M 16 39 Q 12 44 12 49" stroke={CS} strokeWidth="8" strokeLinecap="round" />
      <path d="M 16 39 Q 12 44 12 49" stroke={C} strokeWidth="6" strokeLinecap="round" />
      <circle cx="12" cy="49" r="3" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Right arm — reaches toward duck */}
      <path d="M 34 39 Q 39 42 42 47" stroke={CS} strokeWidth="8" strokeLinecap="round" />
      <path d="M 34 39 Q 39 42 42 47" stroke={C} strokeWidth="6" strokeLinecap="round" />
      <circle cx="42" cy="47" r="3" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Neck */}
      <rect x="22" y="33" width="6" height="5" rx="3" fill={SK} stroke={SKS} strokeWidth="0.6" />

      {/* Head */}
      <circle cx="25" cy="20" r="13" fill={SK} stroke={SKS} strokeWidth="0.9" />

      {/* Ears */}
      <ellipse cx="12.5" cy="21" rx="2.5" ry="3" fill={SK} stroke={SKS} strokeWidth="0.7" />
      <ellipse cx="37.5" cy="21" rx="2.5" ry="3" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Hair */}
      <path d="M 13 18 Q 13 8 25 8 Q 33 8 37 14 Q 36 8 25 9 Q 16 9 13 18 Z" fill={HR} />
      <path d="M 22 9 Q 25 4 28 8" stroke={HR} strokeWidth="2.5" strokeLinecap="round" />

      {/* Eyebrows */}
      <path d="M 18 15.5 Q 21.5 14 25 15.5" fill="none" stroke={HR} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M 25 15.5 Q 28.5 14 32 15.5" fill="none" stroke={HR} strokeWidth="1.3" strokeLinecap="round" />

      {/* Eyes */}
      {eyePair(21, 29, 21, 3.2)}

      {/* Nose */}
      <circle cx="25" cy="25" r="1.1" fill={SKS} opacity="0.6" />

      {/* Cheeks */}
      <circle cx="16" cy="24" r="3.5" fill={CK} opacity="0.5" />
      <circle cx="34" cy="24" r="3.5" fill={CK} opacity="0.5" />

      {/* Smile */}
      <path d="M 20 28.5 Q 25 32.5 30 28.5" fill="none" stroke={SKS} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

/** 6–9 Child — running, yellow tee, green shorts, toy plane */
export function ChildFace6_9({ size = 64, className }: P) {
  const shirt = "#FCD34D";
  const shirtS = "#D97706";
  const shorts = "#16A34A";
  const shortsS = "#166534";
  const shoe = "#1E40AF";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="29" fill="#CCFBF1" />

      {/* Toy plane */}
      <ellipse cx="49" cy="17" rx="9" ry="3.5" fill="white" stroke="#94A3B8" strokeWidth="0.8" />
      <path d="M 57 15 L 61 17 L 57 19 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.7" />
      <path d="M 49 14 L 43 7 L 47 7 L 53 14 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.7" />
      <path d="M 46 19 L 43 23 L 45 23 L 48 19 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.6" />
      <path d="M 41 15 L 38 10 L 41 14 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.6" />
      <circle cx="49" cy="17" r="1.5" fill="#93C5FD" stroke="#94A3B8" strokeWidth="0.4" />
      <circle cx="54" cy="17" r="1.5" fill="#93C5FD" stroke="#94A3B8" strokeWidth="0.4" />

      {/* Right leg (trailing) */}
      <path d="M 31 45 Q 37 52 38 59" stroke={shortsS} strokeWidth="9.5" strokeLinecap="round" />
      <path d="M 31 45 Q 37 52 38 59" stroke={shorts} strokeWidth="7.5" strokeLinecap="round" />
      <ellipse cx="39" cy="60" rx="5" ry="2.5" fill={shoe} stroke="#1E3A8A" strokeWidth="0.7" />

      {/* Left leg (leading) */}
      <path d="M 26 45 Q 22 52 20 59" stroke={shortsS} strokeWidth="9.5" strokeLinecap="round" />
      <path d="M 26 45 Q 22 52 20 59" stroke={shorts} strokeWidth="7.5" strokeLinecap="round" />
      <ellipse cx="19" cy="60" rx="5" ry="2.5" fill={shoe} stroke="#1E3A8A" strokeWidth="0.7" />

      {/* Body */}
      <ellipse cx="28" cy="38" rx="9" ry="8.5" fill={shirt} stroke={shirtS} strokeWidth="0.9" />

      {/* Left arm (back, down) */}
      <path d="M 20 35 Q 16 40 15 46" stroke={shirtS} strokeWidth="8" strokeLinecap="round" />
      <path d="M 20 35 Q 16 40 15 46" stroke={shirt} strokeWidth="6" strokeLinecap="round" />
      <circle cx="15" cy="46" r="2.8" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Right arm (raised, holding plane) */}
      <path d="M 36 34 Q 42 27 45 21" stroke={shirtS} strokeWidth="8" strokeLinecap="round" />
      <path d="M 36 34 Q 42 27 45 21" stroke={shirt} strokeWidth="6" strokeLinecap="round" />
      <circle cx="45" cy="21" r="2.8" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Neck */}
      <rect x="25" y="28" width="6" height="5" rx="3" fill={SK} stroke={SKS} strokeWidth="0.6" />

      {/* Head */}
      <circle cx="28" cy="18" r="11" fill={SK} stroke={SKS} strokeWidth="0.9" />

      {/* Ears */}
      <ellipse cx="17.5" cy="19" rx="2.2" ry="2.7" fill={SK} stroke={SKS} strokeWidth="0.7" />
      <ellipse cx="38.5" cy="19" rx="2.2" ry="2.7" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Hair */}
      <path d="M 17 17 Q 17 7 28 7 Q 36 7 38 14 Q 37 7 28 8 Q 20 8 17 17 Z" fill={HR} />
      <path d="M 23 8 Q 25 3 27 8" stroke={HR} strokeWidth="2" strokeLinecap="round" />
      <path d="M 27 7 Q 29 2.5 31 7" stroke={HR} strokeWidth="2" strokeLinecap="round" />

      {/* Eyebrows */}
      <path d="M 21 13.5 Q 24 12 27 13.5" fill="none" stroke={HR} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 29 13.5 Q 32 12 35 13.5" fill="none" stroke={HR} strokeWidth="1.2" strokeLinecap="round" />

      {/* Eyes */}
      {eyePair(24, 32, 19, 3)}

      {/* Nose */}
      <circle cx="28" cy="22.5" r="1" fill={SKS} opacity="0.6" />

      {/* Cheeks */}
      <circle cx="19.5" cy="22" r="3" fill={CK} opacity="0.5" />
      <circle cx="36.5" cy="22" r="3" fill={CK} opacity="0.5" />

      {/* Big happy smile */}
      <path d="M 23 26 Q 28 31 33 26" fill="none" stroke={SKS} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/** 10–13 Preteen — standing, violet shirt, over-ear headphones */
export function ChildFace10_13({ size = 64, className }: P) {
  const shirt = "#7C3AED";
  const shirtS = "#5B21B6";
  const pants = "#1E1B4B";
  const pantsS = "#141230";
  const phones = "#6D28D9";
  const phonesS = "#4C1D95";
  const shoe = "#111827";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="29" fill="#EDE9FE" />

      {/* Left leg */}
      <path d="M 27 48 Q 25 55 25 62" stroke={pantsS} strokeWidth="9" strokeLinecap="round" />
      <path d="M 27 48 Q 25 55 25 62" stroke={pants} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="25" cy="63" rx="5" ry="2.5" fill={shoe} stroke="#030712" strokeWidth="0.7" />

      {/* Right leg */}
      <path d="M 35 48 Q 37 55 37 62" stroke={pantsS} strokeWidth="9" strokeLinecap="round" />
      <path d="M 35 48 Q 37 55 37 62" stroke={pants} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="37" cy="63" rx="5" ry="2.5" fill={shoe} stroke="#030712" strokeWidth="0.7" />

      {/* Body */}
      <ellipse cx="31" cy="39" rx="9.5" ry="10" fill={shirt} stroke={shirtS} strokeWidth="0.9" />

      {/* Left arm */}
      <path d="M 22 36 Q 17 40 16 47" stroke={shirtS} strokeWidth="8.5" strokeLinecap="round" />
      <path d="M 22 36 Q 17 40 16 47" stroke={shirt} strokeWidth="6.5" strokeLinecap="round" />
      <circle cx="16" cy="47" r="3" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Right arm */}
      <path d="M 40 36 Q 45 40 46 47" stroke={shirtS} strokeWidth="8.5" strokeLinecap="round" />
      <path d="M 40 36 Q 45 40 46 47" stroke={shirt} strokeWidth="6.5" strokeLinecap="round" />
      <circle cx="46" cy="47" r="3" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Neck */}
      <rect x="28" y="27" width="6" height="5" rx="3" fill={SK} stroke={SKS} strokeWidth="0.6" />

      {/* Head */}
      <circle cx="31" cy="17" r="11" fill={SK} stroke={SKS} strokeWidth="0.9" />

      {/* Hair */}
      <path d="M 20 16 Q 20 6 31 6 Q 40 6 42 13 Q 41 7 31 7 Q 23 7 20 16 Z" fill={HR} />

      {/* Headphone band */}
      <path d="M 19 19 Q 19 4 31 4 Q 43 4 43 19" fill="none" stroke={phonesS} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 19 19 Q 19 4 31 4 Q 43 4 43 19" fill="none" stroke={phones} strokeWidth="2.5" strokeLinecap="round" />

      {/* Left ear cup */}
      <ellipse cx="19" cy="20" rx="4" ry="4.5" fill={phones} stroke={phonesS} strokeWidth="0.8" />
      <ellipse cx="19" cy="20" rx="2.5" ry="3" fill={phonesS} />

      {/* Right ear cup */}
      <ellipse cx="43" cy="20" rx="4" ry="4.5" fill={phones} stroke={phonesS} strokeWidth="0.8" />
      <ellipse cx="43" cy="20" rx="2.5" ry="3" fill={phonesS} />

      {/* Eyebrows */}
      <path d="M 24 13 Q 27 11.5 30 13" fill="none" stroke={HR} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 32 13 Q 35 11.5 38 13" fill="none" stroke={HR} strokeWidth="1.2" strokeLinecap="round" />

      {/* Eyes */}
      {eyePair(27, 35, 18, 3)}

      {/* Nose */}
      <circle cx="31" cy="22" r="1" fill={SKS} opacity="0.6" />

      {/* Cheeks */}
      <circle cx="22.5" cy="21.5" r="3" fill={CK} opacity="0.45" />
      <circle cx="39.5" cy="21.5" r="3" fill={CK} opacity="0.45" />

      {/* Smile */}
      <path d="M 26 25.5 Q 31 29.5 36 25.5" fill="none" stroke={SKS} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** 14–16 Teen — walking, red shirt, navy pants, smartphone */
export function ChildFace14_16({ size = 64, className }: P) {
  const shirt = "#E11D48";
  const shirtS = "#BE123C";
  const pants = "#1E3A5F";
  const pantsS = "#172C48";
  const shoe = "#111827";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="32" cy="32" r="29" fill="#FFE4E6" />

      {/* Right leg (forward) */}
      <path d="M 35 47 Q 37 54 38 62" stroke={pantsS} strokeWidth="9" strokeLinecap="round" />
      <path d="M 35 47 Q 37 54 38 62" stroke={pants} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="38.5" cy="63" rx="5.5" ry="2.5" fill={shoe} stroke="#030712" strokeWidth="0.7" />

      {/* Left leg (back) */}
      <path d="M 29 47 Q 27 54 26 62" stroke={pantsS} strokeWidth="9" strokeLinecap="round" />
      <path d="M 29 47 Q 27 54 26 62" stroke={pants} strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="25.5" cy="63" rx="5.5" ry="2.5" fill={shoe} stroke="#030712" strokeWidth="0.7" />

      {/* Body */}
      <ellipse cx="32" cy="38" rx="9.5" ry="10" fill={shirt} stroke={shirtS} strokeWidth="0.9" />

      {/* Left arm (hanging naturally) */}
      <path d="M 23 35 Q 19 41 18 48" stroke={shirtS} strokeWidth="8.5" strokeLinecap="round" />
      <path d="M 23 35 Q 19 41 18 48" stroke={shirt} strokeWidth="6.5" strokeLinecap="round" />
      <circle cx="18" cy="48" r="3" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Right arm (bent, holds phone) */}
      <path d="M 41 35 Q 46 39 47 45" stroke={shirtS} strokeWidth="8.5" strokeLinecap="round" />
      <path d="M 41 35 Q 46 39 47 45" stroke={shirt} strokeWidth="6.5" strokeLinecap="round" />
      <circle cx="47" cy="45" r="3" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Smartphone */}
      <rect x="44" y="43" width="9" height="14" rx="1.5" fill="#111827" stroke="#374151" strokeWidth="0.7" />
      <rect x="45.3" y="44.5" width="6.4" height="9.5" rx="0.7" fill="#3B82F6" />
      <line x1="46.5" y1="46.5" x2="50.5" y2="46.5" stroke="white" strokeWidth="0.7" opacity="0.7" />
      <line x1="46.5" y1="48.5" x2="50.5" y2="48.5" stroke="white" strokeWidth="0.7" opacity="0.5" />
      <line x1="46.5" y1="50.5" x2="49" y2="50.5" stroke="white" strokeWidth="0.7" opacity="0.5" />
      <circle cx="48.5" cy="56" r="0.9" fill="#6B7280" />

      {/* Neck */}
      <rect x="29" y="26" width="6" height="5" rx="3" fill={SK} stroke={SKS} strokeWidth="0.6" />

      {/* Head */}
      <circle cx="32" cy="16" r="11" fill={SK} stroke={SKS} strokeWidth="0.9" />

      {/* Ears */}
      <ellipse cx="21.5" cy="17" rx="2" ry="2.5" fill={SK} stroke={SKS} strokeWidth="0.7" />
      <ellipse cx="42.5" cy="17" rx="2" ry="2.5" fill={SK} stroke={SKS} strokeWidth="0.7" />

      {/* Hair */}
      <path d="M 21 15 Q 21 5 32 5 Q 42 5 43 13 Q 42 6 32 6 Q 23 6 21 15 Z" fill={HR} />
      <path d="M 29 6 Q 31 2 33 6" stroke={HR} strokeWidth="2" strokeLinecap="round" />

      {/* Eyebrows */}
      <path d="M 25 12 Q 28 10.5 31 12" fill="none" stroke={HR} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M 33 12 Q 36 10.5 39 12" fill="none" stroke={HR} strokeWidth="1.4" strokeLinecap="round" />

      {/* Eyes */}
      {eyePair(28, 36, 17, 3)}

      {/* Nose */}
      <circle cx="32" cy="21" r="1.1" fill={SKS} opacity="0.6" />

      {/* Cheeks */}
      <circle cx="23.5" cy="20.5" r="2.8" fill={CK} opacity="0.35" />
      <circle cx="40.5" cy="20.5" r="2.8" fill={CK} opacity="0.35" />

      {/* Smile */}
      <path d="M 27 24.5 Q 32 28.5 37 24.5" fill="none" stroke={SKS} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
