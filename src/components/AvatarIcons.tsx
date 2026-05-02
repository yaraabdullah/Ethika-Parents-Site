"use client";

type P = { size?: number; className?: string };

/** Star — classic 5-point star */
export function StarIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <polygon points="12,2 14.9,9.2 22.5,9.5 16.8,14.5 18.8,22 12,17.8 5.2,22 7.2,14.5 1.5,9.5 9.1,9.2" fill="#D97706" />
    </svg>
  );
}

/** Sun — bold circle with 8 tapered rays */
export function SunIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <circle cx="12" cy="12" r="4.5" fill="#F59E0B" />
      <line x1="12" y1="1.5" x2="12" y2="4.5"   stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="12" y1="19.5" x2="12" y2="22.5" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="1.5" y1="12" x2="4.5" y2="12"   stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="19.5" y1="12" x2="22.5" y2="12" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="4.1" y1="4.1"   x2="6.2" y2="6.2"   stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="17.8" y1="17.8" x2="19.9" y2="19.9" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="19.9" y1="4.1"  x2="17.8" y2="6.2"  stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="4.1" y1="19.9"  x2="6.2" y2="17.8"  stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/** Moon — crescent via evenodd */
export function MoonIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        fillRule="evenodd"
        d="M12 3 A9 9 0 1 0 12 21 A9 9 0 1 0 12 3 Z
           M15 5 A7 7 0 1 0 15 19 A7 7 0 1 0 15 5 Z"
        fill="#7C3AED"
      />
    </svg>
  );
}

/** Cloud — soft rounded cloud blob */
export function CloudIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        d="M6 19 C3 19 1 17 1 14.5 C1 12 3 10 5.5 10 C5.8 7.5 8 5.5 10.5 5.5 C12 5.5 13.3 6.2 14.1 7.2 C14.7 6.7 15.6 6.5 16.5 6.5 C19 6.5 21 8.5 21 11 C22.2 11.5 23 12.7 23 14 C23 16.2 21.2 18 19 18 Z"
        fill="#3B82F6"
      />
    </svg>
  );
}

/** Heart — classic love heart */
export function HeartIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        d="M12 20.5 C12 20.5 2 14 2 8 C2 5 4.5 3 7 3 C9 3 11 4.5 12 6 C13 4.5 15 3 17 3 C19.5 3 22 5 22 8 C22 14 12 20.5 12 20.5 Z"
        fill="#E11D48"
      />
    </svg>
  );
}

/** Lightning — bold lightning bolt */
export function LightningIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <polygon points="13,2 5,14 11.5,14 11,22 19,10 12.5,10" fill="#D97706" />
    </svg>
  );
}

/** Leaf — organic teardrop leaf with midrib */
export function LeafIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        d="M12 21 C12 21 3 16 3 10 C3 5.6 7 2 12 2 C17 2 21 5.6 21 10 C21 16 12 21 12 21 Z"
        fill="#16A34A"
      />
      <path d="M12 21 L12 8" stroke="#dcfce7" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Flame — organic fire shape */
export function FlameIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path
        d="M12 2 C12 2 18 7 18 13 C18 17.4 15.3 21 12 21 C8.7 21 6 17.4 6 13 C6 10.5 7 8.5 8.5 7 C8.5 9.5 10 11 12 11 C14 11 15 9 14 6 C14 6 12 4.5 12 2 Z"
        fill="#EA580C"
      />
      <ellipse cx="12" cy="16" rx="3" ry="3.5" fill="#FCD34D" opacity="0.7" />
    </svg>
  );
}

/** Diamond — two-tone rhombus */
export function DiamondIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <polygon points="12,2 22,12 12,22 2,12" fill="#2563EB" />
      <polygon points="12,2 22,12 12,12 2,12" fill="#60A5FA" />
    </svg>
  );
}

/** Wave — three rolling wave lines */
export function WaveIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <path d="M2 7 C5 5 8 9 11 7 C14 5 17 9 20 7 L22 6.5" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M2 12 C5 10 8 14 11 12 C14 10 17 14 20 12 L22 11.5" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M2 17 C5 15 8 19 11 17 C14 15 17 19 20 17 L22 16.5" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Mountain — two bold peaks, lighter back peak */
export function MountainIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <polygon points="15,4 23,22 7,22" fill="#94A3B8" />
      <polygon points="9,8 20,23 1,23" fill="#475569" />
      <polygon points="9,8 12,14 6,14" fill="#F1F5F9" />
    </svg>
  );
}

/** Snowflake — 6 spokes with branch ticks */
export function SnowflakeIcon({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className={className}>
      <line x1="12" y1="2"    x2="12" y2="22"   stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="2"  y1="12"   x2="22" y2="12"   stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      <line x1="19.1" y1="4.9" x2="4.9" y2="19.1" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      {/* branch ticks on vertical spoke */}
      <line x1="9" y1="7"  x2="12" y2="10" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="7" x2="12" y2="10" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="9" y1="17"  x2="12" y2="14" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="15" y1="17" x2="12" y2="14" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.5" fill="#0284C7" />
    </svg>
  );
}
