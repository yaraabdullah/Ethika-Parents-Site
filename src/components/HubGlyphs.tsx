"use client";

import type { ComponentType } from "react";
import type { Tool } from "@/data/tools";
import type { Activity } from "@/data/activities";
import type { CaseStudy } from "@/data/cases";
import type { Organization } from "@/data/experts";
import {
  Api,
  Book,
  Bot,
  Calendar,
  ChatBot,
  Chip,
  Code,
  Document,
  DocumentSecurity,
  Education,
  Events,
  Globe,
  Idea,
  ImageCopy,
  Laptop,
  Locked,
  MachineLearningModel,
  Misuse,
  PaintBrush,
  PhoneVoice,
  Search,
  Security,
  TouchInteraction,
  Translate,
  Video,
  WatsonMachineLearning,
  WarningAlt,
} from "@carbon/icons-react";

type CarbonIcon = ComponentType<{ size?: number; className?: string }>;

const CORE_TOOL_ICONS: Record<string, CarbonIcon> = {
  scratch: Code,
  "quick-draw": PaintBrush,
  "teachable-machine": MachineLearningModel,
  khanmigo: Education,
  chatgpt: ChatBot,
  "app-inventor": Api,
  "day-of-ai": Education,
};

function keywordIcon(hay: string): CarbonIcon | null {
  if (/(book|reading|bibliograph)/i.test(hay)) return Book;
  if (/(video|youtube|playlist)/i.test(hay)) return Video;
  if (/(vocabulary|glossary)/i.test(hay)) return Translate;
  if (/(debate|ethics|rights|human\s+rights)/i.test(hay)) return Idea;
  if (/(microbit|ecobit|chip)/i.test(hay)) return Chip;
  if (/(planning|calendar)/i.test(hay)) return Calendar;
  if (/(pdf|whitepaper)/i.test(hay)) return Document;
  if (/(generative|gpt|dall|prompt|llm)/i.test(hay)) return WatsonMachineLearning;
  if (/(python|coding|code|program)/i.test(hay)) return Code;
  if (/(creative|art|arts)/i.test(hay)) return PaintBrush;
  if (/(security|cyber|safe)/i.test(hay)) return Security;
  if (/(connection|hub|educator)/i.test(hay)) return Laptop;
  return null;
}

export function resolveToolIcon(tool: Tool): CarbonIcon {
  const fromCore = CORE_TOOL_ICONS[tool.id];
  if (fromCore) return fromCore;
  const hay = `${tool.id} ${tool.name.en} ${tool.name.ar} ${(tool.tags ?? []).join(" ")}`;
  const kw = keywordIcon(hay);
  if (kw) return kw;
  switch (tool.category) {
    case "coding":
      return Code;
    case "creation":
      return PaintBrush;
    case "safety":
      return Security;
    case "learning":
      return Education;
    default:
      return MachineLearningModel;
  }
}

export function HubToolGlyph({ tool, size = 26 }: { tool: Tool; size?: number }) {
  const Icon = resolveToolIcon(tool);
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-ethika-green"
      aria-hidden
    >
      <Icon size={size} className="shrink-0 text-current" />
    </span>
  );
}

export function HubToolGlyphHero({ tool }: { tool: Tool }) {
  const Icon = resolveToolIcon(tool);
  return (
    <span
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-sm ring-1 ring-emerald-100 text-ethika-green"
      aria-hidden
    >
      <Icon size={38} className="text-current" />
    </span>
  );
}

const RISK_ICONS: Record<CaseStudy["riskType"], CarbonIcon> = {
  deepfake: ImageCopy,
  "voice-cloning": PhoneVoice,
  bullying: Misuse,
  "chatbot-attachment": Bot,
  "inappropriate-content": WarningAlt,
  "data-privacy": Locked,
};

export function HubCaseGlyph({ riskType, size = 26 }: { riskType: CaseStudy["riskType"]; size?: number }) {
  const Icon = RISK_ICONS[riskType] ?? Document;
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800"
      aria-hidden
    >
      <Icon size={size} className="shrink-0 text-current" />
    </span>
  );
}

export function HubCaseGlyphHero({ riskType }: { riskType: CaseStudy["riskType"] }) {
  const Icon = RISK_ICONS[riskType] ?? Document;
  return (
    <span
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-sm ring-1 ring-amber-100 text-amber-800"
      aria-hidden
    >
      <Icon size={38} className="text-current" />
    </span>
  );
}

export function resolveActivityIcon(activity: Activity): CarbonIcon {
  const hay = `${activity.id} ${activity.title.en}`;
  const kw = keywordIcon(hay);
  if (kw) return kw;
  switch (activity.category) {
    case "hands-on":
      return TouchInteraction;
    case "investigation":
      return Search;
    default:
      return Events;
  }
}

export function HubActivityGlyph({ activity, size = 26 }: { activity: Activity; size?: number }) {
  const Icon = resolveActivityIcon(activity);
  return (
    <span
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700"
      aria-hidden
    >
      <Icon size={size} className="shrink-0 text-current" />
    </span>
  );
}

export function HubActivityGlyphHero({ activity }: { activity: Activity }) {
  const Icon = resolveActivityIcon(activity);
  return (
    <span
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-sm ring-1 ring-rose-100 text-rose-700"
      aria-hidden
    >
      <Icon size={36} className="text-current" />
    </span>
  );
}

export function HubOrgGlyph({ org }: { org: Organization }) {
  const Icon: CarbonIcon =
    org.region === "saudi" ? DocumentSecurity : org.region === "academic" ? Education : Globe;
  return (
    <span
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-800"
      aria-hidden
    >
      <Icon size={22} className="shrink-0 text-current" />
    </span>
  );
}
