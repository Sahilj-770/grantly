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
  spineBg: string
  spineAccent: string
  spineFoil: string
  coverImage: string
}

export const FUNDING_PATHWAYS: FundingPathway[] = [
  {
    id: 'government',
    title: 'Government Schemes',
    subtitle: 'Central & State Statutory Grants',
    disbursementAverage: '₹80,000 — ₹9,60,000 / yr',
    totalOpportunities: 42,
    description: 'Direct Benefit Transfer (DBT) schemes funded by the Ministry of Social Justice, Ministry of Education, and DST ensuring statutory fee waivers and research stipends.',
    keyFocus: 'Direct Benefit Transfer (DBT), Reservation parity, PMRF & NOS Fellowships',
    criteriaHighlight: 'Indian nationality, accredited college enrollment, category and income certificates where applicable',
    spineBg: '#132A13',
    spineAccent: '#4F772D',
    spineFoil: '#D4AF37',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'merit',
    title: 'Merit Fellowships',
    subtitle: 'Global Academic Laureates',
    disbursementAverage: '£55,000 — £65,000 / yr',
    totalOpportunities: 31,
    description: 'Ultra-prestigious endowments recognizing exceptional intellect, leadership, and social contribution at Oxford, Cambridge, and global elite universities.',
    keyFocus: 'Rhodes Trust, Gates Cambridge, Inlaks, Premier University Laureates',
    criteriaHighlight: 'Top 5% class standing, exceptional research record, compelling personal vision statement',
    spineBg: '#0A192F',
    spineAccent: '#2563EB',
    spineFoil: '#F59E0B',
    coverImage: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'need',
    title: 'Need-Based Aid',
    subtitle: 'Means Grants & Tuition Relief',
    disbursementAverage: '₹50,000 — ₹2,00,000 / yr',
    totalOpportunities: 38,
    description: 'Philanthropic means-tested aid ensuring meritorious scholars from economically constrained households finish their degrees completely debt-free.',
    keyFocus: 'Tata Trusts, Reliance Foundation, tuition waivers, living expense allowances',
    criteriaHighlight: 'Annual household income under ₹4.5L to ₹8L verified via Tahsildar revenue certificate',
    spineBg: '#3D2612',
    spineAccent: '#B45309',
    spineFoil: '#FBBF24',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'stem-research',
    title: 'STEM & Engineering',
    subtitle: 'Computing, Deep Tech & Discovery',
    disbursementAverage: '$2,500 — $10,000 / yr',
    totalOpportunities: 26,
    description: 'Industry and research lab fellowships incentivizing women in computer science, artificial intelligence, robotics, and fundamental sciences.',
    keyFocus: 'Google APAC, Adobe Women in Tech, CSIR fellowships, conference hardware stipends',
    criteriaHighlight: 'Enrolled in accredited STEM degrees, coding assessment or research proposal review',
    spineBg: '#1E1B4B',
    spineAccent: '#4F46E5',
    spineFoil: '#A5B4FC',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'international',
    title: 'Global Mobility',
    subtitle: 'Bilateral Treaties & Residencies',
    disbursementAverage: '$40,000 — $80,000 / yr',
    totalOpportunities: 24,
    description: 'Intergovernmental commissions funding postgraduate studies, research stays, and J-1/Schengen visas across the USA, UK, France, and Germany.',
    keyFocus: 'Fulbright-Nehru, Charpak France, DAAD Germany, Erasmus Mundus, Commonwealth',
    criteriaHighlight: 'Unconditional admission offer from target foreign university, cultural exchange ambassador',
    spineBg: '#083344',
    spineAccent: '#0891B2',
    spineFoil: '#67E8F9',
    coverImage: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'creative',
    title: 'Creative & Sports',
    subtitle: 'Arts, Writing, Heritage & Athletics',
    disbursementAverage: '£4,500 — ₹5,00,000',
    totalOpportunities: 18,
    description: 'Dedicated foundation grants supporting emerging authors, documentary filmmakers, cultural conservationists, and national-tier student athletes.',
    keyFocus: 'Charles Wallace Trust, British Council residencies, sports merit fellowships',
    criteriaHighlight: 'Curated 10-page creative portfolio or national sports federation medal certificate',
    spineBg: '#3B0764',
    spineAccent: '#9333EA',
    spineFoil: '#E9D5FF',
    coverImage: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80'
  }
]
