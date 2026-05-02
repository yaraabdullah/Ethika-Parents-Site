export type CaseStudy = {
  id: string;
  riskType: "deepfake" | "voice-cloning" | "bullying" | "chatbot-attachment" | "inappropriate-content" | "data-privacy";
  title: { en: string; ar: string };
  summary: { en: string; ar: string };
  source: string;
  sourceUrl: string;
  year: number;
  sensitivity: "high" | "medium" | "low";
  ageRelevance: string[];
  tags: string[];
};

export const CASES: CaseStudy[] = [
  {
    id: "spain-school-deepfakes",
    riskType: "deepfake",
    title: {
      en: "AI Deepfakes of Teenage Girls Shared in School Groups (Spain)",
      ar: "صور مزيفة بالذكاء الاصطناعي لفتيات مراهقات تُشارك في مجموعات مدرسية (إسبانيا)"
    },
    summary: {
      en: "In September 2023, mothers in Almendralejo, Spain discovered AI-generated fake images of their teenage daughters being circulated in school group chats. The images were created from normal social media photos using freely available AI tools. Over 20 girls aged 11–17 were affected. Spanish police investigated under child exploitation laws.",
      ar: "في سبتمبر 2023، اكتشفت أمهات في ألمندراليخو، إسبانيا صوراً مزيفة مولدة بالذكاء الاصطناعي لبناتهن المراهقات يتم تداولها في مجموعات الدردشة المدرسية. الصور أُنشئت من صور وسائل تواصل اجتماعي عادية باستخدام أدوات ذكاء اصطناعي متاحة مجاناً. تأثرت أكثر من 20 فتاة بأعمار 11-17. حققت الشرطة الإسبانية بموجب قوانين استغلال الأطفال."
    },
    source: "El País / Reuters",
    sourceUrl: "https://www.reuters.com/technology/spain-school-deepfakes-2023-09-22/",
    year: 2023,
    sensitivity: "high",
    ageRelevance: ["10-13", "14-16"],
    tags: ["deepfake", "school", "minors", "image-generation"]
  },
  {
    id: "arizona-voice-kidnapping",
    riskType: "voice-cloning",
    title: {
      en: "Mother Receives Fake Kidnapping Call Using AI-Cloned Voice",
      ar: "أم تتلقى مكالمة اختطاف وهمية باستخدام صوت مستنسخ بالذكاء الاصطناعي"
    },
    summary: {
      en: "In April 2023, Jennifer DeStefano of Arizona received a phone call from what sounded exactly like her 15-year-old daughter crying, saying she'd been kidnapped. Scammers demanded $1 million ransom, reduced to $50,000. The voice was an AI clone created from public social media videos. Her daughter was safe the entire time.",
      ar: "في أبريل 2023، تلقت جينيفر ديستيفانو من أريزونا مكالمة هاتفية بصوت يشبه تماماً صوت ابنتها البالغة 15 عاماً وهي تبكي قائلة إنها اختُطفت. طالب المحتالون بفدية مليون دولار، خُفضت إلى 50 ألف. الصوت كان مستنسخاً بالذكاء الاصطناعي من فيديوهات وسائل التواصل العامة. ابنتها كانت آمنة طوال الوقت."
    },
    source: "CNN",
    sourceUrl: "https://www.cnn.com/2023/04/29/us/ai-scam-calls-kidnapping-audio",
    year: 2023,
    sensitivity: "medium",
    ageRelevance: ["10-13", "14-16"],
    tags: ["voice-cloning", "scam", "kidnapping", "phone"]
  },
  {
    id: "arup-25m-deepfake",
    riskType: "voice-cloning",
    title: {
      en: "$25 Million Stolen via AI-Generated Video Call",
      ar: "سرقة 25 مليون دولار عبر مكالمة فيديو مولدة بالذكاء الاصطناعي"
    },
    summary: {
      en: "In February 2024, a Hong Kong branch of British engineering firm Arup transferred $25.6 million after an employee attended a video call where the CFO and other colleagues appeared to be present — but all participants were AI-generated deepfakes. The employee was the only real person on the call.",
      ar: "في فبراير 2024، حوّل فرع هونغ كونغ لشركة الهندسة البريطانية Arup مبلغ 25.6 مليون دولار بعد أن حضر موظف مكالمة فيديو ظهر فيها المدير المالي وزملاء آخرون — لكن جميع المشاركين كانوا تزييفات عميقة مولدة بالذكاء الاصطناعي. الموظف كان الشخص الحقيقي الوحيد في المكالمة."
    },
    source: "South China Morning Post",
    sourceUrl: "https://www.scmp.com/news/hong-kong/law-and-crime/article/3250851/",
    year: 2024,
    sensitivity: "low",
    ageRelevance: ["14-16"],
    tags: ["deepfake", "video", "financial-fraud", "corporate"]
  },
  {
    id: "character-ai-teen",
    riskType: "chatbot-attachment",
    title: {
      en: "Teen's Emotional Dependency on AI Chatbot Raises Alarm",
      ar: "اعتماد مراهق عاطفي على روبوت محادثة يثير القلق"
    },
    summary: {
      en: "In 2024, multiple reports emerged of teenagers developing deep emotional attachments to AI chatbots on Character.AI, spending hours daily in conversation with AI personas. Parents reported withdrawal from real friendships, sleep disruption, and emotional distress when access was limited. The platform has since added parental controls and usage limits for under-18 users.",
      ar: "في 2024، ظهرت تقارير متعددة عن مراهقين يطورون ارتباطات عاطفية عميقة مع روبوتات محادثة على Character.AI، يقضون ساعات يومياً في محادثة مع شخصيات ذكاء اصطناعي. أبلغ الآباء عن انسحاب من الصداقات الحقيقية واضطرابات النوم وضائقة عاطفية عند تقييد الوصول. أضافت المنصة منذ ذلك الحين ضوابط أبوية وحدود استخدام لمن هم دون 18 عاماً."
    },
    source: "The New York Times / The Washington Post",
    sourceUrl: "https://www.nytimes.com/2024/06/teens-ai-chatbot-attachment",
    year: 2024,
    sensitivity: "medium",
    ageRelevance: ["10-13", "14-16"],
    tags: ["chatbot", "emotional-health", "attachment", "teen"]
  },
  {
    id: "snapchat-my-ai-data",
    riskType: "data-privacy",
    title: {
      en: "Snapchat's 'My AI' Collects Location Data from Minors",
      ar: "ذكاء سناب شات 'My AI' يجمع بيانات موقع القاصرين"
    },
    summary: {
      en: "In 2023, the UK's ICO investigated Snapchat's 'My AI' chatbot feature for collecting geolocation data from users aged 13–17 without adequate privacy assessments. The AI chatbot was pinned to every user's chat list by default, and its data collection practices were not clearly communicated to young users or their parents.",
      ar: "في 2023، حققت هيئة مفوض المعلومات البريطانية في ميزة روبوت المحادثة 'My AI' في سناب شات لجمعها بيانات الموقع الجغرافي من مستخدمين بأعمار 13-17 دون تقييمات خصوصية كافية. تم تثبيت روبوت المحادثة في قائمة دردشة كل مستخدم افتراضياً، ولم يتم إبلاغ المستخدمين الصغار أو آبائهم بوضوح عن ممارسات جمع البيانات."
    },
    source: "BBC News / ICO",
    sourceUrl: "https://www.bbc.com/news/technology-67012043",
    year: 2023,
    sensitivity: "low",
    ageRelevance: ["10-13", "14-16"],
    tags: ["data-privacy", "location", "snapchat", "minors"]
  },
];

export const RISK_TYPES = {
  "deepfake": { en: "Deepfakes & Fake Images", ar: "التزييف العميق والصور المزيفة", color: "red" },
  "voice-cloning": { en: "AI Voice Cloning", ar: "استنساخ الصوت بالذكاء الاصطناعي", color: "orange" },
  "bullying": { en: "AI-Enabled Bullying", ar: "التنمر المدعوم بالذكاء الاصطناعي", color: "purple" },
  "chatbot-attachment": { en: "Chatbot Attachment", ar: "التعلق بروبوتات المحادثة", color: "blue" },
  "inappropriate-content": { en: "Inappropriate Content", ar: "محتوى غير لائق", color: "pink" },
  "data-privacy": { en: "Data & Privacy", ar: "البيانات والخصوصية", color: "teal" },
} as const;

export const SENSITIVITY_LEVELS = {
  high: { en: "Sensitive content — read at your own pace", ar: "محتوى حساس — اقرأ في وقتك" },
  medium: { en: "Contains real incidents", ar: "يحتوي على حوادث حقيقية" },
  low: { en: "General information", ar: "معلومات عامة" },
} as const;
