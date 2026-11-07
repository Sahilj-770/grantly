import React from 'react'
import { useStore, AppView } from '../../services/scholarshipStore'
import { ShieldCheck, HeartHandshake, FileText, Sparkles, ArrowUpRight, Scale } from 'lucide-react'

export function Footer() {
  const { setCurrentView } = useStore()

  const navigateTo = (view: AppView) => {
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#0A192F] text-[#FBFBFA] pt-16 pb-12 border-t border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Ethos */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] flex items-center justify-center text-white font-serif font-bold text-lg">
                G
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">GRANTLY</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Find what you're eligible for. Focus on what comes next. Eliminating financial opacity and paperwork friction for ambitious students worldwide.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-slate-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Verified Institutional Catalog</span>
            </div>
          </div>

          {/* Column 2: Platform Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button onClick={() => navigateTo('discovery')} className="hover:text-white transition-colors">
                  Scholarship Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard')} className="hover:text-white transition-colors">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('applications')} className="hover:text-white transition-colors">
                  Application Tracker
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('documents')} className="hover:text-white transition-colors">
                  Encrypted Document Vault
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('assistant')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>GRANTLY AI Advisor</span>
                  <span className="text-[10px] bg-[#2563EB] text-white px-1.5 py-0.2 rounded font-mono">NEW</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Funding Pathways */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Funding Pathways</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button onClick={() => navigateTo('discovery')} className="hover:text-white transition-colors">
                  Government Direct Benefit Schemes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('discovery')} className="hover:text-white transition-colors">
                  Merit & Prestigious Fellowships
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('discovery')} className="hover:text-white transition-colors">
                  Need-Based Means Assistance
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('discovery')} className="hover:text-white transition-colors">
                  STEM & Women in Tech Grants
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('discovery')} className="hover:text-white transition-colors">
                  International Bilateral Fellowships
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Ethical Commitments & Compliance */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Integrity & Standards</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              GRANTLY is committed to transparent eligibility calculation without dark patterns, paywalled listings, or fabricated statistics.
            </p>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#D97706]" />
                <span>Deterministic Match Algorithms</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                <span>Zero Document Resale Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#2563EB]" />
                <span>WCAG 2.1 AA Accessibility Standards</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} GRANTLY Inc. All verified scholarship data sourced directly from official institutional trusts.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-300 cursor-pointer">Verification Methodology</span>
            <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
