import React from 'react'
import { StoreProvider, useStore } from './services/scholarshipStore'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Toast } from './components/layout/Toast'
import { LandingPage } from './components/landing/LandingPage'
import { StudentOnboarding } from './components/onboarding/StudentOnboarding'
import { StudentDashboard } from './components/dashboard/StudentDashboard'
import { ScholarshipDiscovery } from './components/scholarships/ScholarshipDiscovery'
import { ApplicationTracker } from './components/applications/ApplicationTracker'
import { DocumentVault } from './components/documents/DocumentVault'
import { ScholarshipAssistant } from './components/assistant/ScholarshipAssistant'
import { ScholarshipDetailModal } from './components/scholarships/ScholarshipDetailModal'

function MainContent() {
  const { currentView } = useStore()

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        {currentView === 'landing' && <LandingPage />}
        {currentView === 'onboarding' && <StudentOnboarding />}
        {currentView === 'dashboard' && <StudentDashboard />}
        {currentView === 'discovery' && <ScholarshipDiscovery />}
        {currentView === 'applications' && <ApplicationTracker />}
        {currentView === 'documents' && <DocumentVault />}
        {currentView === 'assistant' && <ScholarshipAssistant />}
      </div>
      <Footer />
    </main>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#0A192F] selection:bg-[#2563EB] selection:text-white">
        <Navbar />
        <MainContent />
        <ScholarshipDetailModal />
        <Toast />
      </div>
    </StoreProvider>
  )
}
