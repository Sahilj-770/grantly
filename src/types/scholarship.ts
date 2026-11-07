export type ScholarshipCategory =
  | 'government'
  | 'merit'
  | 'need'
  | 'stem-research'
  | 'international'
  | 'creative'
  | 'private-foundation'
  | 'sports'

export interface ScholarshipRequirement {
  id: string
  label: string
  mandatory: boolean
  type: 'academic' | 'income' | 'field' | 'citizenship' | 'document' | 'portfolio' | 'interview'
}

export interface Scholarship {
  id: string
  title: string
  provider: string
  category: ScholarshipCategory
  amount: number
  currency: string
  amountFormatted: string
  coverageType: 'Full Tuition + Stipend' | 'Partial Tuition' | 'Annual Grant' | 'One-Time Award'
  deadline: string
  daysRemaining: number
  educationLevels: ('High School' | 'Undergraduate' | 'Postgraduate' | 'Doctoral')[]
  eligibleFields: string[]
  minCgpa: number
  maxFamilyIncome: number | null
  description: string
  overview: string
  benefits: string[]
  requirements: ScholarshipRequirement[]
  requiredDocuments: string[]
  applicationProcedure: string[]
  sourceUrl: string
  officialPortal: string
  lastVerified: string
  isOfficialVerified: boolean
  acceptanceRate: string
  featured: boolean
  tags: string[]
  heroImage?: string
  matchScore?: number
}

export type EligibilityStatus =
  | 'eligible_known_criteria'
  | 'potential_match'
  | 'missing_information'
  | 'ineligible_mandatory_criteria'
  | 'manual_verification_required'

export interface EligibilityResult {
  scholarshipId: string
  overallMatchScore: number
  isEligible: boolean
  status: EligibilityStatus
  statusLabel: string
  metRequirements: ScholarshipRequirement[]
  unmetRequirements: ScholarshipRequirement[]
  pendingRequirements: ScholarshipRequirement[]
  matchReasons: string[]
  missingActions: string[]
  disclaimer: string
}
