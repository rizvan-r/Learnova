export interface CareerBranch {
  branchName: string
  branchName_ta: string
  domains: string[]
  domains_ta: string[]
}

export interface CareerCourse {
  degreeName: string
  degreeName_ta: string
  branches: CareerBranch[]
}

export interface CareerSector {
  id: string
  title: string
  title_ta: string
  iconName: string
  accentColor: string
  description: string
  description_ta: string
  courses: CareerCourse[]
}

export const MOCK_CAREER_SECTORS: CareerSector[] = [
  {
    id: 'engineering-technology',
    title: 'Engineering and Technology',
    title_ta: 'பொறியியல் மற்றும் தொழில்நுட்பம்',
    iconName: 'Cpu',
    accentColor: '#087F72',
    description: 'Design and build next-generation hardware, software systems, robotics, and cyber solutions.',
    description_ta: 'அடுத்த தலைமுறை வன்பொருள், மென்பொருள் அமைப்புகள், ரோபோட்டிக்ஸ் மற்றும் சைபர் தீர்வுகளை உருவாக்குதல்.',
    courses: [
      {
        degreeName: 'B.E. / B.Tech Computer Science',
        degreeName_ta: 'பி.இ. / பி.டெக் கணினி அறிவியல்',
        branches: [
          {
            branchName: 'Software Engineering',
            branchName_ta: 'மென்பொருள் பொறியியல்',
            domains: ['Full-Stack Development', 'Cloud Architecture', 'DevOps & Site Reliability'],
            domains_ta: ['ஃபுல்-ஸ்டாக் மேம்பாடு', 'கிளவுட் கட்டமைப்பு', 'டெவ்ஆப்ஸ்'],
          },
          {
            branchName: 'Data & Artificial Intelligence',
            branchName_ta: 'தரவு மற்றும் செயற்கை நுண்ணறிவு',
            domains: ['Data Analytics', 'Machine Learning Engineering', 'Natural Language Processing'],
            domains_ta: ['தரவு பகுப்பாய்வு', 'இயந்திரக் கற்றல் பொறியியல்', 'இயற்கை மொழி செயலாக்கம்'],
          },
          {
            branchName: 'Cybersecurity & Networks',
            branchName_ta: 'சைபர் பாதுகாப்பு மற்றும் நெட்வொர்க்',
            domains: ['Ethical Hacking', 'Information Security Analysis', 'Network Defense'],
            domains_ta: ['எத்திக்கல் ஹேக்கிங்', 'தகவல் பாதுகாப்பு பகுப்பாய்வு', 'நெட்வொர்க் பாதுகாப்பு'],
          },
        ],
      },
      {
        degreeName: 'B.E. Electrical & Electronics',
        degreeName_ta: 'பி.இ. மின் மற்றும் மின்னணுவியல்',
        branches: [
          {
            branchName: 'Embedded Systems & IoT',
            branchName_ta: 'எம்பெடட் சிஸ்டம்ஸ் & ஐஓடி',
            domains: ['Robotics Engineering', 'Smart Grid Technology', 'Electric Vehicle Powertrains'],
            domains_ta: ['ரோபோட்டிக்ஸ் பொறியியல்', 'ஸ்மார்ட் கிரிட் தொழில்நுட்பம்', 'மின்சார வாகன தொழில்நுட்பம்'],
          },
        ],
      },
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare and Medicine',
    title_ta: 'சுகாதாரம் மற்றும் மருத்துவம்',
    iconName: 'Stethoscope',
    accentColor: '#E11D48',
    description: 'Diagnose diseases, provide patient therapy, formulate medicines, and advance public health.',
    description_ta: 'நோய்களைக் கண்டறிதல், நோயாளிகளுக்குச் சிகிச்சை அளித்தல் மற்றும் பொது சுகாதாரத்தை மேம்படுத்துதல்.',
    courses: [
      {
        degreeName: 'M.B.B.S. / B.D.S.',
        degreeName_ta: 'எம்.பி.பி.எஸ். / பி.டி.எஸ்.',
        branches: [
          {
            branchName: 'Clinical Medicine',
            branchName_ta: 'மருத்துவப் பயிற்சி',
            domains: ['General Medicine', 'Community Health', 'Pediatrics', 'Surgical Sciences'],
            domains_ta: ['பொது மருத்துவம்', 'சமூக நலம்', 'குழந்தைகள் நலம்', 'அறுவை சிகிச்சை அறிவியல்'],
          },
        ],
      },
      {
        degreeName: 'B.Sc. Nursing & Allied Health',
        degreeName_ta: 'பி.எஸ்சி நர்சிங் & துணை மருத்துவ அறிவியல்',
        branches: [
          {
            branchName: 'Diagnostic Technology',
            branchName_ta: 'கண்டறிதல் தொழில்நுட்பம்',
            domains: ['Medical Laboratory Technology', 'Radiography & Imaging', 'Emergency Medical Care'],
            domains_ta: ['மருத்துவ ஆய்வகத் தொழில்நுட்பம்', 'ரேடியோகிராபி மற்றும் இமேஜிங்', 'அவசர சிகிச்சை பராமரிப்பு'],
          },
        ],
      },
      {
        degreeName: 'B.Pharm / Pharm.D',
        degreeName_ta: 'பி.பார்ம் / பார்ம்.டி',
        branches: [
          {
            branchName: 'Pharmaceutical Sciences',
            branchName_ta: 'மருந்தியல் அறிவியல்',
            domains: ['Clinical Pharmacy', 'Drug Regulatory Affairs', 'Formulation Research'],
            domains_ta: ['மருத்துவ மருந்தகம்', 'மருந்து ஒழுங்குமுறை விவகாரங்கள்', 'மருந்து உருவாக்கம்'],
          },
        ],
      },
    ],
  },
  {
    id: 'arts-humanities',
    title: 'Arts and Humanities',
    title_ta: 'கலை மற்றும் மனிதநேயம்',
    iconName: 'BookOpen',
    accentColor: '#7C3AED',
    description: 'Explore culture, languages, social structures, creative communication, and civic institutions.',
    description_ta: 'பண்பாடு, மொழிகள், சமூகக் கட்டமைப்பு மற்றும் படைப்பாற்றல் தகவல்தொடர்புகளை ஆராய்தல்.',
    courses: [
      {
        degreeName: 'B.A. Journalism & Media Communication',
        degreeName_ta: 'பி.ஏ. இதழியல் & மக்கள் தொடர்பியல்',
        branches: [
          {
            branchName: 'Digital Media & Storytelling',
            branchName_ta: 'டிஜிட்டல் ஊடகம் & கதைசொல்லல்',
            domains: ['Investigative Journalism', 'Broadcast Production', 'Content Strategy & Technical Writing'],
            domains_ta: ['புலனாய்வு இதழியல்', 'ஒளிபரப்பு தயாரிப்பு', 'உள்ளடக்க உத்தி & எழுத்து'],
          },
        ],
      },
      {
        degreeName: 'B.A. Public Administration & Political Science',
        degreeName_ta: 'பி.ஏ. பொது நிர்வாகம் & அரசியல் அறிவியல்',
        branches: [
          {
            branchName: 'Public Policy & Governance',
            branchName_ta: 'பொதுக் கொள்கை & நிர்வாகம்',
            domains: ['Civil Services Preparation', 'Local Governance Analysis', 'Urban Planning Policy'],
            domains_ta: ['குடிமைப் பணிகள் தயாரிப்பு', 'உள்ளாட்சி நிர்வாக பகுப்பாய்வு', 'நகர திட்டமிடல் கொள்கை'],
          },
        ],
      },
      {
        degreeName: 'B.Des / Visual Arts',
        degreeName_ta: 'பி.டெஸ் / காட்சி கலைகள்',
        branches: [
          {
            branchName: 'Design & Usability',
            branchName_ta: 'வடிவமைப்பு & பயனர் அனுபவம்',
            domains: ['UI/UX Product Design', 'Graphic Communication', 'Motion Graphics & Animation'],
            domains_ta: ['UI/UX தயாரிப்பு வடிவமைப்பு', 'கிராஃபிக் தகவல் தொடர்பு', 'மோஷன் கிராபிக்ஸ் & அனிமேஷன்'],
          },
        ],
      },
    ],
  },
  {
    id: 'commerce-business',
    title: 'Commerce and Business',
    title_ta: 'வணிகம் மற்றும் நிர்வாகம்',
    iconName: 'Landmark',
    accentColor: '#0284C7',
    description: 'Master capital allocation, corporate accounting, entrepreneurial strategy, and global trade.',
    description_ta: 'நிதி மேலாண்மை, கார்ப்பரேட் கணக்கியல், தொழில்முனைவோர் உத்திகள் மற்றும் வர்த்தகம்.',
    courses: [
      {
        degreeName: 'B.Com / B.Com Professional Accounting',
        degreeName_ta: 'பி.காம் / நிபுணத்துவக் கணக்கியல்',
        branches: [
          {
            branchName: 'Finance & Taxation',
            branchName_ta: 'நிதி மற்றும் வரிவிதிப்பு',
            domains: ['Chartered Accountancy (CA)', 'Financial Risk Analysis', 'Corporate Auditing'],
            domains_ta: ['பட்டயக் கணக்காளர் (CA)', 'நிதி அபாய பகுப்பாய்வு', 'கார்ப்பரேட் தணிக்கை'],
          },
        ],
      },
      {
        degreeName: 'B.B.A. / Bachelor of Management Studies',
        degreeName_ta: 'பி.பி.ஏ. / வணிக மேலாண்மைப் படிப்பு',
        branches: [
          {
            branchName: 'Business Operations & Growth',
            branchName_ta: 'வணிகச் செயல்பாடுகள் & வளர்ச்சி',
            domains: ['Supply Chain & Logistics', 'Digital Marketing Strategy', 'Human Capital Management'],
            domains_ta: ['விநியோகச் சங்கிலி மேலாண்மை', 'டிஜிட்டல் மார்க்கெட்டிங்', 'மனித வள மேலாண்மை'],
          },
        ],
      },
    ],
  },
  {
    id: 'science-research',
    title: 'Science and Research',
    title_ta: 'அறிவியல் மற்றும் ஆராய்ச்சி',
    iconName: 'Microscope',
    accentColor: '#059669',
    description: 'Investigate natural phenomena, quantum physics, molecular biology, and pure mathematics.',
    description_ta: 'இயற்கை நிகழ்வுகள், குவாண்டம் இயற்பியல், மூலக்கூறு உயிரியல் மற்றும் கணிதத்தை ஆராய்தல்.',
    courses: [
      {
        degreeName: 'B.Sc. Physics & Applied Mathematics',
        degreeName_ta: 'பி.எஸ்சி இயற்பியல் & பயன்பாட்டுக் கணிதம்',
        branches: [
          {
            branchName: 'Applied & Computational Sciences',
            branchName_ta: 'பயன்பாட்டு மற்றும் கணக்கீட்டு அறிவியல்',
            domains: ['Astrophysics', 'Quantum Computing Research', 'Statistical Modeling'],
            domains_ta: ['வானியற்பியல்', 'குவாண்டம் கம்ப்யூட்டிங் ஆராய்ச்சி', 'புள்ளியியல் மாதிரியாக்கம்'],
          },
        ],
      },
      {
        degreeName: 'B.Sc. Biotechnology & Microbiology',
        degreeName_ta: 'பி.எஸ்சி பயோடெக்னாலஜி & நுண்ணுயிரியல்',
        branches: [
          {
            branchName: 'Life Sciences Innovations',
            branchName_ta: 'உயிர் அறிவியல் கண்டுபிடிப்புகள்',
            domains: ['Genetic Engineering', 'Bioinformatics', 'Environmental Toxicology'],
            domains_ta: ['மரபணு பொறியியல்', 'பயோஇன்ஃபர்மேட்டிக்ஸ்', 'சுற்றுச்சூழல் நச்சுயியல்'],
          },
        ],
      },
    ],
  },
  {
    id: 'agriculture-environment',
    title: 'Agriculture and Environment',
    title_ta: 'வேளாண்மை மற்றும் சுற்றுச்சூழல்',
    iconName: 'Sprout',
    accentColor: '#16A34A',
    description: 'Pioneer climate resilience, hydroponic farming, soil regeneration, and sustainable forestry.',
    description_ta: 'காலநிலை மீள்தன்மை, மண்ணில்லா விவசாயம், மண் மறுசீரமைப்பு மற்றும் நிலையான காடுகள்.',
    courses: [
      {
        degreeName: 'B.Sc. (Hons) Agriculture & Horticulture',
        degreeName_ta: 'பி.எஸ்சி (ஹானர்ஸ்) வேளாண்மை & தோட்டக்கலை',
        branches: [
          {
            branchName: 'Agri-Tech & Crop Production',
            branchName_ta: 'வேளாண் தொழில்நுட்பம் & பயிர் உற்பத்தி',
            domains: ['Precision Farming & Drones', 'Hydroponics & Controlled Agriculture', 'Seed Genetics & Crop Protection'],
            domains_ta: ['துல்லிய வேளாண்மை & ட்ரோன்கள்', 'ஹைட்ரோபோனிக்ஸ்', 'விதை மரபியல் & பயிர் பாதுகாப்பு'],
          },
        ],
      },
      {
        degreeName: 'B.Sc. Environmental Science & Forestry',
        degreeName_ta: 'பி.எஸ்சி சுற்றுச்சூழல் அறிவியல் & வனவியல்',
        branches: [
          {
            branchName: 'Ecological Sustainability',
            branchName_ta: 'சுற்றுச்சூழல் நிலைத்தன்மை',
            domains: ['Water Resource Management', 'Climate Change Mitigation', 'Renewable Energy Assessment'],
            domains_ta: ['நீர் வள மேலாண்மை', 'காலநிலை மாற்றத் தணிப்பு', 'புதுப்பிக்கத்தக்க ஆற்றல் மதிப்பீடு'],
          },
        ],
      },
    ],
  },
]
