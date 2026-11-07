import React, { useState } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { StudentProfile } from '../../types/student'
import confetti from 'canvas-confetti'
import {
  GraduationCap,
  Award,
  Coins,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Info,
  Lock,
  UserCheck
} from 'lucide-react'

export function StudentOnboarding() {
  const { profile, updateProfile, setCurrentView, scholarships, getEligibilityFor } = useStore()
  const [step, setStep] = useState(1)

  // Local form state initialized from profile
  const [formData, setFormData] = useState<StudentProfile>(profile)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      // Step 4 final submission
      updateProfile({ ...formData, onboardingCompleted: true })
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        })
      } catch {
        // ignore if confetti fails in test environment
      }
      setCurrentView('dashboard')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Pre-calculate instant match count for Step 4
  const eligibleMatches = scholarships.filter((s) => {
    const res = getEligibilityFor(s.id)
    return res && res.overallMatchScore >= 65
  })

  return (
    <div className="w-full min-h-[90vh] bg-[#FBFBFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Onboarding Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personal Eligibility Profile</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
            Set Up Your Scholarship Profile
          </h1>
          <p className="text-sm text-[#475569] max-w-xl mx-auto leading-relaxed">
            GRANTLY matches criteria mathematically. We only ask for information strictly required by scholarship trusts and government guidelines.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="p-4 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs">
          <div className="flex items-center justify-between text-xs font-mono font-medium text-[#64748B] mb-2">
            <span>Step {step} of 4: {step === 1 ? 'Education' : step === 2 ? 'Academics' : step === 3 ? 'Eligibility' : 'Review & Confirm'}</span>
            <span>{step * 25}% Completed</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2563EB] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#CBD5E1] shadow-md space-y-8">
          {/* STEP 1: EDUCATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#0A192F]">Degree & Institution</h2>
                  <p className="text-xs text-[#64748B]">Where you study and current academic enrollment</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    Current Study Level *
                  </label>
                  <select
                    value={formData.educationLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        educationLevel: e.target.value as StudentProfile['educationLevel']
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] bg-white"
                  >
                    <option value="Undergraduate">Undergraduate (B.Tech, B.Sc, B.A, B.Com, MBBS)</option>
                    <option value="Postgraduate">Postgraduate (M.Tech, M.Sc, M.A, MBA)</option>
                    <option value="Doctoral">Doctoral (Ph.D. / Research Scholar)</option>
                    <option value="High School">Class 11 / 12 / Pre-University</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    Current Academic Year *
                  </label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] bg-white"
                  >
                    <option value="Year 1 (Freshman)">Year 1 (Freshman)</option>
                    <option value="Year 2 (Sophomore)">Year 2 (Sophomore)</option>
                    <option value="Year 3 (Pre-final)">Year 3 (Pre-final)</option>
                    <option value="Year 4 (Final Year)">Year 4 (Final Year)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                  Course or Major Discipline *
                </label>
                <input
                  type="text"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g. Computer Science, Mechanical Engineering, Economics"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    College / University Institution *
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. National Institute of Technology"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    State / Region *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Karnataka, Maharashtra, Delhi"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ACADEMICS */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#0A192F]">Academic Performance</h2>
                  <p className="text-xs text-[#64748B]">Cumulative GPA and qualifying benchmarks</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    Current CGPA (Out of 10.0) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1.0"
                    max="10.0"
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Prestigious fellowships (Rhodes, PMRF) typically require 8.0+ CGPA.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    Max CGPA Scale
                  </label>
                  <select
                    value={formData.maxCgpa}
                    onChange={(e) => setFormData({ ...formData, maxCgpa: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] bg-white"
                  >
                    <option value="10.0">10.0 Scale (Indian Universities / IITs / NITs)</option>
                    <option value="4.0">4.0 Scale (US / International)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#0A192F]">
                  <Info className="w-4 h-4 text-[#2563EB]" />
                  <span>Why we verify academic scores</span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Both merit grants and government research fellowships use cutoffs. Stating an accurate CGPA prevents wasted effort applying to programs with unbending grade thresholds.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: ELIGIBILITY & PRIVACY */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#0A192F]">Financial & Need Criteria</h2>
                  <p className="text-xs text-[#64748B]">Unlocking need-based and reserved category grants</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 leading-relaxed">
                  <strong>Strict Privacy Disclosure:</strong> Your economic and category data is stored locally in your browser. We never monetize or sell personal details to lenders or third-party institutions.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    Annual Family Income Bracket *
                  </label>
                  <select
                    value={formData.incomeBracket}
                    onChange={(e) => {
                      const bracket = e.target.value as StudentProfile['incomeBracket']
                      let numericIncome = 450000
                      if (bracket === '< 2.5 LPA') numericIncome = 200000
                      else if (bracket === '2.5 - 5 LPA') numericIncome = 450000
                      else if (bracket === '5 - 8 LPA') numericIncome = 700000
                      else if (bracket === '8 - 12 LPA') numericIncome = 1000000
                      else numericIncome = 1500000

                      setFormData({
                        ...formData,
                        incomeBracket: bracket,
                        familyIncome: numericIncome
                      })
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] bg-white"
                  >
                    <option value="< 2.5 LPA">&lt; ₹2.5 Lakhs / year (High Need-Based Priority)</option>
                    <option value="2.5 - 5 LPA">₹2.5 — ₹5.0 Lakhs / year (Tata Trusts / Means Grants)</option>
                    <option value="5 - 8 LPA">₹5.0 — ₹8.0 Lakhs / year (NOS / Central Schemes)</option>
                    <option value="8 - 12 LPA">₹8.0 — ₹12.0 Lakhs / year</option>
                    <option value="> 12 LPA">&gt; ₹12.0 Lakhs / year (Merit Fellowships & Global)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    Social Category / Reservation
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as StudentProfile['category']
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] bg-white"
                  >
                    <option value="General">General / Open Category</option>
                    <option value="OBC">Other Backward Classes (OBC-NCL)</option>
                    <option value="SC/ST">Scheduled Caste / Scheduled Tribe (SC/ST)</option>
                    <option value="EWS">Economically Weaker Section (EWS)</option>
                    <option value="Minority">Religious / Linguistic Minority</option>
                    <option value="International">International Student</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-700 font-semibold mb-2">
                    Gender Identity (For Women-in-STEM Grants)
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gender: e.target.value as StudentProfile['gender']
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] bg-white"
                  >
                    <option value="Female">Female (Unlocks Adobe & Google Women in Tech)</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary / Diverse</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    type="checkbox"
                    id="firstGen"
                    checked={formData.firstGenerationCollegeStudent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        firstGenerationCollegeStudent: e.target.checked
                      })
                    }
                    className="w-5 h-5 text-[#2563EB] rounded focus:ring-[#2563EB]"
                  />
                  <label htmlFor="firstGen" className="text-xs text-slate-700 font-medium">
                    First-generation college student in family (Special philanthropic consideration)
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & CONFIRM */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0D9488] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-[#0A192F]">Review Your Profile</h2>
                  <p className="text-xs text-[#64748B]">Verify criteria before calculating matched opportunities</p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Education</div>
                  <div className="text-sm font-semibold text-slate-900">{formData.educationLevel}</div>
                  <div className="text-xs text-slate-600 truncate">{formData.course} • {formData.institution}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Academic Score</div>
                  <div className="text-sm font-semibold text-[#0D9488] font-mono">{formData.cgpa.toFixed(2)} CGPA</div>
                  <div className="text-xs text-slate-600">{formData.academicYear}</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="text-[11px] font-mono text-slate-500 uppercase">Income Bracket</div>
                  <div className="text-sm font-semibold text-slate-900">{formData.incomeBracket}</div>
                  <div className="text-xs text-slate-600">Category: {formData.category}</div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <div className="text-[11px] font-mono text-blue-700 uppercase">Calculated Fit</div>
                  <div className="text-sm font-semibold text-[#2563EB] font-mono">
                    {eligibleMatches.length} Strong Matches Available
                  </div>
                  <div className="text-xs text-blue-800">Ready for Instant Inspection</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                You can adjust any of these criteria later at any time from your dashboard or profile settings.
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="px-5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              className="px-7 py-3 rounded-xl bg-[#2563EB] text-white text-sm font-semibold hover:bg-[#1D4ED8] transition-colors shadow-md flex items-center gap-2"
            >
              <span>{step === 4 ? 'Confirm & Go to Dashboard' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
