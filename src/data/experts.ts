import { KNOWLEDGE_HUB_EXTRA_ORGANIZATIONS } from "./knowledgeHubExtras";

export type Expert = {
  id: string;
  name: string;
  affiliation: string;
  focusArea: "digital-parenting" | "ai-literacy" | "child-development" | "ai-ethics" | "youth-mental-health" | "child-rights";
  whyRecommended: { en: string; ar: string };
  link: string;
  hasLink: boolean;
};

export const EXPERTS: Expert[] = [
  {
    id: "heitner",
    name: "Devorah Heitner",
    affiliation: "Author, 'Growing Up in Public'",
    focusArea: "digital-parenting",
    whyRecommended: {
      en: "The leading voice on how children navigate digital identity. Essential for parents of tweens and teens.",
      ar: "الصوت الرائد في كيفية تعامل الأطفال مع الهوية الرقمية. ضروري لآباء المراهقين."
    },
    link: "https://devorahheitner.com",
    hasLink: true
  },
  {
    id: "haidt",
    name: "Jonathan Haidt",
    affiliation: "NYU Stern, Author of 'The Anxious Generation'",
    focusArea: "youth-mental-health",
    whyRecommended: {
      en: "His research on social media and youth mental health is rigorous and urgent. Start with 'The Anxious Generation.'",
      ar: "أبحاثه عن وسائل التواصل الاجتماعي وصحة الشباب النفسية دقيقة وعاجلة. ابدأ بكتاب 'الجيل القلق'."
    },
    link: "https://jonathanhaidt.com",
    hasLink: true
  },
  {
    id: "twenge",
    name: "Jean M. Twenge",
    affiliation: "San Diego State University",
    focusArea: "youth-mental-health",
    whyRecommended: {
      en: "Her data on generational shifts in technology use is unmatched. 'iGen' is a must-read.",
      ar: "بياناتها عن التحولات الجيلية في استخدام التكنولوجيا لا مثيل لها. كتاب 'آي جين' قراءة ضرورية."
    },
    link: "https://www.jeantwenge.com",
    hasLink: true
  },
  {
    id: "mollick",
    name: "Ethan Mollick",
    affiliation: "Wharton, Author of 'Co-Intelligence'",
    focusArea: "ai-literacy",
    whyRecommended: {
      en: "The most balanced, practical guide to working with AI. He shows the possibilities without ignoring the risks.",
      ar: "الدليل الأكثر توازناً وعملية للعمل مع الذكاء الاصطناعي. يظهر الإمكانيات دون تجاهل المخاطر."
    },
    link: "https://www.oneusefulthing.org",
    hasLink: true
  },
  {
    id: "breazeal",
    name: "Cynthia Breazeal",
    affiliation: "MIT Media Lab",
    focusArea: "child-development",
    whyRecommended: {
      en: "Pioneer in social robotics and AI for children. Her work on how children form relationships with AI is foundational.",
      ar: "رائدة في الروبوتات الاجتماعية والذكاء الاصطناعي للأطفال. عملها في كيفية تكوين الأطفال علاقات مع الذكاء الاصطناعي أساسي."
    },
    link: "https://www.media.mit.edu/people/cynthiab/",
    hasLink: true
  },
  {
    id: "linn",
    name: "Susan Linn",
    affiliation: "Boston University, Campaign for a Commercial-Free Childhood",
    focusArea: "child-rights",
    whyRecommended: {
      en: "Decades of advocacy for children's right to play and develop without commercial exploitation.",
      ar: "عقود من الدفاع عن حق الأطفال في اللعب والنمو دون استغلال تجاري."
    },
    link: "#",
    hasLink: false
  },
  {
    id: "grover",
    name: "Shuchi Grover",
    affiliation: "Looking Glass Ventures",
    focusArea: "ai-literacy",
    whyRecommended: {
      en: "Leading researcher on how to teach computational thinking and AI literacy to young learners.",
      ar: "باحثة رائدة في كيفية تعليم التفكير الحسابي ومحو أمية الذكاء الاصطناعي للمتعلمين الصغار."
    },
    link: "#",
    hasLink: false
  },
  {
    id: "yip",
    name: "Jason C. Yip",
    affiliation: "University of Washington",
    focusArea: "child-development",
    whyRecommended: {
      en: "His participatory design research with children shapes how we build technology for kids.",
      ar: "أبحاثه في التصميم التشاركي مع الأطفال تشكل كيف نبني التكنولوجيا للأطفال."
    },
    link: "#",
    hasLink: false
  },
  {
    id: "steiner-adair",
    name: "Catherine Steiner-Adair",
    affiliation: "Author, 'The Big Disconnect'",
    focusArea: "digital-parenting",
    whyRecommended: {
      en: "A clinical psychologist who bridges the gap between tech and family relationships.",
      ar: "عالمة نفس سريرية تربط بين التكنولوجيا والعلاقات الأسرية."
    },
    link: "#",
    hasLink: false
  },
  {
    id: "milovidov",
    name: "Elizabeth Milovidov",
    affiliation: "Council of Europe Digital Citizenship Expert",
    focusArea: "child-rights",
    whyRecommended: {
      en: "International expert on children's rights in the digital age with a focus on European and international frameworks.",
      ar: "خبيرة دولية في حقوق الأطفال في العصر الرقمي مع تركيز على الأطر الأوروبية والدولية."
    },
    link: "#",
    hasLink: false
  },
];

export type Organization = {
  id: string;
  name: { en: string; ar: string };
  focusArea: string;
  focus: { en: string; ar: string };
  link: string;
  hasLink: boolean;
  region: "international" | "saudi" | "academic";
  /** When set, card appears only in these locales (e.g. Arabic-source policy links). */
  locales?: ("en" | "ar")[];
};

/** Display name for Organizations tab cards. */
export function organizationLabel(org: Organization, locale: string): string {
  return locale === "ar" ? org.name.ar : org.name.en;
}

/** Hub / stats: hide org rows that are not meant for the active locale. */
export function organizationMatchesLocale(org: Organization, locale: string): boolean {
  if (!org.locales?.length) return true;
  const key = locale === "ar" ? "ar" : "en";
  return org.locales.includes(key);
}

export const ORGANIZATIONS: Organization[] = [
  { id: "unicef", name: { en: "UNICEF Policy Guidance on AI for Children", ar: "اليونيسف — إرشادات سياسات الذكاء الاصطناعي والأطفال" }, focusArea: "ai-ethics", focus: { en: "Child rights framework for AI policy", ar: "إطار حقوق الطفل لسياسة الذكاء الاصطناعي" }, link: "https://www.unicef.org/globalinsight/featured-projects/ai-children", hasLink: true, region: "international" },
  { id: "common-sense", name: { en: "Common Sense Media", ar: "كومن سينس ميديا" }, focusArea: "digital-parenting", focus: { en: "Age-based media reviews and digital citizenship", ar: "مراجعات الوسائط حسب العمر والمواطنة الرقمية" }, link: "https://www.commonsensemedia.org", hasLink: true, region: "international" },
  { id: "mit-raise", name: { en: "MIT RAISE", ar: "مشروع MIT RAISE" }, focusArea: "ai-literacy", focus: { en: "AI literacy education and Day of AI initiative", ar: "تعليم محو أمية الذكاء الاصطناعي ومبادرة يوم الذكاء الاصطناعي" }, link: "https://raise.mit.edu", hasLink: true, region: "academic" },
  { id: "ai-pedagogy", name: { en: "AI Pedagogy Project (Harvard metaLAB)", ar: "مشروع أصول تدريس الذكاء الاصطناعي (هارفارد)" }, focusArea: "ai-literacy", focus: { en: "Teaching strategies for AI in education", ar: "استراتيجيات التدريس للذكاء الاصطناعي في التعليم" }, link: "https://aipedagogy.org", hasLink: true, region: "academic" },
  { id: "craft", name: { en: "CRAFT AI Literacy (Stanford)", ar: "CRAFT لمحو أمية الذكاء الاصطناعي (ستانفورد)" }, focusArea: "ai-literacy", focus: { en: "Research-based AI literacy curriculum", ar: "منهج محو أمية الذكاء الاصطناعي القائم على البحث" }, link: "#", hasLink: false, region: "academic" },
  { id: "day-of-ai-org", name: { en: "Day of AI (MIT)", ar: "يوم الذكاء الاصطناعي (MIT)" }, focusArea: "ai-literacy", focus: { en: "Free AI curriculum for K-12 students", ar: "منهج مجاني للذكاء الاصطناعي لطلاب المدارس" }, link: "https://dayofai.org", hasLink: true, region: "academic" },
  { id: "app-inventor-org", name: { en: "MIT App Inventor", ar: "MIT App Inventor" }, focusArea: "ai-literacy", focus: { en: "Block-based programming with AI integration", ar: "برمجة بالكتل مع دمج الذكاء الاصطناعي" }, link: "https://appinventor.mit.edu", hasLink: true, region: "academic" },
  { id: "ai4k12", name: { en: "AI4K12", ar: "AI4K12 — إرشادات تعليم الذكاء الاصطناعي" }, focusArea: "ai-literacy", focus: { en: "National guidelines for AI education", ar: "إرشادات وطنية لتعليم الذكاء الاصطناعي" }, link: "https://ai4k12.org", hasLink: true, region: "academic" },
  { id: "stanford-al", name: { en: "Stanford Accelerator for Learning", ar: "مسرّع ستانفورد للتعلّم" }, focusArea: "ai-literacy", focus: { en: "Research on AI and human learning", ar: "أبحاث عن الذكاء الاصطناعي والتعلم البشري" }, link: "#", hasLink: false, region: "academic" },
  { id: "experiential-ai", name: { en: "Institute for Experiential AI (Northeastern)", ar: "معهد الذكاء الاصطناعي التجريبي (نورث إيسترن)" }, focusArea: "ai-ethics", focus: { en: "Responsible AI research and policy", ar: "أبحاث وسياسات الذكاء الاصطناعي المسؤول" }, link: "#", hasLink: false, region: "academic" },
  { id: "sdaia-youth", name: { en: "SDAIA Youth Programs", ar: "برامج سدايا للشباب" }, focusArea: "ai-literacy", focus: { en: "Saudi national AI development programs for youth", ar: "برامج سدايا الوطنية لتطوير الذكاء الاصطناعي للشباب" }, link: "https://sdaia.gov.sa", hasLink: true, region: "saudi" },
  { id: "tuwaiq", name: { en: "Tuwaiq Academy", ar: "أكاديمية طويق" }, focusArea: "ai-literacy", focus: { en: "Tech bootcamps and training for Saudi youth", ar: "معسكرات تدريب تقنية للشباب السعودي" }, link: "https://tuwaiq.edu.sa", hasLink: true, region: "saudi" },
  { id: "allam", name: { en: "ALLaM (Saudi LLM)", ar: "علّام — النموذج اللغوي السعودي" }, focusArea: "ai-literacy", focus: { en: "Saudi Arabia's Arabic-first large language model", ar: "نموذج اللغة الكبير السعودي بالعربية أولاً" }, link: "#", hasLink: false, region: "saudi" },
  { id: "humain", name: { en: "HUMAIN", ar: "هيومين" }, focusArea: "ai-ethics", focus: { en: "Saudi company advancing AI and data infrastructure", ar: "شركة سعودية تطور البنية التحتية للذكاء الاصطناعي والبيانات" }, link: "#", hasLink: false, region: "saudi" },
  ...(KNOWLEDGE_HUB_EXTRA_ORGANIZATIONS as Organization[]),
];

export const FOCUS_AREAS = {
  "digital-parenting": { en: "Digital Parenting", ar: "الأبوة الرقمية" },
  "ai-literacy": { en: "AI Literacy", ar: "محو أمية الذكاء الاصطناعي" },
  "child-development": { en: "Child Development", ar: "نمو الطفل" },
  "ai-ethics": { en: "AI Ethics", ar: "أخلاقيات الذكاء الاصطناعي" },
  "youth-mental-health": { en: "Youth Mental Health", ar: "صحة الشباب النفسية" },
  "child-rights": { en: "Children's Rights", ar: "حقوق الأطفال" },
} as const;
