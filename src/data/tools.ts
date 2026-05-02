import { KNOWLEDGE_HUB_EXTRA_TOOLS } from "./knowledgeHubExtras";

export type Tool = {
  id: string;
  name: string;
  category: "creation" | "learning" | "coding" | "safety" | "general";
  ageMin: number;
  ageMax: number;
  free: boolean;
  ksaAvailable: boolean;
  arabicSupport: boolean;
  privacyLevel: "high" | "medium" | "low"; // high = no data collected, medium = some data, low = extensive data
  privacyNote: { en: string; ar: string };
  description: { en: string; ar: string };
  link: string;
  tags: string[];
};

export const TOOLS: Tool[] = [
  {
    id: "scratch",
    name: "Scratch",
    category: "coding",
    ageMin: 6,
    ageMax: 13,
    free: true,
    ksaAvailable: true,
    arabicSupport: false,
    privacyLevel: "high",
    privacyNote: {
      en: "No account needed for basic use. MIT project — no ads, no tracking.",
      ar: "لا حاجة لحساب للاستخدام الأساسي. مشروع MIT — بدون إعلانات أو تتبع."
    },
    description: {
      en: "Block-based visual programming platform by MIT. Children create interactive stories, games, and animations while learning computational thinking.",
      ar: "منصة برمجة مرئية بالكتل من MIT. يصنع الأطفال قصصاً وألعاباً تفاعلية ورسوماً متحركة أثناء تعلم التفكير الحسابي."
    },
    link: "https://scratch.mit.edu",
    tags: ["programming", "creativity", "mit", "no-account"]
  },
  {
    id: "quick-draw",
    name: "Google Quick, Draw!",
    category: "learning",
    ageMin: 5,
    ageMax: 10,
    free: true,
    ksaAvailable: true,
    arabicSupport: false,
    privacyLevel: "medium",
    privacyNote: {
      en: "No account required. Google collects drawings anonymously for ML training.",
      ar: "لا يتطلب حساباً. جوجل يجمع الرسومات بشكل مجهول لتدريب التعلم الآلي."
    },
    description: {
      en: "A game where you draw and a neural network tries to guess what you're drawing. Great introduction to how AI recognizes patterns.",
      ar: "لعبة ترسم فيها وشبكة عصبية تحاول تخمين ما ترسمه. مقدمة رائعة لكيفية تعرف الذكاء الاصطناعي على الأنماط."
    },
    link: "https://quickdraw.withgoogle.com",
    tags: ["drawing", "pattern-recognition", "game", "no-account"]
  },
  {
    id: "teachable-machine",
    name: "Teachable Machine",
    category: "learning",
    ageMin: 6,
    ageMax: 16,
    free: true,
    ksaAvailable: true,
    arabicSupport: false,
    privacyLevel: "high",
    privacyNote: {
      en: "No account needed. All processing happens in the browser — no data uploaded.",
      ar: "لا حاجة لحساب. كل المعالجة تتم في المتصفح — لا يتم رفع بيانات."
    },
    description: {
      en: "Train your own machine learning model right in the browser. Teach it to recognize images, sounds, or poses — no coding required.",
      ar: "درّب نموذج تعلم آلي خاص بك في المتصفح مباشرة. علّمه التعرف على الصور أو الأصوات أو الأوضاع — بدون برمجة."
    },
    link: "https://teachablemachine.withgoogle.com",
    tags: ["machine-learning", "hands-on", "browser-based", "no-account"]
  },
  {
    id: "khanmigo",
    name: "Khanmigo (Khan Academy)",
    category: "learning",
    ageMin: 10,
    ageMax: 16,
    free: false,
    ksaAvailable: true,
    arabicSupport: false,
    privacyLevel: "medium",
    privacyNote: {
      en: "Requires parent-managed account. Khan Academy is a nonprofit. Student data is protected under COPPA.",
      ar: "يتطلب حساباً يديره الوالدان. خان أكاديمي منظمة غير ربحية. بيانات الطلاب محمية بموجب COPPA."
    },
    description: {
      en: "AI-powered tutor by Khan Academy that guides students through math, science, and writing with Socratic questioning rather than giving answers.",
      ar: "مدرس مدعوم بالذكاء الاصطناعي من أكاديمية خان يوجه الطلاب في الرياضيات والعلوم والكتابة بأسئلة سقراطية بدلاً من إعطاء الإجابات."
    },
    link: "https://www.khanmigo.ai",
    tags: ["tutoring", "math", "science", "nonprofit"]
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    category: "general",
    ageMin: 13,
    ageMax: 16,
    free: true,
    ksaAvailable: true,
    arabicSupport: true,
    privacyLevel: "low",
    privacyNote: {
      en: "Requires account. OpenAI stores conversations. 13+ Terms of Service. Family link available.",
      ar: "يتطلب حساباً. OpenAI تخزن المحادثات. شروط الخدمة 13+. رابط عائلي متاح."
    },
    description: {
      en: "General-purpose AI chatbot. Powerful but requires supervision. Best used as a fact-checking exercise with your teen, not as an unsupervised tool.",
      ar: "روبوت محادثة ذكاء اصطناعي متعدد الأغراض. قوي لكنه يتطلب إشرافاً. الأفضل استخدامه كتمرين للتحقق من الحقائق مع المراهق، وليس كأداة بدون إشراف."
    },
    link: "https://chat.openai.com",
    tags: ["chatbot", "general-purpose", "needs-supervision"]
  },
  {
    id: "app-inventor",
    name: "MIT App Inventor",
    category: "coding",
    ageMin: 10,
    ageMax: 16,
    free: true,
    ksaAvailable: true,
    arabicSupport: false,
    privacyLevel: "medium",
    privacyNote: {
      en: "Google account required. MIT project — educational use, no ads.",
      ar: "يتطلب حساب جوجل. مشروع MIT — للاستخدام التعليمي، بدون إعلانات."
    },
    description: {
      en: "Build real Android apps with block-based programming. Includes AI components like image recognition and speech-to-text.",
      ar: "ابنِ تطبيقات أندرويد حقيقية بالبرمجة بالكتل. يتضمن مكونات ذكاء اصطناعي مثل التعرف على الصور وتحويل الكلام لنص."
    },
    link: "https://appinventor.mit.edu",
    tags: ["app-building", "programming", "mit", "android"]
  },
  {
    id: "day-of-ai",
    name: "Day of AI (MIT)",
    category: "learning",
    ageMin: 6,
    ageMax: 16,
    free: true,
    ksaAvailable: true,
    arabicSupport: false,
    privacyLevel: "high",
    privacyNote: {
      en: "No account needed. MIT RAISE project — no data collection.",
      ar: "لا حاجة لحساب. مشروع MIT RAISE — بدون جمع بيانات."
    },
    description: {
      en: "Free AI literacy curriculum with grade-specific lesson plans. Teaches what AI is, how it works, and ethical considerations through hands-on activities.",
      ar: "منهج مجاني لمحو أمية الذكاء الاصطناعي مع خطط دروس لكل مرحلة. يعلم ما هو الذكاء الاصطناعي وكيف يعمل والاعتبارات الأخلاقية من خلال أنشطة تطبيقية."
    },
    link: "https://dayofai.org",
    tags: ["curriculum", "literacy", "mit", "no-account"]
  },
  ...(KNOWLEDGE_HUB_EXTRA_TOOLS as Tool[]),
];

export const TOOL_CATEGORIES = {
  creation: { en: "Creative Tools", ar: "أدوات إبداعية" },
  learning: { en: "Learning & Literacy", ar: "التعلم ومحو الأمية" },
  coding: { en: "Coding & Building", ar: "البرمجة والبناء" },
  safety: { en: "Safety & Monitoring", ar: "السلامة والمراقبة" },
  general: { en: "General Purpose", ar: "متعدد الأغراض" },
} as const;

export const PRIVACY_LEVELS = {
  high: { en: "Strong Privacy", ar: "خصوصية قوية", color: "green" },
  medium: { en: "Moderate Privacy", ar: "خصوصية متوسطة", color: "amber" },
  low: { en: "Review Carefully", ar: "راجع بعناية", color: "red" },
} as const;
