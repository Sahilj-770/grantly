import React, { useState, useEffect } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { SCHOLARSHIPS_DATA } from '../../data/scholarshipsData'
import {
  X,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  KanbanSquare,
  Bookmark,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  Info,
  Scale,
  AlertCircle
} from 'lucide-react'

export function ScholarshipDetailModal() {
  const {
    selectedScholarshipId,
    setSelectedScholarshipId,
    isSaved,
    toggleSaveScholarship,
    addApplication,
    applications,
    getEligibilityFor,
    documents
  } = useStore()

  const [activeTab, setActiveTab] = useState<'audit' | 'benefits' | 'docs' | 'procedure'>('audit')

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedScholarshipId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setSelectedScholarshipId])

  if (!selectedScholarshipId) return null

  const scholarship = SCHOLARSHIPS_DATA.find((s) => s.id === selectedScholarshipId)
  if (!scholarship) return null

  const eligibility = getEligibilityFor(scholarship.id)
  const isBookmarked = isSaved(scholarship.id)
  const alreadyTracking = applications.some((a) => a.scholarshipId === scholarship.id)

  const matchScore = eligibility ? eligibility.overallMatchScore : 75

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="p-6 bg-[#0A192F] text-white flex items-start justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {scholarship.category}
              </span>
              <span className="text-xs text-slate-300 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Deadline: {scholarship.deadline} ({scholarship.daysRemaining} days left)</span>
              </span>
            </div>

            <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              {scholarship.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{scholarship.provider}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`p-2.5 rounded-xl border transition-colors ${
                isBookmarked
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-slate-800 text-slate-300 hover:text-white border-slate-700'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark scholarship'}
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              onClick={() => setSelectedScholarshipId(null)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Highlight Ribbon: Value & Calculated Match Score */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono text-slate-500 uppercase">Total Disbursement</div>
            <div className="text-lg font-bold font-mono text-[#0D9488]">
              {scholarship.amountFormatted}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[11px] font-mono text-slate-500 uppercase">Calculated Qualification</div>
              <div className="text-base font-bold font-mono text-[#2563EB] flex items-center gap-1.5 justify-end">
                <Sparkles className="w-4 h-4" />
                <span>{matchScore}% Criteria Fit</span>
              </div>
            </div>

            {alreadyTracking ? (
              <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>In Tracker</span>
              </span>
            ) : (
              <button
                onClick={() => addApplication(scholarship.id, 'preparing')}
                className="px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1D4ED8] transition-colors shadow-sm flex items-center gap-2"
              >
                <KanbanSquare className="w-4 h-4" />
                <span>Add to Tracker</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="px-6 border-b border-slate-200 bg-white flex gap-6 text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'audit'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Eligibility Breakdown
          </button>
          <button
            onClick={() => setActiveTab('benefits')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'benefits'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Benefits & Grants
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'docs'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Required Documents ({scholarship.requiredDocuments.length})
          </button>
          <button
            onClick={() => setActiveTab('procedure')}
            className={`py-3.5 border-b-2 transition-colors ${
              activeTab === 'procedure'
                ? 'border-[#2563EB] text-[#2563EB] font-bold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Procedure & Portal
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* TAB 1: ELIGIBILITY AUDIT */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase font-mono">
                  <Scale className="w-4 h-4 text-[#2563EB]" />
                  <span>Deterministic Audit Summary</span>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  This score is computed directly from your current academic profile (CGPA, degree level, course, and economic criteria) against published guidelines.
                </p>
              </div>

              {/* Reasons Why Student Matches */}
              {eligibility && eligibility.matchReasons.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-[#0D9488] font-bold tracking-wider">
                    Requirements Met ({eligibility.matchReasons.length})
                  </h4>
                  <div className="space-y-2">
                    {eligibility.matchReasons.map((reason, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Requirements or Warnings */}
              {eligibility && eligibility.missingActions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-amber-700 font-bold tracking-wider">
                    Criteria Requiring Attention ({eligibility.missingActions.length})
                  </h4>
                  <div className="space-y-2">
                    {eligibility.missingActions.map((action, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-950"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Requirements Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">
                  Complete Mandatory Criteria
                </h4>
                <div className="space-y-2">
                  {scholarship.requirements.map((req) => (
                    <div
                      key={req.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <span className="text-slate-800 font-medium">{req.label}</span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                        {req.mandatory ? 'Mandatory' : 'Optional'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BENEFITS & COVERAGE */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-serif text-lg font-bold text-[#0A192F]">Program Overview</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {scholarship.overview}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">
                  Itemized Grant Provisions
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {scholarship.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Acceptance Rate: <strong>{scholarship.acceptanceRate}</strong></span>
                <span>Coverage Type: <strong>{scholarship.coverageType}</strong></span>
              </div>
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS */}
          {activeTab === 'docs' && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-[#475569]">
                Gather these documents before initiating your official application. Verified documents uploaded to your GRANTLY Vault can be bundled directly.
              </p>

              <div className="space-y-2.5">
                {scholarship.requiredDocuments.map((docName, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-[#CBD5E1] flex items-center justify-between text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#2563EB]" />
                      <span className="font-medium text-slate-800">{docName}</span>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                      Required
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                <strong>Vault Notice:</strong> Ensure all certificates have clear seal and stamp impressions from authorized issuing authorities.
              </div>
            </div>
          )}

          {/* TAB 4: PROCEDURE & OFFICIAL PORTAL */}
          {activeTab === 'procedure' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">
                  Step-by-Step Submission Roadmap
                </h4>
                <div className="space-y-3">
                  {scholarship.applicationProcedure.map((proc, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3.5 text-xs sm:text-sm"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#0A192F] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-slate-800 pt-0.5">{proc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official External Link */}
              <div className="p-5 rounded-2xl bg-[#0A192F] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-mono text-amber-400 uppercase">Official Application Endpoint</div>
                  <div className="text-xs text-slate-300">
                    Verified directly against official institutional gazette ({scholarship.lastVerified})
                  </div>
                </div>

                <a
                  href={scholarship.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-xs font-semibold hover:bg-[#1D4ED8] transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <span>Go to Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Source verified: {scholarship.lastVerified}</span>
          <button
            onClick={() => setSelectedScholarshipId(null)}
            className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
