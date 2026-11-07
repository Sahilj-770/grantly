import React, { useState, useRef } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { FUNDING_PATHWAYS, FundingPathway } from '../../data/categoriesData'
import {
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  HeartHandshake,
  Cpu,
  Globe2,
  Palette,
  ExternalLink,
  Coins
} from 'lucide-react'

export function FundingPathwaysShelf() {
  const { setSelectedCategory, setCurrentView } = useStore()
  const [activePathwayId, setActivePathwayId] = useState<string>('government')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const shelfRef = useRef<HTMLDivElement | null>(null)

  const activePathway =
    FUNDING_PATHWAYS.find((p) => p.id === activePathwayId) || FUNDING_PATHWAYS[0]!

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId)
    setCurrentView('discovery')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePos({ x, y })
  }

  const categoryIcons: Record<string, React.ElementType> = {
    government: ShieldCheck,
    merit: Award,
    need: HeartHandshake,
    'stem-research': Cpu,
    international: Globe2,
    creative: Palette
  }

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-[#F4F5F2] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] text-xs font-mono uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Funding Taxonomy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0A192F]">
            Explore by Funding Pathway
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Scholarships come in structured categories with distinct criteria. Select a pathway below to inspect its disbursement ranges and criteria.
          </p>
        </div>

        {/* Pathway Selection Spine / Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {FUNDING_PATHWAYS.map((pathway) => {
            const Icon = categoryIcons[pathway.id] || Award
            const isActive = pathway.id === activePathwayId
            return (
              <button
                key={pathway.id}
                onClick={() => setActivePathwayId(pathway.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0A192F] text-white shadow-md'
                    : 'bg-white border border-[#CBD5E1] text-[#334155] hover:border-[#2563EB] hover:text-[#0A192F]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#D97706]' : 'text-[#64748B]'}`} />
                <span>{pathway.title}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {pathway.totalOpportunities}
                </span>
              </button>
            )
          })}
        </div>

        {/* 3D Archive Shelf Presentation Deck */}
        <div
          ref={shelfRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
          className="relative w-full rounded-3xl bg-white border border-[#CBD5E1] p-6 sm:p-10 shadow-xl overflow-hidden transition-transform duration-200"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Detail Column: Active Pathway Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 border border-slate-200 text-slate-700">
                  <span>{activePathway.subtitle}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-[#0A192F]">
                  {activePathway.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                {activePathway.description}
              </p>

              {/* Data Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[11px] font-mono uppercase text-[#64748B] mb-1">
                    Typical Funding Range
                  </div>
                  <div className="text-base font-bold text-[#0D9488] font-mono">
                    {activePathway.disbursementAverage}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <div className="text-[11px] font-mono uppercase text-[#64748B] mb-1">
                    Key Evaluation Focus
                  </div>
                  <div className="text-xs font-semibold text-[#0A192F] line-clamp-1">
                    {activePathway.keyFocus}
                  </div>
                </div>
              </div>

              {/* Eligibility Rule Highlight */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold font-mono uppercase text-[10px] text-amber-800 block mb-0.5">
                  General Threshold
                </span>
                {activePathway.criteriaHighlight}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleSelectCategory(activePathway.id)}
                  className="px-6 py-3.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-[#1D4ED8] transition-colors shadow-md flex items-center gap-2.5 group"
                >
                  <span>Explore {activePathway.totalOpportunities} {activePathway.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Visual 3D Stack: Archival Card Representation */}
            <div className="lg:col-span-5 relative h-72 sm:h-80 flex items-center justify-center">
              <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#1E293B] text-white p-6 shadow-2xl flex flex-col justify-between border border-slate-700 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DOSSIER #{activePathway.id.toUpperCase()}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold tracking-tight text-white leading-tight">
                    {activePathway.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-3">
                    {activePathway.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-700/80">
                  <div className="text-[11px] font-mono text-slate-400">TOTAL CATALOGED</div>
                  <div className="text-xl font-bold font-mono text-amber-400">
                    {activePathway.totalOpportunities} Active Grants
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Disbursement: {activePathway.disbursementAverage}
                  </div>
                </div>
              </div>

              {/* Backdrop stacked card shadow */}
              <div className="absolute w-60 sm:w-68 h-76 sm:h-92 rounded-2xl bg-[#E2E8F0] -rotate-3 -z-10 border border-slate-300 pointer-events-none" />
              <div className="absolute w-56 sm:w-64 h-72 sm:h-88 rounded-2xl bg-[#CBD5E1] 4 -z-20 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
