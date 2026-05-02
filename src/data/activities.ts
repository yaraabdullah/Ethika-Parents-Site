import { KNOWLEDGE_HUB_EXTRA_ACTIVITIES } from "./knowledgeHubExtras";

export type Activity = {
  id: string;
  title: { en: string; ar: string };
  ageBand: "3-5" | "6-9" | "10-13" | "14-16";
  durationMinutes: number;
  toolsNeeded: { en: string; ar: string };
  openingPrompt: { en: string; ar: string };
  whatToNotice: { en: string; ar: string };
  followUp: { en: string; ar: string };
  category: "hands-on" | "discussion" | "investigation";
  tags: string[];
  /** Optional official slides, PDF, or article linked from curated markdown sources */
  resourceUrl?: string;
};

export const ACTIVITIES: Activity[] = [
  {
    id: "draw-sort-ai",
    title: { en: "Draw and Sort with AI", ar: "ارسم وصنّف مع الذكاء الاصطناعي" },
    ageBand: "6-9",
    durationMinutes: 20,
    toolsNeeded: { en: "A computer or tablet, Google Quick Draw!", ar: "حاسوب أو جهاز لوحي، Google Quick, Draw!" },
    openingPrompt: {
      en: "Let's play a game where you draw something and a computer tries to guess what it is! Do you think a computer can guess better than me?",
      ar: "هيا نلعب لعبة ترسم فيها شيئاً والحاسوب يحاول تخمينه! هل تظن أن الحاسوب يخمّن أفضل مني؟"
    },
    whatToNotice: {
      en: "Watch how your child reacts when the AI guesses right vs wrong. Notice if they start drawing differently to 'help' the AI.",
      ar: "راقب ردة فعل طفلك عندما يخمّن الذكاء الاصطناعي بشكل صحيح أو خاطئ. لاحظ إذا بدأ يرسم بشكل مختلف 'لمساعدة' الذكاء الاصطناعي."
    },
    followUp: {
      en: "Ask: 'How do you think the computer knew what you were drawing? Can it think like you?' This opens a conversation about pattern recognition vs understanding.",
      ar: "اسأل: 'كيف تظن أن الحاسوب عرف ما كنت ترسمه؟ هل يستطيع التفكير مثلك؟' هذا يفتح حواراً عن التعرف على الأنماط مقابل الفهم."
    },
    category: "hands-on",
    tags: ["drawing", "pattern-recognition", "beginner"]
  },
  {
    id: "teach-machine-see",
    title: { en: "Teach a Machine to See", ar: "علّم الآلة أن ترى" },
    ageBand: "6-9",
    durationMinutes: 30,
    toolsNeeded: { en: "A computer with webcam, Google Teachable Machine", ar: "حاسوب بكاميرا، Google Teachable Machine" },
    openingPrompt: {
      en: "Today you're going to be the teacher! You'll teach a computer to recognize things — like whether you're smiling or frowning.",
      ar: "اليوم ستكون أنت المعلم! ستعلّم الحاسوب التعرف على الأشياء — مثل هل أنت تبتسم أو عابس."
    },
    whatToNotice: {
      en: "Does your child understand they're providing examples? Do they try creative combinations?",
      ar: "هل يفهم طفلك أنه يقدم أمثلة؟ هل يحاول تركيبات إبداعية؟"
    },
    followUp: {
      en: "Ask: 'What happened when you only showed a few examples? What if you showed many? This is how AI learns — from lots of examples.'",
      ar: "اسأل: 'ماذا حدث عندما أريته أمثلة قليلة فقط؟ ماذا لو أريته الكثير؟ هكذا يتعلم الذكاء الاصطناعي — من أمثلة كثيرة.'"
    },
    category: "hands-on",
    tags: ["machine-learning", "webcam", "training-data"]
  },
  {
    id: "spot-ai-art",
    title: { en: "Spot the AI Art", ar: "اكتشف فن الذكاء الاصطناعي" },
    ageBand: "6-9",
    durationMinutes: 15,
    toolsNeeded: { en: "Printed or screen images — mix of AI-generated and real photos", ar: "صور مطبوعة أو على الشاشة — مزيج من صور مولدة بالذكاء الاصطناعي وصور حقيقية" },
    openingPrompt: {
      en: "Some of these pictures were made by a computer and some were taken by a real photographer. Can you guess which is which?",
      ar: "بعض هذه الصور صنعها حاسوب وبعضها التقطها مصور حقيقي. هل تستطيع تخمين أيهما أيهما؟"
    },
    whatToNotice: {
      en: "What details does your child focus on? Do they develop strategies for telling the difference?",
      ar: "ما التفاصيل التي يركز عليها طفلك؟ هل يطور استراتيجيات للتمييز بينها؟"
    },
    followUp: {
      en: "Talk about how AI can make fake things that look real. Keep it light: 'That's why we always check if something is real before we share it.'",
      ar: "تحدث عن كيف يمكن للذكاء الاصطناعي صنع أشياء مزيفة تبدو حقيقية. اجعلها خفيفة: 'لهذا نتأكد دائماً إذا كان شيء حقيقياً قبل مشاركته.'"
    },
    category: "discussion",
    tags: ["media-literacy", "deepfakes-intro", "critical-thinking"]
  },
  {
    id: "fact-check-ai",
    title: { en: "Fact-Check the AI", ar: "تحقق من حقائق الذكاء الاصطناعي" },
    ageBand: "10-13",
    durationMinutes: 30,
    toolsNeeded: { en: "Access to ChatGPT or similar (parent-supervised), a search engine", ar: "وصول إلى ChatGPT أو مشابه (بإشراف الوالدين)، محرك بحث" },
    openingPrompt: {
      en: "Let's ask the AI some questions you already know the answers to — and some you don't. Then let's check if it got them right.",
      ar: "هيا نسأل الذكاء الاصطناعي أسئلة تعرف أنت إجاباتها — وبعضاً لا تعرفه. ثم لنتحقق هل أجاب بشكل صحيح."
    },
    whatToNotice: {
      en: "Does your child trust the AI answers automatically? Do they learn to verify?",
      ar: "هل يثق طفلك بإجابات الذكاء الاصطناعي تلقائياً؟ هل يتعلم التحقق؟"
    },
    followUp: {
      en: "Discuss: 'The AI was confident even when wrong. What does that teach us about trusting AI — or anything online?'",
      ar: "ناقش: 'كان الذكاء الاصطناعي واثقاً حتى عندما أخطأ. ماذا يعلمنا هذا عن الثقة بالذكاء الاصطناعي — أو أي شيء على الإنترنت؟'"
    },
    category: "investigation",
    tags: ["critical-thinking", "hallucination", "fact-checking"]
  },
  {
    id: "ai-bias-detector",
    title: { en: "Build an AI Bias Detector", ar: "ابنِ كاشف تحيز الذكاء الاصطناعي" },
    ageBand: "10-13",
    durationMinutes: 30,
    toolsNeeded: { en: "A notebook, access to an image generation AI (parent-supervised)", ar: "دفتر ملاحظات، وصول إلى ذكاء اصطناعي لتوليد الصور (بإشراف الوالدين)" },
    openingPrompt: {
      en: "Let's ask the AI to draw different types of people — a doctor, a nurse, a CEO, a teacher. Let's see what it assumes.",
      ar: "هيا نطلب من الذكاء الاصطناعي رسم أنواع مختلفة من الناس — طبيب، ممرضة، مدير تنفيذي، معلم. لنرى ماذا يفترض."
    },
    whatToNotice: {
      en: "Does the AI default to certain genders, races, or ages for certain professions? Does your child notice?",
      ar: "هل يفترض الذكاء الاصطناعي جنساً أو عرقاً أو عمراً معيناً لمهن معينة؟ هل يلاحظ طفلك؟"
    },
    followUp: {
      en: "Talk about where bias comes from: 'AI learns from data made by humans. If the data has bias, the AI has bias too.'",
      ar: "تحدث عن مصدر التحيز: 'الذكاء الاصطناعي يتعلم من بيانات صنعها البشر. إذا كانت البيانات متحيزة، يكون الذكاء الاصطناعي متحيزاً أيضاً.'"
    },
    category: "investigation",
    tags: ["bias", "fairness", "image-generation"]
  },
  {
    id: "ai-privacy-audit",
    title: { en: "AI Privacy Audit", ar: "تدقيق خصوصية الذكاء الاصطناعي" },
    ageBand: "10-13",
    durationMinutes: 25,
    toolsNeeded: { en: "Your child's phone or tablet (with their permission)", ar: "هاتف أو جهاز طفلك اللوحي (بإذنه)" },
    openingPrompt: {
      en: "Let's look at what apps on your phone use AI and what data they collect. We'll check the privacy settings together.",
      ar: "هيا ننظر أي تطبيقات على هاتفك تستخدم الذكاء الاصطناعي وما البيانات التي تجمعها. سنفحص إعدادات الخصوصية معاً."
    },
    whatToNotice: {
      en: "Is your child surprised by what data apps collect? Do they understand what 'permissions' mean?",
      ar: "هل يتفاجأ طفلك مما تجمعه التطبيقات؟ هل يفهم ماذا تعني 'الأذونات'؟"
    },
    followUp: {
      en: "Together, decide which permissions to revoke. Explain: 'You have the right to say no to data collection — Saudi law supports this.'",
      ar: "معاً، قرروا أي أذونات تسحبونها. اشرح: 'لك الحق في رفض جمع البيانات — القانون السعودي يدعم هذا.'"
    },
    category: "investigation",
    tags: ["privacy", "permissions", "pdpl", "saudi-law"]
  },
  ...(KNOWLEDGE_HUB_EXTRA_ACTIVITIES as Activity[]),
];

export const ACTIVITY_CATEGORIES = {
  "hands-on": { en: "Hands-On", ar: "تطبيقي" },
  "discussion": { en: "Discussion", ar: "نقاش" },
  "investigation": { en: "Investigation", ar: "تحقيق" },
} as const;
