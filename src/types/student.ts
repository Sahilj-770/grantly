export interface StudentProfile {
  name: string
  email: string
  avatarUrl?: string
  educationLevel: 'Undergraduate' | 'Postgraduate' | 'Doctoral' | 'High School'
  course: string
  academicYear: string
  institution: string
  state: string
  country: string
  cgpa: number
  maxCgpa: number
  familyIncome: number // in local currency (e.g., INR or USD)
  incomeBracket: '< 2.5 LPA' | '2.5 - 5 LPA' | '5 - 8 LPA' | '8 - 12 LPA' | '> 12 LPA'
  category: 'General' | 'OBC' | 'SC/ST' | 'EWS' | 'Minority' | 'International'
  gender: 'Female' | 'Male' | 'Non-Binary' | 'Prefer not to say'
  firstGenerationCollegeStudent: boolean
  onboardingCompleted: boolean
  savedScholarshipIds: string[]
}

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: 'Ananya Sharma',
  email: 'ananya.sharma@uni.edu',
  educationLevel: 'Undergraduate',
  course: 'Computer Science & Artificial Intelligence',
  academicYear: 'Year 3 (Pre-final)',
  institution: 'National Institute of Technology',
  state: 'Karnataka',
  country: 'India',
  cgpa: 8.85,
  maxCgpa: 10.0,
  familyIncome: 450000,
  incomeBracket: '2.5 - 5 LPA',
  category: 'General',
  gender: 'Female',
  firstGenerationCollegeStudent: false,
  onboardingCompleted: true,
  savedScholarshipIds: ['sch-rhodes-2026', 'sch-tata-2026', 'sch-national-overseas-2026'],
}
