import React from 'react'
import { useStore } from '../../services/scholarshipStore'
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  ArrowRight,
  Scale,
  BrainCircuit
} from 'lucide-react'

export function EligibilityValueProposition() {
  const { setCurrentView } = useStore()

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Deterministic Intelligence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A192F]">
            Why Algorithmic Eligibility Beats Keyword Search
          </h2>
          <p className="text-sm sm:text-lg text-[#475569] leading-relaxed">
            Most scholarship aggregators return hundreds of irrelevant links. GRANTLY parses official government gazettes and trust deeds into discrete mathematical rules, evaluating your exact candidacy.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Legacy Aggregators */}
          <div className="p-8 rounded-3xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">
                TRADITIONAL AGGREGATORS
              </span>
              <span className="text-xs font-mono text-rose-500 font-semibold flex items-center gap-1">
                <XCircle className="w-4 h-4" /> High Frustration
              </span>
            </div>

            <ul className="space-y-4 text-sm text-[#475569]">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Opaque Qualifications:</strong> Generic tag searches return dead links and awards requiring criteria you can never fulfill.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Paywalled Aggregators:</strong> Forced subscriptions just to view dead application URLs or generic blog articles.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Buried Deadlines:</strong> No reminder mechanism for multi-phase document verification or referee submissions.
                </span>
              </li>
            </ul>
          </div>

          {/* GRANTLY Engine */}
          <div className="p-8 rounded-3xl bg-[#0A192F] text-white border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider">
                THE GRANTLY STANDARD
              </span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> 100% Deterministic
              </span>
            </div>

            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Rule-Based Match Scoring:</strong> 4-point criteria engine evaluating CGPA, family income ceiling, course level, and document readiness.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Direct Institutional Portals:</strong> Direct verified links to official government DBT portals and trust foundation portals.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Encrypted Vault Integration:</strong> One-click attachment of verified transcripts, revenue certificates, and recommendation letters.
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView('onboarding')}
                className="w-full py-3.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Calculate Your Match Percentage Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
