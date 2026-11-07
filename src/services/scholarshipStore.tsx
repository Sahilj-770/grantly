import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import { Scholarship, EligibilityResult } from '../types/scholarship'
import { StudentProfile, DEFAULT_STUDENT_PROFILE } from '../types/student'
import { Application, ApplicationStatus, DeadlineUrgency } from '../types/application'
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
  toggleMilestone: (appId: string, milestoneId: string) => void
  toggleChecklistItem: (appId: string, itemId: string) => void
  archiveApplication: (appId: string) => void
  unarchiveApplication: (appId: string) => void
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
  PROFILE: 'grantly_profile_v2',
  APPLICATIONS: 'grantly_applications_v2',
  DOCUMENTS: 'grantly_documents_v2',
  SAVED: 'grantly_saved_v2'
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

  const isSaved = useCallback(
    (scholarshipId: string) => {
      return profile.savedScholarshipIds.includes(scholarshipId)
    },
    [profile.savedScholarshipIds]
  )

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

    // Calculate deadline stats
    const diff = new Date(sch.deadline).getTime() - Date.now()
    const daysRemaining = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
    let urgency: DeadlineUrgency = 'none'
    if (daysRemaining <= 0) urgency = 'overdue'
    else if (daysRemaining <= 1) urgency = 'due_today'
    else if (daysRemaining <= 7) urgency = 'due_soon'
    else urgency = 'upcoming'

    const newApp: Application = {
      id: `app-${Date.now()}`,
      scholarshipId: sch.id,
      scholarshipTitle: sch.title,
      provider: sch.provider,
      amountFormatted: sch.amountFormatted,
      deadline: sch.deadline,
      daysRemaining,
      urgency,
      isVerifiedDeadline: sch.isOfficialVerified,
      status: initialStatus,
      progressPercentage: initialStatus === 'submitted' ? 85 : initialStatus === 'ready' ? 70 : 25,
      notes: 'Added from GRANTLY directory.',
      nextStep: 'Prepare certified academic transcripts and recommendation letters.',
      lastUpdated: new Date().toISOString().split('T')[0],
      history: [
        {
          id: `h-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          title: 'Opportunity Tracked',
          description: `Added to ${initialStatus.replace('_', ' ')} stage via GRANTLY tracker.`
        }
      ],
      milestones: [
        { id: 'm1', title: 'Opportunity Identified', description: 'Matched against student academic baseline', completed: true, completedAt: '2026-11-01' },
        { id: 'm2', title: 'Criteria Verification', description: 'Audit GPA, tier, and discipline compatibility', completed: true, completedAt: '2026-11-03' },
        { id: 'm3', title: 'Dossier Assembly', description: 'Transcripts, SOP, letters of recommendation', completed: initialStatus === 'ready' || initialStatus === 'submitted' || initialStatus === 'under_review' || initialStatus === 'approved' },
        { id: 'm4', title: 'Submission to Portal', description: 'Official institution or agency portal submission', completed: initialStatus === 'submitted' || initialStatus === 'under_review' || initialStatus === 'approved' },
        { id: 'm5', title: 'Administrative Review', description: 'Institutional selection committee evaluation', completed: initialStatus === 'under_review' || initialStatus === 'approved' },
        { id: 'm6', title: 'Final Award Determination', description: 'Grant offer letter & fund disbursement', completed: initialStatus === 'approved' }
      ],
      checklist: [
        { id: 'c1', label: 'Certified Academic Transcripts (Official Seal)', completed: true },
        { id: 'c2', label: 'Personal Statement / Statement of Purpose (SOP)', completed: initialStatus !== 'interested' },
        { id: 'c3', label: 'Academic & Professional Letters of Recommendation (2)', completed: initialStatus === 'ready' || initialStatus === 'submitted' },
        { id: 'c4', label: 'Financial or Identity Proof (Self-Attested)', completed: false }
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
            rejected: 'Application Closed',
            withdrawn: 'Application Withdrawn',
            archived: 'Application Archived'
          }

          const progressMap: Record<ApplicationStatus, number> = {
            interested: 15,
            preparing: 45,
            ready: 70,
            submitted: 85,
            under_review: 90,
            approved: 100,
            rejected: 100,
            withdrawn: 0,
            archived: 0
          }

          const newHistoryEvent = {
            id: `h-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            title: `Status Changed: ${statusLabels[newStatus]}`,
            description: `Moved stage to ${newStatus.replace('_', ' ')}.`
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

  const toggleMilestone = (appId: string, milestoneId: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const updatedMilestones = app.milestones.map(m => {
            if (m.id === milestoneId) {
              const nextVal = !m.completed
              return {
                ...m,
                completed: nextVal,
                completedAt: nextVal ? new Date().toISOString().split('T')[0] : undefined
              }
            }
            return m
          })
          return {
            ...app,
            milestones: updatedMilestones,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        }
        return app
      })
    )
  }

  const toggleChecklistItem = (appId: string, itemId: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === appId) {
          const updatedChecklist = app.checklist.map(c => (c.id === itemId ? { ...c, completed: !c.completed } : c))
          return {
            ...app,
            checklist: updatedChecklist,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        }
        return app
      })
    )
  }

  const archiveApplication = (appId: string) => {
    updateApplicationStatus(appId, 'archived')
  }

  const unarchiveApplication = (appId: string) => {
    updateApplicationStatus(appId, 'interested')
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
    showToast(`"${doc.name}" saved to local document vault.`)
  }

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(d => d.id !== id))
    showToast('Document removed from Vault.')
  }

  const getEligibilityFor = useCallback(
    (scholarshipId: string): EligibilityResult | null => {
      const sch = SCHOLARSHIPS_DATA.find((s) => s.id === scholarshipId)
      if (!sch) return null
      return calculateEligibility(sch, profile, documents)
    },
    [profile, documents]
  )

  const quickOpenModal = useCallback((scholarshipId: string) => {
    setSelectedScholarshipId(scholarshipId)
  }, [])

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
        toggleMilestone,
        toggleChecklistItem,
        archiveApplication,
        unarchiveApplication,
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
