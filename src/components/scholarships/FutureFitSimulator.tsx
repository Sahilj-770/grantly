import React, { useState, useMemo } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { calculateEligibility } from '../../services/matchingEngine'
import { Scholarship, EligibilityResult } from '../../types/scholarship'
import { StudentProfile } from '../../types/student'
import {
  Sparkles,
  TrendingUp,
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react'

interface ImpactOpportunity {
  scholarship: Scholarship
  baselineResult: EligibilityResult
  projectedResult: EligibilityResult
  scoreDelta: number
  statusChanged: boolean
  remainingRequirements: string[]
}

export function FutureFitSimulator() {
  const { profile, scholarships, documents, quickOpenModal } = useStore()

  const [isOpen, setIsOpen] = useState(false)
  const [hypotheticalCgpa, setHypotheticalCgpa] = useState<number>(() => {
    // Default hypothetical is +0.50 above baseline, capped at 10.0
    return Math.min(10.0, Math.round((profile.cgpa + 0.5) * 10) / 10)
  })

  // Ensure hypothetical profile is completely separate and never mutates actual profile
  const hypotheticalProfile: StudentProfile = useMemo(() => {
    return {
      ...profile,
      cgpa: hypotheticalCgpa
    }
  }, [profile, hypotheticalCgpa])

  // Recalculate baseline vs hypothetical for all scholarships
  const simulationData = useMemo(() => {
    const list: ImpactOpportunity[] = []
    let newlyAccessibleCount = 0
    let totalScoreIncrease = 0

    for (const sch of scholarships) {
      const baseline = calculateEligibility(sch, profile, documents)
      const projected = calculateEligibility(sch, hypotheticalProfile, documents)

      const scoreDelta = projected.overallMatchScore - baseline.overallMatchScore
      const statusChanged = baseline.status !== projected.status

      // Check if newly accessible
      const wasIneligible =
        baseline.status === 'ineligible_mandatory_criteria' || baseline.overallMatchScore < 70
      const nowAccessible =
        projected.status === 'eligible_known_criteria' ||
        projected.status === 'potential_match' ||
        projected.overallMatchScore >= 75

      if (wasIneligible && nowAccessible && scoreDelta > 0) {
        newlyAccessibleCount++
      }

      if (scoreDelta > 0) {
        totalScoreIncrease += scoreDelta
      }

      // Collect unmet non-academic prerequisites
      const remainingRequirements = projected.unmetRequirements
        .filter((r) => r.type !== 'academic')
        .map((r) => r.label)

      list.push({
        scholarship: sch,
        baselineResult: baseline,
        projectedResult: projected,
        scoreDelta,
        statusChanged,
        remainingRequirements
      })
    }

    // Sort by largest positive score delta and meaningful status changes
    const topImpacted = list
      .filter((item) => item.scoreDelta > 0 || item.statusChanged)
      .sort((a, b) => {
        if (a.statusChanged && !b.statusChanged) return -1
        if (!a.statusChanged && b.statusChanged) return 1
        return b.scoreDelta - a.scoreDelta
      })
      .slice(0, 3)

    return {
      newlyAccessibleCount,
      topImpacted,
      totalEvaluated: scholarships.length
    }
  }, [scholarships, profile, hypotheticalProfile, documents])

  const handleReset = () => {
    setHypotheticalCgpa(profile.cgpa)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'eligible_known_criteria':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200'
      case 'potential_match':
        return 'text-blue-700 bg-blue-50 border-blue-200'
      case 'ineligible_mandatory_criteria':
        return 'text-rose-700 bg-rose-50 border-rose-200'
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200'
    }
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8 transition-all">
      {/* Semantic Accessible Accordion Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="futurefit-simulator-panel"
        id="futurefit-simulator-trigger"
        className="w-full text-left p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-[#0A192F] to-slate-900 text-white cursor-pointer select-none flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 transition-colors group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                GRANTLY FutureFit
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400">
                Academic What-If Simulator
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white mt-0.5 group-hover:text-amber-300 transition-colors">
              Explore Academic Potential & Threshold Shifts
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!isOpen && (
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/40">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{simulationData.newlyAccessibleCount} Unlocked at {hypotheticalCgpa.toFixed(2)} CGPA</span>
            </div>
          )}
          <span
            aria-hidden="true"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 group-hover:text-white transition-colors flex items-center justify-center"
          >
            {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </span>
        </div>
      </button>

      {/* Expanded Simulator Body */}
      {isOpen && (
        <div
          id="futurefit-simulator-panel"
          role="region"
          aria-labelledby="futurefit-simulator-trigger"
          className="p-6 sm:p-8 space-y-8 bg-[#FBFBFA]"
        >
          {/* Screen reader live announcement of simulation changes */}
          <div className="sr-only" aria-live="polite" aria-atomic="true">
            {`Projecting academic cutoff at ${hypotheticalCgpa.toFixed(2)} CGPA. Found ${simulationData.newlyAccessibleCount} newly accessible opportunities.`}
          </div>
          {/* Controls Bar: Actual Profile vs Hypothetical Slider */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h4 className="font-serif text-base font-bold text-[#0A192F] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#2563EB]" />
                  <span>Academic Standing Projection</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Slide to model how upcoming semester grades or honors distinctions expand your qualification pool.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Real Actual Profile Pill */}
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono">
                  <span className="text-slate-500">Actual CGPA: </span>
                  <span className="font-bold text-slate-800">{profile.cgpa.toFixed(2)}</span>
                </div>

                {/* Reset button */}
                {hypotheticalCgpa !== profile.cgpa && (
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors text-xs flex items-center gap-1 font-mono"
                    title="Reset to actual CGPA"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Slider Row */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Min 5.00</span>
                <div className="px-4 py-1 rounded-xl bg-[#0A192F] text-white font-mono font-bold text-sm shadow-2xs flex items-center gap-2">
                  <span className="text-amber-400">Projected:</span>
                  <span>{hypotheticalCgpa.toFixed(2)} CGPA</span>
                  {hypotheticalCgpa > profile.cgpa && (
                    <span className="text-[11px] text-emerald-400">
                      (+{(hypotheticalCgpa - profile.cgpa).toFixed(2)})
                    </span>
                  )}
                  {hypotheticalCgpa < profile.cgpa && (
                    <span className="text-[11px] text-rose-400">
                      ({(hypotheticalCgpa - profile.cgpa).toFixed(2)})
                    </span>
                  )}
                </div>
                <span className="text-slate-500">Max 10.00</span>
              </div>

              <input
                id="futurefit-cgpa-slider"
                type="range"
                min="5.0"
                max="10.0"
                step="0.05"
                value={hypotheticalCgpa}
                onChange={(e) => setHypotheticalCgpa(parseFloat(e.target.value))}
                aria-label="Hypothetical Target CGPA Slider"
                aria-valuemin={5.0}
                aria-valuemax={10.0}
                aria-valuenow={hypotheticalCgpa}
                aria-valuetext={`${hypotheticalCgpa.toFixed(2)} CGPA, ${
                  hypotheticalCgpa > profile.cgpa
                    ? `projected increase of ${(hypotheticalCgpa - profile.cgpa).toFixed(2)} above baseline`
                    : hypotheticalCgpa < profile.cgpa
                    ? `projected decrease of ${(profile.cgpa - hypotheticalCgpa).toFixed(2)} below baseline`
                    : 'equal to actual baseline'
                }`}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              />
            </div>
          </div>

          {/* Impact Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
                Newly Accessible
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
                +{simulationData.newlyAccessibleCount} Grants
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Satisfies minimum GPA cutoff</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
                Profile Status
              </div>
              <div className="text-sm font-bold text-slate-800 mt-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Real Data Untouched</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Isolated ephemeral sandbox</div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-[11px] font-mono uppercase text-slate-500 font-semibold">
                Evaluation Basis
              </div>
              <div className="text-sm font-bold text-[#2563EB] mt-2">
                Deterministic Rule Engine
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Mathematical criteria comparison</div>
            </div>
          </div>

          {/* Visual Comparison: ACTUAL PROFILE → HYPOTHETICAL PROFILE */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-[#0A192F]">
                Highest Projected Impact Opportunities ({simulationData.topImpacted.length})
              </h4>
              <span className="text-xs font-mono text-slate-500">
                Sorted by Eligibility Status Delta
              </span>
            </div>

            {simulationData.topImpacted.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {simulationData.topImpacted.map((item) => (
                  <div
                    key={item.scholarship.id}
                    className="p-5 rounded-2xl bg-white border-2 border-dashed border-blue-200 shadow-2xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="truncate max-w-[160px] font-semibold text-[#2563EB]">
                          {item.scholarship.provider}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          Min {item.scholarship.minCgpa.toFixed(2)} CGPA
                        </span>
                      </div>

                      <h5 className="font-serif font-bold text-sm text-[#0A192F] line-clamp-1">
                        {item.scholarship.title}
                      </h5>

                      <div className="text-xs font-mono font-bold text-[#0D9488]">
                        {item.scholarship.amountFormatted}
                      </div>

                      {/* Actual -> Projected Status Transition */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 text-[10px] uppercase">Current Match:</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] border ${getStatusColor(item.baselineResult.status)}`}>
                            {item.baselineResult.statusLabel} ({item.baselineResult.overallMatchScore}%)
                          </span>
                        </div>

                        <div className="flex items-center justify-center text-slate-400">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-blue-600 font-bold text-[10px] uppercase">Projected Match:</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStatusColor(item.projectedResult.status)}`}>
                            {item.projectedResult.statusLabel} ({item.projectedResult.overallMatchScore}%)
                          </span>
                        </div>
                      </div>

                      {/* Remaining Requirements Attention List */}
                      {item.remainingRequirements.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-mono uppercase text-slate-500 font-semibold">
                            Remaining Requirements:
                          </span>
                          <ul className="text-[11px] text-slate-600 space-y-0.5 pl-3 list-disc">
                            {item.remainingRequirements.slice(0, 2).map((req, idx) => (
                              <li key={idx} className="line-clamp-1">
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => quickOpenModal(item.scholarship.id)}
                      className="w-full py-2 bg-[#0A192F] hover:bg-[#1E293B] text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Inspect Opportunity Spec</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs font-mono text-slate-500">
                At {hypotheticalCgpa.toFixed(2)} CGPA, your qualification status remains identical to baseline.
              </div>
            )}
          </div>

          {/* Safeguard & Ethics Disclaimer Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              <strong>FutureFit Simulation Safeguard:</strong> This projection evaluates published academic cutoffs only. Modifying the slider does not alter your saved student profile. Achieving the minimum academic threshold does not guarantee scholarship award or university admission.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
