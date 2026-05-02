"use client";

import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";
import { ArrowLeft, Search, WarningAlt } from "@carbon/icons-react";
import { TOOLS, TOOL_CATEGORIES, PRIVACY_LEVELS, toolLabel } from "@/data/tools";
import { CASES, RISK_TYPES, SENSITIVITY_LEVELS } from "@/data/cases";
import { EXPERTS, ORGANIZATIONS, FOCUS_AREAS, organizationMatchesLocale, organizationLabel } from "@/data/experts";
import { ACTIVITIES, ACTIVITY_CATEGORIES } from "@/data/activities";
import type { Activity } from "@/data/activities";
import {
  HubToolGlyph,
  HubToolGlyphHero,
  HubCaseGlyph,
  HubCaseGlyphHero,
  HubActivityGlyph,
  HubActivityGlyphHero,
  HubOrgGlyph,
} from "@/components/HubGlyphs";

type Props = { locale: string };
type Tab = "tools" | "cases" | "experts" | "activities";

function activityAgeBandLabel(band: Activity["ageBand"], t: (key: string) => string) {
  switch (band) {
    case "3-5":
      return t("ages_3_5");
    case "6-9":
      return t("ages_6_9");
    case "10-13":
      return t("ages_10_13");
    case "14-16":
      return t("ages_14_16");
    default:
      return band;
  }
}

export default function ExploreClient({ locale }: Props) {
  const t = useTranslations("explore");
  const isAr = locale === "ar";
  const [activeTab, setActiveTab] = useState<Tab>("tools");
  const [searchQuery, setSearchQuery] = useState("");

  // Filters
  const [ageFilter, setAgeFilter] = useState<number | null>(null);
  const [costFilter, setCostFilter] = useState<"all" | "free" | "paid">("all");
  const [privacyFilter, setPrivacyFilter] = useState<"all" | "high" | "medium" | "low">("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sensitivityFilter, setSensitivityFilter] = useState<string>("all");
  const [focusFilter, setFocusFilter] = useState<string>("all");
  const [ageBandFilter, setAgeBandFilter] = useState<string>("all");

  // Full-screen card state
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  // Filtered data
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !tool.name.en.toLowerCase().includes(q) &&
          !tool.name.ar.toLowerCase().includes(q) &&
          !tool.description.en.toLowerCase().includes(q) &&
          !tool.description.ar.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      if (ageFilter !== null && (tool.ageMin > ageFilter || tool.ageMax < ageFilter)) return false;
      if (costFilter === "free" && !tool.free) return false;
      if (costFilter === "paid" && tool.free) return false;
      if (privacyFilter !== "all" && tool.privacyLevel !== privacyFilter) return false;
      return true;
    });
  }, [searchQuery, ageFilter, costFilter, privacyFilter]);

  const filteredCases = useMemo(() => {
    return CASES.filter(c => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!c.title.en.toLowerCase().includes(q) && !c.title.ar.toLowerCase().includes(q) && !c.summary.en.toLowerCase().includes(q)) return false;
      }
      if (riskFilter !== "all" && c.riskType !== riskFilter) return false;
      if (sensitivityFilter !== "all" && c.sensitivity !== sensitivityFilter) return false;
      return true;
    });
  }, [searchQuery, riskFilter, sensitivityFilter]);

  const filteredExperts = useMemo(() => {
    return EXPERTS.filter(e => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!e.name.toLowerCase().includes(q) && !e.affiliation.toLowerCase().includes(q)) return false;
      }
      if (focusFilter !== "all" && e.focusArea !== focusFilter) return false;
      return true;
    });
  }, [searchQuery, focusFilter]);

  const filteredActivities = useMemo(() => {
    return ACTIVITIES.filter(a => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!a.title.en.toLowerCase().includes(q) && !a.title.ar.toLowerCase().includes(q)) return false;
      }
      if (ageBandFilter !== "all" && a.ageBand !== ageBandFilter) return false;
      return true;
    });
  }, [searchQuery, ageBandFilter]);

  const visibleOrganizations = useMemo(
    () => ORGANIZATIONS.filter((org) => organizationMatchesLocale(org, locale)),
    [locale],
  );

  const tabs: { key: Tab; count: number }[] = [
    { key: "tools", count: filteredTools.length },
    { key: "cases", count: filteredCases.length },
    { key: "experts", count: filteredExperts.length + visibleOrganizations.length },
    { key: "activities", count: filteredActivities.length },
  ];

  const selectClass = "text-sm border border-neutral-200 rounded-xl px-3 py-2.5 bg-white text-neutral-700 focus:border-ethika-green focus:outline-none focus:ring-1 focus:ring-ethika-green/20";

  /* ─── Full-screen Tool Detail Card ─── */
  const selectedTool = expandedTool ? TOOLS.find(t => t.id === expandedTool) : null;
  if (selectedTool) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setExpandedTool(null)} className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 mb-6">
            <ArrowLeft size={16} className="flip-rtl" />
            {isAr ? "العودة إلى الأدوات" : "Back to tools"}
          </button>

          <div className="bg-white rounded-3xl border border-neutral-200 shadow-lg overflow-hidden">
            {/* Hero */}
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-8 sm:p-12 text-center">
              <HubToolGlyphHero tool={selectedTool} />
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">{toolLabel(selectedTool, locale)}</h1>
              <p className="text-base text-neutral-500">
                {isAr ? TOOL_CATEGORIES[selectedTool.category].ar : TOOL_CATEGORIES[selectedTool.category].en}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${selectedTool.free ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                  {selectedTool.free ? t("free") : t("paid")}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  selectedTool.privacyLevel === "high" ? "bg-emerald-100 text-emerald-700" :
                  selectedTool.privacyLevel === "medium" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                }`}>
                  {isAr ? PRIVACY_LEVELS[selectedTool.privacyLevel].ar : PRIVACY_LEVELS[selectedTool.privacyLevel].en}
                </span>
                {selectedTool.arabicSupport && (
                  <span className="text-xs px-3 py-1 rounded-full font-semibold bg-blue-100 text-blue-700">{t("arabic_support")}</span>
                )}
                <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                  {t("ages")} {selectedTool.ageMin}&ndash;{selectedTool.ageMax}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Description */}
              <div>
                <h2 className="text-lg font-bold text-neutral-900 mb-2">{isAr ? "حول هذه الأداة" : "About this tool"}</h2>
                <p className="text-base text-neutral-600 leading-relaxed">
                  {isAr ? selectedTool.description.ar : selectedTool.description.en}
                </p>
              </div>

              {/* Privacy note */}
              <div className="bg-neutral-50 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-neutral-700 mb-1.5">{isAr ? "ملاحظة الخصوصية" : "Privacy note"}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed italic">
                  {isAr ? selectedTool.privacyNote.ar : selectedTool.privacyNote.en}
                </p>
              </div>

              {/* Classification */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded-2xl p-4 text-center">
                  <span className="text-xs text-neutral-500 block mb-1">{isAr ? "متوفر في السعودية" : "Available in KSA"}</span>
                  <span className="text-lg font-bold text-neutral-900">{selectedTool.ksaAvailable ? (isAr ? "نعم" : "Yes") : (isAr ? "تحقق" : "Check")}</span>
                </div>
                <div className="bg-neutral-50 rounded-2xl p-4 text-center">
                  <span className="text-xs text-neutral-500 block mb-1">{isAr ? "يدعم العربية" : "Arabic support"}</span>
                  <span className="text-lg font-bold text-neutral-900">{selectedTool.arabicSupport ? (isAr ? "نعم" : "Yes") : (isAr ? "لا" : "No")}</span>
                </div>
              </div>

              {/* Source link */}
              {selectedTool.link !== "#" && (
                <a href={selectedTool.link} target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-ethika-green text-white text-center font-semibold py-4 rounded-2xl text-base hover:bg-ethika-green-dark transition-all">
                  {isAr ? "زيارة الموقع الرسمي" : "Visit official website"} &rarr;
                </a>
              )}
              <p className="text-xs text-neutral-400 text-center">
                {isAr ? "المصدر: " : "Source: "}{selectedTool.link}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Full-screen Case Detail Card ─── */
  const selectedCase = expandedCase ? CASES.find(c => c.id === expandedCase) : null;
  if (selectedCase) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setExpandedCase(null)} className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 mb-6">
            <ArrowLeft size={16} className="flip-rtl" />
            {isAr ? "العودة إلى الحالات" : "Back to cases"}
          </button>

          <div className="bg-white rounded-3xl border border-neutral-200 shadow-lg overflow-hidden">
            <div className={`p-8 sm:p-12 text-center ${
              selectedCase.sensitivity === "high" ? "bg-gradient-to-br from-red-50 to-amber-50" :
              selectedCase.sensitivity === "medium" ? "bg-gradient-to-br from-amber-50 to-yellow-50" :
              "bg-gradient-to-br from-blue-50 to-neutral-50"
            }`}>
              <HubCaseGlyphHero riskType={selectedCase.riskType} />
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{isAr ? selectedCase.title.ar : selectedCase.title.en}</h1>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  selectedCase.sensitivity === "high" ? "bg-red-100 text-red-700" :
                  selectedCase.sensitivity === "medium" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                }`}>
                  {isAr ? SENSITIVITY_LEVELS[selectedCase.sensitivity].ar : SENSITIVITY_LEVELS[selectedCase.sensitivity].en}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                  {isAr ? RISK_TYPES[selectedCase.riskType].ar : RISK_TYPES[selectedCase.riskType].en}
                </span>
                <span className="text-xs text-neutral-400">{selectedCase.year}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-base text-neutral-600 leading-relaxed">{isAr ? selectedCase.summary.ar : selectedCase.summary.en}</p>
              <div className="bg-neutral-50 rounded-2xl p-5">
                <span className="text-xs font-bold text-neutral-500 block mb-1">{t("source")}</span>
                <a href={selectedCase.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-ethika-green hover:underline">
                  {selectedCase.source} &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Full-screen Activity Detail Card ─── */
  const selectedActivity = expandedActivity ? ACTIVITIES.find(a => a.id === expandedActivity) : null;
  if (selectedActivity) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setExpandedActivity(null)} className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-700 mb-6">
            <ArrowLeft size={16} className="flip-rtl" />
            {isAr ? "العودة إلى الأنشطة" : "Back to activities"}
          </button>

          <div className="bg-white rounded-3xl border border-neutral-200 shadow-lg overflow-hidden">
            <div className="bg-gradient-to-br from-rose-50 to-purple-50 p-8 sm:p-12 text-center">
              <HubActivityGlyphHero activity={selectedActivity} />
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{isAr ? selectedActivity.title.ar : selectedActivity.title.en}</h1>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {activityAgeBandLabel(selectedActivity.ageBand, t)}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                  {selectedActivity.durationMinutes} {t("minutes")}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold">
                  {isAr ? ACTIVITY_CATEGORIES[selectedActivity.category].ar : ACTIVITY_CATEGORIES[selectedActivity.category].en}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 className="text-base font-bold text-neutral-900 mb-2">{t("what_you_need")}</h3>
                <p className="text-base text-neutral-600">{isAr ? selectedActivity.toolsNeeded.ar : selectedActivity.toolsNeeded.en}</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-5">
                <h3 className="text-base font-bold text-blue-800 mb-2">{t("what_to_say")}</h3>
                <p className="text-base text-neutral-700 italic">&ldquo;{isAr ? selectedActivity.openingPrompt.ar : selectedActivity.openingPrompt.en}&rdquo;</p>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-5">
                <h3 className="text-base font-bold text-neutral-700 mb-2">{t("what_to_notice")}</h3>
                <p className="text-base text-neutral-600">{isAr ? selectedActivity.whatToNotice.ar : selectedActivity.whatToNotice.en}</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-5">
                <h3 className="text-base font-bold text-emerald-800 mb-2">{t("follow_up")}</h3>
                <p className="text-base text-neutral-600">{isAr ? selectedActivity.followUp.ar : selectedActivity.followUp.en}</p>
              </div>
              {selectedActivity.resourceUrl && (
                <a href={selectedActivity.resourceUrl} target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-ethika-green text-white text-center font-semibold py-4 rounded-2xl text-base hover:bg-ethika-green-dark transition-all">
                  {t("open_resource")} &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Main Hub View ─── */
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-white border-b border-neutral-100 py-6">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">{t("title")}</h1>
          <p className="text-base text-neutral-500">{t("subtitle")}</p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="bg-white border-b border-neutral-100 sticky top-14 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 space-y-3">
          {/* Search + Tabs row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("search_placeholder")}
                className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-xl bg-white text-neutral-800 placeholder:text-neutral-400 focus:border-ethika-green focus:outline-none focus:ring-1 focus:ring-ethika-green/20" />
            </div>
            <div className="flex gap-1.5 shrink-0 overflow-x-auto">
              {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap
                    ${activeTab === tab.key ? "bg-ethika-green text-white shadow-sm" : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100"}`}>
                  {t(`tab_${tab.key}`)}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? "bg-white/20" : "bg-neutral-200/60"}`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {activeTab === "tools" && (
              <>
                <select value={ageFilter ?? ""} onChange={(e) => setAgeFilter(e.target.value ? Number(e.target.value) : null)} className={selectClass}>
                  <option value="">{t("filter_all_ages")}</option>
                  <option value="5">5 {isAr ? "\u0633\u0646\u0648\u0627\u062A" : "years"}</option>
                  <option value="7">7 {isAr ? "\u0633\u0646\u0648\u0627\u062A" : "years"}</option>
                  <option value="10">10 {isAr ? "\u0633\u0646\u0648\u0627\u062A" : "years"}</option>
                  <option value="13">13 {isAr ? "\u0633\u0646\u0629" : "years"}</option>
                  <option value="16">16 {isAr ? "\u0633\u0646\u0629" : "years"}</option>
                </select>
                <select value={costFilter} onChange={(e) => setCostFilter(e.target.value as "all" | "free" | "paid")} className={selectClass}>
                  <option value="all">{t("filter_all_cost")}</option>
                  <option value="free">{t("filter_free")}</option>
                  <option value="paid">{t("filter_paid")}</option>
                </select>
                <select value={privacyFilter} onChange={(e) => setPrivacyFilter(e.target.value as "all" | "high" | "medium" | "low")} className={selectClass}>
                  <option value="all">{t("filter_all_privacy")}</option>
                  <option value="high">{isAr ? PRIVACY_LEVELS.high.ar : PRIVACY_LEVELS.high.en}</option>
                  <option value="medium">{isAr ? PRIVACY_LEVELS.medium.ar : PRIVACY_LEVELS.medium.en}</option>
                  <option value="low">{isAr ? PRIVACY_LEVELS.low.ar : PRIVACY_LEVELS.low.en}</option>
                </select>
              </>
            )}
            {activeTab === "cases" && (
              <>
                <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className={selectClass}>
                  <option value="all">{t("filter_all_types")}</option>
                  {Object.entries(RISK_TYPES).map(([key, val]) => (
                    <option key={key} value={key}>{isAr ? val.ar : val.en}</option>
                  ))}
                </select>
                <select value={sensitivityFilter} onChange={(e) => setSensitivityFilter(e.target.value)} className={selectClass}>
                  <option value="all">{t("filter_all_sensitivity")}</option>
                  <option value="high">{isAr ? SENSITIVITY_LEVELS.high.ar : SENSITIVITY_LEVELS.high.en}</option>
                  <option value="medium">{isAr ? SENSITIVITY_LEVELS.medium.ar : SENSITIVITY_LEVELS.medium.en}</option>
                  <option value="low">{isAr ? SENSITIVITY_LEVELS.low.ar : SENSITIVITY_LEVELS.low.en}</option>
                </select>
              </>
            )}
            {activeTab === "experts" && (
              <select value={focusFilter} onChange={(e) => setFocusFilter(e.target.value)} className={selectClass}>
                <option value="all">{t("filter_all_focus")}</option>
                {Object.entries(FOCUS_AREAS).map(([key, val]) => (
                  <option key={key} value={key}>{isAr ? val.ar : val.en}</option>
                ))}
              </select>
            )}
            {activeTab === "activities" && (
              <select value={ageBandFilter} onChange={(e) => setAgeBandFilter(e.target.value)} className={selectClass}>
                <option value="all">{t("filter_all_ages")}</option>
                <option value="3-5">{t("ages_3_5")}</option>
                <option value="6-9">{t("ages_6_9")}</option>
                <option value="10-13">{t("ages_10_13")}</option>
                <option value="14-16">{t("ages_14_16")}</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* TOOLS TAB - Visual Cards */}
        {activeTab === "tools" && (
          <div className="animate-fade-in">
            {filteredTools.length === 0 ? (
              <p className="text-base text-neutral-400 py-16 text-center">{t("no_results")}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTools.map((tool) => (
                  <button key={tool.id} onClick={() => setExpandedTool(tool.id)}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 text-left rtl:text-right hover:border-ethika-green/40 hover:shadow-md transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                      <HubToolGlyph tool={tool} />
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-ethika-green transition-colors">{toolLabel(tool, locale)}</h3>
                        <p className="text-xs text-neutral-500">{isAr ? TOOL_CATEGORIES[tool.category].ar : TOOL_CATEGORIES[tool.category].en}</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-3 line-clamp-2">
                      {isAr ? tool.description.ar : tool.description.en}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${tool.free ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {tool.free ? t("free") : t("paid")}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                        {tool.ageMin}&ndash;{tool.ageMax} {isAr ? "سنة" : "yrs"}
                      </span>
                      {tool.arabicSupport && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">{t("arabic_support")}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CASES TAB */}
        {activeTab === "cases" && (
          <div className="animate-fade-in">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3">
                <WarningAlt size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-800">{t("content_warning")}</h3>
                  <p className="text-sm text-amber-700 mt-1">{t("content_warning_text")}</p>
                </div>
              </div>
            </div>

            {filteredCases.length === 0 ? (
              <p className="text-base text-neutral-400 py-16 text-center">{t("no_results")}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredCases.map((c) => (
                  <button key={c.id} onClick={() => setExpandedCase(c.id)}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 text-left rtl:text-right hover:shadow-md hover:border-neutral-300 transition-all group">
                    <div className="flex items-center gap-3 mb-3">
                      <HubCaseGlyph riskType={c.riskType} />
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                          c.sensitivity === "high" ? "bg-red-50 text-red-700" :
                          c.sensitivity === "medium" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {isAr ? SENSITIVITY_LEVELS[c.sensitivity].ar : SENSITIVITY_LEVELS[c.sensitivity].en}
                        </span>
                        <span className="text-xs text-neutral-400">{c.year}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-neutral-900 mb-2 group-hover:text-ethika-green transition-colors">{isAr ? c.title.ar : c.title.en}</h3>
                    <p className="text-sm text-neutral-500 line-clamp-2">{isAr ? c.summary.ar : c.summary.en}</p>
                    <p className="text-xs text-neutral-400 mt-3">{c.source}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EXPERTS TAB */}
        {activeTab === "experts" && (
          <div className="animate-fade-in">
            {filteredExperts.length === 0 && visibleOrganizations.length === 0 ? (
              <p className="text-base text-neutral-400 py-16 text-center">{t("no_results")}</p>
            ) : (
              <>
                {filteredExperts.length > 0 && (
                  <>
                    <h2 className="text-lg font-bold text-neutral-900 mb-4">{t("experts_heading")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                      {filteredExperts.map((expert) => (
                        <div key={expert.id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:border-ethika-green/40 hover:shadow-md transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 text-ethika-green font-bold text-base">
                              {expert.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base font-bold text-neutral-900">{expert.name}</h3>
                              <p className="text-sm text-neutral-500 mt-0.5">{expert.affiliation}</p>
                              <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium mt-1.5">
                                {isAr ? FOCUS_AREAS[expert.focusArea].ar : FOCUS_AREAS[expert.focusArea].en}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 bg-neutral-50 p-4 rounded-xl">
                            <p className="text-[11px] font-semibold text-amber-600 mb-1">{t("why_recommended")}</p>
                            <p className="text-sm text-neutral-600 leading-relaxed">{isAr ? expert.whyRecommended.ar : expert.whyRecommended.en}</p>
                          </div>
                          {expert.hasLink && (
                            <a href={expert.link} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-semibold text-ethika-green mt-3 hover:underline">
                              {t("visit")} &rarr;
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {visibleOrganizations.length > 0 && (
                  <>
                    <h2 className="text-lg font-bold text-neutral-900 mb-4">{t("orgs_heading")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {visibleOrganizations.map((org) => (
                        <div key={org.id} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-sm transition-all">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                              <HubOrgGlyph org={org} />
                              <div className="min-w-0">
                                <h3 className="text-sm font-bold text-neutral-900">{organizationLabel(org, locale)}</h3>
                                <p className="text-sm text-neutral-500 mt-1">{isAr ? org.focus.ar : org.focus.en}</p>
                              </div>
                            </div>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium shrink-0 ${
                              org.region === "saudi" ? "bg-emerald-50 text-emerald-700" :
                              org.region === "academic" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                            }`}>
                              {t(`region_${org.region}`)}
                            </span>
                          </div>
                          {org.hasLink && (
                            <a href={org.link} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm font-semibold text-ethika-green mt-3 hover:underline">
                              {t("visit")} &rarr;
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === "activities" && (
          <div className="animate-fade-in">
            {filteredActivities.length === 0 ? (
              <p className="text-base text-neutral-400 py-16 text-center">{t("no_results")}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredActivities.map((act) => (
                  <button key={act.id} onClick={() => setExpandedActivity(act.id)}
                    className="bg-white rounded-2xl border border-neutral-200 p-5 text-left rtl:text-right hover:border-ethika-green/40 hover:shadow-md transition-all group">
                    <div className="flex gap-3">
                      <HubActivityGlyph activity={act} />
                      <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                        {activityAgeBandLabel(act.ageBand, t)}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                        {act.durationMinutes} {t("minutes")}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">
                        {isAr ? ACTIVITY_CATEGORIES[act.category].ar : ACTIVITY_CATEGORIES[act.category].en}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-ethika-green transition-colors">{isAr ? act.title.ar : act.title.en}</h3>
                    <p className="text-sm text-neutral-500 italic line-clamp-2">
                      &ldquo;{isAr ? act.openingPrompt.ar : act.openingPrompt.en}&rdquo;
                    </p>
                    <span className="mt-3 text-sm font-semibold text-ethika-green inline-block">{t("view_activity")} &rarr;</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
