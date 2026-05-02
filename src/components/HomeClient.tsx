"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useMemo, type ComponentType } from "react";
import { getStats } from "@/data/stats";
import { TOOLS, toolLabel } from "@/data/tools";
import { ACTIVITIES } from "@/data/activities";
import {
  ChildFace10_13,
  ChildFace14_16,
  ChildFace3_5,
  ChildFace6_9,
} from "@/components/ChildAgeFaceIcons";
import {
  StarIcon,
  SunIcon,
  MoonIcon,
  CloudIcon,
  HeartIcon,
  LightningIcon,
  LeafIcon,
  FlameIcon,
  DiamondIcon,
  WaveIcon,
  MountainIcon,
  SnowflakeIcon,
} from "@/components/AvatarIcons";

/* ── IBM Carbon Design System icons ── */
import {
  Misuse,
  Security,
  Screen,
  Locked,
  ChatBot,
  WarningAlt,
  Explore,
  Caution,
  PedestrianFamily,
  Book,
  Scales,
  SkillLevelBasic,
  SkillLevelIntermediate,
  SkillLevelAdvanced,
  ArrowRight,
  ArrowLeft,
  Checkmark,
  User,
  Tools,
  Report,
  UserMultiple,
  Building,
  Favorite,
  WarningFilled,
  WatsonxAi,
  Idea,
  Search,
  Education,
  Blog,
  CheckmarkFilled,
} from "@carbon/icons-react";

type Props = { locale: string };

type IconComp = ComponentType<{ size?: number; className?: string }>;

/* ── Questionnaire definitions ── */
type UserProfile = {
  id: string;
  avatar: string;
  name: string;
  childAges: string[];
  concerns: string[];
  interests: string[];
  experience: string;         // "new" | "some" | "experienced"
  completedAt: string;
};

/**
 * Parent avatars — mockup style: **white glyphs on solid color disks** (Options A + B + D),
 * no monogram initials. Row A = geometry, B = silhouettes, D = same abstract mark × 4 colors.
 */
type AvatarOption = {
  id: string;
  Icon: IconComp;
  label: string;
  circle: string;
  iconTone: string;
  shortEn: string;
  shortAr: string;
};

const AVATAR_OPTIONS: AvatarOption[] = [
  { id: "star",      Icon: StarIcon,      label: "Star",      circle: "bg-amber-100",  iconTone: "", shortEn: "Star",     shortAr: "نجمة"   },
  { id: "sun",       Icon: SunIcon,       label: "Sun",       circle: "bg-yellow-100", iconTone: "", shortEn: "Sun",      shortAr: "شمس"    },
  { id: "moon",      Icon: MoonIcon,      label: "Moon",      circle: "bg-violet-100", iconTone: "", shortEn: "Moon",     shortAr: "قمر"    },
  { id: "cloud",     Icon: CloudIcon,     label: "Cloud",     circle: "bg-sky-100",    iconTone: "", shortEn: "Cloud",    shortAr: "سحابة"  },
  { id: "heart",     Icon: HeartIcon,     label: "Heart",     circle: "bg-rose-100",   iconTone: "", shortEn: "Heart",    shortAr: "قلب"    },
  { id: "lightning", Icon: LightningIcon, label: "Lightning", circle: "bg-yellow-100", iconTone: "", shortEn: "Bolt",     shortAr: "برق"    },
  { id: "leaf",      Icon: LeafIcon,      label: "Leaf",      circle: "bg-green-100",  iconTone: "", shortEn: "Leaf",     shortAr: "ورقة"   },
  { id: "flame",     Icon: FlameIcon,     label: "Flame",     circle: "bg-orange-100", iconTone: "", shortEn: "Flame",    shortAr: "شعلة"   },
  { id: "diamond",   Icon: DiamondIcon,   label: "Diamond",   circle: "bg-blue-100",   iconTone: "", shortEn: "Diamond",  shortAr: "ماسة"   },
  { id: "wave",      Icon: WaveIcon,      label: "Wave",      circle: "bg-teal-100",   iconTone: "", shortEn: "Wave",     shortAr: "موجة"   },
  { id: "mountain",  Icon: MountainIcon,  label: "Mountain",  circle: "bg-slate-100",  iconTone: "", shortEn: "Mountain", shortAr: "جبل"    },
  { id: "snowflake", Icon: SnowflakeIcon, label: "Snowflake", circle: "bg-sky-100",    iconTone: "", shortEn: "Snow",     shortAr: "ثلجة"   },
];

function avatarChipStyles(avatarId: string): Pick<AvatarOption, "circle" | "iconTone"> {
  const row = AVATAR_OPTIONS.find((a) => a.id === avatarId);
  return row
    ? { circle: row.circle, iconTone: row.iconTone }
    : { circle: "bg-rose-100", iconTone: "" };
}

/** Maps any previously stored avatar id onto the current icon set. */
const AVATAR_LEGACY_IDS: Record<string, string> = {
  // current ids — identity map
  star: "star", sun: "sun", moon: "moon", cloud: "cloud",
  heart: "heart", lightning: "lightning", leaf: "leaf", flame: "flame",
  diamond: "diamond", wave: "wave", mountain: "mountain", snowflake: "snowflake",
  // old nature icon ids
  tree: "leaf",
  owl: "moon",
  sunflower: "sun",
  butterfly: "heart",
  bee: "lightning",
  turtle: "wave",
  fox: "mountain",
  palette: "star",
  puzzle: "diamond",
  // old Carbon / KeyholePersonGlyph IDs
  geo_ring: "mountain",
  geo_square: "diamond",
  geo_triangle: "wave",
  geo_star: "star",
  sil_avatar: "moon",
  sil_card: "leaf",
  sil_pair: "wave",
  sil_family: "heart",
  tone_green: "leaf",
  tone_blue: "wave",
  tone_rose: "heart",
  tone_amber: "flame",
  // misc legacy names
  family: "heart",
  home: "leaf",
  care: "heart",
  protect: "moon",
  guide: "mountain",
  household: "wave",
  routine: "diamond",
  partner: "wave",
  connect: "cloud",
  account: "moon",
  profile: "star",
  member: "heart",
  classic: "moon",
  solid: "wave",
  portrait: "star",
  calm: "moon",
  kids: "heart",
  circle: "moon",
  team: "wave",
  warm: "flame",
  cool: "snowflake",
  playful: "star",
  stories: "cloud",
  sunny: "sun",
  renew: "leaf",
  steady: "mountain",
  clever: "diamond",
  creative: "star",
  fitting: "diamond",
  peak: "mountain",
  spark: "lightning",
  music: "wave",
  reading: "cloud",
  safety: "leaf",
  digital: "lightning",
  talk: "cloud",
  growth: "leaf",
  school: "star",
  sprout: "leaf",
};

function resolveAvatarId(stored: string): string {
  const id = AVATAR_LEGACY_IDS[stored] ?? stored;
  if (AVATAR_OPTIONS.some((a) => a.id === id)) return id;
  return "star";
}

/* Carbon icon components mapped to concern keys */
const CONCERN_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  deepfakes: Misuse,
  online_safety: Security,
  screen_time: Screen,
  privacy: Locked,
  chatbots: ChatBot,
  cyberbullying: WarningAlt,
};
const CONCERN_OPTIONS = [
  { key: "deepfakes" },
  { key: "online_safety" },
  { key: "screen_time" },
  { key: "privacy" },
  { key: "chatbots" },
  { key: "cyberbullying" },
];

/* Carbon icon components mapped to interest keys */
const INTEREST_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  try_tools: Explore,
  learn_risks: Caution,
  activities: PedestrianFamily,
  legal_rights: Scales,
  expert_recs: Book,
};
const INTEREST_OPTIONS = [
  { key: "try_tools" },
  { key: "learn_risks" },
  { key: "activities" },
  { key: "legal_rights" },
  { key: "expert_recs" },
];

const AGE_BANDS = ["3_5", "6_9", "10_13", "14_16"] as const;

/**
 * Age bands → matching illustrated child busts (shared Ethika green sweater; milestones: pacifier → gap tooth → braces → headphones).
 */
const AGE_ICONS: Record<(typeof AGE_BANDS)[number], IconComp> = {
  "3_5": ChildFace3_5,
  "6_9": ChildFace6_9,
  "10_13": ChildFace10_13,
  "14_16": ChildFace14_16,
};

export default function HomeClient({ locale }: Props) {
  const t = useTranslations("home");
  const tq = useTranslations("questionnaire");
  const stats = getStats(locale);
  const isAr = locale === "ar";

  // User profile state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1); // 1=terms, 2=avatar, 3=ages, 4=concerns, 5=interests, 6=experience
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("new");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("ethika_profile_v3");
    if (user) {
      try {
        const p = JSON.parse(user) as UserProfile;
        setProfile(p);
        setSelectedAges(p.childAges);
        setSelectedConcerns(p.concerns);
        setSelectedInterests(p.interests);
        setSelectedExperience(p.experience);
        setSelectedAvatar(resolveAvatarId(p.avatar));
        setDisplayName(p.name);
      } catch { /* ignore */ }
    } else {
      setShowOnboarding(true);
    }
    setLoaded(true);
  }, []);

  const generateId = () => "ETK-" + Math.random().toString(36).substring(2, 8).toUpperCase();

  const completeOnboarding = () => {
    const id = generateId();
    const p: UserProfile = {
      id,
      avatar: selectedAvatar || "sil_family",
      name: displayName || id,
      childAges: selectedAges,
      concerns: selectedConcerns,
      interests: selectedInterests,
      experience: selectedExperience,
      completedAt: new Date().toISOString(),
    };
    localStorage.setItem("ethika_profile_v3", JSON.stringify(p));
    document.cookie = `ethika_uid=${id}; path=/; max-age=31536000; SameSite=Lax`;
    setProfile(p);
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    setShowOnboarding(false);
  };

  const toggleAge = (age: string) => setSelectedAges(prev => prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]);
  const toggleConcern = (c: string) => setSelectedConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  const toggleInterest = (i: string) => setSelectedInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  // Personalized recommendations
  const recommendedTools = useMemo(() => {
    if (!profile || profile.childAges.length === 0) return TOOLS.slice(0, 3);
    const ageRanges = profile.childAges.map(a => {
      const parts = a.split("_").map(Number);
      return { min: parts[0], max: parts[1] };
    });
    return TOOLS.filter(tool =>
      ageRanges.some(range => tool.ageMin <= range.max && tool.ageMax >= range.min)
    ).slice(0, 3);
  }, [profile]);

  const recommendedActivities = useMemo(() => {
    if (!profile || profile.childAges.length === 0) return ACTIVITIES.slice(0, 2);
    const has3_5 = profile.childAges.includes("3_5");
    const has6_9 = profile.childAges.includes("6_9") || has3_5;
    const has10_13 = profile.childAges.includes("10_13");
    const has14_16 = profile.childAges.includes("14_16");
    return ACTIVITIES.filter(a =>
      (has3_5 && (a.ageBand === "3-5" || a.ageBand === "6-9")) ||
      (has6_9 && !has3_5 && a.ageBand === "6-9") ||
      (has10_13 && (a.ageBand === "10-13")) ||
      (has14_16 && (a.ageBand === "10-13" || a.ageBand === "14-16"))
    ).slice(0, 2);
  }, [profile]);

  if (!loaded) return null;

  /* ─── Onboarding / Questionnaire Overlay ─── */
  if (showOnboarding) {
    const totalSteps = 6;
    const progressPct = ((onboardingStep - 1) / (totalSteps - 1)) * 100;

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-900/70 to-neutral-900/90 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
          {/* Progress bar */}
          <div className="px-6 pt-5 pb-0">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>{isAr ? `الخطوة ${onboardingStep} من ${totalSteps}` : `Step ${onboardingStep} of ${totalSteps}`}</span>
              <button onClick={skipOnboarding} className="hover:text-neutral-600 transition-colors">
                {isAr ? "تخطي" : "Skip"}
              </button>
            </div>
            <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-ethika-green rounded-full transition-all duration-500 ease-out" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Welcome + Terms */}
            {onboardingStep === 1 && (
              <div className="animate-fade-in">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-ethika-green-50 rounded-2xl flex items-center justify-center">
                    <span className="text-4xl">{"\u{1F333}"}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                    {isAr ? "مرحباً بك في إثيكا" : "Welcome to Ethika"}
                  </h2>
                  <p className="text-base text-neutral-500">
                    {isAr ? "أدوات الآباء للذكاء الاصطناعي" : "Parents AI Toolkit"}
                  </p>
                </div>
                <div className="bg-neutral-50 rounded-2xl p-5 text-sm text-neutral-600 leading-relaxed mb-5 max-h-44 overflow-y-auto">
                  {isAr ? (
                    <>
                      <p className="mb-2 font-medium text-neutral-700">هذا مورد مجاني من إثيكا ديجيتال للآباء للتعامل مع الذكاء الاصطناعي والحياة الرقمية لأطفالهم.</p>
                      <ul className="list-disc mr-4 space-y-1 text-xs">
                        <li>المعلومات لأغراض تعليمية وقابلة للتغيير.</li>
                        <li>لا نجمع أي بيانات شخصية. تُحفظ تفضيلاتك فقط على جهازك.</li>
                        <li>المحتوى لا يشكل نصيحة قانونية أو طبية.</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p className="mb-2 font-medium text-neutral-700">This is a free resource from Ethika Digital for parents navigating AI and children's digital lives.</p>
                      <ul className="list-disc ml-4 space-y-1 text-xs">
                        <li>Information is for educational purposes and subject to change.</li>
                        <li>We do not collect any personal data. Your preferences are stored only on your device.</li>
                        <li>Content does not constitute legal or medical advice.</li>
                      </ul>
                    </>
                  )}
                </div>
                <label className="flex items-start gap-3 cursor-pointer mb-5">
                  <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 w-5 h-5 rounded border-neutral-300 text-ethika-green accent-[#35a318]" />
                  <span className="text-sm text-neutral-600">
                    {isAr ? "أوافق على هذه الشروط" : "I agree to these terms"}
                  </span>
                </label>
                <button onClick={() => setOnboardingStep(2)} disabled={!termsAccepted}
                  className="w-full bg-ethika-green text-white font-semibold py-3.5 rounded-2xl text-base transition-all hover:bg-ethika-green-dark disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                  {isAr ? "لنبدأ" : "Let's Begin"} <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* Step 2: Avatar */}
            {onboardingStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                  {isAr ? "اختر صورتك الرمزية" : "Choose your avatar"}
                </h2>
                <p className="text-sm text-neutral-500 mb-5">
                  {isAr ? "للخصوصية الكاملة — لا حاجة لاسمك الحقيقي." : "Full privacy — no real name needed."}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-5">
                  {AVATAR_OPTIONS.map(({ id, Icon, label, circle, iconTone, shortEn, shortAr }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedAvatar(id)}
                      className={`flex flex-col items-center gap-2 rounded-2xl border bg-white px-2 py-3 shadow-sm transition-all
                        ${selectedAvatar === id
                          ? "border-ethika-green ring-2 ring-ethika-green/25 shadow-md"
                          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
                        }`}
                      aria-label={label}
                    >
                      <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${circle}`}>
                        <Icon size={32} className={`shrink-0 ${iconTone}`} />
                      </span>
                      <span className="text-[11px] sm:text-xs font-semibold text-neutral-700 text-center leading-snug tracking-tight">
                        {isAr ? shortAr : shortEn}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mb-5">
                  <label className="text-sm font-medium text-neutral-600 block mb-1.5">
                    {isAr ? "اسم العرض (اختياري)" : "Display name (optional)"}
                  </label>
                  <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                    placeholder={isAr ? "مثال: أم أحمد" : "e.g. Ahmed's Parent"}
                    className="w-full text-base px-4 py-3 border border-neutral-200 rounded-2xl focus:border-ethika-green focus:outline-none bg-white text-neutral-800 placeholder:text-neutral-400" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setOnboardingStep(1)} className="px-5 py-3 text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors inline-flex items-center gap-1">
                    <ArrowLeft size={16} /> {isAr ? "رجوع" : "Back"}
                  </button>
                  <button onClick={() => setOnboardingStep(3)} disabled={!selectedAvatar}
                    className="flex-1 bg-ethika-green text-white font-semibold py-3.5 rounded-2xl text-base transition-all hover:bg-ethika-green-dark disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                    {isAr ? "التالي" : "Next"} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Child Ages */}
            {onboardingStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                  {tq("ages_title")}
                </h2>
                <p className="text-sm text-neutral-500 mb-5">
                  {tq("ages_subtitle")}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {AGE_BANDS.map((age) => (
                    <button key={age} onClick={() => toggleAge(age)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all
                        ${selectedAges.includes(age)
                          ? "border-ethika-green bg-ethika-green-50 shadow-sm"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                        }`}>
                      <span className="flex justify-center mb-1">
                        {(() => {
                          const AgeIcon = AGE_ICONS[age];
                          return <AgeIcon size={52} className="shrink-0" />;
                        })()}
                      </span>
                      <span className={`text-sm font-semibold ${selectedAges.includes(age) ? "text-ethika-green-dark" : "text-neutral-700"}`}>
                        {t(`age_${age}`)}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setOnboardingStep(2)} className="px-5 py-3 text-sm font-medium text-neutral-500 hover:text-neutral-700 inline-flex items-center gap-1">
                    <ArrowLeft size={16} /> {isAr ? "رجوع" : "Back"}
                  </button>
                  <button onClick={() => setOnboardingStep(4)}
                    className="flex-1 bg-ethika-green text-white font-semibold py-3.5 rounded-2xl text-base transition-all hover:bg-ethika-green-dark inline-flex items-center justify-center gap-2">
                    {selectedAges.length > 0 ? (isAr ? "التالي" : "Next") : (isAr ? "تخطي" : "Skip")} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Concerns */}
            {onboardingStep === 4 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                  {tq("concerns_title")}
                </h2>
                <p className="text-sm text-neutral-500 mb-5">
                  {tq("concerns_subtitle")}
                </p>
                <div className="space-y-2.5 mb-6">
                  {CONCERN_OPTIONS.map((c) => (
                    <button key={c.key} onClick={() => toggleConcern(c.key)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left rtl:text-right transition-all
                        ${selectedConcerns.includes(c.key)
                          ? "border-ethika-green bg-ethika-green-50"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                        }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedConcerns.includes(c.key) ? "bg-ethika-green text-white" : "bg-neutral-100 text-neutral-500"}`}>
                        {(() => { const Icon = CONCERN_ICONS[c.key]; return Icon ? <Icon size={20} /> : null; })()}
                      </div>
                      <span className={`text-sm font-medium ${selectedConcerns.includes(c.key) ? "text-ethika-green-dark" : "text-neutral-700"}`}>
                        {tq(`concern_${c.key}`)}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setOnboardingStep(3)} className="px-5 py-3 text-sm font-medium text-neutral-500 hover:text-neutral-700 inline-flex items-center gap-1">
                    <ArrowLeft size={16} /> {isAr ? "رجوع" : "Back"}
                  </button>
                  <button onClick={() => setOnboardingStep(5)}
                    className="flex-1 bg-ethika-green text-white font-semibold py-3.5 rounded-2xl text-base transition-all hover:bg-ethika-green-dark inline-flex items-center justify-center gap-2">
                    {selectedConcerns.length > 0 ? (isAr ? "التالي" : "Next") : (isAr ? "تخطي" : "Skip")} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Interests */}
            {onboardingStep === 5 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                  {tq("interests_title")}
                </h2>
                <p className="text-sm text-neutral-500 mb-5">
                  {tq("interests_subtitle")}
                </p>
                <div className="space-y-2.5 mb-6">
                  {INTEREST_OPTIONS.map((i) => (
                    <button key={i.key} onClick={() => toggleInterest(i.key)}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border-2 text-left rtl:text-right transition-all
                        ${selectedInterests.includes(i.key)
                          ? "border-ethika-green bg-ethika-green-50"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                        }`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selectedInterests.includes(i.key) ? "bg-ethika-green text-white" : "bg-neutral-100 text-neutral-500"}`}>
                        {(() => { const Icon = INTEREST_ICONS[i.key]; return Icon ? <Icon size={20} /> : null; })()}
                      </div>
                      <span className={`text-sm font-medium ${selectedInterests.includes(i.key) ? "text-ethika-green-dark" : "text-neutral-700"}`}>
                        {tq(`interest_${i.key}`)}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setOnboardingStep(4)} className="px-5 py-3 text-sm font-medium text-neutral-500 hover:text-neutral-700 inline-flex items-center gap-1">
                    <ArrowLeft size={16} /> {isAr ? "رجوع" : "Back"}
                  </button>
                  <button onClick={() => setOnboardingStep(6)}
                    className="flex-1 bg-ethika-green text-white font-semibold py-3.5 rounded-2xl text-base transition-all hover:bg-ethika-green-dark inline-flex items-center justify-center gap-2">
                    {selectedInterests.length > 0 ? (isAr ? "التالي" : "Next") : (isAr ? "تخطي" : "Skip")} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Experience */}
            {onboardingStep === 6 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-neutral-900 mb-1">
                  {tq("experience_title")}
                </h2>
                <p className="text-sm text-neutral-500 mb-5">
                  {tq("experience_subtitle")}
                </p>
                <div className="space-y-3 mb-6">
                  {(["new", "some", "experienced"] as const).map((level) => (
                    <button key={level} onClick={() => setSelectedExperience(level)}
                      className={`w-full p-4 rounded-2xl border-2 text-left rtl:text-right transition-all
                        ${selectedExperience === level
                          ? "border-ethika-green bg-ethika-green-50"
                          : "border-neutral-200 hover:border-neutral-300 bg-white"
                        }`}>
                      <span className={`text-sm font-semibold block ${selectedExperience === level ? "text-ethika-green-dark" : "text-neutral-700"}`}>
                        {tq(`exp_${level}`)}
                      </span>
                      <span className="text-xs text-neutral-500 mt-0.5 block">
                        {tq(`exp_${level}_desc`)}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setOnboardingStep(5)} className="px-5 py-3 text-sm font-medium text-neutral-500 hover:text-neutral-700 inline-flex items-center gap-1">
                    <ArrowLeft size={16} /> {isAr ? "رجوع" : "Back"}
                  </button>
                  <button onClick={completeOnboarding}
                    className="flex-1 bg-ethika-green text-white font-semibold py-3.5 rounded-2xl text-base transition-all hover:bg-ethika-green-dark inline-flex items-center justify-center gap-2">
                    {isAr ? "ابدأ الاستكشاف" : "Start Exploring"} <Checkmark size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main Landing Page ─── */
  const isPersonalized = !!profile;
  const greeting = profile
    ? (isAr ? `مرحباً ${profile.name}` : `Welcome back, ${profile.name}`)
    : (isAr ? "مرحباً بك في إثيكا" : "Welcome to Ethika");

  const resolvedAvatarId = profile ? resolveAvatarId(profile.avatar) : "sil_family";
  const avatarChip = avatarChipStyles(resolvedAvatarId);
  const AvatarIconDisplay = profile
    ? AVATAR_OPTIONS.find((a) => a.id === resolvedAvatarId)?.Icon ?? PedestrianFamily
    : PedestrianFamily;

  return (
    <div className="animate-fade-in">
      {/* ──── TOP: Resource Overview Bar (immediately visible) ──── */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 py-5">
          {/* User greeting row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              {profile && (
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${avatarChip.circle}`}
                >
                  <AvatarIconDisplay size={26} className={avatarChip.iconTone} />
                </span>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">{greeting}</h1>
                <p className="text-base text-neutral-500 mt-0.5">
                  {isPersonalized ? t("hero_subtitle_personal") : t("hero_subtitle")}
                </p>
              </div>
            </div>
            {!profile && (
              <button onClick={() => setShowOnboarding(true)}
                className="hidden sm:flex items-center gap-2 bg-ethika-green text-white text-sm font-semibold px-5 py-2.5 rounded-2xl hover:bg-ethika-green-dark transition-all">
                <User size={16} />
                {isAr ? "خصّص تجربتك" : "Personalize"}
              </button>
            )}
          </div>

          {/* Stats counters */}
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {[
              { n: stats.tools, label: t("stat_tools"), color: "bg-emerald-50 text-emerald-700", Icon: Tools },
              { n: stats.cases, label: t("stat_cases"), color: "bg-amber-50 text-amber-700", Icon: Report },
              { n: stats.experts, label: t("stat_experts"), color: "bg-blue-50 text-blue-700", Icon: UserMultiple },
              { n: stats.organizations, label: t("stat_orgs"), color: "bg-purple-50 text-purple-700", Icon: Building },
              { n: stats.activities, label: t("stat_activities"), color: "bg-rose-50 text-rose-700", Icon: Favorite },
            ].map((stat) => (
              <div key={stat.label} className={`text-center p-3 sm:p-4 rounded-2xl ${stat.color}`}>
                <stat.Icon size={20} className="mx-auto mb-1 opacity-60" />
                <div className="text-2xl sm:text-3xl font-bold">{stat.n}</div>
                <div className="text-[10px] sm:text-xs mt-0.5 opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age filter chips (if personalized, show as tags) */}
      {isPersonalized && profile!.childAges.length > 0 && (
        <div className="bg-neutral-50 border-b border-neutral-100">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-semibold text-neutral-500">{isAr ? "مخصص لأعمار:" : "Personalized for ages:"}</span>
            {profile!.childAges.map(age => (
              <span key={age} className="text-xs font-medium px-3 py-1 bg-ethika-green-50 text-ethika-green-dark rounded-full">
                {t(`age_${age}`)}
              </span>
            ))}
            <button onClick={() => setShowOnboarding(true)} className="text-xs text-ethika-green hover:underline ml-auto">
              {isAr ? "تعديل" : "Edit"}
            </button>
          </div>
        </div>
      )}

      {/* ──── GUIDED TOUR: Quick Actions (3 primary paths) ──── */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
            {isAr ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
          </h2>
          <p className="text-base text-neutral-500 mb-6">
            {isAr ? "اختر مسارك — كل مسار يقودك خطوة بخطوة." : "Choose your path — each one guides you step by step."}
          </p>

          {/* Primary 3 paths */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Crisis */}
            <a href={`/${locale}/crisis`}
              className="group relative overflow-hidden rounded-2xl border-2 border-red-100 bg-gradient-to-br from-red-50 to-white p-6 hover:border-red-300 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <WarningFilled size={28} className="text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">{t("card_crisis")}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{t("card_crisis_desc")}</p>
              <div className="mt-4 text-sm font-semibold text-red-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                {isAr ? "ابدأ الآن" : "Get help now"}
                <ArrowRight size={16} className="flip-rtl" />
              </div>
            </a>

            {/* Try AI */}
            <a href={`/${locale}/try-ai`}
              className="group relative overflow-hidden rounded-2xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 hover:border-emerald-300 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <WatsonxAi size={28} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">{t("card_explore")}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{t("card_explore_desc")}</p>
              <div className="mt-4 text-sm font-semibold text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                {isAr ? "جرّب الآن" : "Try it now"}
                <ArrowRight size={16} className="flip-rtl" />
              </div>
            </a>

            {/* Understand Risks */}
            <a href={`/${locale}/risks`}
              className="group relative overflow-hidden rounded-2xl border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-white p-6 hover:border-amber-300 hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                <Idea size={28} className="text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1.5">{t("card_understand")}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{t("card_understand_desc")}</p>
              <div className="mt-4 text-sm font-semibold text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                {isAr ? "تعلّم الآن" : "Learn more"}
                <ArrowRight size={16} className="flip-rtl" />
              </div>
            </a>
          </div>

          {/* Secondary links (compact) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: "read", href: "/read-deeper", Icon: Book, color: "text-blue-600 bg-blue-50" },
              { key: "rights", href: "/rights", Icon: Scales, color: "text-purple-600 bg-purple-50" },
              { key: "hub", href: "/explore", Icon: Search, color: "text-teal-600 bg-teal-50" },
              { key: "from_sek", href: "/from-sek", Icon: Education, color: "text-ethika-green bg-ethika-green-50" },
            ].map((item) => (
              <a key={item.key} href={`/${locale}${item.href}`}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-sm transition-all bg-white`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <item.Icon size={20} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-neutral-800 block">{t(`card_${item.key}`)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ──── PERSONALIZED RECOMMENDATIONS ──── */}
      {isPersonalized && (
        <section className="py-8 sm:py-10 bg-neutral-50 border-t border-neutral-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1">
              {isAr ? "مخصص لك" : "Recommended for you"}
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              {isAr ? "بناءً على إجاباتك وأعمار أطفالك." : "Based on your answers and your children's ages."}
            </p>

            {/* Recommended Tools */}
            {recommendedTools.length > 0 && (
              <div className="mb-8">
                <h3 className="text-base font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <Tools size={20} className="text-emerald-600" />
                  {isAr ? "أدوات مقترحة" : "Suggested Tools"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendedTools.map((tool) => (
                    <div key={tool.id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-md hover:border-ethika-green/40 transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-ethika-green font-bold text-lg">
                          {toolLabel(tool, locale).charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-neutral-900">{toolLabel(tool, locale)}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tool.free ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                              {tool.free ? (isAr ? "مجاني" : "Free") : (isAr ? "مدفوع" : "Paid")}
                            </span>
                            <span className="text-[11px] text-neutral-400">{tool.ageMin}&ndash;{tool.ageMax} {isAr ? "سنة" : "yrs"}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                        {isAr ? tool.description.ar : tool.description.en}
                      </p>
                      {tool.link !== "#" && (
                        <a href={tool.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ethika-green hover:underline">
                          {isAr ? "زيارة" : "Visit"} &rarr;
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Activities */}
            {recommendedActivities.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                  <Favorite size={20} className="text-rose-600" />
                  {isAr ? "أنشطة عائلية مقترحة" : "Suggested Family Activities"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedActivities.map((act) => (
                    <a key={act.id} href={`/${locale}/try-ai`}
                      className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-md hover:border-emerald-200 transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                          {act.ageBand === "3-5"
                            ? (isAr ? "٣–٥ سنوات" : "Ages 3–5")
                            : act.ageBand === "6-9"
                              ? (isAr ? "٦–٩ سنوات" : "Ages 6–9")
                              : act.ageBand === "10-13"
                                ? (isAr ? "١٠–١٣ سنة" : "Ages 10–13")
                                : (isAr ? "١٤–١٦ سنة" : "Ages 14–16")}
                        </span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                          {act.durationMinutes} {isAr ? "دقيقة" : "min"}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-neutral-900 mb-1.5">{isAr ? act.title.ar : act.title.en}</h4>
                      <p className="text-sm text-neutral-500 italic">
                        &ldquo;{isAr ? act.openingPrompt.ar.slice(0, 80) : act.openingPrompt.en.slice(0, 80)}&hellip;&rdquo;
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Concern-based links */}
            {profile!.concerns.length > 0 && (
              <div className="mt-8 bg-amber-50 rounded-2xl p-5 border border-amber-100">
                <h3 className="text-base font-semibold text-amber-800 mb-2 flex items-center gap-2">
                  <CheckmarkFilled size={20} />
                  {isAr ? "بناءً على مخاوفك" : "Based on your concerns"}
                </h3>
                <p className="text-sm text-amber-700 mb-3">
                  {isAr ? "اخترت هذه المواضيع كمخاوف — إليك مواردنا المخصصة:" : "You identified these as concerns — here are our focused resources:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile!.concerns.includes("deepfakes") && (
                    <a href={`/${locale}/risks`} className="text-sm font-medium px-4 py-2 bg-white rounded-xl text-amber-800 border border-amber-200 hover:border-amber-300 transition-all">
                      {isAr ? "التزييف العميق" : "Deepfakes & Fake Images"} &rarr;
                    </a>
                  )}
                  {profile!.concerns.includes("online_safety") && (
                    <a href={`/${locale}/crisis`} className="text-sm font-medium px-4 py-2 bg-white rounded-xl text-amber-800 border border-amber-200 hover:border-amber-300 transition-all">
                      {isAr ? "السلامة على الإنترنت" : "Online Safety Guide"} &rarr;
                    </a>
                  )}
                  {profile!.concerns.includes("privacy") && (
                    <a href={`/${locale}/rights`} className="text-sm font-medium px-4 py-2 bg-white rounded-xl text-amber-800 border border-amber-200 hover:border-amber-300 transition-all">
                      {isAr ? "الخصوصية وحماية البيانات" : "Privacy & Data Protection"} &rarr;
                    </a>
                  )}
                  {profile!.concerns.includes("chatbots") && (
                    <a href={`/${locale}/risks`} className="text-sm font-medium px-4 py-2 bg-white rounded-xl text-amber-800 border border-amber-200 hover:border-amber-300 transition-all">
                      {isAr ? "التعلق بالروبوتات" : "Chatbot Attachment"} &rarr;
                    </a>
                  )}
                  {profile!.concerns.includes("cyberbullying") && (
                    <a href={`/${locale}/crisis`} className="text-sm font-medium px-4 py-2 bg-white rounded-xl text-amber-800 border border-amber-200 hover:border-amber-300 transition-all">
                      {isAr ? "التنمر الإلكتروني" : "Cyberbullying"} &rarr;
                    </a>
                  )}
                  {profile!.concerns.includes("screen_time") && (
                    <a href={`/${locale}/try-ai`} className="text-sm font-medium px-4 py-2 bg-white rounded-xl text-amber-800 border border-amber-200 hover:border-amber-300 transition-all">
                      {isAr ? "وقت الشاشة" : "Screen Time Balance"} &rarr;
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ──── FOR ANONYMOUS USERS: Generic overview ──── */}
      {!isPersonalized && (
        <section className="py-8 sm:py-10 bg-neutral-50 border-t border-neutral-100">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-xl font-bold text-neutral-900 mb-2">
              {isAr ? "خصّص تجربتك" : "Personalize your experience"}
            </h2>
            <p className="text-base text-neutral-500 mb-5 max-w-lg mx-auto">
              {isAr ? "أجب على بضعة أسئلة سريعة وسنعرض لك أدوات وأنشطة ومصادر مخصصة لعائلتك." : "Answer a few quick questions and we'll show you tools, activities, and resources tailored to your family."}
            </p>
            <button onClick={() => setShowOnboarding(true)}
              className="bg-ethika-green text-white font-semibold px-8 py-3.5 rounded-2xl text-base hover:bg-ethika-green-dark transition-all">
              {isAr ? "ابدأ الاستبيان" : "Start the questionnaire"} &rarr;
            </button>
          </div>
        </section>
      )}

      {/* ──── From Ethika + What's New ──── */}
      <section className="py-8 sm:py-10 bg-white border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-ethika-green-50 text-ethika-green">
                  {isAr ? "إثيكا تقول" : "Ethika says"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{t("from_sek_position")}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-3 line-clamp-3">{t("from_sek_position_text")}</p>
              <p className="text-xs text-neutral-400">{t("from_sek_signer")}</p>
              <a href={`/${locale}/from-sek`}
                className="inline-flex items-center gap-1 text-sm text-ethika-green font-semibold mt-4 hover:underline">
                {isAr ? "اقرأ المزيد" : "Read more"} &rarr;
              </a>
            </div>

            <div className="bg-neutral-50 rounded-2xl border border-neutral-200 p-6">
              <h3 className="text-lg font-bold text-neutral-900 mb-3 flex items-center gap-2">
                <Blog size={20} className="text-amber-500" />
                {t("whats_new")}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-2 h-2 bg-ethika-green rounded-full mt-1.5 shrink-0"></span>
                  {t("whats_new_item1")}
                </li>
                <li className="flex items-start gap-2 text-sm text-neutral-600">
                  <span className="w-2 h-2 bg-ethika-green rounded-full mt-1.5 shrink-0"></span>
                  {t("whats_new_item2")}
                </li>
              </ul>
              <a href={`/${locale}/explore`}
                className="inline-flex items-center gap-1 text-sm text-ethika-green font-semibold mt-4 hover:underline">
                {t("explore_all")} &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
