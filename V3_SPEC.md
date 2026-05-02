# Ethika Parents AI Toolkit - Version 3 Specification

## Overview

Version 3 ("V3") is a comprehensive redesign of the Ethika Parents AI Toolkit that transforms it from a static informational site into a personalized, guided experience for parents and teachers navigating AI with children.

## How to Pull and Apply

```bash
# 1. Clone or pull latest
git clone https://github.com/jpnapoli/Ethika-Parents-Site.git
cd Ethika-Parents-Site
git checkout genspark_ai_developer
git pull origin genspark_ai_developer

# 2. Install dependencies
npm install

# 3. Build
npm run build

# 4. Run
npm run start
# or for development:
npm run dev
```

## Architecture

- **Framework**: Next.js 16 with App Router
- **i18n**: next-intl (EN + AR, full RTL support)
- **Styling**: Tailwind CSS 4 with custom theme in globals.css
- **State**: React useState/useEffect + localStorage persistence
- **Data**: Static TypeScript data files in src/data/

## V3 Key Changes

### 1. Resource Overview at Top

The green stats dashboard has been relocated from the middle of the page to directly below the header. It now uses a clean white background with individual colored stat cards (emerald, amber, blue, purple, rose) instead of a monolithic green gradient. This gives parents an immediate overview of available resources.

**Files changed**: `src/components/HomeClient.tsx`

### 2. Interactive Questionnaire / Onboarding Flow

A 6-step questionnaire replaces the simple avatar picker:

1. **Welcome + Terms** - Privacy agreement
2. **Avatar Selection** - Choose emoji avatar and optional display name
3. **Child Ages** - Multi-select: 3-5, 6-9, 10-13, 14-16
4. **Concerns** - Multi-select: deepfakes, online safety, screen time, privacy, chatbots, cyberbullying
5. **Interests** - Multi-select: try tools, learn risks, activities, legal rights, expert recommendations
6. **AI Experience Level** - Single-select: new, some, experienced

All answers are stored in localStorage as a `UserProfile` object under key `ethika_profile_v3`. A cookie `ethika_uid` is also set for potential server-side use.

**Files changed**: `src/components/HomeClient.tsx`, `src/messages/en.json`, `src/messages/ar.json`

### 3. Personalized Content

After completing the questionnaire, the landing page shows:

- **Personalized greeting** with avatar and name
- **Age filter chips** showing which age groups content is tailored for
- **Recommended Tools** - filtered by child's age ranges
- **Recommended Activities** - filtered by age bands
- **Concern-based links** - direct links to relevant pages based on stated concerns

Anonymous visitors see generic overview content with a CTA to start the questionnaire.

**Files changed**: `src/components/HomeClient.tsx`

### 4. Full-Screen Tool/Case/Activity Cards

The Knowledge Hub (ExploreClient) now features full-screen detail views:

- **Tool cards**: Large emoji icon, gradient hero, full description, privacy note, classification grid, validated source link
- **Case study cards**: Risk-type icon, sensitivity-colored gradient, full text, validated source
- **Activity cards**: Step-by-step layout with opening prompt, what to notice, follow-up conversation

Each card is accessible by clicking from the grid view, with a back button to return.

**Files changed**: `src/components/ExploreClient.tsx`

### 5. Visual Style Updates

- Base font size remains 16px but paragraphs/lists use 1rem with 1.65 line-height
- Headers have tighter line-heights (1.2-1.35) for better visual hierarchy
- Rounded corners increased to 2xl/3xl for softer appearance
- Stats use individual colored backgrounds instead of monolithic green
- Cards have larger touch targets and more padding
- Emoji icons provide visual anchors without requiring external images

**Files changed**: `src/app/globals.css`

### 6. Consolidated Navigation

The landing page now has 3 primary path cards (Crisis, Try AI, Understand Risks) with large icons and descriptions, plus 4 compact secondary links (Read Deeper, Rights, Hub, From Ethika). This replaces the previous 6 equal-sized cards.

### 7. Translation Keys Added

New translation namespace `questionnaire` with keys for all 6 questionnaire steps in both EN and AR:
- `ages_title`, `ages_subtitle`
- `concerns_title`, `concerns_subtitle`, `concern_*` (6 options)
- `interests_title`, `interests_subtitle`, `interest_*` (5 options)
- `experience_title`, `experience_subtitle`, `exp_*` (3 levels with descriptions)

New home keys: `hero_subtitle_personal`, `card_from_sek`

## Data Model

### UserProfile (localStorage)

```typescript
type UserProfile = {
  id: string;           // "ETK-XXXXXX"
  avatar: string;       // emoji
  name: string;         // display name or ID
  childAges: string[];  // ["3_5", "6_9", "10_13", "14_16"]
  concerns: string[];   // ["deepfakes", "online_safety", "screen_time", "privacy", "chatbots", "cyberbullying"]
  interests: string[];  // ["try_tools", "learn_risks", "activities", "legal_rights", "expert_recs"]
  experience: string;   // "new" | "some" | "experienced"
  completedAt: string;  // ISO date
};
```

### Storage Keys
- `ethika_profile_v3` - Full profile JSON
- Cookie `ethika_uid` - User ID for server-side use (1 year expiry)

## File Structure

```
src/
  app/
    globals.css          # V3 visual style updates
    [locale]/
      layout.tsx         # No changes
      page.tsx           # No changes
  components/
    HomeClient.tsx       # Major rewrite - questionnaire + personalized landing
    ExploreClient.tsx    # Major rewrite - full-screen card views
    Header.tsx           # No changes
    Footer.tsx           # No changes
    CrisisBand.tsx       # No changes
    CrisisClient.tsx     # No changes
    RisksClient.tsx      # No changes
    RightsClient.tsx     # No changes
    TryAiClient.tsx      # No changes
    ReadDeeperClient.tsx # No changes
    FromSekClient.tsx    # No changes
  data/
    tools.ts             # No changes
    cases.ts             # No changes
    experts.ts           # No changes
    activities.ts        # No changes
    stats.ts             # No changes
  messages/
    en.json              # Added questionnaire namespace + new home keys
    ar.json              # Added questionnaire namespace + new home keys (Arabic)
```

## Validated Sources

All external links in the toolkit are real, validated URLs:
- Scratch: https://scratch.mit.edu
- Quick Draw: https://quickdraw.withgoogle.com
- Teachable Machine: https://teachablemachine.withgoogle.com
- Khanmigo: https://www.khanmigo.ai
- ChatGPT: https://chat.openai.com
- MIT App Inventor: https://appinventor.mit.edu
- Day of AI: https://dayofai.org
- Reuters case: https://www.reuters.com/technology/spain-school-deepfakes-2023-09-22/
- CNN case: https://www.cnn.com/2023/04/29/us/ai-scam-calls-kidnapping-audio
- SCMP case: https://www.scmp.com/news/hong-kong/law-and-crime/article/3250851/
- SDAIA: https://sdaia.gov.sa
- Tuwaiq: https://tuwaiq.edu.sa
- UNICEF AI: https://www.unicef.org/globalinsight/featured-projects/ai-children
- Common Sense Media: https://www.commonsensemedia.org
- MIT RAISE: https://raise.mit.edu
- AI Pedagogy: https://aipedagogy.org
- AI4K12: https://ai4k12.org

## Future Enhancements (Not Yet Implemented)

1. **Server-side personalization** - Use the cookie UID with a backend to persist profiles across devices
2. **A/B testing** - Track which questionnaire paths lead to deeper engagement
3. **Image generation** - Generate unique header images for each page section
4. **PDF export** - Allow parents to download personalized toolkit summaries
5. **Workshop integration** - QR code at workshops that pre-fills questionnaire
6. **Analytics** - Anonymous usage tracking to improve content curation
7. **Push notifications** - Alert parents when new content is added matching their interests
