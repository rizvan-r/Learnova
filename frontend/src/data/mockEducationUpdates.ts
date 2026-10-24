export type UpdateCategory =
  | 'Scholarships'
  | 'Admissions'
  | 'Exams and results'
  | 'Government education schemes'
  | 'Learning resources'

export interface EducationUpdate {
  id: string
  title: string
  title_ta: string
  category: UpdateCategory
  summary: string
  summary_ta: string
  published_at: string
  official_source: string
  official_link: string
  is_demo: boolean
}

export const MOCK_EDUCATION_UPDATES: EducationUpdate[] = [
  {
    id: 'upd-001',
    title: 'Pre-Matric & Post-Matric Merit Scholarship Application Window 2026-27',
    title_ta: '2026-27 ஆம் ஆண்டிற்கான மெட்ரிக் முந்தைய மற்றும் பிந்தைய கல்வி உதவித்தொகை விண்ணப்பம்',
    category: 'Scholarships',
    summary: 'Eligible students from government and government-aided schools can submit applications through the unified portal. Annual parental income certificate required.',
    summary_ta: 'அரசு மற்றும் அரசு உதவிபெறும் பள்ளி மாணவர்கள் ஒருங்கிணைந்த இணையதளம் வழியாக விண்ணப்பிக்கலாம். வருமானச் சான்றிதழ் அவசியம்.',
    published_at: '2026-10-22',
    official_source: 'Dept. of School Education, Tamil Nadu',
    official_link: 'https://scholarships.gov.in',
    is_demo: true,
  },
  {
    id: 'upd-002',
    title: 'Government Model Schools & Schools of Excellence Class 11 Entrance Admissions',
    title_ta: 'மாதிரிப் பள்ளிகள் மற்றும் தகைசால் பள்ளிகளில் 11-ஆம் வகுப்பு மாணவர் சேர்க்கை அறிவிப்பு',
    category: 'Admissions',
    summary: 'Online registration for Grade 11 STEM and Humanities super-batches in all 38 district Model Schools. Direct counseling starts next month.',
    summary_ta: '38 மாவட்ட மாதிரிப் பள்ளிகளில் 11-ஆம் வகுப்பு STEM மற்றும் கலைப் பிரிவுகளுக்கான இணையவழிப் பதிவு தொடங்கியது. அடுத்த மாதம் கலந்தாய்வு.',
    published_at: '2026-10-20',
    official_source: 'Tamil Nadu Model Schools Directorate',
    official_link: 'https://tnschools.gov.in',
    is_demo: true,
  },
  {
    id: 'upd-003',
    title: 'SSLC & Plus Two Public Examination Timetable and Hall Ticket Dispatch Date',
    title_ta: '10 மற்றும் 12 ஆம் வகுப்பு பொதுத்தேர்வு கால அட்டவணை மற்றும் நுழைவுச்சீட்டு வெளியீடு',
    category: 'Exams and results',
    summary: 'Directorate of Government Examinations has published the finalized exam calendar. Mock practical exams will commence in school labs from January.',
    summary_ta: 'அரசுத் தேர்வுகள் இயக்ககம் பொதுத்தேர்வு அட்டவணையை வெளியிட்டுள்ளது. பள்ளி ஆய்வகங்களில் மாதிரி செய்முறைத் தேர்வுகள் ஜனவரியில் தொடங்கும்.',
    published_at: '2026-10-18',
    official_source: 'Directorate of Government Examinations (DGE)',
    official_link: 'https://dge.tn.gov.in',
    is_demo: true,
  },
  {
    id: 'upd-004',
    title: 'Pudhumai Penn & Tamil Pudhalvan Higher Education Monthly Assistance Scheme',
    title_ta: 'புதுமைப் பெண் & தமிழ்ப் புதல்வன் உயர் கல்வி ஊக்கத்தொகைத் திட்டம்',
    category: 'Government education schemes',
    summary: 'Students joining recognized undergraduate degree and diploma courses after Grade 12 in state government schools receive ₹1,000 monthly direct bank transfer.',
    summary_ta: 'அரசுப் பள்ளிகளில் பயின்று பட்டப்படிப்பு மற்றும் டிப்ளமோ சேரும் மாணவர்களுக்கு மாதந்தோறும் ₹1,000 நேரடி வங்கிப் பரிமாற்றம்.',
    published_at: '2026-10-15',
    official_source: 'Social Welfare & Women Empowerment Dept.',
    official_link: 'https://www.tn.gov.in',
    is_demo: true,
  },
  {
    id: 'upd-005',
    title: 'Digital STEM Video Library & Coding Curriculum for Grades 6 to 12',
    title_ta: '6 முதல் 12 ஆம் வகுப்பு மாணவர்களுக்கான டிஜிட்டல் STEM காணொளி களஞ்சியம் மற்றும் கோடிங் பாடத்திட்டம்',
    category: 'Learning resources',
    summary: 'Interactive modules for Python programming, Artificial Intelligence basics, and digital science experiments available in Tamil and English with offline caching.',
    summary_ta: 'பைதான் புரோகிராமிங், செயற்கை நுண்ணறிவு மற்றும் அறிவியல் சோதனைகளுக்கான ஊடாடும் பாடங்கள் தமிழ் மற்றும் ஆங்கிலத்தில் கிடைக்கின்றன.',
    published_at: '2026-10-12',
    official_source: 'State Council of Educational Research & Training (SCERT)',
    official_link: 'https://kalvivisual.tn.gov.in',
    is_demo: true,
  },
  {
    id: 'upd-006',
    title: 'National Means-cum-Merit Scholarship Scheme (NMMSS) Selection List',
    title_ta: 'தேசிய வருவாய் வழி மற்றும் திறன் படிப்புதவித் தொகை தேர்வுப் பட்டியல்',
    category: 'Scholarships',
    summary: 'Results for the Grade 8 statewide screening exam published. Selected scholars will receive financial assistance throughout secondary education.',
    summary_ta: '8-ஆம் வகுப்பு மாநில அளவிலான தேர்வு முடிவுகள் வெளியாகியுள்ளன. தேர்வான மாணவர்களுக்கு மேல்நிலைக் கல்வி வரை உதவித்தொகை வழங்கப்படும்.',
    published_at: '2026-10-08',
    official_source: 'Ministry of Education & DGE TN',
    official_link: 'https://dge.tn.gov.in',
    is_demo: true,
  },
]
