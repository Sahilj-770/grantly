export type DocumentCategory =
  | 'identity'
  | 'academic'
  | 'income'
  | 'bank'
  | 'recommendation'
  | 'other'

export interface VaultDocument {
  id: string
  name: string
  category: DocumentCategory
  fileType: 'pdf' | 'png' | 'jpg' | 'docx'
  fileSize: string
  uploadedAt: string
  verified: boolean
  expiryDate?: string
  issuingAuthority: string
  linkedScholarships: string[]
  downloadUrl?: string
}
