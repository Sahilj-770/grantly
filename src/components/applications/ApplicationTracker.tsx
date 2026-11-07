import React, { useState, useMemo } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { Application, ApplicationStatus, DeadlineUrgency } from '../../types/application'
import { ApplicationDetailDrawer } from './ApplicationDetailDrawer'
import {
  KanbanSquare,
  List,
  LayoutGrid,
  Clock,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  PlusCircle,
  Search,
  Filter,
  CheckSquare,
  Sparkles,
  Archive,
  ArrowUpRight,
  ShieldCheck,
  Coins
} from 'lucide-react'

const KANBAN_STAGES: { id: ApplicationStatus; label: string; description: string; headerColor: string }[] = [
  { id: 'interested', label: 'Interested', description: 'Matched & saved opportunities', headerColor: 'border-slate-400 text-slate-700' },
  { id: 'preparing', label: 'Preparing', description: 'Transcripts, SOP & letters in progress', headerColor: 'border-blue-500 text-blue-700' },
  { id: 'ready', label: 'Ready to Submit', description: 'All dossier checklist items verified', headerColor: 'border-amber-500 text-amber-700' },
  { id: 'submitted', label: 'Submitted', description: 'Dispatched to official institutional portal', headerColor: 'border-cyan-500 text-cyan-700' },
  { id: 'under_review', label: 'Under Review', description: 'Evaluation by faculty committee', headerColor: 'border-purple-500 text-purple-700' },
  { id: 'approved', label: 'Awarded', description: 'Offer received & grant funds confirmed', headerColor: 'border-emerald-500 text-emerald-700' }
]

export function ApplicationTracker() {
  const { applications, updateApplicationStatus, setCurrentView } = useStore()

  const [viewMode, setViewMode] = useState<'board' | 'list'>('board')
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null)
  const [searchFilter, setSearchFilter] = useState('')
  const [showArchived, setShowArchived] = useState(false)
  const [urgencyOnly, setUrgencyOnly] = useState(false)

  // Executive Metrics Calculations
  const metrics = useMemo(() => {
    const active = applications.filter((a) => a.status !== 'archived' && a.status !== 'withdrawn')
    const preparing = applications.filter((a) => a.status === 'preparing').length
    const ready = applications.filter((a) => a.status === 'ready').length
    const underReview = applications.filter((a) => a.status === 'under_review' || a.status === 'submitted').length
    const awarded = applications.filter((a) => a.status === 'approved').length
    const urgentDeadlines = active.filter((a) => a.daysRemaining <= 7 && a.daysRemaining >= 0).length

    return {
      totalActive: active.length,
      preparing,
      ready,
      underReview,
      awarded,
      urgentDeadlines
    }
  }, [applications])

  // Filtered Applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // Archive filter
      if (!showArchived && (app.status === 'archived' || app.status === 'withdrawn')) {
        return false
      }
      if (showArchived && app.status !== 'archived' && app.status !== 'withdrawn') {
        return false
      }

      // Urgency filter (due within 14 days)
      if (urgencyOnly && app.daysRemaining > 14) {
        return false
      }

      // Search filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase()
        const matchesTitle = app.scholarshipTitle.toLowerCase().includes(q)
        const matchesProvider = app.provider.toLowerCase().includes(q)
        const matchesNotes = app.notes.toLowerCase().includes(q)
        if (!matchesTitle && !matchesProvider && !matchesNotes) {
          return false
        }
      }

      return true
    })
  }, [applications, showArchived, urgencyOnly, searchFilter])

  // Advance stage helper
  const handleAdvanceStage = (app: Application, e: React.MouseEvent) => {
    e.stopPropagation()
    const stageOrder: ApplicationStatus[] = ['interested', 'preparing', 'ready', 'submitted', 'under_review', 'approved']
    const currentIndex = stageOrder.indexOf(app.status)
    if (currentIndex >= 0 && currentIndex < stageOrder.length - 1) {
      updateApplicationStatus(app.id, stageOrder[currentIndex + 1])
    }
  }

  // Render urgency badge
  const renderUrgencyTag = (urgency: DeadlineUrgency, days: number) => {
    if (urgency === 'overdue' || days <= 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <AlertCircle className="w-3 h-3 text-rose-600" />
          <span>Expired</span>
        </span>
      )
    }
    if (days <= 7) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
          <Clock className="w-3 h-3 text-amber-600" />
          <span>{days}d Left</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200">
        <Calendar className="w-3 h-3 text-slate-400" />
        <span>{days}d</span>
      </span>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Operations Center Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A192F] text-amber-400 text-xs font-mono tracking-wider">
              <KanbanSquare className="w-3.5 h-3.5" />
              <span>Operations Command Center</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F]">
              Scholarship Operations Center
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] max-w-2xl">
              Track multi-stage dossier preparation, deadline countdowns, milestone completions, and official university portal submissions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('discovery')}
              className="px-4 py-2.5 bg-[#0A192F] text-white rounded-xl text-xs font-semibold hover:bg-[#1E293B] transition-colors flex items-center gap-2 shadow-2xs"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Add From Catalog</span>
            </button>
          </div>
        </div>

        {/* Executive Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Total Active</div>
            <div className="text-2xl font-bold text-[#0A192F] mt-1 font-mono">{metrics.totalActive}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Tracked records</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-blue-200 bg-blue-50/20 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-blue-700">In Preparation</div>
            <div className="text-2xl font-bold text-blue-700 mt-1 font-mono">{metrics.preparing}</div>
            <div className="text-[10px] text-blue-600/70 mt-0.5">Dossier drafting</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200 bg-amber-50/20 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-700">Ready to Submit</div>
            <div className="text-2xl font-bold text-amber-700 mt-1 font-mono">{metrics.ready}</div>
            <div className="text-[10px] text-amber-600/70 mt-0.5">Checklist complete</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-200 bg-purple-50/20 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-purple-700">Under Review</div>
            <div className="text-2xl font-bold text-purple-700 mt-1 font-mono">{metrics.underReview}</div>
            <div className="text-[10px] text-purple-600/70 mt-0.5">With committees</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-emerald-200 bg-emerald-50/20 shadow-2xs">
            <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-700">Awarded</div>
            <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono">{metrics.awarded}</div>
            <div className="text-[10px] text-emerald-600/70 mt-0.5">Confirmed funding</div>
          </div>

          <div
            className={`p-4 rounded-2xl border shadow-2xs transition-all ${
              metrics.urgentDeadlines > 0
                ? 'bg-rose-50/50 border-rose-300 text-rose-900 ring-1 ring-rose-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-700 font-bold">
                ≤ 7 Days Left
              </span>
              {metrics.urgentDeadlines > 0 && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
            </div>
            <div className="text-2xl font-bold text-rose-700 mt-1 font-mono">{metrics.urgentDeadlines}</div>
            <div className="text-[10px] text-rose-600 mt-0.5">Require immediate action</div>
          </div>
        </div>

        {/* Control & Filter Strip */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search tracked grants..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            {/* Approaching deadlines filter */}
            <button
              onClick={() => setUrgencyOnly(!urgencyOnly)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                urgencyOnly
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>≤ 14 Days Only</span>
            </button>

            {/* Archived toggle */}
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                showArchived
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Archived ({applications.filter((a) => a.status === 'archived').length})</span>
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl p-1 self-end sm:self-auto">
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'board' ? 'bg-white text-[#0A192F] shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'list' ? 'bg-white text-[#0A192F] shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>

        {/* KANBAN BOARD VIEW */}
        {viewMode === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {KANBAN_STAGES.map((stage) => {
              const stageApps = filteredApplications.filter((a) => a.status === stage.id)

              return (
                <div
                  key={stage.id}
                  className="bg-slate-100/70 border border-slate-200 rounded-2xl p-3.5 flex flex-col min-h-[500px]"
                >
                  {/* Column Header */}
                  <div className={`pb-3 mb-3 border-b-2 ${stage.headerColor} flex items-center justify-between`}>
                    <div>
                      <h3 className="font-serif text-sm font-bold text-[#0A192F]">{stage.label}</h3>
                      <p className="text-[10px] text-slate-500 line-clamp-1">{stage.description}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-white text-slate-700 border border-slate-200 shadow-2xs">
                      {stageApps.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="flex-1 space-y-3 overflow-y-auto">
                    {stageApps.map((app) => {
                      const completedChecklistCount = app.checklist.filter((c) => c.completed).length

                      return (
                        <div
                          key={app.id}
                          onClick={() => setSelectedAppId(app.id)}
                          className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all cursor-pointer group space-y-3"
                        >
                          {/* Card Top: Title & Urgency */}
                          <div className="space-y-1">
                            <div className="flex items-start justify-between gap-1.5">
                              <h4 className="font-serif text-xs font-bold text-[#0A192F] group-hover:text-[#2563EB] transition-colors line-clamp-2 leading-snug">
                                {app.scholarshipTitle}
                              </h4>
                              {renderUrgencyTag(app.urgency, app.daysRemaining)}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-400" />
                              <span className="truncate">{app.provider}</span>
                            </div>
                          </div>

                          {/* Grant Amount & Deadline */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-[#0D9488]">{app.amountFormatted}</span>
                            <span className="text-slate-400 text-[10px]">Due {app.deadline}</span>
                          </div>

                          {/* Progress bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                              <span>Dossier</span>
                              <span>{app.progressPercentage}%</span>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-600 to-teal-500 rounded-full"
                                style={{ width: `${app.progressPercentage}%` }}
                              />
                            </div>
                          </div>

                          {/* Checklist & Next Action */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                            <span className="text-slate-500 flex items-center gap-1">
                              <CheckSquare className="w-3 h-3 text-emerald-600" />
                              <span>{completedChecklistCount}/{app.checklist.length}</span>
                            </span>

                            {stage.id !== 'approved' && (
                              <button
                                onClick={(e) => handleAdvanceStage(app, e)}
                                className="text-[#2563EB] font-bold hover:underline flex items-center gap-0.5"
                                title="Advance to next pipeline stage"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })}

                    {stageApps.length === 0 && (
                      <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-4 text-center">
                        <p className="text-[11px] font-mono text-slate-400">No applications in this stage</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* DENSE TABLE / LIST VIEW */}
        {viewMode === 'list' && (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-mono text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Scholarship</th>
                    <th className="py-3 px-4 font-semibold">Stage</th>
                    <th className="py-3 px-4 font-semibold">Amount</th>
                    <th className="py-3 px-4 font-semibold">Deadline</th>
                    <th className="py-3 px-4 font-semibold">Checklist</th>
                    <th className="py-3 px-4 font-semibold">Progress</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApplications.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => setSelectedAppId(app.id)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-serif font-bold text-sm text-[#0A192F] group-hover:text-[#2563EB]">
                          {app.scholarshipTitle}
                        </div>
                        <div className="text-slate-500 font-mono text-[11px]">{app.provider}</div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-semibold">
                        <span className="px-2.5 py-1 rounded-full text-[11px] bg-slate-100 text-slate-700 capitalize">
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-[#0D9488]">
                        {app.amountFormatted}
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span>{app.deadline}</span>
                          {renderUrgencyTag(app.urgency, app.daysRemaining)}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {app.checklist.filter((c) => c.completed).length} / {app.checklist.length} Verified
                      </td>

                      <td className="py-3.5 px-4 font-mono">
                        <div className="flex items-center gap-2">
                          <span className="w-7 text-[11px] text-slate-500">{app.progressPercentage}%</span>
                          <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${app.progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedAppId(app.id)
                          }}
                          className="px-3 py-1 rounded-lg border border-slate-300 hover:border-[#2563EB] hover:text-[#2563EB] font-mono text-[11px] font-semibold transition-colors"
                        >
                          Inspect Dossier →
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredApplications.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center">
                        <p className="text-sm font-serif text-slate-500">No applications match the current criteria.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Global Empty State */}
        {applications.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-4 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mx-auto">
              <KanbanSquare className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#0A192F]">No Tracked Opportunities Yet</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Browse the catalog to add verified grants to your personal pipeline and unlock milestone tracking.
            </p>
            <button
              onClick={() => setCurrentView('discovery')}
              className="px-6 py-3 bg-[#0A192F] text-white rounded-xl text-xs font-semibold hover:bg-[#1E293B] transition-colors"
            >
              Explore Scholarship Directory
            </button>
          </div>
        )}

        {/* Slide-out Application Detail Drawer */}
        <ApplicationDetailDrawer
          appId={selectedAppId}
          onClose={() => setSelectedAppId(null)}
        />
      </div>
    </div>
  )
}
