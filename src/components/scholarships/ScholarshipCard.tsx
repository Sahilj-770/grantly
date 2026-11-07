import React from 'react'
import { Scholarship } from '../../types/scholarship'
import { useStore } from '../../services/scholarshipStore'
import {
  Calendar,
  Building2,
  Bookmark,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react'

interface ScholarshipCardProps {
  scholarship: Scholarship
  viewMode?: 'grid' | 'list'
}

export function ScholarshipCard({ scholarship, viewMode = 'grid' }: ScholarshipCardProps) {
  const { isSaved, toggleSaveScholarship, quickOpenModal, getEligibilityFor, addApplication } = useStore()
  const eligibility = getEligibilityFor(scholarship.id)
  const isBookmarked = isSaved(scholarship.id)

  const matchScore = eligibility ? eligibility.overallMatchScore : 75
  const isEligible = eligibility ? eligibility.isEligible : true

  if (viewMode === 'list') {
    return (
      <div className="w-full p-5 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] border border-blue-200 font-semibold">
              {scholarship.category}
            </span>
            <span
              className={`text-[11px] font-mono px-2 py-0.5 rounded-md font-semibold flex items-center gap-1 ${
                matchScore >= 80
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : matchScore >= 60
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{matchScore}% Match</span>
            </span>
            <span className="text-xs text-[#64748B] flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              <span className="truncate">{scholarship.provider}</span>
            </span>
          </div>

          <h3
            onClick={() => quickOpenModal(scholarship.id)}
            className="font-serif text-lg sm:text-xl font-bold text-[#0A192F] hover:text-[#2563EB] cursor-pointer transition-colors leading-snug"
          >
            {scholarship.title}
          </h3>

          <p className="text-xs text-[#475569] line-clamp-1">
            {scholarship.description}
          </p>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
          <div className="text-right">
            <div className="text-xs text-[#64748B] font-mono">Grant Value</div>
            <div className="text-sm sm:text-base font-bold text-[#0D9488] font-mono">
              {scholarship.amountFormatted}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-slate-400 hover:text-slate-800 border-slate-200'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark scholarship'}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={() => quickOpenModal(scholarship.id)}
              className="px-4 py-2 bg-[#0A192F] text-white text-xs font-semibold rounded-xl hover:bg-[#2563EB] transition-colors flex items-center gap-1.5"
            >
              <span>View Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Grid Card View
  return (
    <div className="rounded-2xl bg-white border border-[#CBD5E1] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-4">
        {/* Top Badges & Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
              {scholarship.category}
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold flex items-center gap-1 ${
                matchScore >= 80
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : matchScore >= 60
                  ? 'bg-amber-50 text-amber-800 border border-amber-200'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>{matchScore}% Match</span>
            </span>
          </div>

          <button
            onClick={() => toggleSaveScholarship(scholarship.id)}
            className={`p-2 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-[#2563EB] text-white border-[#2563EB]'
                : 'bg-white text-slate-400 hover:text-slate-700 border-slate-200'
            }`}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark scholarship'}
          >
            <Bookmark className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Provider */}
        <div>
          <h3
            onClick={() => quickOpenModal(scholarship.id)}
            className="font-serif text-lg font-bold text-[#0A192F] group-hover:text-[#2563EB] transition-colors cursor-pointer line-clamp-2 leading-snug mb-1"
          >
            {scholarship.title}
          </h3>
          <p className="text-xs text-[#64748B] flex items-center gap-1">
            <Building2 className="w-3 h-3 shrink-0" />
            <span className="truncate">{scholarship.provider}</span>
          </p>
        </div>

        {/* Financial Grant Banner */}
        <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="text-[10px] font-mono uppercase text-[#64748B] mb-0.5">Disbursement Coverage</div>
          <div className="text-sm font-bold text-[#0D9488] font-mono line-clamp-1">
            {scholarship.amountFormatted}
          </div>
        </div>

        {/* Brief description */}
        <p className="text-xs text-[#475569] line-clamp-2 leading-relaxed">
          {scholarship.description}
        </p>
      </div>

      {/* Footer Meta & Inspect CTA */}
      <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-[#64748B] font-mono text-[11px]">
          <Clock className="w-3.5 h-3.5 text-[#D97706]" />
          <span>{scholarship.daysRemaining}d left</span>
        </div>

        <button
          onClick={() => quickOpenModal(scholarship.id)}
          className="px-3.5 py-1.5 bg-[#0A192F] text-white text-xs font-semibold rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-1 shadow-2xs"
        >
          <span>Dossier</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
