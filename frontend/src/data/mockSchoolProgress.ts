export interface SchoolProject {
  id: string
  title: string
  title_ta: string
  schoolName: string
  category: string
  status: 'In Progress' | 'Completed' | 'Approved'
  progressPercentage: number
  budgetSanctioned: number
  budgetSpent: number
  completionDate: string
}

export interface FundAllocationItem {
  category: string
  category_ta: string
  allocated: number
  spent: number
  color: string
}

export interface SchoolFundSummary {
  fiscalYear: string
  totalSanctioned: number
  totalSpent: number
  remainingBalance: number
  allocations: FundAllocationItem[]
}

export interface EducationalEvent {
  id: string
  title: string
  title_ta: string
  date: string
  location: string
  description: string
  description_ta: string
  attendeeEstimate: string
  category: string
}

export interface PublicFacilityProposal {
  id: string
  title: string
  title_ta: string
  schoolName: string
  facilityType: string
  status: 'Under Review' | 'Approved' | 'Work In Progress' | 'Completed'
  upvotes: number
  submittedDate: string
}

export const MOCK_SCHOOL_PROJECTS: SchoolProject[] = [
  {
    id: 'prj-001',
    title: 'Smart Classroom Interactive Panels & Fiber Optic Connectivity',
    title_ta: 'ஸ்மார்ட் வகுப்பறை தொடுதிரை பலகைகள் & அதிவேக ஆப்டிகல் ஃபைபர் இணைப்பு',
    schoolName: 'Govt. Model Girls Higher Secondary School, Salem',
    category: 'Digital Infrastructure',
    status: 'In Progress',
    progressPercentage: 85,
    budgetSanctioned: 450000,
    budgetSpent: 382500,
    completionDate: 'Nov 2026',
  },
  {
    id: 'prj-002',
    title: 'Rooftop Solar PV Installation (10 kW) & Clean Power Backup',
    title_ta: 'மேற்கூரை சூரிய ஒளி மின்சார திட்டம் (10 kW) & தூய மின் இணைப்பு',
    schoolName: 'Govt. Higher Secondary School, Omalur',
    category: 'Renewable Energy',
    status: 'Completed',
    progressPercentage: 100,
    budgetSanctioned: 520000,
    budgetSpent: 512000,
    completionDate: 'Sep 2026',
  },
  {
    id: 'prj-003',
    title: 'Modern Biotechnology & Integrated Science Laboratory Renovation',
    title_ta: 'நவீன பயோடெக்னாலஜி & ஒருங்கிணைந்த அறிவியல் ஆய்வக மறுசீரமைப்பு',
    schoolName: 'Govt. Boys Model Higher Secondary School, Salem',
    category: 'STEM Laboratory',
    status: 'In Progress',
    progressPercentage: 60,
    budgetSanctioned: 680000,
    budgetSpent: 408000,
    completionDate: 'Dec 2026',
  },
  {
    id: 'prj-004',
    title: 'Commercial Reverse Osmosis (RO) Safe Drinking Water Plant',
    title_ta: 'பாதுகாப்பான குடிநீர் வழங்கும் வணிக ரீதியிலான RO சுத்திகரிப்பு ஆலை',
    schoolName: 'Govt. Higher Secondary School, Attur',
    category: 'Campus Sanitation',
    status: 'Approved',
    progressPercentage: 25,
    budgetSanctioned: 220000,
    budgetSpent: 55000,
    completionDate: 'Jan 2027',
  },
]

export const MOCK_FUND_SUMMARY: SchoolFundSummary = {
  fiscalYear: '2026 - 2027',
  totalSanctioned: 7500000,
  totalSpent: 4890000,
  remainingBalance: 2610000,
  allocations: [
    {
      category: 'Smart Classrooms & ICT',
      category_ta: 'ஸ்மார்ட் வகுப்பறைகள் & தகவல் தொழில்நுட்பம்',
      allocated: 2800000,
      spent: 2350000,
      color: '#087F72',
    },
    {
      category: 'Science & Computer Labs',
      category_ta: 'அறிவியல் & கணினி ஆய்வகங்கள்',
      allocated: 2200000,
      spent: 1420000,
      color: '#0284C7',
    },
    {
      category: 'Sanitation, RO & Campus Safety',
      category_ta: 'சுகாதாரம், RO குடிநீர் & வளாகப் பாதுகாப்பு',
      allocated: 1500000,
      spent: 780000,
      color: '#059669',
    },
    {
      category: 'Sports Facilities & Libraries',
      category_ta: 'விளையாட்டு வசதிகள் & நூலகங்கள்',
      allocated: 1000000,
      spent: 340000,
      color: '#7C3AED',
    },
  ],
}

export const MOCK_EDUCATIONAL_EVENTS: EducationalEvent[] = [
  {
    id: 'evt-001',
    title: 'District STEM & Robotics Exhibition 2026',
    title_ta: 'மாவட்ட அறிவியல் & ரோபோட்டிக்ஸ் கண்காட்சி 2026',
    date: 'Nov 04, 2026',
    location: 'Salem Model School Indoor Auditorium',
    description: 'Over 120 student innovator exhibits, live AI robotics demonstrations, and interaction with IIT Madras mentors.',
    description_ta: '120-க்கும் மேற்பட்ட மாணவப் படைப்புகள், ரோபோட்டிக்ஸ் நேரடி செயல்முறை மற்றும் ஐஐடி மெட்ராஸ் வழிகாட்டிகள்.',
    attendeeEstimate: '2,500+ Students & Parents',
    category: 'STEM Innovation',
  },
  {
    id: 'evt-002',
    title: 'Higher Secondary Career Guidance & College Fair',
    title_ta: 'மேல்நிலைப் பள்ளி மாணவர்களுக்கான உயர்கல்வி வழிகாட்டல் திருவிழா',
    date: 'Nov 12, 2026',
    location: 'District Collectorate Community Hall',
    description: 'Direct interactions with representatives from top government engineering colleges, medical universities, and polytechnics.',
    description_ta: 'அரசு பொறியியல், மருத்துவக் கல்லூரிகள் மற்றும் பாலிடெக்னிக் பிரதிநிதிகளுடன் நேரடி வழிகாட்டல்.',
    attendeeEstimate: '3,800+ Students',
    category: 'Higher Education',
  },
  {
    id: 'evt-003',
    title: 'State Inter-School Athletic & Yoga Championship',
    title_ta: 'மாநில அளவிலான பள்ளிகளுக்கு இடையேயான தடகள மற்றும் யோகா போட்டி',
    date: 'Nov 20, 2026',
    location: 'Salem Municipal Sports Complex',
    description: 'Track and field events, relay championships, and district physical wellness demonstrations.',
    description_ta: 'தடகளப் போட்டிகள், தொடர் ஓட்டங்கள் மற்றும் மாவட்ட உடற்பயிற்சி நல்வாழ்வு செயல்விளக்கங்கள்.',
    attendeeEstimate: '1,400+ Athletes',
    category: 'Sports & Wellness',
  },
]

export const MOCK_FACILITY_PROPOSALS: PublicFacilityProposal[] = [
  {
    id: 'fac-001',
    title: 'Synthetic Badminton Court & Floodlights for Evening Practice',
    title_ta: 'மாலை நேரப் பயிற்சிக்காக சிந்தெடிக் பேட்மிண்டன் தரைத்தளம் & மின்விளக்குகள்',
    schoolName: 'Govt. Girls Higher Secondary School, Salem',
    facilityType: 'Sports & Recreation',
    status: 'Work In Progress',
    upvotes: 342,
    submittedDate: '2026-09-14',
  },
  {
    id: 'fac-002',
    title: 'Addition of 500 Modern Coding & Tamil Literature Reference Books',
    title_ta: '500 புதிய கோடிங் மற்றும் தமிழ் இலக்கிய குறிப்பு புத்தகங்கள் சேர்த்தல்',
    schoolName: 'Govt. Higher Secondary School, Mecheri',
    facilityType: 'Library Infrastructure',
    status: 'Approved',
    upvotes: 219,
    submittedDate: '2026-09-28',
  },
  {
    id: 'fac-003',
    title: 'All-Weather Covered Bicycles Parking Stand with Solar Lighting',
    title_ta: 'சூரிய மின்விளக்குடன் கூடிய அனைத்து காலநிலைக்குமான மிதிவண்டி கூரை நிறுத்துமிடம்',
    schoolName: 'Govt. Model School, Omalur',
    facilityType: 'Campus Safety',
    status: 'Under Review',
    upvotes: 185,
    submittedDate: '2026-10-05',
  },
]
