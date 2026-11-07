export type ApplicationStatus =
  | 'interested'
  | 'preparing'
  | 'ready'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'withdrawn'
  | 'archived'

export type DeadlineUrgency = 'overdue' | 'due_today' | 'due_soon' | 'upcoming' | 'none'

export interface ApplicationMilestone {
  id: string
  title: string
  description: string
  completed: boolean
  completedAt?: string
}

export interface ApplicationChecklistItem {
  id: string
  label: string
  completed: boolean
}

export interface ApplicationHistoryEvent {
  id: string
  date: string
  title: string
  description: string
}

export interface Application {
  id: string
  scholarshipId: string
  scholarshipTitle: string
  provider: string
  amountFormatted: string
  deadline: string
  daysRemaining: number
  urgency: DeadlineUrgency
  status: ApplicationStatus
  progressPercentage: number
  notes: string
  nextStep: string
  submittedDate?: string
  lastUpdated: string
  history: ApplicationHistoryEvent[]
  milestones: ApplicationMilestone[]
  checklist: ApplicationChecklistItem[]
  attachedDocumentIds: string[]
  isVerifiedDeadline: boolean
}
