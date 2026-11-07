import React, { useState } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { Application, ApplicationStatus, DeadlineUrgency } from '../../types/application'
import { SCHOLARSHIPS_DATA } from '../../data/scholarshipsData'
import {
  X,
  Calendar,
  Building2,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  Archive,
  Trash2,
  CheckSquare,
  Square,
  History,
  FileText,
  Save,
  ChevronRight,
  Sparkles
} from 'lucide-react'

interface ApplicationDetailDrawerProps {
  appId: string | null
  onClose: () => void
}

const STATUS_OPTIONS: { id: ApplicationStatus; label: string }[] = [
  { id: 'interested', label: '1. Interested / Backlog' },
  { id: 'preparing', label: '2. Preparing Dossier' },
  { id: 'ready', label: '3. Ready to Submit' },
  { id: 'submitted', label: '4. Submitted to Portal' },
  { id: 'under_review', label: '5. Under Review' },
  { id: 'approved', label: '6. Awarded / Approved' },
  { id: 'rejected', label: 'Rejected / Ineligible' },
  { id: 'withdrawn', label: 'Withdrawn' },
  { id: 'archived', label: 'Archived' }
]

export function ApplicationDetailDrawer({ appId, onClose }: ApplicationDetailDrawerProps) {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    toggleMilestone,
    toggleChecklistItem,
    archiveApplication,
    unarchiveApplication,
    deleteApplication,
    quickOpenModal
  } = useStore()

  const app = applications.find((a) => a.id === appId)
  const [notes, setNotes] = useState(app?.notes || '')
  const [isNotesSaved, setIsNotesSaved] = useState(false)

  if (!app) return null

  const scholarship = SCHOLARSHIPS_DATA.find((s) => s.id === app.scholarshipId)

  const handleNotesSave = () => {
    updateApplicationNotes(app.id, notes)
    setIsNotesSaved(true)
    setTimeout(() => setIsNotesSaved(false), 2000)
  }

  // Calculate urgency pill style
  const getUrgencyBadge = (urgency: DeadlineUrgency, days: number) => {
    if (urgency === 'overdue' || days <= 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-600 border border-rose-300">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Deadline Passed</span>
        </span>
      )
    }
    if (urgency === 'due_today' || days === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/15 text-rose-600 border border-rose-300 animate-pulse">
          <Clock className="w-3.5 h-3.5" />
          <span>Due Today!</span>
        </span>
      )
    }
    if (urgency === 'due_soon' || days <= 7) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-700 border border-amber-300">
          <Clock className="w-3.5 h-3.5" />
          <span>Due in {days} Days</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
        <Calendar className="w-3.5 h-3.5 text-slate-500" />
        <span>{days} Days Remaining</span>
      </span>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          aria-label="Application Operations Dossier"
          className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slideInRight"
        >
          {/* Header */}
          <div className="p-6 bg-[#0A192F] text-white flex items-start justify-between gap-4 border-b border-slate-800">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Operations Dossier
                </span>
                {app.isVerifiedDeadline && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Institution
                  </span>
                )}
              </div>

              <h2 className="font-serif text-2xl font-bold text-white tracking-tight leading-snug">
                {app.scholarshipTitle}
              </h2>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 font-mono">
                <span className="flex items-center gap-1 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-blue-400" />
                  {app.provider}
                </span>
                <span className="flex items-center gap-1 text-amber-300 font-bold">
                  <Coins className="w-3.5 h-3.5" />
                  {app.amountFormatted}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#FBFBFA]">
            {/* Stage Selector & Deadline Urgency */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label htmlFor="pipeline-stage-select" className="text-xs font-mono font-bold uppercase text-slate-500">Pipeline Stage</label>
                {getUrgencyBadge(app.urgency, app.daysRemaining)}
              </div>

              <div className="flex items-center gap-3">
                <select
                  id="pipeline-stage-select"
                  aria-label="Pipeline Stage"
                  value={app.status}
                  onChange={(e) => updateApplicationStatus(app.id, e.target.value as ApplicationStatus)}
                  className="w-full text-sm font-semibold text-[#0A192F] bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Dossier Completion</span>
                  <span className="font-bold text-[#2563EB]">{app.progressPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#0D9488] transition-all duration-500 rounded-full"
                    style={{ width: `${app.progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Milestone Timeline */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#0A192F] flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#2563EB]" />
                  <span>Milestone Verification Pipeline</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {app.milestones.filter((m) => m.completed).length} / {app.milestones.length} Completed
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {app.milestones.map((milestone, idx) => {
                  const isDone = milestone.completed
                  return (
                    <button
                      type="button"
                      key={milestone.id}
                      role="checkbox"
                      aria-checked={isDone}
                      onClick={() => toggleMilestone(app.id, milestone.id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span aria-hidden="true" className="mt-0.5 shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 text-[10px] font-mono flex items-center justify-center text-slate-500">
                            {idx + 1}
                          </div>
                        )}
                      </span>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-sm font-semibold ${
                              isDone ? 'text-emerald-950 line-through opacity-80' : 'text-[#0A192F]'
                            }`}
                          >
                            {milestone.title}
                          </span>
                          {milestone.completedAt && (
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                              {milestone.completedAt}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">{milestone.description}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Document Checklist Items */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-[#0A192F] flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#D97706]" />
                  <span>Dossier Checklist Items</span>
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {app.checklist.filter((c) => c.completed).length} / {app.checklist.length} Ready
                </span>
              </div>

              <div className="space-y-2.5">
                {app.checklist.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    role="checkbox"
                    aria-checked={item.completed}
                    onClick={() => toggleChecklistItem(app.id, item.id)}
                    className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
                  >
                    <span aria-hidden="true" className="shrink-0">
                      {item.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400" />
                      )}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        item.completed ? 'text-slate-500 line-through' : 'text-slate-800'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Student Strategy Notes */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="application-strategy-notes" className="font-serif text-lg font-bold text-[#0A192F] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#2563EB]" />
                  <span>Application Strategy Notes</span>
                </label>
                {isNotesSaved && (
                  <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
              </div>

              <textarea
                id="application-strategy-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Log professor recommendations, essay drafts, committee follow-ups..."
                className="w-full h-24 p-3 text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleNotesSave}
                  className="px-4 py-2 bg-[#0A192F] text-white rounded-xl text-xs font-semibold hover:bg-[#1E293B] transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Notes</span>
                </button>
              </div>
            </div>

            {/* Audit History Log */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#0A192F] flex items-center gap-2">
                <History className="w-4 h-4 text-slate-500" />
                <span>Lifecycle History</span>
              </h3>

              <div className="space-y-3">
                {app.history.map((ev) => (
                  <div key={ev.id} className="text-xs border-l-2 border-[#2563EB]/40 pl-3 py-0.5 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-400 text-[10px]">{ev.date}</span>
                      <span className="font-semibold text-slate-800">{ev.title}</span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{ev.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {app.status === 'archived' ? (
                <button
                  onClick={() => unarchiveApplication(app.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                >
                  <Archive className="w-3.5 h-3.5 text-blue-600" />
                  <span>Unarchive</span>
                </button>
              ) : (
                <button
                  onClick={() => archiveApplication(app.id)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>Archive</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to remove "${app.scholarshipTitle}" from your tracker?`)) {
                    deleteApplication(app.id)
                    onClose()
                  }
                }}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-200 hover:bg-rose-50 text-rose-600 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  quickOpenModal(app.scholarshipId)
                  onClose()
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-[#2563EB] text-[#2563EB] hover:bg-blue-50 transition-colors flex items-center gap-1.5"
              >
                <span>Full Criteria Spec</span>
              </button>

              {scholarship?.officialPortal && (
                <a
                  href={scholarship.officialPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#2563EB] text-white hover:bg-blue-700 transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
