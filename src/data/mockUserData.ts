import { Application } from '../types/application'
import { VaultDocument } from '../types/document'

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-tata-01',
    scholarshipId: 'sch-tata-2026',
    scholarshipTitle: 'Tata Trusts Means Grant & Higher Education Assistance',
    provider: 'Sir Ratan Tata Trust',
    amountFormatted: '₹1,50,000 / year',
    deadline: '2026-12-15',
    daysRemaining: 38,
    urgency: 'upcoming',
    isVerifiedDeadline: true,
    status: 'under_review',
    progressPercentage: 80,
    notes: 'Income revenue certificate and college institutional fee breakdown uploaded on Nov 02. Nodal audit officer assigned.',
    nextStep: 'Awaiting stage 2 verification officer call or direct institutional fee credit notice.',
    submittedDate: '2026-11-02',
    lastUpdated: '2026-11-05',
    history: [
      { id: 'h-1', date: '2026-10-25', title: 'Application Drafted', description: 'Initiated dossier and confirmed annual family income eligibility.' },
      { id: 'h-2', date: '2026-11-02', title: 'Dossier Submitted', description: 'Transmitted certified Tahsildar declaration and bonafide credentials.' },
      { id: 'h-3', date: '2026-11-05', title: 'Under Review', description: 'Assigned to regional verification officer for economic means audit.' }
    ],
    milestones: [
      { id: 'm1', title: 'Opportunity Saved', description: 'Added to tracking roster', completed: true, completedAt: '2026-10-25' },
      { id: 'm2', title: 'Eligibility Reviewed', description: 'Income and CGPA verified', completed: true, completedAt: '2026-10-28' },
      { id: 'm3', title: 'Documents Prepared', description: 'Transcripts & Tahsildar certificate attached', completed: true, completedAt: '2026-11-01' },
      { id: 'm4', title: 'Application Completed', description: 'Institutional fee demand letter verified', completed: true, completedAt: '2026-11-02' },
      { id: 'm5', title: 'Application Submitted', description: 'Official submission acknowledged', completed: true, completedAt: '2026-11-02' },
      { id: 'm6', title: 'Under Review', description: 'Regional nodal officer scrutiny', completed: true, completedAt: '2026-11-05' },
      { id: 'm7', title: 'Decision Received', description: 'Disbursement grant sanction letter', completed: false }
    ],
    checklist: [
      { id: 'c1', label: 'Tahsildar Income Certificate', completed: true },
      { id: 'c2', label: 'College Fee Structure Breakdown', completed: true },
      { id: 'c3', label: 'Previous Semester Consolidated Marksheet', completed: true },
      { id: 'c4', label: 'Student Bank Account Passbook Copy', completed: true }
    ],
    attachedDocumentIds: ['doc-inc-01', 'doc-acad-01', 'doc-id-01']
  },
  {
    id: 'app-rhodes-01',
    scholarshipId: 'sch-rhodes-2026',
    scholarshipTitle: 'The Rhodes Scholarship at Oxford University',
    provider: 'The Rhodes Trust',
    amountFormatted: '£65,000 / year (Full Fees + Stipend)',
    deadline: '2026-10-02',
    daysRemaining: 44,
    urgency: 'upcoming',
    isVerifiedDeadline: true,
    status: 'preparing',
    progressPercentage: 45,
    notes: 'Drafted 1st iteration of personal statement. Prof. Mukherjee confirmed academic recommendation.',
    nextStep: 'Confirm remaining 3 referee submissions and polish 750-word study proposal.',
    lastUpdated: '2026-11-04',
    history: [
      { id: 'h-r1', date: '2026-10-28', title: 'Profile Initiated', description: 'Registered constituency eligibility on Rhodes Trust portal.' },
      { id: 'h-r2', date: '2026-11-04', title: 'Personal Statement Drafted', description: 'Completed first 850 words on technological equity.' }
    ],
    milestones: [
      { id: 'm1', title: 'Opportunity Saved', description: 'Added to tracking roster', completed: true, completedAt: '2026-10-28' },
      { id: 'm2', title: 'Eligibility Reviewed', description: '8.85 CGPA clears 8.5 threshold', completed: true, completedAt: '2026-10-29' },
      { id: 'm3', title: 'Documents Prepared', description: 'Academic transcripts assembled', completed: true, completedAt: '2026-11-04' },
      { id: 'm4', title: 'Application Completed', description: 'Dossier ready for submission', completed: false },
      { id: 'm5', title: 'Application Submitted', description: 'Constituency deadline', completed: false },
      { id: 'm6', title: 'Under Review', description: 'Preliminary interview round', completed: false },
      { id: 'm7', title: 'Decision Received', description: 'National Selection final round', completed: false }
    ],
    checklist: [
      { id: 'c1', label: 'Personal Statement (1,000 words)', completed: true },
      { id: 'c2', label: 'Academic Study Proposal (750 words)', completed: false },
      { id: 'c3', label: '6 Letters of Recommendation (2 confirmed)', completed: false },
      { id: 'c4', label: 'Official College Transcripts with GPA scale', completed: true }
    ],
    attachedDocumentIds: ['doc-acad-01', 'doc-id-01', 'doc-lor-01']
  },
  {
    id: 'app-google-01',
    scholarshipId: 'sch-google-apac-2026',
    scholarshipTitle: 'Generation Google Scholarship (APAC)',
    provider: 'Google',
    amountFormatted: '$2,500 USD (Direct Academic Grant)',
    deadline: '2026-12-10',
    daysRemaining: 33,
    urgency: 'upcoming',
    isVerifiedDeadline: true,
    status: 'ready',
    progressPercentage: 90,
    notes: 'Essays proofread and resume updated with latest open-source research. Ready for single-click transmission.',
    nextStep: 'Final review of submitted links before deadline window closure.',
    lastUpdated: '2026-11-06',
    history: [
      { id: 'h-g1', date: '2026-10-30', title: 'Application Started', description: 'Filled academic transcript and college credentials.' },
      { id: 'h-g2', date: '2026-11-06', title: 'Essays Finalized', description: 'Completed diversity and technical impact essays.' }
    ],
    milestones: [
      { id: 'm1', title: 'Opportunity Saved', description: 'Added to tracking roster', completed: true, completedAt: '2026-10-30' },
      { id: 'm2', title: 'Eligibility Reviewed', description: 'Undergraduate CS enrollment verified', completed: true, completedAt: '2026-10-31' },
      { id: 'm3', title: 'Documents Prepared', description: 'Technical resume & transcripts attached', completed: true, completedAt: '2026-11-04' },
      { id: 'm4', title: 'Application Completed', description: 'All essays reviewed', completed: true, completedAt: '2026-11-06' },
      { id: 'm5', title: 'Application Submitted', description: 'Official portal submission', completed: false },
      { id: 'm6', title: 'Under Review', description: 'Online coding challenge evaluation', completed: false },
      { id: 'm7', title: 'Decision Received', description: 'Scholars retreat selection', completed: false }
    ],
    checklist: [
      { id: 'c1', label: 'Technical Resume with GitHub links', completed: true },
      { id: 'c2', label: 'Diversity in Tech Essay (400 words)', completed: true },
      { id: 'c3', label: 'Algorithmic Problem-Solving Essay', completed: true },
      { id: 'c4', label: 'Official College Transcript', completed: true }
    ],
    attachedDocumentIds: ['doc-acad-01', 'doc-res-01']
  },
  {
    id: 'app-reliance-01',
    scholarshipId: 'sch-reliance-found-2026',
    scholarshipTitle: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    amountFormatted: '₹2,00,000 grant',
    deadline: '2026-12-20',
    daysRemaining: 43,
    urgency: 'upcoming',
    isVerifiedDeadline: true,
    status: 'interested',
    progressPercentage: 15,
    notes: 'Saved to prepare for the 60-minute online aptitude assessment test.',
    nextStep: 'Schedule online aptitude test preparation session and review quantitative reasoning syllabus.',
    lastUpdated: '2026-11-01',
    history: [
      { id: 'h-rel1', date: '2026-11-01', title: 'Saved to Applications', description: 'Identified as high-yield merit-cum-means scholarship.' }
    ],
    milestones: [
      { id: 'm1', title: 'Opportunity Saved', description: 'Added to tracking roster', completed: true, completedAt: '2026-11-01' },
      { id: 'm2', title: 'Eligibility Reviewed', description: 'Confirmed Class 12 score > 60%', completed: false },
      { id: 'm3', title: 'Documents Prepared', description: 'College admission slip and fee proof', completed: false },
      { id: 'm4', title: 'Application Completed', description: 'Aptitude test preparation', completed: false },
      { id: 'm5', title: 'Application Submitted', description: 'Test completed online', completed: false },
      { id: 'm6', title: 'Under Review', description: 'Merit list compilation', completed: false },
      { id: 'm7', title: 'Decision Received', description: 'Sanction letter announcement', completed: false }
    ],
    checklist: [
      { id: 'c1', label: 'Class 12 Board Marksheet', completed: true },
      { id: 'c2', label: 'College Bonafide Admission Letter', completed: false },
      { id: 'c3', label: 'Aptitude Practice Mock Test', completed: false }
    ],
    attachedDocumentIds: []
  }
]

export const INITIAL_DOCUMENTS: VaultDocument[] = [
  {
    id: 'doc-acad-01',
    name: 'Consolidated B.Tech Semester Transcripts (Sem 1-5).pdf',
    category: 'academic',
    fileType: 'pdf',
    fileSize: '2.4 MB',
    uploadedAt: '2026-10-18',
    verified: true,
    issuingAuthority: 'National Institute of Technology Examination Controller',
    linkedScholarships: ['sch-rhodes-2026', 'sch-tata-2026', 'sch-google-apac-2026', 'sch-pmrf-2026']
  },
  {
    id: 'doc-id-01',
    name: 'Government Identity Card (Passport & Aadhaar).pdf',
    category: 'identity',
    fileType: 'pdf',
    fileSize: '1.1 MB',
    uploadedAt: '2026-10-14',
    verified: true,
    expiryDate: '2032-08-15',
    issuingAuthority: 'Ministry of External Affairs / UIDAI',
    linkedScholarships: ['sch-rhodes-2026', 'sch-tata-2026', 'sch-national-overseas-2026']
  },
  {
    id: 'doc-inc-01',
    name: 'Annual Family Income Revenue Certificate 2026-27.pdf',
    category: 'income',
    fileType: 'pdf',
    fileSize: '890 KB',
    uploadedAt: '2026-10-22',
    verified: true,
    expiryDate: '2027-03-31',
    issuingAuthority: 'Office of the Tahsildar & Revenue Inspector, Dist. Bangalore',
    linkedScholarships: ['sch-tata-2026', 'sch-national-overseas-2026']
  },
  {
    id: 'doc-lor-01',
    name: 'Letter of Academic Recommendation — Prof. R. Mukherjee.pdf',
    category: 'recommendation',
    fileType: 'pdf',
    fileSize: '450 KB',
    uploadedAt: '2026-10-29',
    verified: true,
    issuingAuthority: 'Department of Computer Science & Engineering, NIT',
    linkedScholarships: ['sch-rhodes-2026']
  },
  {
    id: 'doc-res-01',
    name: 'Academic Curriculum Vitae & Open Source Dossier.pdf',
    category: 'academic',
    fileType: 'pdf',
    fileSize: '620 KB',
    uploadedAt: '2026-11-04',
    verified: true,
    issuingAuthority: 'Self-Certified Student Dossier',
    linkedScholarships: ['sch-google-apac-2026', 'sch-rhodes-2026']
  }
]
