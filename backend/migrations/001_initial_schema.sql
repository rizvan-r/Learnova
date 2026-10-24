-- LEARNOVA: Education Governance Database Schema
-- Migration: 001_initial_schema.sql
-- Enables UUID generation and sets up role-based educational governance tables

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Schools table
CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emis_code VARCHAR(32) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    name_ta VARCHAR(255),
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    block VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    school_type VARCHAR(50) DEFAULT 'Government Higher Secondary',
    total_students INTEGER DEFAULT 0,
    total_teachers INTEGER DEFAULT 0,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. User Profiles linked to Auth identities
CREATE TYPE user_role AS ENUM ('student', 'staff', 'headmaster', 'doctor', 'education_officer');

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    full_name_ta VARCHAR(255),
    role user_role NOT NULL,
    school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
    region VARCHAR(100),
    emis_number VARCHAR(32),
    designation VARCHAR(128),
    phone VARCHAR(20),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Student Records
CREATE TABLE IF NOT EXISTS student_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    grade VARCHAR(10) NOT NULL,
    section VARCHAR(5) NOT NULL,
    roll_number VARCHAR(20),
    attendance_percentage NUMERIC(5, 2) DEFAULT 92.5,
    academic_year VARCHAR(20) DEFAULT '2026-2027',
    gpa NUMERIC(3, 1) DEFAULT 8.8,
    achievements JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Staff Records
CREATE TABLE IF NOT EXISTS staff_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    subjects TEXT[] DEFAULT ARRAY['General'],
    qualification VARCHAR(100),
    date_of_joining DATE,
    performance_credits INTEGER DEFAULT 85,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Announcements & Government Notifications
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    title_ta VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    content_ta TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'governance',
    official_link TEXT,
    source VARCHAR(255) DEFAULT 'Department of School Education',
    is_official BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES profiles(id)
);

-- 6. Fund Allocations
CREATE TABLE IF NOT EXISTS fund_allocations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    financial_year VARCHAR(20) NOT NULL,
    grant_type VARCHAR(100) NOT NULL,
    grant_type_ta VARCHAR(100),
    sanctioned_amount NUMERIC(14, 2) NOT NULL,
    released_amount NUMERIC(14, 2) NOT NULL,
    remaining_balance NUMERIC(14, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'approved',
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Fund Transactions (Receipts & Expenditures)
CREATE TABLE IF NOT EXISTS fund_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    allocation_id UUID REFERENCES fund_allocations(id) ON DELETE SET NULL,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('receipt', 'expenditure')),
    amount NUMERIC(14, 2) NOT NULL,
    purpose TEXT NOT NULL,
    purpose_ta TEXT,
    vendor_name VARCHAR(255),
    invoice_ref VARCHAR(100),
    invoice_url TEXT,
    status VARCHAR(50) DEFAULT 'verified',
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Fund Requests (Submitted by HM, reviewed by Education Officer)
CREATE TABLE IF NOT EXISTS fund_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES profiles(id),
    title VARCHAR(255) NOT NULL,
    purpose TEXT NOT NULL,
    estimated_amount NUMERIC(14, 2) NOT NULL,
    urgency VARCHAR(20) DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    officer_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- 9. Complaints / Grievance Records
CREATE TABLE IF NOT EXISTS complaints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number VARCHAR(64) UNIQUE NOT NULL,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    title_ta VARCHAR(255),
    category VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium',
    status VARCHAR(32) DEFAULT 'submitted' CHECK (status IN ('submitted', 'in_review', 'action_taken', 'resolved', 'escalated')),
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_common_issue BOOLEAN DEFAULT FALSE,
    is_escalated_to_officer BOOLEAN DEFAULT FALSE,
    escalation_reason TEXT,
    assigned_to UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Private Complaint Identity (Completely separate table so HM or public never sees anonymous complainant)
CREATE TABLE IF NOT EXISTS complaint_private_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID UNIQUE NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    complainant_id UUID NOT NULL REFERENCES profiles(id),
    complainant_role user_role NOT NULL,
    contact_phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Student Issue Voting (Strictly one vote per eligible student)
CREATE TABLE IF NOT EXISTS complaint_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_student_vote UNIQUE(complaint_id, student_id)
);

-- 12. Complaint Resolution Evidence
CREATE TABLE IF NOT EXISTS complaint_resolutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    complaint_id UUID NOT NULL REFERENCES complaints(id) ON DELETE CASCADE,
    verified_by UUID NOT NULL REFERENCES profiles(id),
    action_notes TEXT NOT NULL,
    evidence_image_url TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    verified_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Career Explorer Hierarchy: Sector -> Course/Degree -> Branch -> Domain
CREATE TABLE IF NOT EXISTS career_domains (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sector VARCHAR(100) NOT NULL,
    sector_ta VARCHAR(100),
    degree_course VARCHAR(150) NOT NULL,
    degree_course_ta VARCHAR(150),
    branch VARCHAR(150) NOT NULL,
    branch_ta VARCHAR(150),
    domain_name VARCHAR(150) NOT NULL,
    domain_name_ta VARCHAR(150),
    description TEXT,
    description_ta TEXT,
    eligibility TEXT,
    duration VARCHAR(50),
    entrance_exams TEXT[] DEFAULT '{}',
    required_skills TEXT[] DEFAULT '{}',
    career_paths TEXT[] DEFAULT '{}',
    scholarships TEXT[] DEFAULT '{}',
    approx_cost VARCHAR(100),
    official_links TEXT[] DEFAULT '{}',
    demand_rank INTEGER DEFAULT 1,
    demand_tag VARCHAR(50) DEFAULT 'High Demand',
    demand_source VARCHAR(100) DEFAULT 'TN Higher Education Council 2026',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. School & Classroom Events
CREATE TABLE IF NOT EXISTS school_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    created_by UUID NOT NULL REFERENCES profiles(id),
    title VARCHAR(255) NOT NULL,
    title_ta VARCHAR(255),
    description TEXT,
    event_date DATE NOT NULL,
    event_type VARCHAR(50) DEFAULT 'science_exhibition',
    participant_count INTEGER DEFAULT 0,
    photo_urls TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Staff Tasks & Fortnightly Digital Teaching Evidence
CREATE TABLE IF NOT EXISTS staff_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    assigned_to UUID NOT NULL REFERENCES profiles(id),
    title VARCHAR(255) NOT NULL,
    title_ta VARCHAR(255),
    description TEXT,
    due_date DATE NOT NULL,
    task_type VARCHAR(50) DEFAULT 'digital_teaching',
    status VARCHAR(32) DEFAULT 'pending' CHECK (status IN ('pending', 'submitted', 'reviewed', 'approved')),
    evidence_url TEXT,
    evidence_notes TEXT,
    reviewed_by UUID REFERENCES profiles(id),
    review_feedback TEXT,
    credits_awarded INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    reviewed_at TIMESTAMPTZ
);

-- 16. College & Company Collaborations (Target: 2 in first 6 months)
CREATE TABLE IF NOT EXISTS college_collaborations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    partner_name VARCHAR(255) NOT NULL,
    partner_type VARCHAR(50) DEFAULT 'college' CHECK (partner_type IN ('college', 'company', 'ngo')),
    focus_area VARCHAR(150) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    student_beneficiaries INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Doctor Visits & Schedules
CREATE TABLE IF NOT EXISTS doctor_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES profiles(id),
    scheduled_date DATE NOT NULL,
    completed_date DATE,
    status VARCHAR(32) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
    total_screened INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Demo Health Screening Records (Simulated, Fictional)
CREATE TABLE IF NOT EXISTS demo_health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    visit_id UUID REFERENCES doctor_visits(id) ON DELETE CASCADE,
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    student_name VARCHAR(255) NOT NULL,
    grade VARCHAR(10) NOT NULL,
    height_cm NUMERIC(5, 1),
    weight_kg NUMERIC(5, 1),
    vision_status VARCHAR(50) DEFAULT 'Normal (6/6)',
    dental_status VARCHAR(50) DEFAULT 'Satisfactory',
    general_health VARCHAR(50) DEFAULT 'Good',
    follow_up_needed BOOLEAN DEFAULT FALSE,
    follow_up_reason TEXT,
    mock_sms_sent BOOLEAN DEFAULT FALSE,
    mock_sms_status VARCHAR(50) DEFAULT 'delivered_mock',
    mock_sms_phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 19. School Inspections by Education Officers (Target: 2 per school/year)
CREATE TABLE IF NOT EXISTS school_inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
    officer_id UUID NOT NULL REFERENCES profiles(id),
    scheduled_date DATE NOT NULL,
    completed_date DATE,
    status VARCHAR(32) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed')),
    academic_score NUMERIC(4, 1),
    infrastructure_score NUMERIC(4, 1),
    hygiene_score NUMERIC(4, 1),
    report_summary TEXT,
    photo_evidence TEXT[] DEFAULT '{}',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. Performance Reviews (6 months milestone review system)
CREATE TABLE IF NOT EXISTS performance_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES profiles(id),
    review_period VARCHAR(32) NOT NULL CHECK (review_period IN ('first_6_months', 'next_6_months')),
    academic_year VARCHAR(20) DEFAULT '2026-2027',
    criteria_scores JSONB DEFAULT '{}'::jsonb,
    total_credits INTEGER DEFAULT 80,
    feedback TEXT,
    status VARCHAR(32) DEFAULT 'approved' CHECK (status IN ('draft', 'approved', 'appealed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. Immutable Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    details JSONB DEFAULT '{}'::jsonb,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_school ON profiles(school_id);
CREATE INDEX IF NOT EXISTS idx_complaints_school ON complaints(school_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_funds_school ON fund_allocations(school_id);
CREATE INDEX IF NOT EXISTS idx_transactions_school ON fund_transactions(school_id);
CREATE INDEX IF NOT EXISTS idx_career_sector ON career_domains(sector);
