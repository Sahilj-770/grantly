import React from 'react'
import { useStore } from '../../services/scholarshipStore'
import { CheckCircle2, X } from 'lucide-react'

export function Toast() {
  const { toastMessage, setToast } = useStore()

  if (!toastMessage) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0A192F] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>
        <p className="text-xs sm:text-sm font-medium text-slate-100">{toastMessage}</p>
      </div>
      <button
        onClick={() => setToast(null)}
        className="text-slate-400 hover:text-white p-1 rounded-md focus:outline-none focus:ring-1 focus:ring-white"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
