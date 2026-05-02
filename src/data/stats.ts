import { TOOLS } from "./tools";
import { CASES } from "./cases";
import { EXPERTS, ORGANIZATIONS, organizationMatchesLocale } from "./experts";
import { ACTIVITIES } from "./activities";

export function getStats(locale?: string) {
  const orgsForLocale = locale
    ? ORGANIZATIONS.filter((o) => organizationMatchesLocale(o, locale))
    : ORGANIZATIONS;
  return {
    tools: TOOLS.length,
    cases: CASES.length,
    experts: EXPERTS.length,
    organizations: orgsForLocale.length,
    activities: ACTIVITIES.length,
    freeTools: TOOLS.filter(t => t.free).length,
    highPrivacyTools: TOOLS.filter(t => t.privacyLevel === "high").length,
    saudiOrgs: orgsForLocale.filter(o => o.region === "saudi").length,
  };
}
