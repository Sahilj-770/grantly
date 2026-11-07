# GRANTLY — Intelligent Scholarship Discovery & Application Companion

> *"Find what you're eligible for. Focus on what comes next."*

**GRANTLY** is an independent, premium scholarship intelligence and education finance management platform. It transforms how students discover, understand, apply for, and manage academic scholarships, grants, and fellowships—eliminating the anxiety of fragmented portals, buried eligibility criteria, and missed deadlines.

---

## Brand Visual Identity & Color System

The platform strictly adheres to the GRANTLY design token system:

| Token Name | Hex Code | Semantic Role |
|---|---|---|
| **Warm Porcelain** | `#FBFBFA` | Warm paper canvas background, crisp breathing room, calm light mode |
| **Midnight Navy** | `#0A192F` | Primary brand accent, authoritative headings, high-contrast text |
| **Electric Cobalt** | `#2563EB` | Interactive highlights, active tabs, primary call-to-actions |
| **Warm Amber** | `#D97706` | Approaching deadlines, urgent alerts, attention cues |
| **Muted Teal** | `#0D9488` | Requirements met, verified eligibility, approved status |
| **Card Surface** | `#FFFFFF` | Elevated cards, input fields, and modal containers |
| **Hairline Border** | `#CBD5E1` | High-definition subtle boundaries |

---

## Signature Animation Engineering

GRANTLY introduces five signature motion experiences, built exclusively with GPU-accelerated transforms (`transform` and `opacity`) and strict `prefers-reduced-motion` fallbacks:

1. **Cinematic Split-Curtain Reveal (`SplitCurtainHero.tsx`)**
   - Two large editorial panels framing the central message smoothly part along the $X$-axis as the user scrolls, contrasting bureaucratic friction with financial empowerment.
   - Interpolated kinematic lerp ($0.16$ response rate) with main-thread bypass.

2. **Cylindrical Curved Carousel (`FeaturedCurvedCarousel.tsx`)**
   - Top flagship endowments (Rhodes, PMRF, Gates Cambridge, Tata Trusts, Google APAC) arranged on a parametric 3D cylindrical arc with mouse/touch drag physics and keyboard arrow navigation.
   - Automatically degrades into an accessible horizontal snap scroll on mobile devices.

3. **Interactive 3D Archive Shelf (`FundingPathwaysShelf.tsx`)**
   - Archival library volume presentation representing 6 funding pathways (Government, Merit, Need-Based, STEM, International, Creative).
   - Features mouse-following perspective tilt and direct filtering integration.

4. **Three.js Scroll-Driven 4-Stage Ribbon (`JourneyRibbonScene.tsx`)**
   - Centripetal Catmull-Rom WebGL spline guiding students through the 4 core stages: `01 — DISCOVER`, `02 — CHECK`, `03 — APPLY`, and `04 — PROGRESS`.
   - Complete WebGL lifecycle disposal (geometries, textures, materials, and renderer) on unmount, with a responsive 2D fallback for mobile.

5. **Abstract Opportunity Network Canvas (`OpportunityNetworkCanvas.tsx`)**
   - Ambient constellation background with floating opportunity nodes and geometric connection lines.
   - Features automatic viewport pause via `IntersectionObserver` to preserve battery life.

---

## Product Architecture & Core Features

- **Personalized Student Dashboard (`StudentDashboard.tsx`)**
  - Instant welcome, profile completeness score, recommended next action alert, top qualified scholarship matches, and active application pipeline.

- **4-Step Interactive Onboarding (`StudentOnboarding.tsx`)**
  - Step 1: Degree level, course, academic year, and institution.
  - Step 2: CGPA / GPA scale and academic credentials.
  - Step 3: Family income bracket and social reservation categories (with strict zero-resale privacy disclosures).
  - Step 4: Profile review with real-time explanation of why each criterion matters.

- **Scholarship Discovery Directory (`ScholarshipDiscovery.tsx`)**
  - Search by name, provider, or tags.
  - Multi-criteria filtering by study level, funding category, and eligibility match percentage.
  - Instant Grid vs List view toggle and bookmark management.

- **Detailed Qualification Dossier Modal (`ScholarshipDetailModal.tsx`)**
  - Itemized mathematical breakdown: Requirements Met, Criteria Requiring Attention, and Mandatory Criteria.
  - Benefits & grant breakdown, required documents checklist, and official verified portal links.

- **Multi-Stage Application Tracker (`ApplicationTracker.tsx`)**
  - Visual Kanban board and list view spanning 6 stages: *Interested*, *Preparing*, *Ready*, *Submitted*, *Under Review*, and *Approved*.
  - Inline note logging, deadline reminders, and milestone history events.

- **Encrypted Document Vault (`DocumentVault.tsx`)**
  - Encrypted repository for academic transcripts, government identity, revenue certificates, and recommendation letters.
  - Expiry reminders, certificate hash verification, and document inspection sheet.

- **GRANTLY AI Advisor (`ScholarshipAssistant.tsx`)**
  - Contextually grounded AI assistant cross-referencing published institutional guidelines against the student's profile.
  - Provides actionable suggestions with one-click direct dossier triggers.

---

## Technical Stack

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 + Design Tokens
- **Icons:** Lucide React (zero emojis)
- **3D Graphics:** Three.js (WebGL)
- **Animations:** Framer Motion + GSAP + Hardware-accelerated CSS Variables
- **Testing & QA:** Playwright end-to-end browser verification

---

## Running Locally

```bash
# 1. Navigate to the grantly directory
cd grantly

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Compile production build
npm run build

# 5. Run Playwright Automated QA Suite
python run_grantly_qa.py
```
