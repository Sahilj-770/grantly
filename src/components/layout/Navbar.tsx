import React, { useState } from 'react'
import { useStore, AppView } from '../../services/scholarshipStore'
import {
  Compass,
  LayoutDashboard,
  KanbanSquare,
  FileCheck2,
  Sparkles,
  Menu,
  X,
  UserCheck,
  ChevronRight,
  ShieldCheck,
  Bookmark
} from 'lucide-react'

export function Navbar() {
  const { currentView, setCurrentView, profile } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems: { view: AppView; label: string; icon: React.ElementType }[] = [
    { view: 'landing', label: 'Overview', icon: Compass },
    { view: 'discovery', label: 'Discover', icon: Compass },
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'applications', label: 'Tracker', icon: KanbanSquare },
    { view: 'documents', label: 'Vault', icon: FileCheck2 },
    { view: 'assistant', label: 'AI Advisor', icon: Sparkles }
  ]

  const handleNavClick = (view: AppView) => {
    setCurrentView(view)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E2E8F0]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-3 text-left focus:outline-none group"
              aria-label="GRANTLY Home"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0A192F] flex items-center justify-center text-white font-bold text-lg shadow-sm border border-[#0A192F]/20 group-hover:scale-105 transition-transform duration-200">
                <span className="font-serif italic font-semibold text-xl text-[#FBFBFA]">G</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] -ml-0.5 mt-2"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0A192F]">
                  GRANTLY
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#475569] -mt-1 hidden sm:inline">
                  Scholarship Intelligence
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.view
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2 ${
                    isActive
                      ? 'text-[#2563EB] bg-[#2563EB]/10 font-semibold'
                      : 'text-[#334155] hover:text-[#0A192F] hover:bg-[#E2E8F0]/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#2563EB]' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2563EB] rounded-full" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Action: Student Profile Pill & Onboarding Trigger */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('onboarding')}
              className="px-3.5 py-2 text-xs font-medium text-[#0A192F] bg-white border border-[#CBD5E1] rounded-lg hover:border-[#2563EB] hover:text-[#2563EB] transition-colors shadow-2xs flex items-center gap-2"
              title="Edit Student Profile & Criteria"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Criteria: {profile.cgpa.toFixed(1)} CGPA</span>
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-[#0A192F] text-white hover:bg-[#1E293B] transition-colors shadow-sm group"
            >
              <div className="w-7 h-7 rounded-full bg-[#2563EB] flex items-center justify-center text-xs font-bold text-white uppercase tracking-wider">
                {profile.name.charAt(0)}
              </div>
              <span className="text-xs font-medium max-w-[100px] truncate">{profile.name}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile / Tablet Hamburger Button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="p-1.5 rounded-lg bg-[#0A192F] text-white text-xs font-bold w-8 h-8 flex items-center justify-center"
              aria-label="Student Profile"
            >
              {profile.name.charAt(0)}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#0A192F] hover:bg-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E2E8F0] bg-[#FBFBFA] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm text-[#0A192F]">{profile.name}</div>
                <div className="text-xs text-[#64748B]">{profile.educationLevel} • {profile.cgpa} CGPA</div>
              </div>
            </div>
            <button
              onClick={() => handleNavClick('onboarding')}
              className="text-xs font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1.5 rounded-md"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.view
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-white border border-[#E2E8F0] text-[#1E293B] hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#2563EB]'}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('discovery')}
              className="w-full py-3 bg-[#0A192F] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm"
            >
              <Compass className="w-4 h-4 text-[#D97706]" />
              <span>Explore All Scholarships</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
