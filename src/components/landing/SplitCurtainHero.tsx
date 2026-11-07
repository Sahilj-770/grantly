import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { OpportunityNetworkCanvas } from './OpportunityNetworkCanvas'
import {
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  GraduationCap,
  Coins,
  ChevronDown
} from 'lucide-react'

export function SplitCurtainHero() {
  const { setCurrentView } = useStore()
  const trackRef = useRef<HTMLDivElement | null>(null)
  const leftPanelRef = useRef<HTMLDivElement | null>(null)
  const rightPanelRef = useRef<HTMLDivElement | null>(null)
  const centerContentRef = useRef<HTMLDivElement | null>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null)

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const track = trackRef.current
    const leftPanel = leftPanelRef.current
    const rightPanel = rightPanelRef.current
    const centerContent = centerContentRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (!track || !leftPanel || !rightPanel || !centerContent) return

    let currentProgress = 0
    let targetProgress = 0
    let animId: number
    let isDisposed = false

    const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val))
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const onScroll = () => {
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      if (total <= 0) return
      const scrolled = -rect.top
      targetProgress = clamp(scrolled / total)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const loop = () => {
      if (isDisposed) return

      // Smooth kinematic lerp
      currentProgress += (targetProgress - currentProgress) * 0.16
      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress
      }

      // Panels part over first 75% of pinned travel
      const splitProgress = easeOutCubic(clamp(currentProgress / 0.75))
      const leftShift = splitProgress * 115
      const rightShift = splitProgress * 115

      // Center content zooms from 0.94 to 1.0 with subtle opacity ramp
      const scale = 0.94 + splitProgress * 0.06
      const opacity = clamp(0.4 + splitProgress * 0.7)

      leftPanel.style.transform = `translate3d(-${leftShift}%, 0, 0)`
      rightPanel.style.transform = `translate3d(${rightShift}%, 0, 0)`
      centerContent.style.transform = `scale(${scale})`
      centerContent.style.opacity = `${opacity}`

      if (scrollIndicator) {
        const indOpacity = clamp(1 - splitProgress * 3.5)
        scrollIndicator.style.opacity = `${indOpacity}`
        scrollIndicator.style.transform = `translate3d(0, ${splitProgress * 20}px, 0)`
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      isDisposed = true
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [prefersReducedMotion])

  // Reduced motion alternative: static open view
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full min-h-[90vh] bg-[#FBFBFA] flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
        <OpportunityNetworkCanvas />
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Intelligent Scholarship Navigator</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0A192F] leading-[1.08]">
            Your next opportunity is closer than you think.
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#334155] leading-relaxed">
            Discover scholarships that fit your education, ambitions and circumstances. Keep every opportunity, deadline, and application in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('discovery')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#0A192F] text-white rounded-xl text-sm font-semibold hover:bg-[#1E293B] shadow-md flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#D97706]" />
              <span>Explore Scholarships</span>
            </button>
            <button
              onClick={() => setCurrentView('onboarding')}
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-[#0A192F] border border-[#CBD5E1] rounded-xl text-sm font-semibold hover:border-[#2563EB] hover:text-[#2563EB] shadow-2xs flex items-center justify-center gap-2"
            >
              <span>Calculate Eligibility</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div ref={trackRef} className="relative w-full h-[180vh] bg-[#FBFBFA] -mt-16 sm:-mt-20">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Subtle Constellation Network Background */}
        <OpportunityNetworkCanvas />

        {/* Center Content: Core Headline & Value Proposition */}
        <div
          ref={centerContentRef}
          className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 space-y-6 sm:space-y-8 will-change-transform"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono uppercase tracking-widest shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Personal Scholarship Discovery Companion</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0A192F] leading-[1.06]">
            Your next opportunity is{' '}
            <span className="italic font-normal text-[#2563EB]">closer</span> than you think.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl text-[#334155] leading-relaxed">
            Discover scholarships that fit your education, ambitions and financial circumstances. Keep every opportunity, deadline, and application in one place.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentView('discovery')}
              className="w-full sm:w-auto px-8 py-4 bg-[#0A192F] text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-[#1E293B] shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 group"
            >
              <Compass className="w-4 h-4 text-[#D97706] group-hover:rotate-45 transition-transform duration-300" />
              <span>Explore All Scholarships</span>
            </button>

            <button
              onClick={() => setCurrentView('onboarding')}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[#0A192F] border border-[#CBD5E1] rounded-xl text-sm sm:text-base font-semibold hover:border-[#2563EB] hover:text-[#2563EB] shadow-2xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span>Check My Eligibility</span>
              <ArrowRight className="w-4 h-4 text-[#2563EB] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748B] font-medium">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
              <span>100% Verified Institutional Data</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-[#D97706]" />
              <span>₹18.4 Cr+ Cumulative Grants Mapped</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2563EB]" />
              <span>Deterministic Match Score</span>
            </div>
          </div>
        </div>

        {/* LEFT CURTAIN PANEL: The Student's Bureaucratic Friction */}
        <div
          ref={leftPanelRef}
          className="absolute left-0 top-0 bottom-0 w-[42%] sm:w-[35%] lg:w-[30%] bg-gradient-to-r from-[#F1F5F9] to-[#E2E8F0]/90 backdrop-blur-md border-r border-[#CBD5E1] p-6 sm:p-8 flex flex-col justify-between z-20 shadow-2xl will-change-transform"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[#334155] text-[11px] font-mono uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>The Current Reality</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">
              Scattered, Opaque & Buried.
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Dozens of government portals, conflicting PDF guidelines, and missed deadlines cause eligible students to leave crores in funding unclaimed each year.
            </p>
          </div>

          {/* Simulation Cards on Left */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-1 transform -rotate-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>GOVT_PORTAL_V3.PDF</span>
                <span className="text-rose-500 font-semibold">Buried Rule</span>
              </div>
              <p className="text-xs font-semibold text-slate-800">42-Page Gazette Circular</p>
              <p className="text-[11px] text-slate-500 truncate">Eligibility hidden on page 38 under clause 9(b)...</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/90 border border-slate-200/90 shadow-2xs space-y-1 transform rotate-1 hidden sm:block">
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>PORTAL TIMEOUT</span>
                <span className="text-amber-600 font-semibold">Urgent</span>
              </div>
              <p className="text-xs font-semibold text-slate-800">Session Expired: Missing Doc</p>
              <p className="text-[11px] text-slate-500 truncate">Re-upload income cert in under 200KB format...</p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-mono border-t border-slate-300 pt-3 flex items-center justify-between">
            <span>FRAGMENTED PORTALS</span>
            <span>84% DROPOUT</span>
          </div>
        </div>

        {/* RIGHT CURTAIN PANEL: The Aspiration & Financial Empowerment */}
        <div
          ref={rightPanelRef}
          className="absolute right-0 top-0 bottom-0 w-[42%] sm:w-[35%] lg:w-[30%] bg-gradient-to-l from-[#EFF6FF] to-[#DBEAFE]/90 backdrop-blur-md border-l border-[#BFDBFE] p-6 sm:p-8 flex flex-col justify-between z-20 shadow-2xl will-change-transform"
        >
          <div className="space-y-4 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-[#1E3A8A] text-[11px] font-mono uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>With GRANTLY</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">
              Clarity, Action & Progress.
            </h3>
            <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
              A single intelligent companion matching you to verified endowments, calculating exact eligibility gaps, and guiding you from draft to award.
            </p>
          </div>

          {/* Opportunity Cards on Right */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white/95 border border-blue-200 shadow-2xs space-y-1 transform rotate-1 text-left">
              <div className="flex items-center justify-between text-[11px] text-blue-600 font-mono">
                <span>MATCH: 92%</span>
                <span className="text-emerald-600 font-semibold">Eligible</span>
              </div>
              <p className="text-xs font-semibold text-slate-900">Rhodes Scholarship @ Oxford</p>
              <p className="text-[11px] text-emerald-700 font-mono">£65,000 / yr • 100% Fees + Stipend</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/95 border border-blue-200 shadow-2xs space-y-1 transform -rotate-1 text-left hidden sm:block">
              <div className="flex items-center justify-between text-[11px] text-blue-600 font-mono">
                <span>DBT SANCTION</span>
                <span className="text-emerald-600 font-semibold">Approved</span>
              </div>
              <p className="text-xs font-semibold text-slate-900">Tata Trusts Means Subsidy</p>
              <p className="text-[11px] text-slate-600 truncate">₹1,50,000 direct tuition transfer</p>
            </div>
          </div>

          <div className="text-[11px] text-blue-700 font-mono border-t border-blue-200 pt-3 flex items-center justify-between">
            <span>VERIFIED ENDOWMENTS</span>
            <span>ZERO GUESSWORK</span>
          </div>
        </div>

        {/* Scroll Indicator at bottom */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs text-[#64748B] pointer-events-none z-30 font-mono transition-opacity"
        >
          <span>SCROLL TO UNVEIL</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#2563EB]" />
        </div>
      </div>
    </div>
  )
}
