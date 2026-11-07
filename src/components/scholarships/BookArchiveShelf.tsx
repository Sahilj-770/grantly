import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { FUNDING_PATHWAYS, FundingPathway } from '../../data/categoriesData'
import { ScholarshipCategory } from '../../types/scholarship'
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Coins
} from 'lucide-react'

export function BookArchiveShelf() {
  const { selectedCategory, setSelectedCategory, scholarships } = useStore()
  const [activeVolumeIndex, setActiveVolumeIndex] = useState<number | null>(() => {
    if (!selectedCategory) return null
    const idx = FUNDING_PATHWAYS.findIndex((p) => p.id === selectedCategory)
    return idx >= 0 ? idx : null
  })

  const shelfRef = useRef<HTMLDivElement | null>(null)
  const booksRowRef = useRef<HTMLDivElement | null>(null)

  // Sync active volume if store's selectedCategory changes externally
  useEffect(() => {
    if (!selectedCategory) {
      setActiveVolumeIndex(null)
    } else {
      const idx = FUNDING_PATHWAYS.findIndex((p) => p.id === selectedCategory)
      if (idx >= 0) setActiveVolumeIndex(idx)
    }
  }, [selectedCategory])

  // Count active grants per category from real data
  const getGrantCount = (catId: ScholarshipCategory) => {
    return scholarships.filter((s) => s.category === catId).length
  }

  const handleSelectVolume = (index: number, catId: ScholarshipCategory) => {
    if (activeVolumeIndex === index && selectedCategory === catId) {
      // Toggle off
      setActiveVolumeIndex(null)
      setSelectedCategory(null)
    } else {
      setActiveVolumeIndex(index)
      setSelectedCategory(catId)
    }
  }

  const handleClearFilter = () => {
    setActiveVolumeIndex(null)
    setSelectedCategory(null)
  }

  // Direct DOM transform without high-frequency React state rerenders
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shelfRef.current || !booksRowRef.current) return
    const rect = shelfRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    booksRowRef.current.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`
  }

  const handleMouseLeave = () => {
    if (booksRowRef.current) {
      booksRowRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)'
    }
  }

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number, catId: ScholarshipCategory) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleSelectVolume(index, catId)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        const next = (index + 1) % FUNDING_PATHWAYS.length
        handleSelectVolume(next, FUNDING_PATHWAYS[next].id)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = (index - 1 + FUNDING_PATHWAYS.length) % FUNDING_PATHWAYS.length
        handleSelectVolume(prev, FUNDING_PATHWAYS[prev].id)
      }
    },
    [activeVolumeIndex, selectedCategory]
  )

  return (
    <section className="w-full bg-[#0A192F] text-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-800 shadow-2xl relative overflow-hidden mb-10">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-black/60 pointer-events-none" />

      {/* Header controls & status */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-xs font-mono text-blue-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Funding Archive</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-slate-100">
            Select a Dedicated Volume
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Pull an archival volume from the shelf to explore institutional frameworks and instantly filter verified grant opportunities.
          </p>
        </div>

        {/* Filter status pill */}
        <div className="flex items-center gap-3">
          {selectedCategory ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Filtering: {FUNDING_PATHWAYS.find((p) => p.id === selectedCategory)?.title}</span>
              <button
                onClick={handleClearFilter}
                className="ml-2 hover:text-white p-0.5 rounded hover:bg-amber-500/20 transition-colors"
                title="Reset archive filter"
                aria-label="Reset archive filter"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
              Showing All Pathways (6 Volumes)
            </div>
          )}
        </div>
      </div>

      {/* DESKTOP: 3D Perspective Shelf */}
      <div
        ref={shelfRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="hidden lg:block relative mt-8 pt-4 pb-12 select-none"
        style={{ perspective: '1200px' }}
      >
        {/* Book Container with 3D Tilt */}
        <div
          ref={booksRowRef}
          className="flex items-end justify-center gap-2.5 transition-transform duration-300 ease-out"
        >
          {FUNDING_PATHWAYS.map((pathway, index) => {
            const isActive = activeVolumeIndex === index
            const count = getGrantCount(pathway.id)

            return (
              <div
                key={pathway.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                aria-label={`${pathway.title}, Volume 0${index + 1}, ${count} grants`}
                onClick={() => handleSelectVolume(index, pathway.id)}
                onKeyDown={(e) => handleKeyDown(e, index, pathway.id)}
                className={`relative cursor-pointer transition-all duration-500 ease-out transform focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-t-xl group ${
                  isActive
                    ? 'w-72 sm:w-80 -translate-y-5 shadow-2xl z-20'
                    : 'w-20 hover:w-24 -translate-y-1 hover:-translate-y-3 z-10'
                }`}
                style={{
                  height: isActive ? '380px' : '340px'
                }}
              >
                {/* Book Shadow underneath */}
                <div
                  className={`absolute -bottom-4 left-2 right-2 h-4 rounded-full blur-md transition-all duration-500 ${
                    isActive ? 'bg-amber-400/20' : 'bg-black/60 group-hover:bg-black/80'
                  }`}
                />

                {/* THE BOOK CASING */}
                <div
                  className={`w-full h-full rounded-t-xl overflow-hidden border transition-all duration-500 relative flex flex-col justify-between ${
                    isActive
                      ? 'border-amber-400/80 shadow-[0_10px_40px_rgba(245,158,11,0.25)]'
                      : 'border-slate-700/60 hover:border-slate-500'
                  }`}
                  style={{
                    backgroundColor: pathway.spineBg
                  }}
                >
                  {/* Subtle leather / linen texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

                  {/* ACTIVE EXPANDED COVER VIEW */}
                  {isActive ? (
                    <div className="w-full h-full p-6 flex flex-col justify-between relative z-10 animate-fadeIn">
                      {/* Top Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded font-bold uppercase"
                            style={{
                              backgroundColor: `${pathway.spineFoil}22`,
                              color: pathway.spineFoil
                            }}
                          >
                            VOL. 0{index + 1}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                            <Check className="w-3 h-3" />
                            {count} Live Grants
                          </span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-white tracking-tight leading-snug">
                          {pathway.title}
                        </h3>
                        <p className="text-xs text-slate-300 font-sans line-clamp-2">
                          {pathway.subtitle}
                        </p>
                      </div>

                      {/* Middle Details */}
                      <div className="space-y-3 py-3 border-y border-white/10 text-xs">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400 font-mono text-[11px]">Funding Range:</span>
                          <span className="font-mono font-bold text-amber-300">{pathway.disbursementAverage}</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3">
                          {pathway.description}
                        </p>
                      </div>

                      {/* Bottom Action */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">Click to unselect</span>
                        <div
                          className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-md"
                          style={{
                            backgroundColor: pathway.spineFoil,
                            color: '#0A192F'
                          }}
                        >
                          <span>Filtered Active</span>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* INACTIVE VERTICAL SPINE VIEW */
                    <div className="w-full h-full py-5 px-2 flex flex-col justify-between items-center relative z-10">
                      {/* Top Foil Band */}
                      <div className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-5 h-1 rounded-full"
                          style={{ backgroundColor: pathway.spineFoil }}
                        />
                        <span
                          className="text-[9px] font-mono tracking-widest font-bold"
                          style={{ color: pathway.spineFoil }}
                        >
                          0{index + 1}
                        </span>
                      </div>

                      {/* Spine Embossed Title (Rotated 90 Deg) */}
                      <div className="flex-1 flex items-center justify-center my-2">
                        <span
                          className="font-serif text-xs font-bold tracking-wider text-slate-200 whitespace-nowrap select-none transition-colors group-hover:text-white"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)'
                          }}
                        >
                          {pathway.title}
                        </span>
                      </div>

                      {/* Bottom Grant Count Chip */}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="text-[10px] font-mono font-semibold text-slate-400 group-hover:text-amber-300 transition-colors">
                          {count}G
                        </span>
                        <div
                          className="w-6 h-0.5 rounded-full opacity-60"
                          style={{ backgroundColor: pathway.spineAccent }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Left Spine Crease Highlight */}
                  <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-white/20 pointer-events-none" />
                </div>
              </div>
            )
          })}
        </div>

        {/* ARCHITECTURAL SHELF BASE (Walnut wood texture & Brass trim) */}
        <div className="w-full max-w-4xl mx-auto h-4 bg-gradient-to-r from-[#2B1B10] via-[#4A2F1B] to-[#2B1B10] rounded-sm shadow-2xl relative border-t-2 border-[#D4AF37]/50">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/60" />
          <div className="absolute -bottom-3 inset-x-8 h-3 bg-black/40 blur-sm rounded-full" />
        </div>
      </div>

      {/* MOBILE & TABLET: Horizontal Volume Carousel */}
      <div className="lg:hidden mt-6">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
          {FUNDING_PATHWAYS.map((pathway, index) => {
            const isActive = selectedCategory === pathway.id
            const count = getGrantCount(pathway.id)

            return (
              <div
                key={pathway.id}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => handleSelectVolume(index, pathway.id)}
                className={`min-w-[260px] snap-center rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                  isActive
                    ? 'border-amber-400 shadow-xl'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                }`}
                style={{
                  backgroundColor: isActive ? pathway.spineBg : undefined
                }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded uppercase"
                      style={{
                        backgroundColor: `${pathway.spineFoil}22`,
                        color: pathway.spineFoil
                      }}
                    >
                      VOL. 0{index + 1}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {count} Grants
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white">{pathway.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{pathway.subtitle}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-300 font-bold">{pathway.disbursementAverage}</span>
                  <button
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                      isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {isActive ? 'Active Filter' : 'Select Volume'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
