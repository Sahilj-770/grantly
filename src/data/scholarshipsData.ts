import { Scholarship } from '../types/scholarship'

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'sch-rhodes-2026',
    title: 'The Rhodes Scholarship at Oxford University',
    provider: 'The Rhodes Trust',
    category: 'merit',
    amount: 65000,
    currency: '£',
    amountFormatted: '£65,000 / year (Full Fees + £19,092 Stipend)',
    coverageType: 'Full Tuition + Stipend',
    deadline: '2026-10-02',
    daysRemaining: 44,
    educationLevels: ['Undergraduate', 'Postgraduate'],
    eligibleFields: ['Any', 'Computer Science', 'Public Policy', 'Philosophy', 'Engineering', 'Economics'],
    minCgpa: 8.5,
    maxFamilyIncome: null,
    acceptanceRate: '0.7%',
    featured: true,
    tags: ['Oxford', 'Global Leader', 'Full Ride', 'Prestigious'],
    heroImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    description: 'The oldest and perhaps most prestigious international scholarship programme, enabling outstanding young people from around the world to study at the University of Oxford.',
    overview: 'The Rhodes Scholarship covers all University and College fees, a personal annual living stipend (£19,092), private health insurance, and two economy-class flights to and from Oxford.',
    benefits: [
      '100% Oxford University & College tuition fee coverage',
      'Annual living stipend of £19,092 paid quarterly in advance',
      'Economy roundtrip international airfare',
      'Student Visa fee and UK National Health Service surcharge paid',
      'Access to Rhodes House convening events, leadership workshops, and alumni mentorship'
    ],
    requirements: [
      { id: 'req-deg', label: 'Completed or in final year of Bachelor’s degree with First Class honours', mandatory: true, type: 'academic' },
      { id: 'req-cgpa', label: 'Minimum CGPA of 8.5 / 10.0 or equivalent percentage', mandatory: true, type: 'academic' },
      { id: 'req-age', label: 'Aged between 19 and 25 years at the date of admission', mandatory: true, type: 'citizenship' },
      { id: 'req-ref', label: 'Six confidential letters of recommendation (4 academic, 2 leadership)', mandatory: true, type: 'document' },
      { id: 'req-sop', label: 'Personal statement (1000 words) and academic study proposal (750 words)', mandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Official Academic Transcripts (All Semesters)',
      'Curriculum Vitae (max 2 pages)',
      'Personal Statement of Character and Purpose',
      'Birth Certificate / Valid Passport copy',
      'Formal Letters of Recommendation (6 required)'
    ],
    applicationProcedure: [
      'Register on the official Rhodes Trust portal and confirm constituency eligibility.',
      'Draft and refine personal statement and study proposal aligned with Oxford course.',
      'Nominate 6 referees who will directly submit confidential appraisals.',
      'Attend regional preliminary interview if shortlisted.',
      'Final weekend in-person interview with the National Selection Committee.'
    ],
    sourceUrl: 'https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/',
    officialPortal: 'https://apply.rhodeshouse.ox.ac.uk/',
    lastVerified: '2026-11-01',
    isOfficialVerified: true
  },
  {
    id: 'sch-pmrf-2026',
    title: "Prime Minister's Research Fellowship (PMRF)",
    provider: 'Ministry of Education, Govt. of India',
    category: 'government',
    amount: 960000,
    currency: '₹',
    amountFormatted: '₹9,60,000 / year + ₹2,00,000 Contingency',
    coverageType: 'Full Tuition + Stipend',
    deadline: '2026-11-30',
    daysRemaining: 23,
    educationLevels: ['Undergraduate', 'Postgraduate', 'Doctoral'],
    eligibleFields: ['Engineering', 'Computer Science', 'Biotechnology', 'Physics', 'Mathematics', 'Chemistry'],
    minCgpa: 8.0,
    maxFamilyIncome: null,
    acceptanceRate: '3.2%',
    featured: true,
    tags: ['IIT/IISc', 'Ph.D.', 'National Fellowship', 'R&D'],
    heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for improving the quality of research in higher educational institutions in India, offering fellowship grants to Ph.D. candidates at IITs, IISc, and premier central universities.',
    overview: 'Fellows receive ₹70,000/month for Year 1-2, ₹75,000/month for Year 3, and ₹80,000/month for Year 4-5, along with an annual research contingency grant of ₹2 Lakhs.',
    benefits: [
      'Monthly stipend starting at ₹70,000 up to ₹80,000 across 5 years',
      'Annual research contingency grant of ₹2,00,000 for lab equipment, books, and conference travel',
      'Direct fast-track admission to Ph.D. programs at IITs/IISc',
      'National research recognition and interaction with international scientific consortiums'
    ],
    requirements: [
      { id: 'req-cgpa', label: 'Minimum 8.0 CGPA from central institutions or 8.5 CGPA from recognized universities', mandatory: true, type: 'academic' },
      { id: 'req-gate', label: 'Valid GATE score of 650+ or qualifying percentile where applicable', mandatory: false, type: 'academic' },
      { id: 'req-prop', label: 'Rigorous 1000-word Ph.D. research proposal with literature review', mandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Provisional/Final Degree Certificate',
      'Consolidated Marksheet (All Semesters)',
      'Detailed Research Abstract and Methodology',
      'Valid GATE / NET scorecard (if applicable)',
      'Government Photo ID (Aadhaar / Passport)'
    ],
    applicationProcedure: [
      'Get nominated through the nodal doctoral admission cell at an authorized PMRF-granting institute.',
      'Submit detailed research proposal and teaching statement.',
      'National Subject Discipline Committee evaluation.',
      'Presentation and oral defense before Apex Advisory Committee.'
    ],
    sourceUrl: 'https://www.pmrf.in/',
    officialPortal: 'https://pmrf.in/apply',
    lastVerified: '2026-11-04',
    isOfficialVerified: true
  },
  {
    id: 'sch-tata-2026',
    title: 'Tata Trusts Means Grant & Higher Education Assistance',
    provider: 'Sir Ratan Tata Trust & Allied Trusts',
    category: 'need',
    amount: 150000,
    currency: '₹',
    amountFormatted: '₹1,50,000 / year (Direct Tuition Subsidy)',
    coverageType: 'Annual Grant',
    deadline: '2026-12-15',
    daysRemaining: 38,
    educationLevels: ['Undergraduate', 'Postgraduate'],
    eligibleFields: ['Any', 'Engineering', 'Medicine', 'Commerce', 'Science', 'Arts'],
    minCgpa: 6.5,
    maxFamilyIncome: 450000,
    acceptanceRate: '18.4%',
    featured: true,
    tags: ['Need-Based', 'Direct Bank Transfer', 'Tuition Relief', 'Inclusive'],
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    description: 'Financial aid grant tailored for underprivileged undergraduate and postgraduate students across India pursuing accredited degree courses in recognized institutions.',
    overview: 'The grant directly subsidizes college tuition fees for students whose total family income does not exceed ₹4.5 LPA, ensuring no meritorious student drops out due to economic hardship.',
    benefits: [
      'Direct disbursement to institutional fee account or student bank account',
      'Covers 40% to 80% of annual institutional tuition fees',
      'Renewable every academic year upon maintaining minimum 60% aggregate score',
      'No repayment or bond conditions required'
    ],
    requirements: [
      { id: 'req-inc', label: 'Annual family income strictly below ₹4,50,000 per annum', mandatory: true, type: 'income' },
      { id: 'req-score', label: 'Minimum 60% marks in the qualifying or preceding semester examination', mandatory: true, type: 'academic' },
      { id: 'req-full', label: 'Enrolled in full-time regular accredited degree program (distance education ineligible)', mandatory: true, type: 'academic' }
    ],
    requiredDocuments: [
      'Official Family Income Certificate issued by Tehsildar / Competent Revenue Authority',
      'Current Year Institutional Fee Breakdown / Demand Notice',
      'Mark sheets of previous academic examinations',
      'Student Bank Account Passbook / Cancelled Cheque',
      'Electricity Bill (Last 3 months) as residential proof'
    ],
    applicationProcedure: [
      'Create an applicant profile on the Tata Trusts portal during active application window.',
      'Upload verified income certificates and fee estimation notices.',
      'Preliminary economic audit and means verification.',
      'Direct grant sanction letter issued and funds wired directly to institution.'
    ],
    sourceUrl: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants',
    officialPortal: 'https://tatatrusts.igp.org/',
    lastVerified: '2026-10-28',
    isOfficialVerified: true
  },
  {
    id: 'sch-gates-cambridge-2026',
    title: 'Gates Cambridge Scholarship',
    provider: 'Bill & Melinda Gates Foundation & Cambridge Trust',
    category: 'merit',
    amount: 55000,
    currency: '£',
    amountFormatted: '£55,000 / year (Full Cost of Study + £21,000 Stipend)',
    coverageType: 'Full Tuition + Stipend',
    deadline: '2026-12-05',
    daysRemaining: 28,
    educationLevels: ['Postgraduate', 'Doctoral'],
    eligibleFields: ['Any', 'Computer Science', 'Biomedical', 'Physics', 'History', 'Public Policy'],
    minCgpa: 8.8,
    maxFamilyIncome: null,
    acceptanceRate: '1.4%',
    featured: true,
    tags: ['Cambridge', 'Social Impact', 'Global Leaders', 'Full Ride'],
    heroImage: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?auto=format&fit=crop&w=800&q=80',
    description: 'Full-cost awards for outstanding applicants outside the UK to pursue a full-time postgraduate degree in any subject available at the University of Cambridge.',
    overview: 'Aims to build a global network of future leaders committed to improving the lives of others through academic excellence, leadership potential, and social responsibility.',
    benefits: [
      'Full University Composition Fee covered directly',
      'Maintenance allowance of £21,000 for a 12-month period',
      'One economy single airfare at the beginning and end of the course',
      'Inbound visa costs & Immigration Health Surcharge reimbursement',
      'Discretionary funding for conference attendance and fieldwork'
    ],
    requirements: [
      { id: 'req-cgpa', label: 'Outstanding intellectual ability (top 5% of class or minimum 8.8 CGPA)', mandatory: true, type: 'academic' },
      { id: 'req-lead', label: 'Demonstrated capacity for leadership and commitment to improving society', mandatory: true, type: 'document' },
      { id: 'req-fit', label: 'Compelling justification for the specific degree program at Cambridge', mandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Gates Cambridge 500-word statement explaining alignment with scholarship values',
      'Two academic references and one Gates-specific personal/leadership reference',
      'Full academic transcripts from all tertiary institutions',
      'Curriculum Vitae detailing research, leadership, and public service'
    ],
    applicationProcedure: [
      'Apply for course admission and Gates Cambridge funding via the Cambridge Graduate Application Portal.',
      'Submit the joint application package before your course funding deadline.',
      'University department ranks and refers applicants to the Gates Cambridge Trust.',
      'Virtual panel interviews conducted in late January with selection committees.'
    ],
    sourceUrl: 'https://www.gatescambridge.org/',
    officialPortal: 'https://www.postgraduate.study.cam.ac.uk/how-to-apply',
    lastVerified: '2026-11-03',
    isOfficialVerified: true
  },
  {
    id: 'sch-national-overseas-2026',
    title: 'National Overseas Scholarship (NOS)',
    provider: 'Ministry of Social Justice and Empowerment, Govt. of India',
    category: 'government',
    amount: 42000,
    currency: '$',
    amountFormatted: '$42,000 / year + Full Tuition + Health Insurance',
    coverageType: 'Full Tuition + Stipend',
    deadline: '2026-12-31',
    daysRemaining: 54,
    educationLevels: ['Postgraduate', 'Doctoral'],
    eligibleFields: ['Engineering', 'Computer Science', 'Agriculture', 'Humanities', 'Medicine', 'Social Sciences'],
    minCgpa: 6.5,
    maxFamilyIncome: 800000,
    acceptanceRate: '11.5%',
    featured: false,
    tags: ['Affirmative Action', 'Study Abroad', 'Full Government Sponsorship', 'Masters/PhD'],
    heroImage: 'https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80',
    description: 'Provides financial assistance to selected candidates from SC, De-notified Nomadic, Semi-Nomadic Tribes, and Traditional Artisans to pursue Master’s or Ph.D. degrees abroad in top 500 QS world ranked universities.',
    overview: 'Covers actual tuition fees, annual contingency allowance ($1,500), monthly maintenance allowance ($1,540 in USA / £990 in UK), visa fees, and roundtrip international air travel.',
    benefits: [
      'Complete tuition fees remitted directly to foreign universities',
      'Annual maintenance allowance of $15,400 (USA) or £9,900 (UK)',
      'Economy class air travel tickets by the most direct route',
      'Mandatory health insurance and student visa fees fully covered'
    ],
    requirements: [
      { id: 'req-caste', label: 'Belong to eligible SC / De-notified Nomadic Tribe categories', mandatory: true, type: 'citizenship' },
      { id: 'req-income', label: 'Total family income not exceeding ₹8,00,000 per annum', mandatory: true, type: 'income' },
      { id: 'req-admit', label: 'Unconditional offer letter from a top 500 QS ranked university abroad', mandatory: true, type: 'academic' },
      { id: 'req-marks', label: 'Minimum 60% marks or equivalent in qualifying Bachelor’s or Master’s', mandatory: true, type: 'academic' }
    ],
    requiredDocuments: [
      'Caste Certificate issued by designated Revenue Officer',
      'Income Certificate / ITR of parents for previous financial year',
      'Unconditional admission offer letter from foreign institution',
      'Valid Passport with minimum 2 years remaining validity',
      'Degree certificates and consolidated mark lists'
    ],
    applicationProcedure: [
      'Register on the NOS online portal during the notified national application cycle.',
      'Fill comprehensive candidate bio-data, academic records, and university details.',
      'Upload notarized verification forms and unconditional foreign admission offer.',
      'Scrutiny by Screening Committee and issuance of Provisional Award Letter.'
    ],
    sourceUrl: 'https://nosmsje.gov.in/',
    officialPortal: 'https://nosmsje.gov.in/ApplicantRegistration.aspx',
    lastVerified: '2026-10-15',
    isOfficialVerified: true
  },
  {
    id: 'sch-google-apac-2026',
    title: 'Generation Google Scholarship (APAC)',
    provider: 'Google',
    category: 'stem-research',
    amount: 2500,
    currency: '$',
    amountFormatted: '$2,500 USD (Direct Academic Grant)',
    coverageType: 'Annual Grant',
    deadline: '2026-12-10',
    daysRemaining: 33,
    educationLevels: ['Undergraduate'],
    eligibleFields: ['Computer Science', 'Computer Engineering', 'Data Science', 'Information Technology'],
    minCgpa: 7.0,
    maxFamilyIncome: null,
    acceptanceRate: '4.2%',
    featured: true,
    tags: ['Women in Tech', 'Computer Science', 'Mentorship', 'Google Community'],
    heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Awarded to students identifying as women studying computer science or related technical fields, recognizing academic excellence, leadership, and diversity advocacy.',
    overview: 'Recipients receive a $2,500 grant for the academic year along with entry into Google’s exclusive student retreat, technical mentorship from Google engineers, and career preparation workshops.',
    benefits: [
      '$2,500 direct grant applied towards tuition, books, or educational hardware',
      'Invitations to Google APAC Virtual Scholars Retreat',
      'Exclusive 1-on-1 mentorship with Google software engineers',
      'Priority consideration for Google summer engineering internships'
    ],
    requirements: [
      { id: 'req-gen', label: 'Identify as a woman currently enrolled in an undergraduate degree', mandatory: true, type: 'citizenship' },
      { id: 'req-stem', label: 'Majoring in Computer Science, Computer Engineering, or closely related field', mandatory: true, type: 'field' },
      { id: 'req-essays', label: 'Completion of 2 short technical problem-solving and diversity impact essays', mandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Updated Resume highlighting open-source projects, hackathons, and leadership',
      'Official/Unofficial College Transcript',
      'Two 400-word essays responding to application prompts',
      '15-minute Online Coding Challenge (Google Coding Assessment link sent post-submission)'
    ],
    applicationProcedure: [
      'Submit application via Google Build Your Future scholarship portal.',
      'Complete the asynchronous online algorithmic challenge within 7 calendar days.',
      'Shortlisted applicants participate in a 30-minute virtual behavioral interview.',
      'Scholarship decisions announced in March 2027.'
    ],
    sourceUrl: 'https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship-apac',
    officialPortal: 'https://buildyourfuture.withgoogle.com/apply',
    lastVerified: '2026-11-02',
    isOfficialVerified: true
  },
  {
    id: 'sch-reliance-found-2026',
    title: 'Reliance Foundation Undergraduate Scholarship',
    provider: 'Reliance Foundation',
    category: 'merit',
    amount: 200000,
    currency: '₹',
    amountFormatted: '₹2,00,000 across course duration',
    coverageType: 'Annual Grant',
    deadline: '2026-12-20',
    daysRemaining: 43,
    educationLevels: ['Undergraduate'],
    eligibleFields: ['Any', 'Engineering', 'Sciences', 'Commerce', 'Medicine', 'Law'],
    minCgpa: 6.0,
    maxFamilyIncome: 1500000,
    acceptanceRate: '6.8%',
    featured: true,
    tags: ['Merit-cum-Means', 'Alumni Network', 'Leadership Workshops', 'Undergrad'],
    heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    description: 'Empowers 5,000 meritorious undergraduate students each year with grants and personal development programs across all disciplines in higher education.',
    overview: 'Selected scholars receive up to ₹2,00,000 over their degree tenure, alongside structured leadership camps, career mentorship, and a vast peer community across India.',
    benefits: [
      'Financial support up to ₹2,00,000 disbursed in annual installments',
      'Interactive masterclasses with global industry leaders and academicians',
      'Lifelong membership into the vibrant Reliance Foundation Scholars Network',
      'Discretionary seed funding for community impact projects'
    ],
    requirements: [
      { id: 'req-pass', label: 'Passed Class 12 with minimum 60% aggregate marks', mandatory: true, type: 'academic' },
      { id: 'req-year', label: 'Enrolled in 1st year of full-time undergraduate degree program', mandatory: true, type: 'academic' },
      { id: 'req-inc', label: 'Household income up to ₹15 Lakhs (preference to < ₹2.5 Lakhs)', mandatory: true, type: 'income' },
      { id: 'req-test', label: 'Mandatory 60-minute online aptitude test score', mandatory: true, type: 'academic' }
    ],
    requiredDocuments: [
      'Class 10 and Class 12 Board Marksheets',
      'Current College Admission Letter and Student ID card',
      'Family Income Proof (ITR / Form 16 / Ration Card / Sarpanch certificate)',
      'Government Photo ID Proof'
    ],
    applicationProcedure: [
      'Fill out the online application form and verify email and mobile.',
      'Take the proctored online aptitude test (Mathematics, Reasoning, Verbal).',
      'Document verification and background means review.',
      'Selection list published on official Reliance Foundation portal.'
    ],
    sourceUrl: 'https://www.scholarships.reliancefoundation.org/',
    officialPortal: 'https://www.scholarships.reliancefoundation.org/Undergraduate_Scholarship.aspx',
    lastVerified: '2026-10-30',
    isOfficialVerified: true
  },
  {
    id: 'sch-fulbright-nehru-2026',
    title: "Fulbright-Nehru Master's Fellowships",
    provider: 'United States-India Educational Foundation (USIEF)',
    category: 'international',
    amount: 80000,
    currency: '$',
    amountFormatted: '$80,000 / year (Full J-1 Sponsorship + Living Expenses)',
    coverageType: 'Full Tuition + Stipend',
    deadline: '2026-11-25',
    daysRemaining: 18,
    educationLevels: ['Postgraduate'],
    eligibleFields: ['Arts and Culture', 'Environmental Science', 'Public Administration', 'Public Health', 'Urban Planning', 'Gender Studies'],
    minCgpa: 7.5,
    maxFamilyIncome: null,
    acceptanceRate: '2.1%',
    featured: false,
    tags: ['USA', 'Diplomacy', 'USIEF', 'Cultural Exchange', 'Prestigious'],
    heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for highly motivated Indian graduates demonstrating leadership qualities, substantial work experience, and commitment to public service in their chosen fields.',
    overview: 'Provides J-1 visa sponsorship, tuition, monthly maintenance allowance, accident and sickness coverage, round-trip air travel, and enrichment seminars across the United States.',
    benefits: [
      'Full coverage of US graduate school tuition and institutional fees',
      'Monthly living stipend matching cost of living in host US city',
      'Roundtrip international airfare between India and the United States',
      'Sickness and accident coverage conforming to US federal standards',
      'Prestigious lifelong Fulbright Alumni global fellowship'
    ],
    requirements: [
      { id: 'req-deg', label: 'Completed 4-year Bachelor’s degree or Master’s with minimum 55% marks', mandatory: true, type: 'academic' },
      { id: 'req-exp', label: 'Minimum 3 years of full-time professional work experience in related field', mandatory: true, type: 'academic' },
      { id: 'req-serv', label: 'Demonstrated commitment to return to India and contribute post-completion', mandatory: true, type: 'citizenship' }
    ],
    requiredDocuments: [
      'Completed USIEF Fulbright-Nehru Online Application',
      '3 Confidential Letters of Reference submitted online by recommenders',
      'Personal Statement and Study/Research Objectives (max 2 pages each)',
      'Official Degree Certificates and Marksheets',
      'Curriculum Vitae highlighting community impact and professional leadership'
    ],
    applicationProcedure: [
      'Submit comprehensive dossier on the USIEF Embassy portal.',
      'National screening by specialized bi-national expert panels.',
      'In-person interview at USIEF headquarters in New Delhi.',
      'Final approval by the J. William Fulbright Foreign Scholarship Board (FFSB) in Washington, D.C.'
    ],
    sourceUrl: 'https://www.usief.org.in/Fulbright-Nehru-Master-Fellowships.aspx',
    officialPortal: 'https://apply.iie.org/ffsp2026',
    lastVerified: '2026-11-05',
    isOfficialVerified: true
  },
  {
    id: 'sch-charpak-2026',
    title: "Charpak Master's Scholarship Program",
    provider: 'French Embassy in India & Campus France',
    category: 'international',
    amount: 14000,
    currency: '€',
    amountFormatted: '€14,000 / year (€860/mo + Fee Waiver)',
    coverageType: 'Full Tuition + Stipend',
    deadline: '2026-12-18',
    daysRemaining: 41,
    educationLevels: ['Postgraduate'],
    eligibleFields: ['Any', 'Engineering', 'Management', 'Sciences', 'Humanities', 'Architecture'],
    minCgpa: 7.2,
    maxFamilyIncome: null,
    acceptanceRate: '9.2%',
    featured: false,
    tags: ['France', 'Europe', 'Campus France', 'Schengen Mobility'],
    heroImage: 'https://images.unsplash.com/photo-1507842229451-28b144c54f21?auto=format&fit=crop&w=800&q=80',
    description: 'Designed for Indian students of all academic profiles wishing to pursue a Master’s degree at a renowned higher education institution in France.',
    overview: 'Provides €860 monthly living allowance, French national student health insurance, student visa fee exemption, and dedicated assistance with Campus France student housing.',
    benefits: [
      'Monthly living allowance of €860 across the 10-month academic year',
      'Full student visa fee waiver and priority visa processing appointment',
      'Tuition fee waiver up to €5,000 at public French universities',
      'Assistance finding student housing through CROUS residences'
    ],
    requirements: [
      { id: 'req-nat', label: 'Indian national residing in India aged maximum 30 years', mandatory: true, type: 'citizenship' },
      { id: 'req-adm', label: 'Accepted or applied to a French higher education institution for Master’s', mandatory: true, type: 'academic' },
      { id: 'req-sop', label: 'Compelling Statement of Purpose explaining French study relevance', mandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Acceptance / Conditional admission letter from French institution',
      'Statement of Purpose (1-2 pages in English or French)',
      'Curriculum Vitae',
      'Degree Certificates and official Marksheets (Semesters 1 to 6/8)',
      'Passport copy (First and last page)'
    ],
    applicationProcedure: [
      'Create account on the Campus France India scholarship portal.',
      'Fill candidate profile and link active French university application identifier.',
      'Upload all required documentation and motivation letter.',
      'Shortlisting and final selection results published in April.'
    ],
    sourceUrl: 'https://www.inde.campusfrance.org/charpak-master-s-program',
    officialPortal: 'https://scholarship.inde.campusfrance.org/',
    lastVerified: '2026-10-22',
    isOfficialVerified: true
  },
  {
    id: 'sch-adobe-women-2026',
    title: 'Adobe Women in Technology Scholarship',
    provider: 'Adobe Research',
    category: 'stem-research',
    amount: 10000,
    currency: '$',
    amountFormatted: '$10,000 USD + Adobe Creative Cloud',
    coverageType: 'Annual Grant',
    deadline: '2026-11-20',
    daysRemaining: 13,
    educationLevels: ['Undergraduate', 'Postgraduate'],
    eligibleFields: ['Computer Science', 'Computer Engineering', 'Artificial Intelligence', 'Human-Computer Interaction'],
    minCgpa: 7.8,
    maxFamilyIncome: null,
    acceptanceRate: '2.5%',
    featured: true,
    tags: ['Tech Leaders', 'AI Research', 'Adobe Internship', 'Women in Tech'],
    heroImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    description: 'Recognizes outstanding female undergraduate and master’s students in computer science and AI, providing financial awards and research internships at Adobe.',
    overview: 'Recipients receive a $10,000 cash grant, an opportunity to interview for a summer internship at Adobe Research, and a free 1-year Adobe Creative Cloud All Apps subscription.',
    benefits: [
      '$10,000 direct tuition and academic stipend',
      '1-year Adobe Creative Cloud All-Apps subscription license',
      'Direct interview fast-track for Adobe Research Summer Internship',
      'Mentorship from senior scientists at Adobe Research Labs'
    ],
    requirements: [
      { id: 'req-gen', label: 'Identify as female enrolled in full-time CS or engineering degree', mandatory: true, type: 'citizenship' },
      { id: 'req-gpa', label: 'Maintain strong academic record with minimum 7.5 CGPA', mandatory: true, type: 'academic' },
      { id: 'req-vid', label: 'Submit 60-second video elevator pitch describing passion for computing', mandatory: true, type: 'document' }
    ],
    requiredDocuments: [
      'Current Resume detailing technical projects, patents, and publications',
      'Academic Transcripts from all semesters',
      'Three short essay answers on technological impact and future innovations',
      'One letter of recommendation from an academic professor or research supervisor'
    ],
    applicationProcedure: [
      'Complete application on Adobe Research Scholars portal.',
      'Upload video pitch link and essay responses.',
      'Technical review by Adobe research engineering committee.',
      'Recipient announcement in December.'
    ],
    sourceUrl: 'https://research.adobe.com/scholarship/',
    officialPortal: 'https://research.adobe.com/scholarship/apply',
    lastVerified: '2026-11-06',
    isOfficialVerified: true
  },
  {
    id: 'sch-inspire-she-2026',
    title: 'INSPIRE Scholarship for Higher Education (SHE)',
    provider: 'Department of Science and Technology (DST), Govt. of India',
    category: 'government',
    amount: 80000,
    currency: '₹',
    amountFormatted: '₹80,000 / year (₹60k Scholarship + ₹20k Mentorship)',
    coverageType: 'Annual Grant',
    deadline: '2026-12-22',
    daysRemaining: 45,
    educationLevels: ['Undergraduate', 'Postgraduate'],
    eligibleFields: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Earth Sciences', 'Astronomy'],
    minCgpa: 7.0,
    maxFamilyIncome: null,
    acceptanceRate: '12.0%',
    featured: false,
    tags: ['Pure Science', 'DST Govt of India', 'Direct DBT', 'B.Sc./M.Sc.'],
    heroImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    description: 'Offers 10,000 scholarships each year to students undertaking Bachelor and Masters level courses in Natural and Basic Sciences across top Indian universities.',
    overview: 'Provides ₹5,000/month (total ₹60,000/year) plus an additional mentorship cost grant of ₹20,000/year for undertaking mandatory summer research projects.',
    benefits: [
      'Annual financial grant of ₹60,000 disbursed directly to student Aadhaar-linked account',
      'Summer research project mentorship stipend of ₹20,000',
      'Access to summer camps and lecture series by Shanti Swaroop Bhatnagar laureates',
      'Seamless continuation into M.Sc. upon maintaining 60% or 7.0 CGPA'
    ],
    requirements: [
      { id: 'req-rank', label: 'Top 1% aggregate marks in Class 12 Board examinations nationwide', mandatory: true, type: 'academic' },
      { id: 'req-sub', label: 'Pursuing regular full-time B.Sc., B.S., or Int. M.Sc. in Natural & Basic Sciences', mandatory: true, type: 'field' },
      { id: 'req-nosch', label: 'Must not hold any other parallel central/state government scholarship', mandatory: true, type: 'citizenship' }
    ],
    requiredDocuments: [
      'Class 12 Board Marksheet & Advisory Note issued by State/Central Board',
      'Class 10 Board Certificate for Date of Birth verification',
      'Endorsement Certificate from Principal/Head of Current Institution',
      'SBI Bank Account Passbook (Aadhaar Seeded)'
    ],
    applicationProcedure: [
      'Register on online-inspire.gov.in web portal.',
      'Fill academic details and select natural science discipline.',
      'Upload endorsement form signed by Dean / Principal of college.',
      'Sanction order published and grants released through PFMS direct transfer.'
    ],
    sourceUrl: 'https://online-inspire.gov.in/',
    officialPortal: 'https://online-inspire.gov.in/Account/Register',
    lastVerified: '2026-10-19',
    isOfficialVerified: true
  },
  {
    id: 'sch-cwit-arts-2026',
    title: 'Charles Wallace India Trust Arts & Heritage Award',
    provider: 'Charles Wallace India Trust & British Council',
    category: 'creative',
    amount: 4500,
    currency: '£',
    amountFormatted: '£4,500 Grant + UK Residency',
    coverageType: 'One-Time Award',
    deadline: '2026-12-28',
    daysRemaining: 51,
    educationLevels: ['Postgraduate', 'Doctoral'],
    eligibleFields: ['Visual Arts', 'Creative Writing', 'Film & Photography', 'Heritage Conservation', 'Museum Studies', 'Performing Arts'],
    minCgpa: 6.5,
    maxFamilyIncome: null,
    acceptanceRate: '5.6%',
    featured: false,
    tags: ['Arts', 'Creative Writing', 'UK Residency', 'British Council'],
    heroImage: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
    description: 'Enables mid-career and emerging Indian artists, writers, and heritage professionals to spend up to 3 months in the UK on tailored creative residencies.',
    overview: 'Grants contribute towards international travel, subsistence, and institutional affiliation costs in the United Kingdom for practitioners in the arts and cultural conservation.',
    benefits: [
      'Grant of £1,500 to £4,500 towards travel and UK living expenses',
      'Affiliation with premier UK cultural centres, museums, and studios',
      'Dedicated showcase opportunity at British Council London',
      'Access to Charles Wallace Fellow alumni network of celebrated authors and curators'
    ],
    requirements: [
      { id: 'req-citi', label: 'Indian citizen living in India without recent extended UK study', mandatory: true, type: 'citizenship' },
      { id: 'req-port', label: 'Exceptional creative portfolio or proven published body of work', mandatory: true, type: 'document' },
      { id: 'req-affil', label: 'Confirmation of invitation or host affiliation from a UK host institution', mandatory: true, type: 'academic' }
    ],
    requiredDocuments: [
      'Comprehensive 10-page Portfolio of Creative Work (PDF)',
      'Letter of affiliation or formal invitation from UK host university or residency',
      'Detailed proposal outlining objectives and expected public output',
      'Two professional letters of reference from recognized arts practitioners'
    ],
    applicationProcedure: [
      'Prepare project proposal and secure host UK residency endorsement.',
      'Submit online application through British Council India arts portal.',
      'Portfolio review by joint UK-India arts curator committee.',
      'Final interview at British Council New Delhi.'
    ],
    sourceUrl: 'https://www.britishcouncil.in/study-uk/scholarships/charles-wallace-india-trust',
    officialPortal: 'https://cwitarts.britishcouncil.org.in/',
    lastVerified: '2026-10-18',
    isOfficialVerified: true
  }
]
