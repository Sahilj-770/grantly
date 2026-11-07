import { ScholarshipCategory } from '../types/scholarship'

export interface FundingPathway {
  id: ScholarshipCategory
  title: string
  subtitle: string
  disbursementAverage: string
  totalOpportunities: number
  description: string
  keyFocus: string
  criteriaHighlight: string
  badgeBg: string
  badgeColor: string
  accentColor: string
}

export const FUNDING_PATHWAYS: FundingPathway[] = [
  {
    id: 'government',
    title: 'Government Scholarships',
    subtitle: 'Central & State Ministerial Grants',
    disbursementAverage: '₹80,000 — ₹9,60,000 / yr',
    totalOpportunities: 42,
    description: 'Direct benefit transfer schemes funded by central ministries (Social Justice, Education, DST) ensuring equitable higher education access with statutory fee waivers.',
    keyFocus: 'Direct Benefit Transfer (DBT), Reservation parity, Ph.D. Fellowships',
    criteriaHighlight: 'Indian nationality, accredited college enrollment, category certificates where applicable',
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    badgeColor: '#059669',
    accentColor: '#10B981'
  },
  {
    id: 'merit',
    title: 'Merit-Based Fellowships',
    subtitle: 'Academic Excellence & Leadership',
    disbursementAverage: '£55,000 — £65,000 / yr',
    totalOpportunities: 31,
    description: 'Ultra-competitive endowments recognizing world-class scholarship, character, and transformational leadership potential at top global academies.',
    keyFocus: 'Rhodes, Gates Cambridge, Inlaks, Premier University Laureates',
    criteriaHighlight: 'Top 5% class standing, exceptional research publications, compelling personal vision',
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-800',
    badgeColor: '#2563EB',
    accentColor: '#3B82F6'
  },
  {
    id: 'need',
    title: 'Need-Based Financial Aid',
    subtitle: 'Income Parity & Hardship Relief',
    disbursementAverage: '₹50,000 — ₹2,00,000 / yr',
    totalOpportunities: 38,
    description: 'Philanthropic grants ensuring high-potential students from economically constrained households can complete their higher studies without debt.',
    keyFocus: 'Tuition subsidies, living stipends, emergency hardship grants',
    criteriaHighlight: 'Annual family income under ₹4.5L to ₹8L with verified revenue certificates',
    badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
    badgeColor: '#D97706',
    accentColor: '#F59E0B'
  },
  {
    id: 'stem-research',
    title: 'STEM & Tech Fellowships',
    subtitle: 'Innovation, Code & Research',
    disbursementAverage: '$2,500 — $10,000 / yr',
    totalOpportunities: 26,
    description: 'Corporate and foundation fellowships incentivizing women in computer science, scientific discovery, robotics, and patentable engineering.',
    keyFocus: 'Google, Adobe, CSIR lab affiliations, hardware and conference grants',
    criteriaHighlight: 'Enrolled in STEM disciplines, coding challenge or research proposal review',
    badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    badgeColor: '#4F46E5',
    accentColor: '#6366F1'
  },
  {
    id: 'international',
    title: 'International Study Grants',
    subtitle: 'Global Mobility & Bilateral Exchanges',
    disbursementAverage: '$40,000 — $80,000 / yr',
    totalOpportunities: 24,
    description: 'Bilateral government treaties and cultural commissions funding postgraduate studies, research residencies, and visas across USA, UK, and Europe.',
    keyFocus: 'Fulbright, Charpak France, DAAD Germany, Chevening, Erasmus Mundus',
    criteriaHighlight: 'Foreign university admission offer, language proficiency, cultural ambassador mindset',
    badgeBg: 'bg-cyan-50 border-cyan-200 text-cyan-800',
    badgeColor: '#0891B2',
    accentColor: '#06B6D4'
  },
  {
    id: 'creative',
    title: 'Creative Arts & Humanities',
    subtitle: 'Literature, Heritage & Visual Arts',
    disbursementAverage: '£4,500 — ₹5,00,000',
    totalOpportunities: 18,
    description: 'Specialized grants supporting emerging authors, documentary filmmakers, museum curators, and cultural preservationists.',
    keyFocus: 'Charles Wallace Trust, British Council residencies, heritage conservation fellowships',
    criteriaHighlight: 'Demonstrated creative portfolio, institution residency affiliation, published works',
    badgeBg: 'bg-purple-50 border-purple-200 text-purple-800',
    badgeColor: '#7C3AED',
    accentColor: '#8B5CF6'
  }
]
