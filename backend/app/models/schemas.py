from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime, date
from enum import Enum


class UserRole(str, Enum):
    STUDENT = "student"
    STAFF = "staff"
    HEADMASTER = "headmaster"
    DOCTOR = "doctor"
    EDUCATION_OFFICER = "education_officer"


class ProfileBase(BaseModel):
    id: str
    email: str
    full_name: str
    full_name_ta: Optional[str] = None
    role: UserRole
    school_id: Optional[str] = None
    region: Optional[str] = None
    emis_number: Optional[str] = None
    designation: Optional[str] = None
    phone: Optional[str] = None
    avatar_url: Optional[str] = None


class DemoLoginRequest(BaseModel):
    role: UserRole


class EmisLoginRequest(BaseModel):
    emis_number: str
    date_of_birth: str  # Format: YYYY-MM-DD
    demo_passcode: Optional[str] = "learnova2026"


class AuthTokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: ProfileBase


class SchoolBase(BaseModel):
    id: str
    emis_code: str
    name: str
    name_ta: Optional[str] = None
    address: str
    district: str
    block: str
    pincode: str
    school_type: str
    total_students: int
    total_teachers: int
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class AnnouncementBase(BaseModel):
    id: str
    title: str
    title_ta: str
    content: str
    content_ta: str
    category: str
    official_link: Optional[str] = None
    source: str
    is_official: bool = True
    published_at: datetime


class StudentPortfolio(BaseModel):
    profile: ProfileBase
    school: SchoolBase
    grade: str
    section: str
    roll_number: str
    attendance_percentage: float
    academic_year: str
    gpa: float
    achievements: List[Dict[str, Any]] = []


class FundAllocation(BaseModel):
    id: str
    school_id: str
    financial_year: str
    grant_type: str
    grant_type_ta: Optional[str] = None
    sanctioned_amount: float
    released_amount: float
    remaining_balance: float
    status: str
    remarks: Optional[str] = None


class FundTransaction(BaseModel):
    id: str
    allocation_id: Optional[str] = None
    school_id: str
    transaction_type: str  # receipt, expenditure
    amount: float
    purpose: str
    purpose_ta: Optional[str] = None
    vendor_name: Optional[str] = None
    invoice_ref: Optional[str] = None
    status: str
    created_at: datetime


class FundRequestCreate(BaseModel):
    title: str
    purpose: str
    estimated_amount: float
    urgency: str = "medium"


class FundRequestResponse(BaseModel):
    id: str
    school_id: str
    requested_by: str
    title: str
    purpose: str
    estimated_amount: float
    urgency: str
    status: str
    officer_notes: Optional[str] = None
    created_at: datetime
    reviewed_at: Optional[datetime] = None


class ComplaintCreate(BaseModel):
    title: str
    category: str
    description: str
    priority: str = "medium"
    is_anonymous: bool = False
    is_common_issue: bool = False


class ComplaintResponse(BaseModel):
    id: str
    reference_number: str
    school_id: str
    title: str
    title_ta: Optional[str] = None
    category: str
    description: str
    priority: str
    status: str
    is_anonymous: bool
    is_common_issue: bool
    is_escalated_to_officer: bool
    escalation_reason: Optional[str] = None
    assigned_to: Optional[str] = None
    vote_count: int = 0
    has_voted: bool = False
    created_at: datetime
    # Note: complainant identity is omitted if is_anonymous=True or viewer is HM


class ComplaintVoteResponse(BaseModel):
    complaint_id: str
    vote_count: int
    message: str


class CareerDomain(BaseModel):
    id: str
    sector: str
    sector_ta: Optional[str] = None
    degree_course: str
    degree_course_ta: Optional[str] = None
    branch: str
    branch_ta: Optional[str] = None
    domain_name: str
    domain_name_ta: Optional[str] = None
    description: Optional[str] = None
    description_ta: Optional[str] = None
    eligibility: Optional[str] = None
    duration: Optional[str] = None
    entrance_exams: List[str] = []
    required_skills: List[str] = []
    career_paths: List[str] = []
    scholarships: List[str] = []
    approx_cost: Optional[str] = None
    official_links: List[str] = []
    demand_rank: int = 1
    demand_tag: str = "High Demand"
    demand_source: str = "TN Higher Education Council 2026"


class StaffTask(BaseModel):
    id: str
    school_id: str
    assigned_to: str
    title: str
    title_ta: Optional[str] = None
    description: Optional[str] = None
    due_date: date
    task_type: str  # digital_teaching, activity, etc.
    status: str  # pending, submitted, reviewed, approved
    evidence_url: Optional[str] = None
    evidence_notes: Optional[str] = None
    reviewed_by: Optional[str] = None
    review_feedback: Optional[str] = None
    credits_awarded: int = 0
    created_at: datetime


class TaskSubmit(BaseModel):
    evidence_url: str
    evidence_notes: str


class TaskReview(BaseModel):
    status: str  # approved, rejected
    review_feedback: str
    credits_awarded: int = 15


class DoctorVisit(BaseModel):
    id: str
    school_id: str
    doctor_id: str
    scheduled_date: date
    completed_date: Optional[date] = None
    status: str
    total_screened: int = 0
    notes: Optional[str] = None


class HealthRecordCreate(BaseModel):
    visit_id: str
    student_id: Optional[str] = None
    student_name: str
    grade: str
    height_cm: float
    weight_kg: float
    vision_status: str = "Normal (6/6)"
    dental_status: str = "Satisfactory"
    general_health: str = "Good"
    follow_up_needed: bool = False
    follow_up_reason: Optional[str] = None
    mock_sms_phone: Optional[str] = None


class HealthRecord(HealthRecordCreate):
    id: str
    school_id: str
    mock_sms_sent: bool = False
    mock_sms_status: str = "pending"
    created_at: datetime


class MockSmsRequest(BaseModel):
    record_id: str
    message: Optional[str] = None


class SchoolInspection(BaseModel):
    id: str
    school_id: str
    officer_id: str
    scheduled_date: date
    completed_date: Optional[date] = None
    status: str
    academic_score: Optional[float] = None
    infrastructure_score: Optional[float] = None
    hygiene_score: Optional[float] = None
    report_summary: Optional[str] = None
    photo_evidence: List[str] = []
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class InspectionComplete(BaseModel):
    academic_score: float
    infrastructure_score: float
    hygiene_score: float
    report_summary: str
    photo_evidence: List[str] = []
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class PerformanceReview(BaseModel):
    id: str
    profile_id: str
    reviewer_id: Optional[str] = None
    review_period: str
    academic_year: str
    criteria_scores: Dict[str, Any] = {}
    total_credits: int
    feedback: Optional[str] = None
    status: str


class AuditLogEntry(BaseModel):
    id: str
    user_id: Optional[str] = None
    action: str
    entity_type: str
    entity_id: Optional[str] = None
    details: Dict[str, Any] = {}
    created_at: datetime
