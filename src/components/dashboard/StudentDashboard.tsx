import React, { useMemo } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { ScholarshipCard } from '../scholarships/ScholarshipCard'
import { DashboardOpportunityRibbon } from './DashboardOpportunityRibbon'
import {
  Sparkles,
  Calendar,
  AlertCircle,
  FileCheck2,
  KanbanSquare,
  ArrowRight,
  TrendingUp,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  UserCheck
} from 'lucide-react'

export function StudentDashboard() {
  const { profile, scholarships, applications, documents, setCurrentView, getEligibilityFor, quickOpenModal } = useStore()

  // Find top matched scholarships
  const topMatches = [...scholarships]
    .map((sch) => ({
      scholarship: sch,
      eligibility: getEligibilityFor(sch.id)
    }))
    .sort((a, b) => (b.eligibility?.overallMatchScore || 0) - (a.eligibility?.overallMatchScore || 0))
    .slice(0, 3)

  // Honest profile completeness based on real fields
  const profileCompleteness = useMemo(() => {
    const fields = [
      Boolean(profile.name && profile.name.trim()),
      Boolean(profile.email && profile.email.trim()),
      Boolean(profile.educationLevel),
      Boolean(profile.course && profile.course.trim()),
      Boolean(profile.academicYear),
      Boolean(profile.institution && profile.institution.trim()),
      Boolean(profile.state && profile.state.trim()),
      Boolean(profile.country && profile.country.trim()),
      Boolean(profile.cgpa && profile.cgpa > 0),
      Boolean(profile.incomeBracket),
      Boolean(profile.category),
      Boolean(profile.gender)
    ]
    const filled = fields.filter(Boolean).length
    return Math.round((filled / fields.length) * 100)
  }, [profile])

  // Intelligent selection of the most actionable upcoming application
  const activeApps = applications.filter(
    (a) => a.status !== 'approved' && a.status !== 'rejected' && a.status !== 'archived' && a.status !== 'withdrawn'
  )
  const urgentApp = useMemo(() => {
    if (activeApps.length === 0) return null
    return [...activeApps].sort((a, b) => {
      // Prioritize imminent deadlines (<= 7 days)
      const aUrgent = a.daysRemaining <= 7 && a.daysRemaining >= 0 ? 1 : 0
      const bUrgent = b.daysRemaining <= 7 && b.daysRemaining >= 0 ? 1 : 0
      if (aUrgent !== bUrgent) return bUrgent - aUrgent

      // Prioritize 'ready' applications needing immediate portal submission
      if (a.status === 'ready' && b.status !== 'ready') return -1
      if (b.status === 'ready' && a.status !== 'ready') return 1

      // Then sort by nearest deadline
      return a.daysRemaining - b.daysRemaining
    })[0] || null
  }, [activeApps])

  return (
    <div className="w-full min-h-screen bg-[#FBFBFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Welcome & Profile Strength Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0A192F] text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Intelligence Hub</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
              Welcome back, {profile.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {profile.course} • {profile.institution} ({profile.cgpa.toFixed(2)} CGPA)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center sm:text-left">
              <div className="text-[10px] font-mono uppercase text-slate-400">Profile Completeness</div>
              <div className="text-sm font-bold font-mono text-emerald-400 flex items-center gap-1.5 justify-center sm:justify-start">
                <CheckCircle2 className="w-4 h-4" />
                <span>{profileCompleteness}% Complete</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('onboarding')}
              className="px-4 py-3 bg-[#2563EB] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1D4ED8] transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <UserCheck className="w-4 h-4" />
              <span>Update Criteria</span>
            </button>
          </div>
        </div>

        {/* Recommended Next Action Banner */}
        {urgentApp ? (
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-mono uppercase text-amber-800 font-bold tracking-wider">
                  Recommended Next Action
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  {urgentApp.scholarshipTitle}
                </div>
                <p className="text-xs text-slate-600">
                  {urgentApp.nextStep} (Target Deadline: {urgentApp.deadline})
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('applications')}
              className="px-5 py-2.5 bg-[#0A192F] text-white rounded-xl text-xs font-semibold hover:bg-[#2563EB] transition-colors shrink-0 flex items-center justify-center gap-2 self-start sm:self-center shadow-xs"
            >
              <span>View in Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-mono uppercase text-emerald-800 font-bold tracking-wider">
                  Applications In Good Standing
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900">
                  No Immediate Deadlines Approaching
                </div>
                <p className="text-xs text-slate-600">
                  All active dossiers are up to date. Explore new verified endowments in the discovery catalog.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('discovery')}
              className="px-5 py-2.5 bg-[#0A192F] text-white rounded-xl text-xs font-semibold hover:bg-[#2563EB] transition-colors shrink-0 flex items-center justify-center gap-2 self-start sm:self-center shadow-xs"
            >
              <span>Explore Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 3D Opportunity Ribbon: Interactive WebGL / Spline Showcase */}
        <DashboardOpportunityRibbon />

        {/* Main Content Grid: Top Matches (Left 8 cols) & Applications Overview (Right 4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Highest Matched Opportunities */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0A192F]">
                  Top Qualified Opportunities
                </h2>
                <p className="text-xs text-[#64748B]">
                  Calculated against your {profile.cgpa} CGPA, academic level, and discipline
                </p>
              </div>

              <button
                onClick={() => setCurrentView('discovery')}
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1"
              >
                <span>View All ({scholarships.length})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {topMatches.map(({ scholarship, eligibility }) => (
                <div
                  key={scholarship.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                        {scholarship.category}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{eligibility?.overallMatchScore}% Match</span>
                      </span>
                    </div>

                    <h3
                      onClick={() => quickOpenModal(scholarship.id)}
                      className="font-serif text-lg sm:text-xl font-bold text-[#0A192F] hover:text-[#2563EB] cursor-pointer transition-colors leading-snug"
                    >
                      {scholarship.title}
                    </h3>

                    <p className="text-xs text-[#475569] line-clamp-2">
                      {scholarship.description}
                    </p>

                    <div className="text-[11px] text-[#0D9488] font-bold font-mono">
                      {scholarship.amountFormatted}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="text-[11px] font-mono text-slate-500">
                      {scholarship.daysRemaining} days left
                    </span>

                    <button
                      onClick={() => quickOpenModal(scholarship.id)}
                      className="px-4 py-2 bg-[#0A192F] text-white text-xs font-semibold rounded-xl hover:bg-[#2563EB] transition-colors"
                    >
                      Inspect Match
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR: Applications & Vault Health */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Applications Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#CBD5E1] shadow-2xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <KanbanSquare className="w-4 h-4 text-[#2563EB]" />
                  <h3 className="font-serif text-lg font-bold text-[#0A192F]">Application Tracker</h3>
                </div>
                <button
                  onClick={() => setCurrentView('applications')}
                  className="text-xs text-[#2563EB] font-semibold hover:underline"
                >
                  Manage
                </button>
              </div>

              {applications.length > 0 ? (
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div
                      key={app.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="font-semibold text-slate-900 truncate max-w-[180px]">
                          {app.scholarshipTitle}
                        </span>
                        <span className="uppercase text-[#2563EB] bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0D9488] rounded-full"
                          style={{ width: `${app.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No applications tracked yet.</p>
              )}
            </div>

            {/* Document Vault Status Widget */}
            <div className="p-6 rounded-3xl bg-white border border-[#CBD5E1] shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                  <h3 className="font-serif text-lg font-bold text-[#0A192F]">Document Vault</h3>
                </div>
                <button
                  onClick={() => setCurrentView('documents')}
                  className="text-xs text-[#2563EB] font-semibold hover:underline"
                >
                  Open Vault
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span>Active Vault Dossiers</span>
                  <span className="font-mono font-bold text-slate-900">{documents.length} Files</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span>Verification Status</span>
                  <span className="text-emerald-700 font-semibold font-mono">Self-Attested & Certified</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span>Storage Privacy</span>
                  <span className="font-mono text-slate-500">Local Sandbox</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
