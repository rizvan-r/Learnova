import uuid
from datetime import datetime, date, timezone
from typing import Dict, List, Optional, Any
from backend.app.models.schemas import UserRole


class DataStore:
    def __init__(self):
        self._init_data()

    def _init_data(self):
        # 1. Schools
        self.schools: Dict[str, Dict[str, Any]] = {
            "a1111111-1111-1111-1111-111111111111": {
                "id": "a1111111-1111-1111-1111-111111111111",
                "emis_code": "33020100101",
                "name": "Government Model Higher Secondary School, Salem North",
                "name_ta": "அரசு மாதிரி மேல்நிலைப் பள்ளி, சேலம் வடக்கு",
                "address": "Gandhi Road, Fort Area",
                "district": "Salem",
                "block": "Salem Urban",
                "pincode": "636001",
                "school_type": "Government Higher Secondary",
                "total_students": 1240,
                "total_teachers": 48,
                "latitude": 11.6643,
                "longitude": 78.1460,
            },
            "b2222222-2222-2222-2222-222222222222": {
                "id": "b2222222-2222-2222-2222-222222222222",
                "emis_code": "33020100202",
                "name": "Bharathiar Memorial Girls Model School, Coimbatore",
                "name_ta": "பாரதியார் நினைவு பெண்கள் மாதிரி பள்ளி, கோயம்புத்தூர்",
                "address": "Avinashi Road, Peelamedu",
                "district": "Coimbatore",
                "block": "Coimbatore South",
                "pincode": "641004",
                "school_type": "Government Higher Secondary",
                "total_students": 980,
                "total_teachers": 42,
                "latitude": 11.0168,
                "longitude": 76.9558,
            }
        }

        # 2. Profiles (All 5 roles)
        self.profiles: Dict[str, Dict[str, Any]] = {
            # Student
            "11111111-1111-1111-1111-111111111111": {
                "id": "11111111-1111-1111-1111-111111111111",
                "email": "student.demo@learnova.gov.in",
                "full_name": "Priya Ramanathan",
                "full_name_ta": "பிரியா ராமநாதன்",
                "role": UserRole.STUDENT,
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "region": "Salem",
                "emis_number": "3302010010101",
                "designation": "Class 11 - Computer Science",
                "phone": "+91 98765 43210",
                "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
            },
            # Staff
            "22222222-2222-2222-2222-222222222222": {
                "id": "22222222-2222-2222-2222-222222222222",
                "email": "staff.demo@learnova.gov.in",
                "full_name": "Anitha Subramanian",
                "full_name_ta": "அனிதா சுப்ரமணியன்",
                "role": UserRole.STAFF,
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "region": "Salem",
                "emis_number": "3302010010102",
                "designation": "PG Teacher (Computer Science)",
                "phone": "+91 98765 43211",
                "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
            },
            # Headmaster
            "33333333-3333-3333-3333-333333333333": {
                "id": "33333333-3333-3333-3333-333333333333",
                "email": "hm.demo@learnova.gov.in",
                "full_name": "Dr. K. Meenakshi Sundaram",
                "full_name_ta": "முனைவர் கே. மீனாட்சி சுந்தரம்",
                "role": UserRole.HEADMASTER,
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "region": "Salem",
                "emis_number": "3302010010103",
                "designation": "Headmaster",
                "phone": "+91 98765 43212",
                "avatar_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            },
            # Doctor
            "44444444-4444-4444-4444-444444444444": {
                "id": "44444444-4444-4444-4444-444444444444",
                "email": "doctor.demo@learnova.gov.in",
                "full_name": "Dr. S. Vignesh M.B.B.S.",
                "full_name_ta": "மருத்துவர் எஸ். விக்னேஷ்",
                "role": UserRole.DOCTOR,
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "region": "Salem Region",
                "emis_number": "DOC-TN-8821",
                "designation": "School Health Officer",
                "phone": "+91 98765 43213",
                "avatar_url": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150",
            },
            # Education Officer
            "55555555-5555-5555-5555-555555555555": {
                "id": "55555555-5555-5555-5555-555555555555",
                "email": "officer.demo@learnova.gov.in",
                "full_name": "Thiru R. Karunakaran M.A., B.Ed.",
                "full_name_ta": "திரு ஆர். கருணாகரன்",
                "role": UserRole.EDUCATION_OFFICER,
                "school_id": None,
                "region": "Salem Educational District",
                "emis_number": "DEO-TN-4190",
                "designation": "District Educational Officer (DEO)",
                "phone": "+91 98765 43214",
                "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            }
        }

        # 3. Student Record
        self.student_records: Dict[str, Dict[str, Any]] = {
            "11111111-1111-1111-1111-111111111111": {
                "profile_id": "11111111-1111-1111-1111-111111111111",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "grade": "11",
                "section": "A",
                "roll_number": "11A-14",
                "attendance_percentage": 94.8,
                "academic_year": "2026-2027",
                "gpa": 9.1,
                "achievements": [
                    {"title": "1st Prize in State Science Congress 2026", "date": "2026-02-15", "badge": "Gold"},
                    {"title": "TN Young Innovator Coding Scholar", "date": "2026-08-10", "badge": "Merit"},
                ]
            }
        }

        # 4. Announcements
        self.announcements: List[Dict[str, Any]] = [
            {
                "id": "ann-001",
                "title": "Smart Classroom Equipment Upgrade Grant 2026 Sanctioned",
                "title_ta": "2026 ஆம் ஆண்டிற்கான ஸ்மார்ட் வகுப்பறை உபகரணங்கள் மேம்பாட்டு நிதி ஒதுக்கீடு",
                "content": "Under the Samagra Shiksha Initiative, funds for high-speed internet and interactive projectors have been disbursed to 45 model schools across Salem district.",
                "content_ta": "சமக்ர சிக்ஷா திட்டத்தின் கீழ், சேலம் மாவட்டத்திலுள்ள 45 மாதிரிப் பள்ளிகளுக்கு அதிவேக இணையம் மற்றும் ஊடாடும் ப்ரொஜெக்டர்களுக்கான நிதி விடுவிக்கப்பட்டுள்ளது.",
                "category": "infrastructure",
                "official_link": "https://tnschools.gov.in/grants/2026-smart-classrooms",
                "source": "Department of School Education, Tamil Nadu",
                "is_official": True,
                "published_at": datetime.now(timezone.utc),
            },
            {
                "id": "ann-002",
                "title": "State-Level AI & Coding Hackathon for Higher Secondary Students",
                "title_ta": "மேல்நிலைப் பள்ளி மாணவர்களுக்கான மாநில அளவிலான ஏஐ மற்றும் கோடிங் ஹேக்கத்தான்",
                "content": "Registrations are open for students of Grades 9 to 12. Mentorship sessions by IIT Madras Pravartak will commence on November 10, 2026.",
                "content_ta": "9 முதல் 12 ஆம் வகுப்பு வரையிலான மாணவர்களுக்குப் பதிவு திறக்கப்பட்டுள்ளது. சென்னை ஐஐடி பிரவர்தக் நடத்தும் வழிகாட்டுதல் அமர்வுகள் நவம்பர் 10 முதல் தொடங்கும்.",
                "category": "academic",
                "official_link": "https://innovate.tnschools.gov.in/hackathon-2026",
                "source": "Tamil Nadu State Innovation Council",
                "is_official": True,
                "published_at": datetime.now(timezone.utc),
            },
            {
                "id": "ann-003",
                "title": "Annual Health & Eye Screening Camp Schedule Released",
                "title_ta": "வருடாந்திர சுகாதார மற்றும் கண் பரிசோதனை முகாம் அட்டவணை வெளியீடு",
                "content": "District Mobile Medical Units will visit all assigned government higher secondary schools starting this Monday for comprehensive adolescent health checkups.",
                "content_ta": "மாவட்ட நடமாடும் மருத்துவக் குழுக்கள் வரும் திங்கட்கிழமை முதல் அனைத்து அரசு மேல்நிலைப் பள்ளிகளிலும் மாணவர் நல்வாழ்வுப் பரிசோதனையைத் தொடங்கும்.",
                "category": "health",
                "official_link": "https://nhm.tn.gov.in/school-health-2026",
                "source": "National Health Mission & Dept of Public Health",
                "is_official": True,
                "published_at": datetime.now(timezone.utc),
            }
        ]

        # 5. Fund Allocations
        self.fund_allocations: List[Dict[str, Any]] = [
            {
                "id": "fa-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "financial_year": "2026-2027",
                "grant_type": "Composite School Grant",
                "grant_type_ta": "ஒருங்கிணைந்த பள்ளி மேம்பாட்டு மானியம்",
                "sanctioned_amount": 250000.00,
                "released_amount": 250000.00,
                "remaining_balance": 85400.00,
                "status": "approved",
                "remarks": "Annual maintenance, library & lab materials",
            },
            {
                "id": "fa-002",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "financial_year": "2026-2027",
                "grant_type": "ICT & Smart Classroom Grant",
                "grant_type_ta": "தகவல் தொழில்நுட்பம் & ஸ்மார்ட் வகுப்பறை மானியம்",
                "sanctioned_amount": 400000.00,
                "released_amount": 400000.00,
                "remaining_balance": 112000.00,
                "status": "approved",
                "remarks": "Digital projector replacement and optical fiber lines",
            },
            {
                "id": "fa-003",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "financial_year": "2026-2027",
                "grant_type": "Sports & Physical Education Fund",
                "grant_type_ta": "விளையாட்டு மற்றும் உடற்கல்வி நிதி",
                "sanctioned_amount": 100000.00,
                "released_amount": 100000.00,
                "remaining_balance": 32000.00,
                "status": "approved",
                "remarks": "Volleyball court renovation and athletic equipment",
            }
        ]

        # 6. Fund Transactions
        self.fund_transactions: List[Dict[str, Any]] = [
            {
                "id": "ft-001",
                "allocation_id": "fa-002",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "transaction_type": "expenditure",
                "amount": 188000.00,
                "purpose": "Installation of 4K Interactive Flat Panels in 2 CS Labs",
                "purpose_ta": "2 கணினி ஆய்வகங்களில் 4K ஊடாடும் பேனல்கள் நிறுவுதல்",
                "vendor_name": "ELCOT Tamil Nadu Ltd",
                "invoice_ref": "ELCOT/2026/INV-9921",
                "status": "verified",
                "created_at": datetime.now(timezone.utc),
            },
            {
                "id": "ft-002",
                "allocation_id": "fa-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "transaction_type": "expenditure",
                "amount": 64600.00,
                "purpose": "Drinking water RO membrane replacement & UV sterilization filters",
                "purpose_ta": "குடிநீர் RO சவ்வு மற்றும் UV வடிகட்டிகள் பொருத்துதல்",
                "vendor_name": "AquaPure Systems Salem",
                "invoice_ref": "APS/2026/782",
                "status": "verified",
                "created_at": datetime.now(timezone.utc),
            },
            {
                "id": "ft-003",
                "allocation_id": "fa-003",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "transaction_type": "expenditure",
                "amount": 68000.00,
                "purpose": "Volleyball court resurfacing and badminton gear procurement",
                "purpose_ta": "கைப்பந்து ஆடுகளம் சீரமைப்பு மற்றும் பூப்பந்து உபகரணங்கள் வாங்குதல்",
                "vendor_name": "Olympic Sports Salem",
                "invoice_ref": "OLY/9931/2026",
                "status": "verified",
                "created_at": datetime.now(timezone.utc),
            }
        ]

        # 7. Fund Requests
        self.fund_requests: List[Dict[str, Any]] = [
            {
                "id": "fr-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "requested_by": "33333333-3333-3333-3333-333333333333",
                "title": "Robotics & AI Innovation Lab Hardware Setup",
                "purpose": "Procurement of 15 Raspberry Pi 5 kits, Arduino sensor shields, and 3D printer for student innovation club.",
                "estimated_amount": 175000.00,
                "urgency": "high",
                "status": "pending",
                "officer_notes": None,
                "created_at": datetime.now(timezone.utc),
                "reviewed_at": None,
            }
        ]

        # 8. Complaints & Votes
        self.complaints: List[Dict[str, Any]] = [
            {
                "id": "cmp-001",
                "reference_number": "LN-2026-00412",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "title": "Classroom 11-A Projector Display Blurry & Cable Faulty",
                "title_ta": "11-A வகுப்பறை புரொஜெக்டர் காட்சி தெளிவின்மை",
                "category": "classroom_projector",
                "description": "The projector in Section 11-A flickers intermittently during physics and computer science classes.",
                "priority": "high",
                "status": "action_taken",
                "is_anonymous": False,
                "is_common_issue": True,
                "is_escalated_to_officer": False,
                "escalation_reason": None,
                "assigned_to": "22222222-2222-2222-2222-222222222222",
                "created_at": datetime.now(timezone.utc),
            },
            {
                "id": "cmp-002",
                "reference_number": "LN-2026-00415",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "title": "Drinking Water Cooler Filter Needs Replacement",
                "title_ta": "குடிநீர் சுத்திகரிப்பு வடிகட்டி மாற்றம் தேவை",
                "category": "drinking_water",
                "description": "Second floor water dispenser water pressure is low and taste indicates filter replacement is due.",
                "priority": "high",
                "status": "in_review",
                "is_anonymous": True,
                "is_common_issue": True,
                "is_escalated_to_officer": False,
                "escalation_reason": None,
                "assigned_to": None,
                "created_at": datetime.now(timezone.utc),
            },
            {
                "id": "cmp-003",
                "reference_number": "LN-2026-00419",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "title": "Broken Cricket Nets on South Playground",
                "title_ta": "தெற்கு விளையாட்டு மைதானத்தில் கிழிந்த கிரிக்கெட் வலைகள்",
                "category": "sports_equipment",
                "description": "Safety concern during evening practice as protective netting has torn.",
                "priority": "medium",
                "status": "submitted",
                "is_anonymous": False,
                "is_common_issue": True,
                "is_escalated_to_officer": False,
                "escalation_reason": None,
                "assigned_to": None,
                "created_at": datetime.now(timezone.utc),
            },
            {
                "id": "cmp-004",
                "reference_number": "LN-2026-00425",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "title": "Delayed Science Lab Chemicals Supply to District Warehouse",
                "title_ta": "அறிவியல் ஆய்வக ரசாயனங்கள் தாமதமாக விநியோகிக்கப்படுவது",
                "category": "infrastructure",
                "description": "Higher secondary chemistry practical batches delayed due to lack of standard titration reagents.",
                "priority": "high",
                "status": "escalated",
                "is_anonymous": False,
                "is_common_issue": False,
                "is_escalated_to_officer": True,
                "escalation_reason": "Supply chain delay requires district education officer intervention.",
                "assigned_to": "55555555-5555-5555-5555-555555555555",
                "created_at": datetime.now(timezone.utc),
            }
        ]

        # Complainant private records (strictly hidden for anonymous)
        self.complaint_private_data: Dict[str, Dict[str, Any]] = {
            "cmp-001": {
                "complainant_id": "11111111-1111-1111-1111-111111111111",
                "complainant_role": UserRole.STUDENT,
                "contact_phone": "+91 98765 43210"
            },
            "cmp-002": {
                "complainant_id": "11111111-1111-1111-1111-111111111111",
                "complainant_role": UserRole.STUDENT,
                "contact_phone": "+91 98765 43210"
            }
        }

        # Votes: complaint_id -> set of student_ids
        self.complaint_votes: Dict[str, set] = {
            "cmp-001": {"11111111-1111-1111-1111-111111111111", "student_2", "student_3", "student_4"},
            "cmp-002": {"student_2", "student_5"},
            "cmp-003": {"student_6"},
            "cmp-004": set(),
        }

        # 9. Career Explorer hierarchy
        self.career_domains: List[Dict[str, Any]] = [
            {
                "id": "cd-001",
                "sector": "Engineering & Technology",
                "sector_ta": "பொறியியல் & தொழில்நுட்பம்",
                "degree_course": "B.E. / B.Tech",
                "degree_course_ta": "பி.இ. / பி.டெக்",
                "branch": "Computer Science & Engineering",
                "branch_ta": "கணினி அறிவியல் & பொறியியல்",
                "domain_name": "Full-Stack Web & Cloud Systems",
                "domain_name_ta": "முழு அடுக்கு வலை & மேகக்கணி அமைப்புகள்",
                "description": "Design and develop scalable cloud-native web architectures, microservices, and interactive modern user experiences.",
                "description_ta": "அளவிடக்கூடிய மேகக்கணி வலை கட்டமைப்புகள், மைக்ரோசர்வீஸ்கள் மற்றும் நவீன பயனர் இடைமுகங்களை உருவாக்குதல்.",
                "eligibility": "Class 12 with Physics, Chemistry & Mathematics (Minimum 60% aggregate)",
                "duration": "4 Years",
                "entrance_exams": ["TNEA (Tamil Nadu)", "JEE Main", "BITSAT"],
                "required_skills": ["TypeScript", "React", "Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs"],
                "career_paths": ["Full-Stack Engineer", "Frontend Architect", "Cloud Backend Developer", "SaaS Solutions Engineer"],
                "scholarships": ["TN Moovalur Ramamirtham Ammaiyar Scheme (7.5% Quota)", "National Merit Scholarship", "AICTE Pragati"],
                "approx_cost": "Govt: ₹15,000/yr | Aided: ₹45,000/yr",
                "official_links": ["https://www.tneaonline.org", "https://aicte-india.org"],
                "demand_rank": 1,
                "demand_tag": "Top Demand",
                "demand_source": "TN Higher Education Survey 2026",
            },
            {
                "id": "cd-002",
                "sector": "Engineering & Technology",
                "sector_ta": "பொறியியல் & தொழில்நுட்பம்",
                "degree_course": "B.E. / B.Tech",
                "degree_course_ta": "பி.இ. / பி.டெக்",
                "branch": "Computer Science & Engineering",
                "branch_ta": "கணினி அறிவியல் & பொறியியல்",
                "domain_name": "Artificial Intelligence & Machine Learning",
                "domain_name_ta": "செயற்கை நுண்ணறிவு & இயந்திர கற்றல்",
                "description": "Build intelligent automation systems, deep neural networks, computer vision, and generative AI agents for industry applications.",
                "description_ta": "தொழில்துறை தேவைகளுக்கான அறிவார்ந்த தானியங்கி அமைப்புகள் மற்றும் ஆழமான கற்றல் மாதிரிகளை உருவாக்குதல்.",
                "eligibility": "Class 12 with Physics, Chemistry & Mathematics (PCM)",
                "duration": "4 Years",
                "entrance_exams": ["TNEA", "JEE Main", "JEE Advanced"],
                "required_skills": ["Python", "PyTorch", "TensorFlow", "Linear Algebra", "MLOps", "Vector Databases"],
                "career_paths": ["AI/ML Engineer", "Data Scientist", "LLM Application Developer", "Computer Vision Researcher"],
                "scholarships": ["PM-Vidyalaxmi Education Loan Support", "State First-Graduate Free Education"],
                "approx_cost": "Govt: ₹15,000/yr | Aided: ₹50,000/yr",
                "official_links": ["https://nptel.ac.in/ai", "https://www.tneaonline.org"],
                "demand_rank": 2,
                "demand_tag": "Exponential Growth",
                "demand_source": "NASSCOM Talent Matrix 2026",
            },
            {
                "id": "cd-003",
                "sector": "Engineering & Technology",
                "sector_ta": "பொறியியல் & தொழில்நுட்பம்",
                "degree_course": "B.E. / B.Tech",
                "degree_course_ta": "பி.இ. / பி.டெக்",
                "branch": "Computer Science & Engineering",
                "branch_ta": "கணினி அறிவியல் & பொறியியல்",
                "domain_name": "Cybersecurity & Digital Forensics",
                "domain_name_ta": "சைபர் பாதுகாப்பு & டிஜிட்டல் தடயவியல்",
                "description": "Safeguard critical national cyber infrastructure, perform penetration testing, threat hunting, and cryptographic security auditing.",
                "description_ta": "முக்கியமான டிஜிட்டல் உள்கட்டமைப்புகளைப் பாதுகாத்தல், ஊடுருவல் சோதனை மற்றும் இணைய அச்சுறுத்தல் பகுப்பாய்வு.",
                "eligibility": "Class 12 with PCM",
                "duration": "4 Years",
                "entrance_exams": ["TNEA", "JEE Main"],
                "required_skills": ["Network Security", "Cryptography", "Linux", "Ethical Hacking", "SOC Operations"],
                "career_paths": ["Information Security Analyst", "SOC Lead", "Penetration Tester", "Cloud Security Architect"],
                "scholarships": ["Cyber Shikshaa Scholarship", "State 7.5% Govt School Reservation"],
                "approx_cost": "Govt: ₹15,000/yr | Aided: ₹45,000/yr",
                "official_links": ["https://infosecawareness.in", "https://cert-in.org.in"],
                "demand_rank": 3,
                "demand_tag": "High Demand",
                "demand_source": "CERT-In Workforce Report 2026",
            },
            {
                "id": "cd-004",
                "sector": "Medical & Healthcare",
                "sector_ta": "மருத்துவம் & மக்கள் நல்வாழ்வு",
                "degree_course": "M.B.B.S.",
                "degree_course_ta": "எம்.பி.பி.எஸ்.",
                "branch": "General Medicine & Surgery",
                "branch_ta": "பொது மருத்துவம் & அறுவை சிகிச்சை",
                "domain_name": "Primary Healthcare & Clinical Diagnosis",
                "domain_name_ta": "முதன்மை சுகாதாரம் & மருத்துவ சிகிச்சை",
                "description": "Provide essential diagnosis, preventive healthcare, surgical intervention, and public health community medicine.",
                "description_ta": "அத்தியாவசிய நோயறிதல், தடுப்பு சுகாதாரம் மற்றும் பொது சுகாதார மருத்துவ சேவைகளை வழங்குதல்.",
                "eligibility": "Class 12 with Physics, Chemistry & Biology (PCB)",
                "duration": "5.5 Years (incl. 1 yr Internship)",
                "entrance_exams": ["NEET-UG (National)"],
                "required_skills": ["Clinical Anatomy", "Physiology", "Pathology", "Pharmacology", "Patient Empathy"],
                "career_paths": ["Medical Officer", "Civil Assistant Surgeon", "Postgraduate Specialist (MD/MS)", "Healthcare Administrator"],
                "scholarships": ["TN 7.5% Govt School Full Fee Waiver Scheme", "Post-Matric Scholarship"],
                "approx_cost": "Govt: ₹13,610/yr (100% Free under 7.5% Quota)",
                "official_links": ["https://tnmedicalselection.net", "https://nmc.org.in"],
                "demand_rank": 1,
                "demand_tag": "Vital Public Service",
                "demand_source": "National Health Commission 2026",
            },
            {
                "id": "cd-005",
                "sector": "Agriculture & Life Sciences",
                "sector_ta": "வேளாண்மை & உயிரியல் அறிவியல்",
                "degree_course": "B.Sc. (Hons.) Agriculture",
                "degree_course_ta": "பி.எஸ்.சி. (ஹானர்ஸ்) வேளாண்மை",
                "branch": "Agronomy & Smart Farming",
                "branch_ta": "உழவியல் & ஸ்மார்ட் விவசாயம்",
                "domain_name": "Precision Agriculture & Agritech Analytics",
                "domain_name_ta": "துல்லிய வேளாண்மை & வேளாண்-தொழில்நுட்பம்",
                "description": "Deploy drone crop monitoring, IoT soil sensors, sustainable bio-fertilizers, and high-yield climate resilient crop science.",
                "description_ta": "ட்ரோன் பயிர் கண்காணிப்பு, மண் உணரி தொழில்நுட்பம் மற்றும் நிலையான இயற்கை விவசாய முறைகளை மேம்படுத்துதல்.",
                "eligibility": "Class 12 with Biology, Physics & Chemistry or Vocational Agriculture",
                "duration": "4 Years",
                "entrance_exams": ["TNAU Admission Entrance / Merit"],
                "required_skills": ["Soil Science", "GIS Mapping", "Drone Piloting", "Organic Agronomy", "Agri Supply Chain"],
                "career_paths": ["Agricultural Officer (AO)", "Seed Tech Specialist", "Agritech Entrepreneur", "Farm Operations Lead"],
                "scholarships": ["TNAU Meritorious Rural Student Grant", "NABARD Fellowship"],
                "approx_cost": "Govt: ₹18,000/yr",
                "official_links": ["https://tnau.ac.in", "https://agricoop.gov.in"],
                "demand_rank": 2,
                "demand_tag": "Steady Growth",
                "demand_source": "Tamil Nadu Agri Council 2026",
            }
        ]

        # 10. Staff tasks
        self.staff_tasks: List[Dict[str, Any]] = [
            {
                "id": "task-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "assigned_to": "22222222-2222-2222-2222-222222222222",
                "title": "Fortnightly Digital Teaching Evidence: Class 11 CS Interactive Python Lab",
                "title_ta": "இருவார டிஜிட்டல் கற்பித்தல் சான்று: 11 ஆம் வகுப்பு கணினி அறிவியல் பைதான் பயிற்சி",
                "description": "Upload digital screen recording and student attendance log demonstrating data visualization in Python.",
                "due_date": date.today(),
                "task_type": "digital_teaching",
                "status": "approved",
                "evidence_url": "https://learnova-evidence.storage.supabase.co/teaching/cs11_python_lab_evidence.mp4",
                "evidence_notes": "Conducted interactive coding lab using DIKSHA smart board modules. 42 of 44 students completed hands-on exercises.",
                "reviewed_by": "33333333-3333-3333-3333-333333333333",
                "review_feedback": "Excellent pedagogical delivery and student engagement. 15 credits awarded.",
                "credits_awarded": 15,
                "created_at": datetime.now(timezone.utc),
            },
            {
                "id": "task-002",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "assigned_to": "22222222-2222-2222-2222-222222222222",
                "title": "Monthly Student Innovation Club Project Review",
                "title_ta": "மாதாந்திர மாணவர் கண்டுபிடிப்பு மன்றத் திட்ட மதிப்பாய்வு",
                "description": "Guide and record submission of 3 science exhibition robotics prototypes for district level selection.",
                "due_date": date.today(),
                "task_type": "activity",
                "status": "pending",
                "evidence_url": None,
                "evidence_notes": None,
                "reviewed_by": None,
                "review_feedback": None,
                "credits_awarded": 0,
                "created_at": datetime.now(timezone.utc),
            }
        ]

        # 11. Collaborations
        self.collaborations: List[Dict[str, Any]] = [
            {
                "id": "col-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "partner_name": "Government College of Engineering, Salem",
                "partner_type": "college",
                "focus_area": "Robotics, IoT and Electronics Hands-on Mentorship",
                "start_date": "2026-06-15",
                "end_date": "2026-11-30",
                "student_beneficiaries": 120,
                "status": "active"
            },
            {
                "id": "col-002",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "partner_name": "Zoho Schools of Learning & Titan Corp",
                "partner_type": "company",
                "focus_area": "Full-Stack Web Development & Career Apprenticeship Bootcamp",
                "start_date": "2026-07-01",
                "end_date": "2026-12-15",
                "student_beneficiaries": 85,
                "status": "active"
            }
        ]

        # 12. Doctor visits & records
        self.doctor_visits: List[Dict[str, Any]] = [
            {
                "id": "dv-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "doctor_id": "44444444-4444-4444-4444-444444444444",
                "scheduled_date": date.today(),
                "completed_date": date.today(),
                "status": "completed",
                "total_screened": 85,
                "notes": "Screened Class 11 and 12 students. Overall nutrition and vision indices satisfactory.",
            },
            {
                "id": "dv-002",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "doctor_id": "44444444-4444-4444-4444-444444444444",
                "scheduled_date": date.today(),
                "completed_date": None,
                "status": "scheduled",
                "total_screened": 0,
                "notes": "Upcoming visit for Grades 9 and 10 adolescent dental and hemoglobin screening.",
            }
        ]

        self.health_records: List[Dict[str, Any]] = [
            {
                "id": "hr-001",
                "visit_id": "dv-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "student_id": "11111111-1111-1111-1111-111111111111",
                "student_name": "Priya Ramanathan",
                "grade": "11-A",
                "height_cm": 158.5,
                "weight_kg": 49.2,
                "vision_status": "Normal (6/6)",
                "dental_status": "Good",
                "general_health": "Fit & Healthy",
                "follow_up_needed": False,
                "follow_up_reason": None,
                "mock_sms_sent": True,
                "mock_sms_status": "delivered_simulated",
                "mock_sms_phone": "+91 98765 43210",
                "created_at": datetime.now(timezone.utc)
            },
            {
                "id": "hr-002",
                "visit_id": "dv-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "student_id": None,
                "student_name": "M. Vigneshwar",
                "grade": "11-A",
                "height_cm": 164.0,
                "weight_kg": 52.0,
                "vision_status": "Mild Myopia (Right 6/9)",
                "dental_status": "Satisfactory",
                "general_health": "Good",
                "follow_up_needed": True,
                "follow_up_reason": "Recommend ophthalmic refraction checkup at Govt Hospital",
                "mock_sms_sent": True,
                "mock_sms_status": "delivered_simulated",
                "mock_sms_phone": "+91 98765 43299",
                "created_at": datetime.now(timezone.utc)
            }
        ]

        # 13. Inspections
        self.inspections: List[Dict[str, Any]] = [
            {
                "id": "insp-001",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "officer_id": "55555555-5555-5555-5555-555555555555",
                "scheduled_date": date.today(),
                "completed_date": date.today(),
                "status": "completed",
                "academic_score": 9.2,
                "infrastructure_score": 8.8,
                "hygiene_score": 9.0,
                "report_summary": "Term 1 comprehensive inspection completed. Smart classrooms actively utilized. Midday meal quality verified with food safety parameters. Campus greenery well maintained.",
                "photo_evidence": [
                    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400",
                    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400"
                ],
                "latitude": 11.6645,
                "longitude": 78.1462,
            },
            {
                "id": "insp-002",
                "school_id": "a1111111-1111-1111-1111-111111111111",
                "officer_id": "55555555-5555-5555-5555-555555555555",
                "scheduled_date": date.today(),
                "completed_date": None,
                "status": "scheduled",
                "academic_score": None,
                "infrastructure_score": None,
                "hygiene_score": None,
                "report_summary": "Upcoming Term 2 public examination readiness and science lab stock verification audit.",
                "photo_evidence": [],
                "latitude": 11.6643,
                "longitude": 78.1460,
            }
        ]

        # 14. Performance Reviews
        self.performance_reviews: List[Dict[str, Any]] = [
            {
                "id": "pr-001",
                "profile_id": "22222222-2222-2222-2222-222222222222",
                "reviewer_id": "33333333-3333-3333-3333-333333333333",
                "review_period": "first_6_months",
                "academic_year": "2026-2027",
                "criteria_scores": {
                    "digital_teaching": 28,
                    "student_activity": 22,
                    "innovative_pedagogy": 20,
                    "timely_evaluations": 18
                },
                "total_credits": 88,
                "feedback": "Exemplary dedication to digital pedagogy and practical lab demonstrations. Students demonstrated significant improvement in logic tests.",
                "status": "approved",
            }
        ]

        # 15. Audit Logs
        self.audit_logs: List[Dict[str, Any]] = [
            {
                "id": "log-001",
                "user_id": "33333333-3333-3333-3333-333333333333",
                "action": "FUND_TRANSACTION_RECORDED",
                "entity_type": "fund_transaction",
                "entity_id": "ft-001",
                "details": {"amount": 188000.00, "purpose": "Interactive flat panels"},
                "created_at": datetime.now(timezone.utc),
            }
        ]

    # Helper lookup methods
    def get_profile_by_role(self, role: UserRole) -> Optional[Dict[str, Any]]:
        for p in self.profiles.values():
            if p["role"] == role:
                return p
        return None

    def get_profile_by_emis(self, emis: str) -> Optional[Dict[str, Any]]:
        for p in self.profiles.values():
            if p.get("emis_number") == emis:
                return p
        return None

    def log_audit(self, user_id: Optional[str], action: str, entity_type: str, entity_id: Optional[str], details: Dict[str, Any]):
        entry = {
            "id": f"log-{uuid.uuid4().hex[:8]}",
            "user_id": user_id,
            "action": action,
            "entity_type": entity_type,
            "entity_id": entity_id,
            "details": details,
            "created_at": datetime.now(timezone.utc)
        }
        self.audit_logs.insert(0, entry)


# Singleton in-memory store
db = DataStore()
