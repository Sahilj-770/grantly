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
    status: 'under_review',
    progressPercentage: 80,
    notes: 'Income certificate and college fee breakdown submitted on Nov 02. Awaiting stage 2 verification committee review.',
    nextStep: 'Verification officer phone audit or direct college notification scheduled for Nov 28.',
    submittedDate: '2026-11-02',
    lastUpdated: '2026-11-05',
    history: [
      { id: 'h-1', date: '2026-10-25', title: 'Application Drafted', description: 'Created draft and filled candidate financial profile.' },
      { id: 'h-2', date: '2026-11-02', title: 'Dossier Submitted', description: 'Uploaded certified Tehsildar income declaration and institution demand letter.' },
      { id: 'h-3', date: '2026-11-05', title: 'Under Review', description: 'Assigned to regional verification officer.' }
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
    status: 'preparing',
    progressPercentage: 45,
    notes: 'Drafted 1st iteration of personal statement. Dr. Mukherjee agreed to provide principal academic letter of reference.',
    nextStep: 'Secure remaining 3 referee email confirmations and finalize study proposal.',
    lastUpdated: '2026-11-04',
    history: [
      { id: 'h-r1', date: '2026-10-28', title: 'Profile Initiated', description: 'Registered on Rhodes Trust constituency portal.' },
      { id: 'h-r2', date: '2026-11-04', title: 'Statement Drafted', description: 'Completed first 850 words on computer science and ethics in developing nations.' }
    ],
    attachedDocumentIds: ['doc-acad-01', 'doc-id-01', 'doc-lor-01']
  },
  {
    id: 'app-google-01',
    scholarshipId: 'sch-google-apac-2026',
    scholarshipTitle: 'Generation Google Scholarship (APAC)',
    provider: 'Google',
    amountFormatted: '$2,500 USD',
    deadline: '2026-12-10',
    status: 'ready',
    progressPercentage: 90,
    notes: 'Essays proofread and resume updated with latest open-source contribution metrics. Ready for final click submission.',
    nextStep: 'Final review and click submit before deadline window closes.',
    lastUpdated: '2026-11-06',
    history: [
      { id: 'h-g1', date: '2026-10-30', title: 'Application Started', description: 'Filled basic academic transcript and college credentials.' },
      { id: 'h-g2', date: '2026-11-06', title: 'Essays Finalized', description: 'Completed both technical diversity essays and verified formatting.' }
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
    status: 'interested',
    progressPercentage: 15,
    notes: 'Bookmarked for aptitude test preparation. Need to review syllabus for 60-minute online assessment.',
    nextStep: 'Schedule online aptitude test practice session.',
    lastUpdated: '2026-11-01',
    history: [
      { id: 'h-rel1', date: '2026-11-01', title: 'Saved to Applications', description: 'Identified as high-probability need-cum-merit match.' }
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
