export type ScholarshipCategory =
  | 'government'
  | 'merit'
  | 'need'
  | 'stem-research'
  | 'international'
  | 'creative'

export interface ScholarshipRequirement {
  id: string
  label: string
  mandatory: boolean
  type: 'academic' | 'income' | 'field' | 'citizenship' | 'document'
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
  acceptanceRate: string
  featured: boolean
  tags: string[]
  matchScore?: number
}

export interface EligibilityResult {
  scholarshipId: string
  overallMatchScore: number
  isEligible: boolean
  status: 'strongly_eligible' | 'potential_match' | 'needs_criteria' | 'ineligible'
  metRequirements: ScholarshipRequirement[]
  unmetRequirements: ScholarshipRequirement[]
  pendingRequirements: ScholarshipRequirement[]
  matchReasons: string[]
  missingActions: string[]
}
