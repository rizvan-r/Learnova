const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  full_name_ta?: string
  role: 'student' | 'staff' | 'headmaster' | 'doctor' | 'education_officer'
  school_id?: string
  region?: string
  emis_number?: string
  designation?: string
  phone?: string
  avatar_url?: string
}

export interface Announcement {
  id: string
  title: string
  title_ta: string
  content: string
  content_ta: string
  category: string
  official_link?: string
  source: string
  is_official: boolean
  published_at: string
}

export interface School {
  id: string
  emis_code: string
  name: string
  name_ta?: string
  address: string
  district: string
  block: string
  pincode: string
  school_type: string
  total_students: number
  total_teachers: number
  latitude?: number
  longitude?: number
}

export interface StudentPortfolioData {
  profile: UserProfile
  school: School
  grade: string
  section: string
  roll_number: string
  attendance_percentage: number
  academic_year: string
  gpa: number
  achievements: Array<{ title: string; date: string; badge: string }>
}

export interface Complaint {
  id: string
  reference_number: string
  school_id: string
  title: string
  title_ta?: string
  category: string
  description: string
  priority: string
  status: string
  is_anonymous: boolean
  is_common_issue: boolean
  is_escalated_to_officer: boolean
  escalation_reason?: string
  assigned_to?: string
  vote_count: number
  has_voted: boolean
  created_at: string
}

export interface CareerDomainItem {
  id: string
  sector: string
  sector_ta?: string
  degree_course: string
  degree_course_ta?: string
  branch: string
  branch_ta?: string
  domain_name: string
  domain_name_ta?: string
  description?: string
  description_ta?: string
  eligibility?: string
  duration?: string
  entrance_exams: string[]
  required_skills: string[]
  career_paths: string[]
  scholarships: string[]
  approx_cost?: string
  official_links: string[]
  demand_rank: number
  demand_tag: string
  demand_source: string
}

class ApiClient {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('learnova_token')
    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Request failed with status ${response.status}`)
      }

      return await response.json()
    } catch (err: any) {
      console.warn(`API call ${endpoint} error:`, err.message)
      throw err
    }
  }

  // Auth
  async demoLogin(role: string): Promise<{ access_token: string; user: UserProfile }> {
    return this.request('/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ role }),
    })
  }

  async emisLogin(emis_number: string, date_of_birth: string): Promise<{ access_token: string; user: UserProfile }> {
    return this.request('/auth/emis-login', {
      method: 'POST',
      body: JSON.stringify({ emis_number, date_of_birth }),
    })
  }

  async getMe(): Promise<UserProfile> {
    return this.request('/me')
  }

  // Dashboard
  async getDashboard(): Promise<any> {
    return this.request('/dashboard')
  }

  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    return this.request('/announcements')
  }

  // Schools
  async getSchools(): Promise<School[]> {
    return this.request('/schools')
  }

  async getSchoolStaff(schoolId: string): Promise<UserProfile[]> {
    return this.request(`/schools/${schoolId}/staff`)
  }

  // Students
  async getStudentPortfolio(): Promise<StudentPortfolioData> {
    return this.request('/students/me/portfolio')
  }

  // Complaints & Voting
  async getComplaints(): Promise<Complaint[]> {
    return this.request('/complaints')
  }

  async createComplaint(data: {
    title: string
    category: string
    description: string
    priority?: string
    is_anonymous?: boolean
    is_common_issue?: boolean
  }): Promise<Complaint> {
    return this.request('/complaints', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async voteComplaint(complaintId: string): Promise<{ vote_count: number; message: string }> {
    return this.request(`/complaints/${complaintId}/votes`, {
      method: 'POST',
    })
  }

  async updateComplaintStatus(complaintId: string, status: string, escalation_reason?: string): Promise<Complaint> {
    return this.request(`/complaints/${complaintId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, escalation_reason }),
    })
  }

  // Career Explorer
  async getCareerTree(): Promise<{ sectors: any[] }> {
    return this.request('/courses/tree')
  }

  async getCareerDomains(search?: string): Promise<CareerDomainItem[]> {
    const q = search ? `?search=${encodeURIComponent(search)}` : ''
    return this.request(`/courses${q}`)
  }

  // Funds
  async getSchoolFunds(schoolId: string): Promise<any> {
    return this.request(`/schools/${schoolId}/funds`)
  }

  async getFundRequests(): Promise<any[]> {
    return this.request('/funds/requests')
  }

  async createFundRequest(data: { title: string; purpose: string; estimated_amount: number; urgency?: string }): Promise<any> {
    return this.request('/funds/requests', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async reviewFundRequest(requestId: string, status: string, officer_notes: string): Promise<any> {
    return this.request(`/funds/requests/${requestId}/review`, {
      method: 'PATCH',
      body: JSON.stringify({ status, officer_notes }),
    })
  }

  // Tasks
  async getTasks(): Promise<any[]> {
    return this.request('/tasks')
  }

  async submitTaskEvidence(taskId: string, evidence_url: string, evidence_notes: string): Promise<any> {
    return this.request(`/tasks/${taskId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ evidence_url, evidence_notes }),
    })
  }

  async reviewTask(taskId: string, status: string, review_feedback: string, credits_awarded: number): Promise<any> {
    return this.request(`/tasks/${taskId}/review`, {
      method: 'POST',
      body: JSON.stringify({ status, review_feedback, credits_awarded }),
    })
  }

  // Doctor
  async getDoctorVisits(): Promise<any[]> {
    return this.request('/doctor/visits')
  }

  async completeDoctorVisit(visitId: string, total_screened: number, notes: string): Promise<any> {
    return this.request(`/doctor/visits/${visitId}/complete`, {
      method: 'POST',
      body: JSON.stringify({ total_screened, notes }),
    })
  }

  async getHealthRecords(): Promise<any[]> {
    return this.request('/doctor/health-records')
  }

  async createHealthRecord(data: any): Promise<any> {
    return this.request('/doctor/health-records', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async sendMockSms(recordId: string): Promise<any> {
    return this.request('/doctor/notifications/mock-send', {
      method: 'POST',
      body: JSON.stringify({ record_id: recordId }),
    })
  }

  // Inspections
  async getInspections(): Promise<any[]> {
    return this.request('/inspections')
  }

  async completeInspection(inspectionId: string, data: any): Promise<any> {
    return this.request(`/inspections/${inspectionId}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Performance
  async getMyPerformance(): Promise<any> {
    return this.request('/performance/me')
  }
}

export const api = new ApiClient()
