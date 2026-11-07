import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Scholarship, EligibilityResult } from '../types/scholarship'
import { StudentProfile, DEFAULT_STUDENT_PROFILE } from '../types/student'
import { Application, ApplicationStatus } from '../types/application'
import { VaultDocument } from '../types/document'
import { SCHOLARSHIPS_DATA } from '../data/scholarshipsData'
import { INITIAL_APPLICATIONS, INITIAL_DOCUMENTS } from '../data/mockUserData'
import { calculateEligibility } from './matchingEngine'

export type AppView =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'discovery'
  | 'applications'
  | 'documents'
  | 'assistant'

interface StoreContextType {
  currentView: AppView
  setCurrentView: (view: AppView) => void
  selectedScholarshipId: string | null
  setSelectedScholarshipId: (id: string | null) => void
  selectedCategory: string | null
  setSelectedCategory: (cat: string | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  profile: StudentProfile
  updateProfile: (updates: Partial<StudentProfile>) => void
  scholarships: Scholarship[]
  applications: Application[]
  addApplication: (scholarshipId: string, initialStatus?: ApplicationStatus) => void
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void
  updateApplicationNotes: (appId: string, notes: string) => void
  deleteApplication: (appId: string) => void
  documents: VaultDocument[]
  addDocument: (doc: Omit<VaultDocument, 'id' | 'uploadedAt'>) => void
  deleteDocument: (id: string) => void
  isSaved: (scholarshipId: string) => boolean
  toggleSaveScholarship: (scholarshipId: string) => void
  getEligibilityFor: (scholarshipId: string) => EligibilityResult | null
  quickOpenModal: (scholarshipId: string) => void
  toastMessage: string | null
  setToast: (msg: string | null) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const STORAGE_KEYS = {
  PROFILE: 'grantly_profile_v1',
  APPLICATIONS: 'grantly_applications_v1',
  DOCUMENTS: 'grantly_documents_v1',
  SAVED: 'grantly_saved_v1'
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<AppView>('landing')
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Profile State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE)
      return saved ? JSON.parse(saved) : DEFAULT_STUDENT_PROFILE
    } catch {
      return DEFAULT_STUDENT_PROFILE
    }
  })

  // Applications State
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS)
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS
    } catch {
      return INITIAL_APPLICATIONS
    }
  })

  // Documents State
  const [documents, setDocuments] = useState<VaultDocument[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS)
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS
    } catch {
      return INITIAL_DOCUMENTS
    }
  })

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
    } catch (e) {
      console.warn('Failed to persist profile', e)
    }
  }, [profile])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications))
    } catch (e) {
      console.warn('Failed to persist applications', e)
    }
  }, [applications])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents))
    } catch (e) {
      console.warn('Failed to persist documents', e)
    }
  }, [documents])

  const showToast = (msg: string | null) => {
    setToastMessage(msg)
    if (msg) {
      setTimeout(() => {
        setToastMessage((current) => (current === msg ? null : current))
      }, 3500)
    }
  }

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }))
    showToast('Student profile updated successfully.')
  }

  const isSaved = (scholarshipId: string) => {
    return profile.savedScholarshipIds.includes(scholarshipId)
  }

  const toggleSaveScholarship = (scholarshipId: string) => {
    setProfile(prev => {
      const isAlreadySaved = prev.savedScholarshipIds.includes(scholarshipId)
      const newSaved = isAlreadySaved
        ? prev.savedScholarshipIds.filter(id => id !== scholarshipId)
        : [...prev.savedScholarshipIds, scholarshipId]
      
      showToast(isAlreadySaved ? 'Removed from saved opportunities.' : 'Saved to your opportunity collection.')
      return {
        ...prev,
        savedScholarshipIds: newSaved
      }
    })
  }

  const addApplication = (scholarshipId: string, initialStatus: ApplicationStatus = 'interested') => {
    const existing = applications.find(a => a.scholarshipId === scholarshipId)
    if (existing) {
      showToast('This opportunity is already in your application tracker.')
      return
    }

    const sch = SCHOLARSHIPS_DATA.find(s => s.id === scholarshipId)
    if (!sch) return

    const newApp: Application = {
      id: `app-${Date.now()}`,
      scholarshipId: sch.id,
      scholarshipTitle: sch.title,
      provider: sch.provider,
      amountFormatted: sch.amountFormatted,
      deadline: sch.deadline,
      status: initialStatus,
      progressPercentage: initialStatus === 'submitted' ? 75 : initialStatus === 'ready' ? 50 : 20,
      notes: 'Added from scholarship directory.',
      nextStep: 'Complete required document verification.',
      lastUpdated: new Date().toISOString().split('T')[0],
      history: [
        {
          id: `h-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          title: 'Opportunity Tracked',
          description: `Added to ${initialStatus} stage via GRANTLY tracker.`
        }
      ],
      attachedDocumentIds: []
    }

    setApplications(prev => [newApp, ...prev])
    showToast(`Added "${sch.title}" to Application Tracker.`)
  }

  const updateApplicationStatus = (appId: string, newStatus: ApplicationStatus) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const statusLabels: Record<ApplicationStatus, string> = {
            interested: 'Saved as Interested',
            preparing: 'Preparation in Progress',
            ready: 'Application Dossier Ready',
            submitted: 'Application Submitted',
            under_review: 'Under Administrative Review',
            approved: 'Scholarship Awarded!',
            rejected: 'Application Closed'
          }

          const progressMap: Record<ApplicationStatus, number> = {
            interested: 15,
            preparing: 45,
            ready: 70,
            submitted: 85,
            under_review: 90,
            approved: 100,
            rejected: 100
          }

          const newHistoryEvent = {
            id: `h-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            title: `Status Changed: ${statusLabels[newStatus]}`,
            description: `Moved stage to ${newStatus}.`
          }

          return {
            ...app,
            status: newStatus,
            progressPercentage: progressMap[newStatus],
            lastUpdated: new Date().toISOString().split('T')[0],
            history: [newHistoryEvent, ...app.history]
          }
        }
        return app
      })
    )
    showToast(`Status updated to ${newStatus.replace('_', ' ')}.`)
  }

  const updateApplicationNotes = (appId: string, notes: string) => {
    setApplications(prev =>
      prev.map(app => (app.id === appId ? { ...app, notes, lastUpdated: new Date().toISOString().split('T')[0] } : app))
    )
  }

  const deleteApplication = (appId: string) => {
    setApplications(prev => prev.filter(app => app.id !== appId))
    showToast('Application record removed.')
  }

  const addDocument = (doc: Omit<VaultDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: VaultDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    }
    setDocuments(prev => [newDoc, ...prev])
    showToast(`"${doc.name}" securely encrypted and saved to Vault.`)
  }

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
    showToast('Document removed from Vault.')
  }

  const getEligibilityFor = (scholarshipId: string): EligibilityResult | null => {
    const sch = SCHOLARSHIPS_DATA.find(s => s.id === scholarshipId)
    if (!sch) return null
    return calculateEligibility(sch, profile, documents)
  }

  const quickOpenModal = (scholarshipId: string) => {
    setSelectedScholarshipId(scholarshipId)
  }

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedScholarshipId,
        setSelectedScholarshipId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        profile,
        updateProfile,
        scholarships: SCHOLARSHIPS_DATA,
        applications,
        addApplication,
        updateApplicationStatus,
        updateApplicationNotes,
        deleteApplication,
        documents,
        addDocument,
        deleteDocument,
        isSaved,
        toggleSaveScholarship,
        getEligibilityFor,
        quickOpenModal,
        toastMessage,
        setToast: showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
