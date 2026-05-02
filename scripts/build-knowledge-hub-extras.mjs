/**
 * One-off generator: reads resources/*.md frontmatter and emits src/data/knowledgeHubExtras.ts
 * Excludes *_spanish.md and skips duplicate Teachable Machine URL already in TOOLS.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const RES = path.join(ROOT, "resources");
const OUT = path.join(ROOT, "src/data/knowledgeHubExtras.ts");

/** Exact URLs already covered by core entries in tools.ts */
const EXISTING_TOOL_URLS = new Set(["https://teachablemachine.withgoogle.com/"]);

function extractFrontmatter(content) {
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const block = m[1];
  const getQuoted = (key) => {
    const r = new RegExp(`^${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`, "m");
    const mm = block.match(r);
    return mm ? mm[1].replace(/\\"/g, '"') : null;
  };
  const title = getQuoted("title");
  const url = getQuoted("url");
  const tyLine =
    block.match(/^type:\s*(\[[^\]]+\])/m)?.[1] ??
    block.match(/^type:\s*(\[[\s\S]*?\])\s*$/m)?.[1];
  let typeArr = [];
  if (tyLine) {
    try {
      typeArr = JSON.parse(tyLine.replace(/'/g, '"'));
    } catch {
      typeArr = [];
    }
  }
  const relevance =
    getQuoted("relevance_to_ethika") ?? getQuoted("relevance_to_workshop") ?? "";
  const year = parseInt(block.match(/^year:\s*(\d+)/m)?.[1] || "2024", 10);
  return { title, url, typeArr, relevance, year };
}

function slugId(file) {
  let s = file
    .replace(/\.md$/i, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 56);
  if (!s || s.length < 2) {
    let h = 0;
    for (let i = 0; i < file.length; i++) h = (h * 31 + file.charCodeAt(i)) >>> 0;
    s = `src-${h.toString(36)}`;
  }
  return s;
}

/** Some source files embed Spanish in relevance_to_ethika; prefer neutral English for the hub UI. */
function englishActivityCopy(relevance, title) {
  const t = (relevance || "").trim();
  if (
    !t ||
    /^esta\s+actividad/i.test(t) ||
    /^¿/.test(t) ||
    (/[áéíóúñ]/i.test(t) && !/\b(the|and|with|your|how)\b/i.test(t))
  ) {
    return {
      open: `Use the linked Common Sense resource to guide a short family conversation about: ${title}`,
      notice:
        "Watch how your child connects the examples in the slides to their own online experiences.",
    };
  }
  const first = t.split(/\.\s+/)[0];
  return {
    open: first.length > 320 ? `${first.slice(0, 317)}…` : first,
    notice: t.length > 380 ? `${t.slice(0, 377)}…` : t,
  };
}

function classify(file, fm, skipSpanish) {
  if (skipSpanish && file.includes("_spanish.md")) return "skip";
  if (!fm?.url || !fm.title) return "skip";
  if (EXISTING_TOOL_URLS.has(fm.url.trim())) return "skip";
  const f = file.toLowerCase();
  /** Educator hub URL — family slide decks are activities; this hub is curriculum navigation. */
  if (f.includes("digital_connections_hub")) return "tool";
  const t = (fm.typeArr || []).join(" ").toLowerCase();
  if (
    t.includes("policy") ||
    t.includes("ethics_framework") ||
    t.includes("government_guideline") ||
    t.includes("child_protection") ||
    f.includes("pdpl") ||
    f.includes("sdaia") ||
    f.includes("الهيئة") ||
    f.includes("وزارة") ||
    f.includes("المبادئ") ||
    f.includes("نظام حماية") ||
    f.includes("children and incompetents") ||
    f.includes("digital government authority") ||
    (f.includes("سدايا") && !f.includes("youth")) ||
    f.includes("hrsd.gov") ||
    (t.includes("framework") && f.includes("وزارة"))
  ) {
    return "org";
  }
  if (
    f.startsWith("common_sense") ||
    f.includes("kids_and_tech") ||
    f.includes("family_guide") ||
    f.includes("parenting_in_the_age") ||
    (t.includes("discussion_guide") && t.includes("family"))
  ) {
    return "activity";
  }
  return "tool";
}

function inferToolAges(fm, file) {
  const blob = `${file} ${(fm.typeArr || []).join(" ")}`.toLowerCase();
  if (blob.includes("high_school") || blob.includes("9-12") || blob.includes("14-18"))
    return { ageMin: 14, ageMax: 18 };
  if (blob.includes("middle") || blob.includes("6-8") || blob.includes("grades_6"))
    return { ageMin: 10, ageMax: 15 };
  if (blob.includes("k-2") || blob.includes("elementary") || blob.includes("grades_3"))
    return { ageMin: 6, ageMax: 12 };
  return { ageMin: 8, ageMax: 16 };
}

function inferToolCategory(fm, file) {
  const b = `${file} ${(fm.typeArr || []).join(" ")}`.toLowerCase();
  if (b.includes("coding") || b.includes("app_inventor") || b.includes("microbit"))
    return "coding";
  if (b.includes("safety") || b.includes("cyber")) return "safety";
  if (b.includes("creative") || b.includes("arts")) return "creation";
  return "learning";
}

function gradeToActivityBand(file) {
  const f = file.toLowerCase();
  if (f.includes("common_sense_9-12") || f.includes("high")) return "14-16";
  if (
    f.includes("common_sense_6-8") ||
    f.includes("common_sense_7th") ||
    f.includes("6-8_grade")
  )
    return "10-13";
  if (
    f.includes("common_sense_k-2") ||
    f.includes("common_sense_k_") ||
    f.includes("common_sense_k-") ||
    f.match(/common_sense_k[^a-z]/)
  )
    return "3-5";
  return "6-9";
}

function activityDuration(file) {
  const f = file.toLowerCase();
  if (f.includes("cards")) return 25;
  if (f.includes("video")) return 20;
  if (f.includes("discussion")) return 25;
  return 35;
}

function activityCategory(file) {
  const f = file.toLowerCase();
  if (f.includes("cards")) return "hands-on";
  if (f.includes("guide") || f.includes("video")) return "discussion";
  return "discussion";
}

/**
 * Parent-facing titles: what families will discuss or practice (not marketing labels).
 * Arabic mirrors the same intent for caregivers.
 */
function commonSenseTopicGrade(file) {
  const f = file.toLowerCase();
  const topic =
    f.includes("family_activity_cards") || (f.includes("family_activities") && !f.includes("grade"))
      ? {
          en: "Take-home prompts & activities for family conversations",
          ar: "أفكار وأنشطة للنقاش العائلي في المنزل",
        }
      : f.includes("digital_citizenship")
        ? {
            en: "Kindness, respect & safety in online spaces",
            ar: "اللطف والاحترام والسلامة في العالم الرقمي",
          }
        : f.includes("media_balance")
          ? {
              en: "Healthy screen time, sleep & emotional balance",
              ar: "توازن الشاشات والنوم والرفاهية العاطفية",
            }
          : f.includes("digital_footprint") || f.includes("footprint_identity")
            ? {
                en: "What stays online: footprints, identity & reputation",
                ar: "ما يبقى على الإنترنت: البصمة والهوية والسمعة",
              }
            : f.includes("news_media")
              ? {
                  en: "Telling reliable news from rumors & manipulated media",
                  ar: "تمييز الأخبار الموثوقة عن الشائعات والمحتوى المُلاعب",
                }
              : f.includes("privacy_security")
                ? {
                    en: "Passwords, accounts & protecting personal information",
                    ar: "كلمات المرور والحسابات وحماية المعلومات الشخصية",
                  }
                : f.includes("privacy_safety")
                  ? {
                      en: "Sharing less, spotting risks & asking for help",
                      ar: "مشاركة أقل واكتشاف المخاطر وطلب المساعدة",
                    }
                  : f.includes("cyberbullying")
                    ? {
                        en: "When online conflict hurts: response & support",
                        ar: "عندما يؤذي التنمر عبر الشبكة: الاستجابة والدعم",
                      }
                    : f.includes("relationships_communication")
                      ? {
                          en: "Texts, friendships & respectful communication",
                          ar: "الرسائل والصداقة والتواصل باحترام",
                        }
                      : null;

  let grade = null;
  if (f.includes("_9-12") || f.includes("9-12_family")) grade = { en: "Grades 9–12", ar: "الصفوف 9–12" };
  else if (f.includes("7th_grade")) grade = { en: "Grade 7", ar: "الصف السابع" };
  else if (f.includes("6-8")) grade = { en: "Grades 6–8", ar: "الصفوف 6–8" };
  else if (f.includes("3-4")) grade = { en: "Grades 3–4", ar: "الصفوف 3–4" };
  else if (f.includes("3-5")) grade = { en: "Grades 3–5", ar: "الصفوف 3–5" };
  else if (f.includes("1st_grade")) grade = { en: "Grade 1", ar: "الصف الأول" };
  else if (f.includes("2nd_grade")) grade = { en: "Grade 2", ar: "الصف الثاني" };
  else if (f.includes("3rd_grade")) grade = { en: "Grade 3", ar: "الصف الثالث" };
  else if (f.includes("4th_grade")) grade = { en: "Grade 4", ar: "الصف الرابع" };
  else if (f.includes("5th_grade")) grade = { en: "Grade 5", ar: "الصف الخامس" };
  else if (f.includes("k-2")) grade = { en: "K–2", ar: "التمهيدي–2" };
  else if (/common_sense_k[^a-z0-9_-]|_k_family|_k_grade/.test(f)) grade = { en: "Kindergarten", ar: "رياض الأطفال" };

  if (topic && grade) return { en: `${topic.en} — ${grade.en}`, ar: `${topic.ar} — ${grade.ar}` };
  if (topic) return { en: `${topic.en} (Common Sense Education)`, ar: `${topic.ar} (كومن سينس إدوكيشن)` };
  return null;
}

function professionalNonCsActivityTitles(file) {
  const f = file.toLowerCase();
  if (f.includes("kids_and_tech_discussion")) {
    return {
      en: "Companion guide: discussing each Kids & Tech episode as a family",
      ar: "دليل مرافق: مناقشة كل حلقة من «الأطفال والتقنية» معاً كعائلة",
    };
  }
  if (f.includes("kids_and_tech_screen")) {
    return {
      en: "Talking points on screen time, sleep & family agreements",
      ar: "نقاط للحديث عن وقت الشاشة والنوم والاتفاقيات العائلية",
    };
  }
  if (f.includes("kids_and_tech_when")) {
    return {
      en: "Readiness checklist: when a first phone makes sense for your child",
      ar: "قائمة الجاهزية: متى يكون الهاتف الأول مناسباً لطفلك",
    };
  }
  if (f.includes("family_guide_video1")) {
    return {
      en: "Short parent video: what AI is (and isn’t) in everyday language",
      ar: "فيديو قصير للوالدين: ما الذكاء الاصطناعي (وما ليس كذلك) بلغة بسيطة",
    };
  }
  if (f.includes("family_guide_video2")) {
    return {
      en: "Short parent video: how to talk with kids about AI calmly",
      ar: "فيديو قصير للوالدين: كيف تتحدث مع أطفالك عن الذكاء الاصطناعي بهدوء",
    };
  }
  if (f.includes("family_guide_video3")) {
    return {
      en: "Short parent video: homework, honesty & using AI for schoolwork",
      ar: "فيديو قصير للوالدين: الواجبات والصدق واستخدام الذكاء الاصطناعي في الدراسة",
    };
  }
  if (f.includes("parenting_in_the_age")) {
    return {
      en: "Curated talks for parents on raising kids alongside AI tools",
      ar: "محادثات مختارة للوالدين عن تربية الأطفال مع أدوات الذكاء الاصطناعي",
    };
  }
  return null;
}

function professionalActivityTitles(raw, file) {
  const f = file.toLowerCase();
  let cleaned = raw.replace(/\{[^}]*\}/g, "").replace(/\s+/g, " ").trim();
  if (f.startsWith("common_sense")) {
    const cs = commonSenseTopicGrade(file);
    if (cs) return cs;
  }
  const non = professionalNonCsActivityTitles(file);
  if (non) return non;
  return {
    en: cleaned,
    ar: cleaned.match(/[\u0600-\u06FF]/) ? cleaned : `نشاط عائلي · ${cleaned.slice(0, 90)}`,
  };
}

/**
 * Hub card titles for caregivers/educators: describe what you open and what learning looks like,
 * not product branding (avoid “Day of AI • …”, bare toolkit labels, etc.).
 */
function professionalToolTitle(raw, file) {
  const stem = file
    .replace(/\.md$/gi, "")
    .replace(/\.md$/gi, "")
    .toLowerCase();
  let s = raw.replace(/\{[^}]*\}/g, "").replace(/\s+/g, " ").trim();

  const BY_STEM = {
    ai_booklist: "Books to read together about AI, ethics, and growing up with tech",
    planning_guide_2025:
      "Year-long AI literacy planning workbook: themes, pacing, and classroom-ready blocks",
    ai_literacy_15_min: "Quick primer for teens and adults: what AI is and where it shows up",
    ai_literacy_toolkit_start_here:
      "Orientation for schools and families starting a structured AI literacy effort",
    ai_literacy_toolkit_implementation_guide:
      "Step-by-step manual for rolling out AI literacy across grades or a district",
    ai_literacy_toolkit_families_presentation:
      "Slides and talking points for a parent or community night on AI literacy",
    google_generative_ai_for_educators:
      "Practical classroom guide to Chat-style AI: tasks, limits, and academic integrity",
    generative_ai_mit_app_inventor:
      "Build a simple mobile app that calls a generative model (MIT App Inventor walkthrough)",
    digital_connections_interactive_series_middle_school:
      "Middle-school digital life lessons you can teach from the browser (Common Sense)",
    digital_connections_video_series_playlist:
      "Video series on friendships, media, and online choices for middle schoolers",
    common_sense_digital_connections_hub:
      "One place to browse Common Sense “Digital Connections” lessons and downloads",
    boost_digital_literacy_wellbeing_families:
      "Ideas and routines to strengthen digital habits and wellbeing at home",
    ai_literacy_family_playlist: "Short videos for families on core AI ideas and dinner-table prompts",
    truth_tricks_day_of_ai:
      "Classroom module on misinformation, persuasion, and how to check claims about AI",
    ecobits_explorers_microbits:
      "Outdoor and classroom sensing projects with micro:bit (environment and data)",
    "res-20251123-195957": "Train a tiny image or sound model in the browser (Teachable Machine demo)",
    ai_and_creative_arts: "Lesson set: how AI tools intersect with making art and music—and what to question",
    ai_and_elections: "Lesson set: deepfakes, campaigns, and why automated media matters for democracy",
    ai_ethics_debate: "Structured debate prompts on fairness, bias, responsibility, and rules for AI",
    ai_fairness_responsibly_sports: "Case-based lesson on fairness when AI scores, ranks, or officiates in sports",
    ai_foundations_k2: "Early-elementary introduction to patterns, data, and “smart” machines",
    ai_foundations_middle_grades: "Middle-grades overview of how AI works with everyday examples",
    ai_foundations_high_school: "High-school depth on systems, data, limits, and ethics",
    ai_surveillance_human_responsibility:
      "Discussion materials on surveillance, profiling, and human rights in an AI-mediated world",
    ai_vocabulary_cards: "Printable cards for teaching core AI vocabulary in class",
    can_machines_be_creative: "Philosophy-of-AI lesson: creativity, imitation, and authorship",
    ethical_use_of_ai_exploration: "Activities for exploring responsible use of AI tools in learning",
    how_are_we_quantified_by_ai: "Lesson on how data and models infer traits, scores, and risk labels",
    how_do_machines_create: "Explainer on how generative models produce images, audio, and text",
    how_do_machines_learn_lesson: "Concept lesson on training data, patterns, and generalization",
    how_machines_learn_coding: "Hands-on coding activity: train a small model and inspect results",
    how_we_teach_machines: "Intro to labels, datasets, and teaching systems from examples",
    human_rights_and_ai: "Human-rights framing for automated decisions, bias, and accountability",
    impact_ai_environment: "How large AI systems use energy and materials—and what to discuss with students",
    making_sense_of_surroundings: "Data and sensors: noticing patterns in the environment around you",
    telling_climate_stories_data: "Using evidence and charts to tell accurate climate stories (data literacy)",
    the_brain_behind_the_bot: "Analogies between brains and neural networks—without oversimplifying wrong",
    the_cognitive_card_game: "Card prompts for comparing human cognition with machine learning ideas",
    using_ai_for_creativity: "Guided prompts for creative projects that keep authorship and ethics in view",
    what_is_artificial_intelligence: "Plain-language explainer: definitions, limits, and everyday examples",
    women_trailblazers_ai: "Profiles of women leaders in AI and CS for classroom or home inspiration",
    work_in_the_age_of_ai: "Overview of how automation and AI change skills, tasks, and career paths",
  };
  if (BY_STEM[stem]) return BY_STEM[stem];

  s = s.replace(/^Truth,\s*Tricks,\s*and\s*AI:\s*/i, "").trim();
  s = s.replace(/^Start Here!\s*/i, "");
  if (/lesson|unit/i.test(s) && s.length > 72) {
    const dash = s.split(/[.:]/)[0];
    if (dash && dash.length < 80) return dash.trim();
  }
  return s;
}

function professionalOrgTitle(raw, file) {
  const f = file.toLowerCase();
  let s = raw.replace(/\s+/g, " ").trim();
  if (/[\u0600-\u06FF]{8,}/.test(s)) return s;

  if (f.includes("pdpl") && f.includes("english")) return "Personal Data Protection Law (PDPL) · English";
  if (f.includes("children and incompetents")) return "Children's Personal Data Protection Policy";
  if (f.includes("digital government authority")) return "Digital Government Authority · AI Ethics Principles";
  if (f.includes("sdaia") && f.includes("generative") && f.includes("government")) {
    return "How public institutions should use generative AI: risks, privacy, and keeping humans in the loop (national guide)";
  }
  if (f.includes("sdaia") && f.includes("genai")) {
    return "What families and schools should know: safe, responsible use of tools like ChatGPT (plain-language national guide)";
  }
  if (f.includes("nsdai") || (f.includes("national strategy") && f.includes("data"))) return "National Strategy for Data & AI";
  if (f.includes("sdaia") && f.includes("ai ethics") && !f.includes("gen")) return "SDAIA · AI Ethics Principles";
  if (f.includes("nca.gov") || f.includes("الهيئة الوطنية")) return "National Cybersecurity Authority · Awareness";
  return s;
}

function escStr(s) {
  return JSON.stringify(s ?? "");
}

const files = fs.readdirSync(RES).filter((f) => f.endsWith(".md"));

const tools = [];
const activities = [];
const orgs = [];
const usedIds = new Set();

function uniqueId(base) {
  let id = base;
  let n = 2;
  while (usedIds.has(id)) {
    id = `${base}-${n++}`;
  }
  usedIds.add(id);
  return id;
}

for (const file of files) {
  const content = fs.readFileSync(path.join(RES, file), "utf8");
  const fm = extractFrontmatter(content);
  const cat = classify(file, fm, true);
  if (cat === "skip" || !fm) continue;
  const id = uniqueId(slugId(file));

  if (cat === "org") {
    /** Arabic-source entries are Arabic-only in the UI (English hub keeps parallel EN markdown entries). */
    const fromArabicMd = /[\u0600-\u06FF]/.test(file);
    orgs.push({
      id: id || `org-${orgs.length}`,
      name: professionalOrgTitle(fm.title, file),
      focusArea: "ai-ethics",
      focusEn:
        fm.relevance.slice(0, 160) ||
        "Official framework or policy resource for families and institutions.",
      focusAr:
        fm.relevance.slice(0, 160) ||
        "إطار أو سياسة رسمية للعائلات والمؤسسات.",
      link: fm.url,
      hasLink: true,
      region: file.match(/[\u0600-\u06FF]/) || fm.title.match(/[\u0600-\u06FF]/) ? "saudi" : "saudi",
      ...(fromArabicMd ? { locales: ["ar"] } : {}),
    });
    continue;
  }

  if (cat === "activity") {
    const band = gradeToActivityBand(file);
    const titles = professionalActivityTitles(fm.title, file);
    const dur = activityDuration(file);
    const catg = activityCategory(file);
    const resourceUrl = fm.url;
    const enCopy = englishActivityCopy(fm.relevance, titles.en);
    const openAr =
      "استخدموا المورد المرتبط كدليل لجلسة عائلية قصيرة؛ شاركوا أمثلة من أسبوعكم وتناوبوا على الاستماع دون مقاطعة.";
    activities.push({
      id,
      titleEn: titles.en,
      titleAr: titles.ar,
      ageBand: band,
      durationMinutes: dur,
      toolsNeededEn: `Internet access and the linked resource (slides, PDF, or video).`,
      toolsNeededAr: `اتصال بالإنترنت والمورد المرتبط (عرض أو PDF أو فيديو).`,
      openingPromptEn: enCopy.open,
      openingPromptAr: openAr,
      whatToNoticeEn: enCopy.notice,
      whatToNoticeAr:
        "لاحظوا كيف يفكر طفلكم في الخيارات الرقمية وهل يربط القواعد بأمثلة من حياته.",
      followUpEn:
        "Agree on one small family habit to try this week (e.g., checking a headline together or a screen-off time).",
      followUpAr:
        "اتفقوا على عادة عائلية صغيرة لهذا الأسبوع (مثل التحقق من عنوان معاً أو وقت لإطفاء الشاشات).",
      category: catg,
      tags: [`imported`, slugId(file).slice(0, 20)],
      resourceUrl,
    });
    continue;
  }

  /* tool */
  const ages = inferToolAges(fm, file);
  const tcat = inferToolCategory(fm, file);
  const desc =
    fm.relevance.slice(0, 320) ||
    "Curated AI or digital citizenship resource you can use with guidance at home or in school.";
  tools.push({
    id,
    name: professionalToolTitle(fm.title, file),
    category: tcat,
    ageMin: ages.ageMin,
    ageMax: ages.ageMax,
    link: fm.url,
    descEn: desc,
    descAr:
      "مصدر مختار حول الذكاء الاصطناعي أو المواطنة الرقمية يمكن استخدامه بتوجيه في المنزل أو المدرسة.",
    tags: fm.typeArr?.length ? fm.typeArr : ["curated"],
  });
}

/* ─── Emit TypeScript ─── */
let ts = `/**
 * Auto-generated by scripts/build-knowledge-hub-extras.mjs from resources/*.md
 * Do not hand-edit — re-run the script after adding markdown sources.
 */

export const KNOWLEDGE_HUB_EXTRA_TOOLS = [
`;

for (const t of tools) {
  ts += `  {
    id: ${escStr(t.id)},
    name: ${escStr(t.name)},
    category: ${JSON.stringify(t.category)},
    ageMin: ${t.ageMin},
    ageMax: ${t.ageMax},
    free: true,
    ksaAvailable: true,
    arabicSupport: ${/[\u0600-\u06FF]/.test(t.name) || t.link.includes(".gov.sa/ar") ? "true" : "false"},
    privacyLevel: "medium",
    privacyNote: {
      en: "Review the site’s terms with your child. Educational providers may collect usage data.",
      ar: "راجعوا شروط الموقع مع طفلكم؛ قد تجمع الجهات التعليمية بيانات الاستخدام."
    },
    description: {
      en: ${escStr(t.descEn)},
      ar: ${escStr(t.descAr)}
    },
    link: ${escStr(t.link)},
    tags: ${JSON.stringify(t.tags)}
  },
`;
}
ts += `];

export const KNOWLEDGE_HUB_EXTRA_ACTIVITIES = [
`;

for (const a of activities) {
  ts += `  {
    id: ${escStr(a.id)},
    title: { en: ${escStr(a.titleEn)}, ar: ${escStr(a.titleAr)} },
    ageBand: ${JSON.stringify(a.ageBand)},
    durationMinutes: ${a.durationMinutes},
    toolsNeeded: { en: ${escStr(a.toolsNeededEn)}, ar: ${escStr(a.toolsNeededAr)} },
    openingPrompt: { en: ${escStr(a.openingPromptEn)}, ar: ${escStr(a.openingPromptAr)} },
    whatToNotice: { en: ${escStr(a.whatToNoticeEn)}, ar: ${escStr(a.whatToNoticeAr)} },
    followUp: { en: ${escStr(a.followUpEn)}, ar: ${escStr(a.followUpAr)} },
    category: ${JSON.stringify(a.category)},
    tags: ${JSON.stringify(a.tags)},
    resourceUrl: ${escStr(a.resourceUrl)}
  },
`;
}
ts += `];

export const KNOWLEDGE_HUB_EXTRA_ORGANIZATIONS = [
`;

for (const o of orgs) {
  const localesLine =
    o.locales && o.locales.length > 0
      ? `,\n    locales: ${JSON.stringify(o.locales)}`
      : "";
  ts += `  {
    id: ${escStr(o.id)},
    name: ${escStr(o.name)},
    focusArea: ${escStr(o.focusArea)},
    focus: { en: ${escStr(o.focusEn)}, ar: ${escStr(o.focusAr)} },
    link: ${escStr(o.link)},
    hasLink: true,
    region: ${JSON.stringify(o.region)}${localesLine}
  },
`;
}

ts += `];
`;

fs.writeFileSync(OUT, ts, "utf8");
console.error(`Wrote ${OUT}`);
console.error(`Tools: ${tools.length}, Activities: ${activities.length}, Orgs: ${orgs.length}`);
