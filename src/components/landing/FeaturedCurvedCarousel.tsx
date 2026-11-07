import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { SCHOLARSHIPS_DATA } from '../../data/scholarshipsData'
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
  Building2,
  Coins,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Bookmark
} from 'lucide-react'

// 5 Curated Flagship Opportunities
const FEATURED_OPPORTUNITIES = SCHOLARSHIPS_DATA.filter(s => s.featured).slice(0, 5)

export function FeaturedCurvedCarousel() {
  const { quickOpenModal, toggleSaveScholarship, isSaved } = useStore()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragDeltaXRef = useRef(0)

  const n = FEATURED_OPPORTUNITIES.length

  const handlePrev = useCallback(() => {
    setActiveIndex(prev => (prev - 1 + n) % n)
  }, [n])

  const handleNext = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % n)
  }, [n])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX
    dragDeltaXRef.current = 0
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return
    dragDeltaXRef.current = e.clientX - dragStartXRef.current
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    const threshold = 60
    if (dragDeltaXRef.current > threshold) {
      handlePrev()
    } else if (dragDeltaXRef.current < -threshold) {
      handleNext()
    }
  }

  return (
    <section
      ref={containerRef}
      tabIndex={0}
      aria-label="Featured Flagship Scholarships Carousel"
      className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#FBFBFA] border-t border-[#E2E8F0] focus:outline-none focus:ring-1 focus:ring-[#2563EB]/40"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D97706]/10 border border-[#D97706]/20 text-[#D97706] text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Endowments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A192F]">
              Curated Prestigious Awards
            </h2>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Explore world-class scholarship opportunities with full tuition grants, research stipends, and lifelong alumni networks.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white border border-[#CBD5E1] text-[#0A192F] hover:border-[#2563EB] hover:text-[#2563EB] shadow-2xs flex items-center justify-center transition-all focus:ring-2 focus:ring-[#2563EB]"
              aria-label="Previous scholarship"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-[#64748B] px-1">
              0{activeIndex + 1} / 0{n}
            </span>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-white border border-[#CBD5E1] text-[#0A192F] hover:border-[#2563EB] hover:text-[#2563EB] shadow-2xs flex items-center justify-center transition-all focus:ring-2 focus:ring-[#2563EB]"
              aria-label="Next scholarship"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP: Cylindrical 3D Perspective Stage */}
        <div
          className="hidden md:block relative w-full h-[520px] overflow-hidden select-none cursor-grab active:cursor-grabbing perspective-[1200px]"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {FEATURED_OPPORTUNITIES.map((sch, i) => {
              // Calculate relative circular offset from active item
              let offset = i - activeIndex
              if (offset > n / 2) offset -= n
              if (offset < -n / 2) offset += n

              const isActive = offset === 0
              const isVisible = Math.abs(offset) <= 2

              if (!isVisible) return null

              // Cylindrical math: X offset, Z depth, Y-rotation, scale
              const translateX = offset * 320
              const translateZ = -Math.abs(offset) * 160
              const rotateY = -offset * 18
              const scale = 1 - Math.abs(offset) * 0.12
              const opacity = 1 - Math.abs(offset) * 0.35
              const zIndex = 20 - Math.abs(offset) * 5

              return (
                <div
                  key={sch.id}
                  style={{
                    transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex
                  }}
                  className={`absolute w-[440px] rounded-2xl bg-white border transition-all duration-500 ease-out p-7 shadow-xl ${
                    isActive ? 'border-[#2563EB] ring-2 ring-[#2563EB]/20 shadow-2xl' : 'border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{sch.category.toUpperCase()}</span>
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveScholarship(sch.id)
                      }}
                      className={`p-2 rounded-full border transition-colors ${
                        isSaved(sch.id)
                          ? 'bg-[#2563EB] text-white border-[#2563EB]'
                          : 'bg-white text-slate-400 hover:text-[#0A192F] border-slate-200'
                      }`}
                      aria-label={isSaved(sch.id) ? 'Remove bookmark' : 'Bookmark scholarship'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F] line-clamp-2 leading-tight mb-2">
                    {sch.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#64748B] mb-4">
                    <Building2 className="w-3.5 h-3.5" />
                    <span className="truncate">{sch.provider}</span>
                  </div>

                  {/* Funding Amount Highlight */}
                  <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
                    <div className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider mb-0.5">
                      Grant Coverage
                    </div>
                    <div className="text-base font-bold text-[#0D9488] font-mono">
                      {sch.amountFormatted}
                    </div>
                  </div>

                  <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed mb-6">
                    {sch.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B] font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>{sch.daysRemaining} days left</span>
                    </div>

                    <button
                      onClick={() => quickOpenModal(sch.id)}
                      className="px-4 py-2 bg-[#0A192F] text-white text-xs font-semibold rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-1.5 shadow-2xs group"
                    >
                      <span>Inspect Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* MOBILE: Accessible Horizontal Snap Carousel */}
        <div className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory focus:outline-none">
          {FEATURED_OPPORTUNITIES.map((sch) => (
            <div
              key={sch.id}
              className="min-w-[85vw] snap-center rounded-2xl bg-white border border-[#CBD5E1] p-6 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono uppercase text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-0.5 rounded-full font-semibold">
                    {sch.category}
                  </span>
                  <button
                    onClick={() => toggleSaveScholarship(sch.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-800"
                    aria-label="Bookmark"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved(sch.id) ? 'fill-[#2563EB] text-[#2563EB]' : ''}`} />
                  </button>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0A192F] leading-tight mb-2">
                  {sch.title}
                </h3>
                <p className="text-xs text-[#64748B] mb-3">{sch.provider}</p>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 mb-3 text-xs font-mono font-bold text-[#0D9488]">
                  {sch.amountFormatted}
                </div>
                <p className="text-xs text-[#475569] line-clamp-3 mb-4">{sch.description}</p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-[11px] font-mono text-[#D97706]">{sch.daysRemaining} days left</span>
                <button
                  onClick={() => quickOpenModal(sch.id)}
                  className="px-3.5 py-1.5 bg-[#0A192F] text-white text-xs font-medium rounded-lg"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
