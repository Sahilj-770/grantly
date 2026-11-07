import { Scholarship, ScholarshipRequirement, EligibilityResult } from '../types/scholarship'
import { StudentProfile } from '../types/student'
import { VaultDocument } from '../types/document'

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

  let score = 0

  // 1. Academic Performance Evaluation (Weight: 30 points)
  const academicReq = scholarship.requirements.find(r => r.type === 'academic')
  if (profile.cgpa >= scholarship.minCgpa) {
    score += 30
    if (academicReq) metRequirements.push(academicReq)
    matchReasons.push(`Your academic CGPA of ${profile.cgpa.toFixed(2)} exceeds the minimum requirement of ${scholarship.minCgpa.toFixed(2)}.`)
  } else if (profile.cgpa >= scholarship.minCgpa - 0.5) {
    score += 15
    if (academicReq) unmetRequirements.push(academicReq)
    missingActions.push(`Current CGPA (${profile.cgpa.toFixed(2)}) is slightly below the ${scholarship.minCgpa.toFixed(2)} threshold. Look into merit appeals or final semester grade boosts.`)
  } else {
    score += 0
    if (academicReq) unmetRequirements.push(academicReq)
    missingActions.push(`Requires a minimum CGPA of ${scholarship.minCgpa.toFixed(2)} (your profile: ${profile.cgpa.toFixed(2)}).`)
  }

  // 2. Education Level Fit (Weight: 25 points)
  const levelMatches = scholarship.educationLevels.includes(profile.educationLevel)
  if (levelMatches) {
    score += 25
    matchReasons.push(`Eligible for your current ${profile.educationLevel} study level.`)
  } else {
    missingActions.push(`Applicable for ${scholarship.educationLevels.join(' or ')} (you are currently enrolled as ${profile.educationLevel}).`)
  }

  // 3. Field of Study / Course Alignment (Weight: 15 points)
  const isFieldMatch =
    scholarship.eligibleFields.includes('Any') ||
    scholarship.eligibleFields.some(f => profile.course.toLowerCase().includes(f.toLowerCase()))

  const fieldReq = scholarship.requirements.find(r => r.type === 'field')
  if (isFieldMatch) {
    score += 15
    if (fieldReq) metRequirements.push(fieldReq)
    matchReasons.push(`Your course (${profile.course}) falls under eligible disciplines.`)
  } else {
    score += 5
    if (fieldReq) unmetRequirements.push(fieldReq)
    missingActions.push(`Scholarship prioritizes ${scholarship.eligibleFields.join(', ')}.`)
  }

  // 4. Financial / Income Ceiling (Weight: 20 points)
  const incomeReq = scholarship.requirements.find(r => r.type === 'income')
  if (scholarship.maxFamilyIncome === null) {
    // Open to all economic brackets
    score += 20
    if (incomeReq) metRequirements.push(incomeReq)
    matchReasons.push(`Open to all income brackets with no ceiling.`)
  } else if (profile.familyIncome <= scholarship.maxFamilyIncome) {
    score += 20
    if (incomeReq) metRequirements.push(incomeReq)
    matchReasons.push(`Family annual income (₹${profile.familyIncome.toLocaleString('en-IN')}) is within the permissible limit of ₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')}.`)
  } else {
    score += 0
    if (incomeReq) unmetRequirements.push(incomeReq)
    missingActions.push(`Income ceiling is ₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')} (your profile: ₹${profile.familyIncome.toLocaleString('en-IN')}).`)
  }

  // 5. Document Readiness Verification (Weight: 10 points)
  const uploadedCategories = new Set(documents.map(d => d.category))
  let docPoints = 0
  if (uploadedCategories.has('academic')) docPoints += 5
  if (uploadedCategories.has('identity')) docPoints += 3
  if (scholarship.maxFamilyIncome && uploadedCategories.has('income')) docPoints += 2
  else if (!scholarship.maxFamilyIncome) docPoints += 2

  score += Math.min(10, docPoints)

  // Document requirement audit
  const docReqs = scholarship.requirements.filter(r => r.type === 'document' || r.type === 'citizenship')
  docReqs.forEach(req => {
    if (req.type === 'document' && uploadedCategories.has('academic')) {
      pendingRequirements.push(req)
    } else {
      pendingRequirements.push(req)
    }
  })

  // Final status classification
  let status: 'strongly_eligible' | 'potential_match' | 'needs_criteria' | 'ineligible' = 'potential_match'
  if (score >= 85) {
    status = 'strongly_eligible'
  } else if (score >= 65) {
    status = 'potential_match'
  } else if (score >= 45) {
    status = 'needs_criteria'
  } else {
    status = 'ineligible'
  }

  return {
    scholarshipId: scholarship.id,
    overallMatchScore: Math.min(100, Math.max(10, score)),
    isEligible: score >= 60,
    status,
    metRequirements,
    unmetRequirements,
    pendingRequirements,
    matchReasons,
    missingActions
  }
}
