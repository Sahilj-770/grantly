export type ApplicationStatus =
  | 'interested'
  | 'preparing'
  | 'ready'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'

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
  status: ApplicationStatus
  progressPercentage: number
  notes: string
  nextStep: string
  submittedDate?: string
  lastUpdated: string
  history: ApplicationHistoryEvent[]
  attachedDocumentIds: string[]
}
