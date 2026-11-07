import React from 'react'
import { useStore } from '../../services/scholarshipStore'
import { Compass, ArrowRight, Sparkles, GraduationCap } from 'lucide-react'

export function FinalCallToAction() {
  const { setCurrentView } = useStore()

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#0A192F] text-white border-t border-slate-800 overflow-hidden">
      {/* Decorative ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#2563EB]/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono uppercase tracking-wider text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Take Charge of Your Academic Future</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Never let lack of information stand between you and an education.
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-300 leading-relaxed font-sans">
          Join thousands of students who have discovered verified grants, organized their documents, and submitted winning applications with GRANTLY.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => {
              setCurrentView('onboarding')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 bg-[#2563EB] text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-[#1D4ED8] transition-colors shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Set Up Your Eligibility Profile</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => {
              setCurrentView('discovery')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl text-sm sm:text-base font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#D97706]" />
            <span>Browse All Scholarships</span>
          </button>
        </div>
      </div>
    </section>
  )
}
