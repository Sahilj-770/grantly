import { Scholarship, ScholarshipRequirement, EligibilityResult, EligibilityStatus } from '../types/scholarship'
import { StudentProfile } from '../types/student'
import { VaultDocument } from '../types/document'

export const MATCH_DISCLAIMER =
  'Eligibility estimation is strictly an assessment of published criteria against self-reported profile data. It does not constitute a guarantee of award or university admission.'

export function calculateEligibility(
  scholarship: Scholarship,
  profile: StudentProfile,
  documents: VaultDocument[] = []
): EligibilityResult {
  const metRequirements: ScholarshipRequirement[] = []
  const unmetRequirements: ScholarshipRequirement[] = []
  const pendingRequirements: ScholarshipRequirement[] = []
  const matchReasons: string[] = []
  const missingActions: string[] = []

  // Check if fundamental student profile data is missing
  const isProfileIncomplete =
    !profile.cgpa || profile.cgpa <= 0 || !profile.educationLevel || !profile.course || profile.course.trim() === ''

  if (isProfileIncomplete) {
    return {
      scholarshipId: scholarship.id,
      overallMatchScore: 0,
      isEligible: false,
      status: 'missing_information',
      statusLabel: 'Missing Student Information',
      metRequirements: [],
      unmetRequirements: scholarship.requirements.filter((r) => r.mandatory),
      pendingRequirements: scholarship.requirements,
      matchReasons: [],
      missingActions: ['Complete your GPA, course, and education level in your profile to run criteria calculation.'],
      disclaimer: MATCH_DISCLAIMER
    }
  }

  let score = 0
  let failedMandatory = false

  // 1. Academic Performance Evaluation (Weight: 35 points)
  const academicReq = scholarship.requirements.find((r) => r.type === 'academic')
  if (profile.cgpa >= scholarship.minCgpa) {
    score += 35
    if (academicReq) metRequirements.push(academicReq)
    matchReasons.push(
      `Your academic standing (${profile.cgpa.toFixed(2)} CGPA) satisfies the minimum threshold of ${scholarship.minCgpa.toFixed(2)}.`
    )
  } else if (profile.cgpa >= scholarship.minCgpa - 0.4) {
    score += 15
    if (academicReq) unmetRequirements.push(academicReq)
    missingActions.push(
      `Your current CGPA (${profile.cgpa.toFixed(2)}) is slightly under the published ${scholarship.minCgpa.toFixed(2)} benchmark. Merit appeals or final semester GPA boosts may be required.`
    )
  } else {
    failedMandatory = true
    if (academicReq) unmetRequirements.push(academicReq)
    missingActions.push(
      `Fails minimum academic threshold: Requires ${scholarship.minCgpa.toFixed(2)} CGPA (profile reports ${profile.cgpa.toFixed(2)}).`
    )
  }

  // 2. Education Level Fit (Weight: 25 points)
  const levelMatches = scholarship.educationLevels.includes(profile.educationLevel)
  if (levelMatches) {
    score += 25
    matchReasons.push(`Open to current ${profile.educationLevel} scholars.`)
  } else {
    failedMandatory = true
    missingActions.push(
      `Education level mismatch: Available strictly for ${scholarship.educationLevels.join(' or ')} (profile: ${profile.educationLevel}).`
    )
  }

  // 3. Field of Study / Course Alignment (Weight: 15 points)
  const isFieldMatch =
    scholarship.eligibleFields.includes('Any') ||
    scholarship.eligibleFields.some((f) => profile.course.toLowerCase().includes(f.toLowerCase()))

  const fieldReq = scholarship.requirements.find((r) => r.type === 'field')
  if (isFieldMatch) {
    score += 15
    if (fieldReq) metRequirements.push(fieldReq)
    matchReasons.push(`Your discipline (${profile.course}) is included in eligible study programs.`)
  } else {
    score += 5
    if (fieldReq) unmetRequirements.push(fieldReq)
    missingActions.push(`Prioritized specifically for students in ${scholarship.eligibleFields.join(', ')}.`)
  }

  // 4. Financial / Income Ceiling (Weight: 15 points)
  const incomeReq = scholarship.requirements.find((r) => r.type === 'income')
  if (scholarship.maxFamilyIncome === null) {
    score += 15
    if (incomeReq) metRequirements.push(incomeReq)
    matchReasons.push('Open to all economic brackets with no maximum income ceiling.')
  } else if (profile.familyIncome <= scholarship.maxFamilyIncome) {
    score += 15
    if (incomeReq) metRequirements.push(incomeReq)
    matchReasons.push(
      `Family income bracket is within the allowable limit of ₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')}.`
    )
  } else {
    failedMandatory = true
    if (incomeReq) unmetRequirements.push(incomeReq)
    missingActions.push(
      `Family annual income (₹${profile.familyIncome.toLocaleString('en-IN')}) exceeds published ceiling of ₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')}.`
    )
  }

  // 5. Document Readiness Verification (Weight: 10 points)
  const uploadedCategories = new Set(documents.map((d) => d.category))
  let docPoints = 0
  if (uploadedCategories.has('academic')) docPoints += 5
  if (uploadedCategories.has('identity')) docPoints += 3
  if (uploadedCategories.has('income') || !scholarship.maxFamilyIncome) docPoints += 2

  score += Math.min(10, docPoints)

  // Track pending requirements (e.g. recommendation letters, portfolio, essays)
  const nonAutomatedReqs = scholarship.requirements.filter(
    (r) => r.type === 'document' || r.type === 'portfolio' || r.type === 'interview' || r.type === 'citizenship'
  )
  nonAutomatedReqs.forEach((req) => {
    pendingRequirements.push(req)
  })

  // Determine explicit status
  let status: EligibilityStatus = 'potential_match'
  let statusLabel = 'Potential Match'

  if (failedMandatory) {
    status = 'ineligible_mandatory_criteria'
    statusLabel = 'Does Not Meet Mandatory Criteria'
  } else if (nonAutomatedReqs.some((r) => r.type === 'portfolio' || r.type === 'interview')) {
    status = 'manual_verification_required'
    statusLabel = 'Requires Manual Verification'
  } else if (score >= 80) {
    status = 'eligible_known_criteria'
    statusLabel = 'Eligible Against Known Criteria'
  } else {
    status = 'potential_match'
    statusLabel = 'Potential Match'
  }

  const finalScore = failedMandatory ? Math.min(score, 45) : score

  return {
    scholarshipId: scholarship.id,
    overallMatchScore: finalScore,
    isEligible: !failedMandatory && finalScore >= 60,
    status,
    statusLabel,
    metRequirements,
    unmetRequirements,
    pendingRequirements,
    matchReasons,
    missingActions,
    disclaimer: MATCH_DISCLAIMER
  }
}
