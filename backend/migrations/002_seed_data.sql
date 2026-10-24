-- LEARNOVA: Comprehensive Fictional Seed Data
-- Migration: 002_seed_data.sql
-- All data is demonstrative and fictional for education governance hackathon/prototype

-- 1. Seed Model Schools
INSERT INTO schools (id, emis_code, name, name_ta, address, district, block, pincode, school_type, total_students, total_teachers, latitude, longitude)
VALUES
('a1111111-1111-1111-1111-111111111111', '33020100101', 'Government Model Higher Secondary School, Salem North', 'அரசு மாதிரி மேல்நிலைப் பள்ளி, சேலம் வடக்கு', 'Gandhi Road, Fort Area', 'Salem', 'Salem Urban', '636001', 'Government Higher Secondary', 1240, 48, 11.6643, 78.1460),
('b2222222-2222-2222-2222-222222222222', '33020100202', 'Bharathiar Memorial Girls Model School, Coimbatore', 'பாரதியார் நினைவு பெண்கள் மாதிரி பள்ளி, கோயம்புத்தூர்', 'Avinashi Road, Peelamedu', 'Coimbatore', 'Coimbatore South', '641004', 'Government Higher Secondary', 980, 42, 11.0168, 76.9558),
('c3333333-3333-3333-3333-333333333333', '33020100303', 'Dr. Radhakrishnan Government Boys High School, Madurai', 'டாக்டர் ராதாகிருஷ்ணன் அரசு ஆண்கள் உயர்நிலைப் பள்ளி, மதுரை', 'South Veli Street', 'Madurai', 'Madurai West', '625001', 'Government High School', 850, 36, 9.9252, 78.1198)
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Fictional Profiles for All 5 Roles
INSERT INTO profiles (id, email, full_name, full_name_ta, role, school_id, region, emis_number, designation, phone, avatar_url)
VALUES
-- Student
('11111111-1111-1111-1111-111111111111', 'student.demo@learnova.gov.in', 'Priya Ramanathan', 'பிரியா ராமநாதன்', 'student', 'a11111111-1111-1111-1111-111111111111', 'Salem', '3302010010101', 'Class 11 - Computer Science', '+91 98765 43210', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
-- Staff (Teacher)
('22222222-2222-2222-2222-222222222222', 'staff.demo@learnova.gov.in', 'Anitha Subramanian', 'அனிதா சுப்ரமணியன்', 'staff', 'a11111111-1111-1111-1111-111111111111', 'Salem', '3302010010102', 'PG Teacher (Computer Science)', '+91 98765 43211', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),
-- Headmaster
('33333333-3333-3333-3333-333333333333', 'hm.demo@learnova.gov.in', 'Dr. K. Meenakshi Sundaram', 'முனைவர் கே. மீனாட்சி சுந்தரம்', 'headmaster', 'a11111111-1111-1111-1111-111111111111', 'Salem', '3302010010103', 'Headmaster', '+91 98765 43212', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'),
-- Doctor
('44444444-4444-4444-4444-444444444444', 'doctor.demo@learnova.gov.in', 'Dr. S. Vignesh M.B.B.S.', 'மருத்துவர் எஸ். விக்னேஷ்', 'doctor', 'a11111111-1111-1111-1111-111111111111', 'Salem Region', 'DOC-TN-8821', 'School Health Officer', '+91 98765 43213', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150'),
-- Education Officer
('55555555-5555-5555-5555-555555555555', 'officer.demo@learnova.gov.in', 'Thiru R. Karunakaran M.A., B.Ed.', 'திரு ஆர். கருணாகரன்', 'education_officer', NULL, 'Salem Educational District', 'DEO-TN-4190', 'District Educational Officer (DEO)', '+91 98765 43214', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150')
ON CONFLICT (id) DO NOTHING;

-- 3. Student Record
INSERT INTO student_records (id, profile_id, school_id, grade, section, roll_number, attendance_percentage, academic_year, gpa, achievements)
VALUES
('s1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'a11111111-1111-1111-1111-111111111111', '11', 'A', '11A-14', 94.8, '2026-2027', 9.1,
 '[{"title": "1st Prize in State Science Congress 2026", "date": "2026-02-15", "badge": "Gold"}, {"title": "TN Young Innovator Coding Scholar", "date": "2026-08-10", "badge": "Merit"}]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- 4. Staff Record
INSERT INTO staff_records (id, profile_id, school_id, subjects, qualification, date_of_joining, performance_credits)
VALUES
('t2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'a11111111-1111-1111-1111-111111111111', ARRAY['Computer Science', 'Information Technology'], 'M.Sc., M.Ed., M.Phil.', '2019-06-12', 92)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Announcements (Bilingual)
INSERT INTO announcements (id, title, title_ta, content, content_ta, category, official_link, source, is_official, published_at)
VALUES
('ann-001', 'Smart Classroom Equipment Upgrade Grant 2026 Sanctioned', '2026 ஆம் ஆண்டிற்கான ஸ்மார்ட் வகுப்பறை உபகரணங்கள் மேம்பாட்டு நிதி ஒதுக்கீடு',
 'Under the Samagra Shiksha Initiative, funds for high-speed internet and interactive projectors have been disbursed to 45 model schools across Salem district.',
 'சமக்ர சிக்ஷா திட்டத்தின் கீழ், சேலம் மாவட்டத்திலுள்ள 45 மாதிரிப் பள்ளிகளுக்கு அதிவேக இணையம் மற்றும் ஊடாடும் ப்ரொஜெக்டர்களுக்கான நிதி விடுவிக்கப்பட்டுள்ளது.',
 'infrastructure', 'https://tnschools.gov.in/grants/2026-smart-classrooms', 'Department of School Education, Tamil Nadu', TRUE, NOW() - INTERVAL '2 days'),
('ann-002', 'State-Level AI & Coding Hackathon for Higher Secondary Students', 'மேல்நிலைப் பள்ளி மாணவர்களுக்கான மாநில அளவிலான ஏஐ மற்றும் கோடிங் ஹேக்கத்தான்',
 'Registrations are open for students of Grades 9 to 12. Mentorship sessions by IIT Madras Pravartak will commence on November 10, 2026.',
 '9 முதல் 12 ஆம் வகுப்பு வரையிலான மாணவர்களுக்குப் பதிவு திறக்கப்பட்டுள்ளது. சென்னை ஐஐடி பிரவர்தக் நடத்தும் வழிகாட்டுதல் அமர்வுகள் நவம்பர் 10 முதல் தொடங்கும்.',
 'academic', 'https://innovate.tnschools.gov.in/hackathon-2026', 'Tamil Nadu State Innovation Council', TRUE, NOW() - INTERVAL '5 days'),
('ann-003', 'Annual Health & Eye Screening Camp Schedule Released', 'வருடாந்திர சுகாதார மற்றும் கண் பரிசோதனை முகாம் அட்டவணை வெளியீடு',
 'District Mobile Medical Units will visit all assigned government higher secondary schools starting this Monday for comprehensive adolescent health checkups.',
 'மாவட்ட நடமாடும் மருத்துவக் குழுக்கள் வரும் திங்கட்கிழமை முதல் அனைத்து அரசு மேல்நிலைப் பள்ளிகளிலும் மாணவர் நல்வாழ்வுப் பரிசோதனையைத் தொடங்கும்.',
 'health', 'https://nhm.tn.gov.in/school-health-2026', 'National Health Mission & Dept of Public Health', TRUE, NOW() - INTERVAL '7 days')
ON CONFLICT (id) DO NOTHING;

-- 6. Seed Fund Allocations for School
INSERT INTO fund_allocations (id, school_id, financial_year, grant_type, grant_type_ta, sanctioned_amount, released_amount, remaining_balance, status, remarks)
VALUES
('fa-001', 'a11111111-1111-1111-1111-111111111111', '2026-2027', 'Composite School Grant', 'ஒருங்கிணைந்த பள்ளி மேம்பாட்டு மானியம்', 250000.00, 250000.00, 85400.00, 'approved', 'Annual maintenance, library & lab materials'),
('fa-002', 'a11111111-1111-1111-1111-111111111111', '2026-2027', 'ICT & Smart Classroom Grant', 'தகவல் தொழில்நுட்பம் & ஸ்மார்ட் வகுப்பறை மானியம்', 400000.00, 400000.00, 112000.00, 'approved', 'Digital projector replacement and optical fiber lines'),
('fa-003', 'a11111111-1111-1111-1111-111111111111', '2026-2027', 'Sports & Physical Education Fund', 'விளையாட்டு மற்றும் உடற்கல்வி நிதி', 100000.00, 100000.00, 32000.00, 'approved', 'Volleyball court renovation and athletic equipment')
ON CONFLICT (id) DO NOTHING;

-- 7. Seed Fund Transactions (Receipts & Expenditures)
INSERT INTO fund_transactions (id, allocation_id, school_id, transaction_type, amount, purpose, purpose_ta, vendor_name, invoice_ref, status, created_at)
VALUES
('ft-001', 'fa-002', 'a11111111-1111-1111-1111-111111111111', 'expenditure', 188000.00, 'Installation of 4K Interactive Flat Panels in 2 CS Labs', '2 கணினி ஆய்வகங்களில் 4K ஊடாடும் பேனல்கள் நிறுவுதல்', 'ELCOT Tamil Nadu Ltd', 'ELCOT/2026/INV-9921', 'verified', NOW() - INTERVAL '14 days'),
('ft-002', 'fa-001', 'a11111111-1111-1111-1111-111111111111', 'expenditure', 64600.00, 'Drinking water RO membrane replacement & UV sterilization filters', 'குடிநீர் RO சவ்வு மற்றும் UV வடிகட்டிகள் பொருத்துதல்', 'AquaPure Systems Salem', 'APS/2026/782', 'verified', NOW() - INTERVAL '20 days'),
('ft-003', 'fa-003', 'a11111111-1111-1111-1111-111111111111', 'expenditure', 68000.00, 'Volleyball court resurfacing and badminton gear procurement', 'கைப்பந்து ஆடுகளம் சீரமைப்பு மற்றும் பூப்பந்து உபகரணங்கள் வாங்குதல்', 'Olympic Sports Salem', 'OLY/9931/2026', 'verified', NOW() - INTERVAL '25 days'),
('ft-004', 'fa-002', 'a11111111-1111-1111-1111-111111111111', 'expenditure', 100000.00, 'Campus Wi-Fi Mesh routers and Cat-6 cabling', 'வளாக வைஃபை மெஷ் ரௌட்டர்கள் மற்றும் கேபிளிங் பணி', 'BSNL Telecom Salem', 'BSNL/BROAD/4412', 'verified', NOW() - INTERVAL '8 days')
ON CONFLICT (id) DO NOTHING;

-- 8. Seed Complaints & Facility Issues with Voting
INSERT INTO complaints (id, reference_number, school_id, title, title_ta, category, description, priority, status, is_anonymous, is_common_issue, is_escalated_to_officer)
VALUES
('cmp-001', 'LN-2026-00412', 'a11111111-1111-1111-1111-111111111111', 'Classroom 11-A Projector Display Blurry & Cable Faulty', '11-A வகுப்பறை புரொஜெக்டர் காட்சி தெளிவின்மை', 'classroom_projector', 'The projector in Section 11-A flickers intermittently during physics and computer science classes.', 'high', 'action_taken', FALSE, TRUE, FALSE),
('cmp-002', 'LN-2026-00415', 'a11111111-1111-1111-1111-111111111111', 'Drinking Water Cooler Filter Needs Replacement', 'குடிநீர் சுத்திகரிப்பு வடிகட்டி மாற்றம் தேவை', 'drinking_water', 'Second floor water dispenser water pressure is low and taste indicates filter replacement is due.', 'high', 'in_review', TRUE, TRUE, FALSE),
('cmp-003', 'LN-2026-00419', 'a11111111-1111-1111-1111-111111111111', 'Broken Cricket Nets on South Playground', 'தெற்கு விளையாட்டு மைதானத்தில் கிழிந்த கிரிக்கெட் வலைகள்', 'sports_equipment', 'Safety concern during evening practice as protective netting has torn.', 'medium', 'submitted', FALSE, TRUE, FALSE),
('cmp-004', 'LN-2026-00425', 'a11111111-1111-1111-1111-111111111111', 'Delayed Science Lab Chemicals Supply to District Warehouse', 'அறிவியல் ஆய்வக ரசாயனங்கள் தாமதமாக விநியோகிக்கப்படுவது', 'infrastructure', 'Higher secondary chemistry practical batches delayed due to lack of standard titration reagents.', 'high', 'escalated', FALSE, FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 9. Seed Anonymous Complaint Identity (Separated)
INSERT INTO complaint_private_data (id, complaint_id, complainant_id, complainant_role, contact_phone)
VALUES
('cpd-001', 'cmp-002', '11111111-1111-1111-1111-111111111111', 'student', '+91 98765 43210')
ON CONFLICT (complaint_id) DO NOTHING;

-- 10. Seed Student Votes on Facility Issues
INSERT INTO complaint_votes (id, complaint_id, student_id)
VALUES
('vote-001', 'cmp-001', '11111111-1111-1111-1111-111111111111')
ON CONFLICT (complaint_id, student_id) DO NOTHING;

-- 11. Seed Career Explorer Hierarchy (Engineering, Medical, Science, Law, Agriculture)
INSERT INTO career_domains (id, sector, sector_ta, degree_course, degree_course_ta, branch, branch_ta, domain_name, domain_name_ta, description, description_ta, eligibility, duration, entrance_exams, required_skills, career_paths, scholarships, approx_cost, official_links, demand_rank, demand_tag, demand_source)
VALUES
-- CSE Domains
('cd-001', 'Engineering & Technology', 'பொறியியல் & தொழில்நுட்பம்', 'B.E. / B.Tech', 'பி.இ. / பி.டெக்', 'Computer Science & Engineering', 'கணினி அறிவியல் & பொறியியல்',
 'Full-Stack Web & Cloud Systems', 'முழு அடுக்கு வலை & மேகக்கணி அமைப்புகள்',
 'Design and develop scalable cloud-native web architectures, microservices, and interactive modern user experiences.',
 'அளவிடக்கூடிய மேகக்கணி வலை கட்டமைப்புகள், மைக்ரோசர்வீஸ்கள் மற்றும் நவீன பயனர் இடைமுகங்களை உருவாக்குதல்.',
 'Class 12 with Physics, Chemistry & Mathematics (Minimum 60% aggregate)', '4 Years',
 ARRAY['TNEA (Tamil Nadu)', 'JEE Main', 'BITSAT'],
 ARRAY['TypeScript', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs'],
 ARRAY['Full-Stack Engineer', 'Frontend Architect', 'Cloud Backend Developer', 'SaaS Solutions Engineer'],
 ARRAY['TN Moovalur Ramamirtham Ammaiyar Scheme (7.5% Quota)', 'National Merit Scholarship', 'AICTE Pragati'],
 'Govt: ₹15,000/yr | Aided: ₹45,000/yr',
 ARRAY['https://www.tneaonline.org', 'https://aicte-india.org'],
 1, 'Top Demand', 'TN Higher Education Survey 2026'),

('cd-002', 'Engineering & Technology', 'பொறியியல் & தொழில்நுட்பம்', 'B.E. / B.Tech', 'பி.இ. / பி.டெக்', 'Computer Science & Engineering', 'கணினி அறிவியல் & பொறியியல்',
 'Artificial Intelligence & Machine Learning', 'செயற்கை நுண்ணறிவு & இயந்திர கற்றல்',
 'Build intelligent automation systems, deep neural networks, computer vision, and generative AI agents for industry applications.',
 'தொழில்துறை தேவைகளுக்கான அறிவார்ந்த தானியங்கி அமைப்புகள் மற்றும் ஆழமான கற்றல் மாதிரிகளை உருவாக்குதல்.',
 'Class 12 with Physics, Chemistry & Mathematics (PCM)', '4 Years',
 ARRAY['TNEA', 'JEE Main', 'JEE Advanced'],
 ARRAY['Python', 'PyTorch', 'TensorFlow', 'Linear Algebra', 'MLOps', 'Vector Databases'],
 ARRAY['AI/ML Engineer', 'Data Scientist', 'LLM Application Developer', 'Computer Vision Researcher'],
 ARRAY['PM-Vidyalaxmi Education Loan Support', 'State First-Graduate Free Education'],
 'Govt: ₹15,000/yr | Aided: ₹50,000/yr',
 ARRAY['https://nptel.ac.in/ai', 'https://www.tneaonline.org'],
 2, 'Exponential Growth', 'NASSCOM Talent Matrix 2026'),

('cd-003', 'Engineering & Technology', 'பொறியியல் & தொழில்நுட்பம்', 'B.E. / B.Tech', 'பி.இ. / பி.டெக்', 'Computer Science & Engineering', 'கணினி அறிவியல் & பொறியியல்',
 'Cybersecurity & Digital Forensics', 'சைபர் பாதுகாப்பு & டிஜிட்டல் தடயவியல்',
 'Safeguard critical national cyber infrastructure, perform penetration testing, threat hunting, and cryptographic security auditing.',
 'முக்கியமான டிஜிட்டல் உள்கட்டமைப்புகளைப் பாதுகாத்தல், ஊடுருவல் சோதனை மற்றும் இணைய அச்சுறுத்தல் பகுப்பாய்வு.',
 'Class 12 with PCM', '4 Years',
 ARRAY['TNEA', 'JEE Main'],
 ARRAY['Network Security', 'Cryptography', 'Linux', 'Ethical Hacking', 'SOC Operations'],
 ARRAY['Information Security Analyst', 'SOC Lead', 'Penetration Tester', 'Cloud Security Architect'],
 ARRAY['Cyber Shikshaa Scholarship', 'State 7.5% Govt School Reservation'],
 'Govt: ₹15,000/yr | Aided: ₹45,000/yr',
 ARRAY['https://infosecawareness.in', 'https://cert-in.org.in'],
 3, 'High Demand', 'CERT-In Workforce Report 2026'),

-- Medicine
('cd-004', 'Medical & Healthcare', 'மருத்துவம் & மக்கள் நல்வாழ்வு', 'M.B.B.S.', 'எம்.பி.பி.எஸ்.', 'General Medicine & Surgery', 'பொது மருத்துவம் & அறுவை சிகிச்சை',
 'Primary Healthcare & Clinical Diagnosis', 'முதன்மை சுகாதாரம் & மருத்துவ சிகிச்சை',
 'Provide essential diagnosis, preventive healthcare, surgical intervention, and public health community medicine.',
 'அத்தியாவசிய நோயறிதல், தடுப்பு சுகாதாரம் மற்றும் பொது சுகாதார மருத்துவ சேவைகளை வழங்குதல்.',
 'Class 12 with Physics, Chemistry & Biology (PCB)', '5.5 Years (incl. 1 yr Internship)',
 ARRAY['NEET-UG (National)'],
 ARRAY['Clinical Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Patient Empathy'],
 ARRAY['Medical Officer', 'Civil Assistant Surgeon', 'Postgraduate Specialist (MD/MS)', 'Healthcare Administrator'],
 ARRAY['TN 7.5% Govt School Full Fee Waiver Scheme', 'Post-Matric Scholarship'],
 'Govt: ₹13,610/yr (100% Free under 7.5% Quota)',
 ARRAY['https://tnmedicalselection.net', 'https://nmc.org.in'],
 1, 'Vital Public Service', 'National Health Commission 2026'),

-- Agriculture
('cd-005', 'Agriculture & Life Sciences', 'வேளாண்மை & உயிரியல் அறிவியல்', 'B.Sc. (Hons.) Agriculture', 'பி.எஸ்.சி. (ஹானர்ஸ்) வேளாண்மை', 'Agronomy & Smart Farming', 'உழவியல் & ஸ்மார்ட் விவசாயம்',
 'Precision Agriculture & Agritech Analytics', 'துல்லிய வேளாண்மை & வேளாண்-தொழில்நுட்பம்',
 'Deploy drone crop monitoring, IoT soil sensors, sustainable bio-fertilizers, and high-yield climate resilient crop science.',
 'ட்ரோன் பயிர் கண்காணிப்பு, மண் உணரி தொழில்நுட்பம் மற்றும் நிலையான இயற்கை விவசாய முறைகளை மேம்படுத்துதல்.',
 'Class 12 with Biology, Physics & Chemistry or Vocational Agriculture', '4 Years',
 ARRAY['TNAU Admission Entrance / Merit'],
 ARRAY['Soil Science', 'GIS Mapping', 'Drone Piloting', 'Organic Agronomy', 'Agri Supply Chain'],
 ARRAY['Agricultural Officer (AO)', 'Seed Tech Specialist', 'Agritech Entrepreneur', 'Farm Operations Lead'],
 ARRAY['TNAU Meritorious Rural Student Grant', 'NABARD Fellowship'],
 'Govt: ₹18,000/yr',
 ARRAY['https://tnau.ac.in', 'https://agricoop.gov.in'],
 2, 'Steady Growth', 'Tamil Nadu Agri Council 2026')
ON CONFLICT (id) DO NOTHING;

-- 12. Seed Staff Tasks (including Fortnightly Digital Teaching Evidence)
INSERT INTO staff_tasks (id, school_id, assigned_to, title, title_ta, description, due_date, task_type, status, evidence_url, evidence_notes, credits_awarded)
VALUES
('task-001', 'a11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222',
 'Fortnightly Digital Teaching Evidence: Class 11 CS Interactive Python Lab',
 'இருவார டிஜிட்டல் கற்பித்தல் சான்று: 11 ஆம் வகுப்பு கணினி அறிவியல் பைதான் பயிற்சி',
 'Upload digital screen recording and student attendance log demonstrating data visualization in Python.',
 CURRENT_DATE - INTERVAL '3 days', 'digital_teaching', 'approved',
 'https://learnova-evidence.storage.supabase.co/teaching/cs11_python_lab_evidence.mp4',
 'Conducted interactive coding lab using DIKSHA smart board modules. 42 of 44 students completed hands-on exercises.', 15),
('task-002', 'a11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222',
 'Monthly Student Innovation Club Project Review',
 'மாதாந்திர மாணவர் கண்டுபிடிப்பு மன்றத் திட்ட மதிப்பாய்வு',
 'Guide and record submission of 3 science exhibition robotics prototypes for district level selection.',
 CURRENT_DATE + INTERVAL '5 days', 'activity', 'pending', NULL, NULL, 0)
ON CONFLICT (id) DO NOTHING;

-- 13. Seed College & Company Collaborations (Target: 2 in first 6 months)
INSERT INTO college_collaborations (id, school_id, partner_name, partner_type, focus_area, start_date, end_date, student_beneficiaries, status)
VALUES
('col-001', 'a11111111-1111-1111-1111-111111111111', 'Government College of Engineering, Salem', 'college', 'Robotics, IoT and Electronics Hands-on Mentorship', '2026-06-15', '2026-11-30', 120, 'active'),
('col-002', 'a11111111-1111-1111-1111-111111111111', 'Zoho Schools of Learning & Titan Corp', 'company', 'Full-Stack Web Development & Career Apprenticeship Bootcamp', '2026-07-01', '2026-12-15', 85, 'active')
ON CONFLICT (id) DO NOTHING;

-- 14. Seed Doctor Visits & Health Screening Records
INSERT INTO doctor_visits (id, school_id, doctor_id, scheduled_date, completed_date, status, total_screened, notes)
VALUES
('dv-001', 'a11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', CURRENT_DATE - INTERVAL '4 days', CURRENT_DATE - INTERVAL '4 days', 'completed', 85, 'Screened Class 11 and 12 students. Overall nutrition and vision indices satisfactory.'),
('dv-002', 'a11111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', CURRENT_DATE + INTERVAL '18 days', NULL, 'scheduled', 0, 'Upcoming visit for Grades 9 and 10 adolescent dental and hemoglobin screening.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO demo_health_records (id, visit_id, school_id, student_id, student_name, grade, height_cm, weight_kg, vision_status, dental_status, general_health, follow_up_needed, follow_up_reason, mock_sms_sent, mock_sms_status, mock_sms_phone)
VALUES
('hr-001', 'dv-001', 'a11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Priya Ramanathan', '11-A', 158.5, 49.2, 'Normal (6/6)', 'Good', 'Fit & Healthy', FALSE, NULL, TRUE, 'delivered_simulated', '+91 98765 43210'),
('hr-002', 'dv-001', 'a11111111-1111-1111-1111-111111111111', NULL, 'M. Vigneshwar', '11-A', 164.0, 52.0, 'Mild Myopia (Right 6/9)', 'Satisfactory', 'Good', TRUE, 'Recommend ophthalmic refraction checkup at Govt Hospital', TRUE, 'delivered_simulated', '+91 98765 43299')
ON CONFLICT (id) DO NOTHING;

-- 15. Seed School Inspections by Education Officer (Target: 2 per year)
INSERT INTO school_inspections (id, school_id, officer_id, scheduled_date, completed_date, status, academic_score, infrastructure_score, hygiene_score, report_summary, photo_evidence, latitude, longitude)
VALUES
('insp-001', 'a11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555',
 CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE - INTERVAL '12 days', 'completed', 9.2, 8.8, 9.0,
 'Term 1 comprehensive inspection completed. Smart classrooms actively utilized. Midday meal quality verified with food safety parameters. Campus greenery well maintained.',
 ARRAY['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400'],
 11.6645, 78.1462),
('insp-002', 'a11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555',
 CURRENT_DATE + INTERVAL '45 days', NULL, 'scheduled', NULL, NULL, NULL,
 'Upcoming Term 2 public examination readiness and science lab stock verification audit.',
 '{}', 11.6643, 78.1460)
ON CONFLICT (id) DO NOTHING;

-- 16. Seed Performance Review (6 months milestone)
INSERT INTO performance_reviews (id, profile_id, reviewer_id, review_period, academic_year, criteria_scores, total_credits, feedback, status)
VALUES
('pr-001', '22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'first_6_months', '2026-2027',
 '{"digital_teaching": 28, "student_activity": 22, "innovative_pedagogy": 20, "timely_evaluations": 18}'::jsonb,
 88, 'Exemplary dedication to digital pedagogy and practical lab demonstrations. Students demonstrated significant improvement in logic tests.', 'approved')
ON CONFLICT (id) DO NOTHING;
