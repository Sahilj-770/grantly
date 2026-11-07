import React, { useState } from 'react'
import { useStore } from '../../services/scholarshipStore'
import { Application, ApplicationStatus } from '../../types/application'
import { SCHOLARSHIPS_DATA } from '../../data/scholarshipsData'
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
  ChevronDown,
  ChevronUp,
  FileText,
  Trash2,
  PlusCircle,
  Edit3
} from 'lucide-react'

const STATUS_COLUMNS: { id: ApplicationStatus; label: string; color: string; badge: string }[] = [
  { id: 'interested', label: 'Interested', color: '#64748B', badge: 'bg-slate-100 text-slate-700' },
  { id: 'preparing', label: 'Preparing Dossier', color: '#2563EB', badge: 'bg-blue-50 text-blue-700' },
  { id: 'ready', label: 'Ready to Submit', color: '#D97706', badge: 'bg-amber-50 text-amber-800' },
  { id: 'submitted', label: 'Submitted', color: '#0891B2', badge: 'bg-cyan-50 text-cyan-800' },
  { id: 'under_review', label: 'Under Review', color: '#7C3AED', badge: 'bg-purple-50 text-purple-800' },
  { id: 'approved', label: 'Awarded / Approved', color: '#0D9488', badge: 'bg-emerald-50 text-emerald-800' }
]

export function ApplicationTracker() {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationNotes,
    deleteApplication,
    setCurrentView,
    quickOpenModal
  } = useStore()

  const [viewMode, setViewMode] = useState<'board' | 'list'>('board')
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null)
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null)
  const [tempNotes, setTempNotes] = useState<string>('')

  const handleStatusChange = (appId: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    updateApplicationStatus(appId, e.target.value as ApplicationStatus)
  }

  const startEditNotes = (app: Application) => {
    setEditingNotesId(app.id)
    setTempNotes(app.notes)
  }

  const saveNotes = (appId: string) => {
    updateApplicationNotes(appId, tempNotes)
    setEditingNotesId(null)
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFA] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] text-xs font-mono uppercase tracking-wider">
              <KanbanSquare className="w-3.5 h-3.5" />
              <span>Multi-Stage Pipeline</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0A192F] mt-1">
              Application Tracker
            </h1>
            <p className="text-xs sm:text-sm text-[#475569]">
              Track milestones, required next steps, notes, and official portal deadlines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('discovery')}
              className="px-4 py-2.5 bg-[#0A192F] text-white rounded-xl text-xs font-semibold hover:bg-[#1E293B] transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <PlusCircle className="w-4 h-4 text-[#D97706]" />
              <span>Add Opportunity</span>
            </button>

            <div className="flex items-center bg-white border border-slate-300 rounded-xl p-1 shadow-2xs">
              <button
                onClick={() => setViewMode('board')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'board' ? 'bg-[#0A192F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Board View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-[#0A192F] text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* KANBAN BOARD VIEW */}
        {viewMode === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto pb-4">
            {STATUS_COLUMNS.map((col) => {
              const colApps = applications.filter((a) => a.status === col.id)
              return (
                <div
                  key={col.id}
                  className="rounded-2xl bg-slate-50/80 border border-slate-200/90 p-3.5 space-y-3 min-w-[260px] flex flex-col"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-xs font-mono font-bold text-slate-800 uppercase">
                      {col.label}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white text-slate-700 font-bold border border-slate-200">
                      {colApps.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1">
                    {colApps.map((app) => {
                      const sch = SCHOLARSHIPS_DATA.find((s) => s.id === app.scholarshipId)
                      return (
                        <div
                          key={app.id}
                          className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs hover:shadow-sm transition-all space-y-3"
                        >
                          <div className="space-y-1">
                            <h4
                              onClick={() => quickOpenModal(app.scholarshipId)}
                              className="font-serif font-bold text-sm text-[#0A192F] hover:text-[#2563EB] cursor-pointer line-clamp-2"
                            >
                              {app.scholarshipTitle}
                            </h4>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              <span className="truncate">{app.provider}</span>
                            </div>
                          </div>

                          <div className="text-xs font-bold font-mono text-[#0D9488]">
                            {app.amountFormatted}
                          </div>

                          <div className="text-[11px] text-[#D97706] font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Due: {app.deadline}</span>
                          </div>

                          {/* Quick Status Dropdown */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <select
                              value={app.status}
                              onChange={(e) => handleStatusChange(app.id, e)}
                              className="text-[11px] font-mono bg-slate-100 border border-slate-200 rounded-md px-1.5 py-1 text-slate-700 font-semibold"
                            >
                              <option value="interested">Interested</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="submitted">Submitted</option>
                              <option value="under_review">Under Review</option>
                              <option value="approved">Approved</option>
                            </select>

                            <button
                              onClick={() => deleteApplication(app.id)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              aria-label="Delete tracked application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                    })}

                    {colApps.length === 0 && (
                      <div className="py-8 text-center text-xs text-slate-400 font-mono">
                        No applications in this stage
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* LIST VIEW */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {applications.map((app) => {
              const sch = SCHOLARSHIPS_DATA.find((s) => s.id === app.scholarshipId)
              const isExpanded = expandedAppId === app.id
              const isEditingNotes = editingNotesId === app.id

              return (
                <div
                  key={app.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e)}
                          className="text-xs font-mono font-bold bg-blue-50 text-[#2563EB] border border-blue-200 rounded-md px-2 py-0.5"
                        >
                          <option value="interested">Interested</option>
                          <option value="preparing">Preparing</option>
                          <option value="ready">Ready</option>
                          <option value="submitted">Submitted</option>
                          <option value="under_review">Under Review</option>
                          <option value="approved">Approved</option>
                        </select>

                        <span className="text-xs font-mono text-slate-500">
                          Due: {app.deadline}
                        </span>
                      </div>

                      <h3
                        onClick={() => quickOpenModal(app.scholarshipId)}
                        className="font-serif text-lg font-bold text-[#0A192F] hover:text-[#2563EB] cursor-pointer transition-colors"
                      >
                        {app.scholarshipTitle}
                      </h3>

                      <p className="text-xs text-[#64748B]">{app.provider}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-[#64748B] font-mono">Grant Value</div>
                        <div className="text-sm font-bold font-mono text-[#0D9488]">
                          {app.amountFormatted}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedAppId(isExpanded ? null : app.id)}
                        className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                        aria-label="Expand application details"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details: Notes, Next Steps, Timeline */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-100 space-y-4 text-xs">
                      {/* Next Step */}
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                        <span className="font-mono uppercase font-bold text-[10px] text-amber-800 block mb-0.5">
                          Action Required Next
                        </span>
                        <p className="text-slate-800">{app.nextStep}</p>
                      </div>

                      {/* Notes Box */}
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono uppercase font-bold text-[10px] text-slate-600">
                            Student Notes & Log
                          </span>
                          {!isEditingNotes ? (
                            <button
                              onClick={() => startEditNotes(app)}
                              className="text-[#2563EB] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Edit3 className="w-3 h-3" />
                              <span>Edit</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => saveNotes(app.id)}
                              className="text-emerald-700 hover:underline font-bold"
                            >
                              Save
                            </button>
                          )}
                        </div>

                        {isEditingNotes ? (
                          <textarea
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                          />
                        ) : (
                          <p className="text-slate-700">{app.notes}</p>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] font-mono text-slate-400">
                          Last Updated: {app.lastUpdated}
                        </span>

                        <div className="flex items-center gap-3">
                          {sch && (
                            <a
                              href={sch.officialPortal}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2563EB] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>Official Portal</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <button
                            onClick={() => deleteApplication(app.id)}
                            className="text-rose-600 hover:underline font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
