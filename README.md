# Learnova — Bilingual Education Governance Platform

> **Tagline:** Learn today. Lead tomorrow. | **இன்று கற்போம். நாளை வழிநடத்துவோம்.**

Learnova is a full-stack, bilingual (English & தமிழ்) education governance web application built for transparent school administration, student opportunities, grievance redressal, and accountability across Tamil Nadu model schools.

---

## 🌟 Core Pillars & Implemented Roles

1. **Student Portal**
   - Personal Academic Portfolio (Grade, section, GPA, attendance verified records, achievements).
   - **One-Student-One-Vote** Facility Issue Polling enforced at the service & database level.
   - Private Grievance Filing with **anonymous identity separation** (concealed from Headmaster & school staff).
   - Integrated **Career Explorer** featuring hierarchical course pathways.

2. **Teacher & Staff Dashboard**
   - Task calendar, deadlines, and milestone completion.
   - **Fortnightly Digital Teaching Evidence** upload (screen recordings & smart board pedagogy).
   - Annual Performance Credits tracker (Term 1 & Term 2 milestones).
   - School event publisher and verified student activity logging.

3. **Headmaster Dashboard**
   - School-wide grant allocations, expenditure tracking, and real-time remaining balance.
   - Infrastructure fund request creation with purpose, amount, and urgency.
   - **Anonymous Grievance Queue** (complaint review strictly isolated from complainant personal identity).
   - Staff teaching evidence review & credit assessment.
   - **College & Company Collaboration Tracker** (achieved target of 2 active partnerships in first 6 months).

4. **School Health & Medical Officer Portal**
   - Assigned schools calendar & monthly on-site checkup schedules.
   - Fictional student health screening records (height, weight, vision index, dental condition, general health).
   - Specialist referral follow-up flags.
   - **Simulated Parent Notification SMS** workflow (mock delivery status; zero telecommunication carrier charges).

5. **District Education Officer (DEO) Dashboard**
   - Region-wide model school directory.
   - Escalated complaints & overdue grievance inquiry queue.
   - **Geotagged School Inspection Audits** (academic, infrastructure, and midday meal hygiene scoring with GPS coordinates and photo evidence).
   - Review and sanctioning of school grant fund requests.

6. **Hierarchical Career Explorer**
   - **Sector → Degree/Course → Branch → Career Domain** (e.g. Engineering → B.E./B.Tech → CSE → Full-Stack / AI / Cyber / Cloud).
   - Domain detail modals: required skills, course duration, entrance examinations (TNEA, JEE, NEET), scholarships (Moovalur Ramamirtham 7.5% quota), and demand trend benchmarks with dated sources.

7. **Public Financial Transparency Portal**
   - Sanctioned grants vs verified expenditures with Recharts visual charts.
   - Itemized voucher ledger with payee vendor names and invoice references.

---

## 🛠️ Mandatory Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, React Router v7, TanStack Query, Lucide React, Recharts, Leaflet, i18next & react-i18next.
- **Backend:** Python 3.11+, FastAPI, Pydantic v2, PyJWT, Cryptography, Uvicorn.
- **Database & Storage:** Supabase Auth & PostgreSQL migrations, private file vault isolation.
- **Testing:** Pytest & pytest-asyncio (Backend), Vitest & JSDOM (Frontend).

---

## 🚀 Windows PowerShell Quickstart Guide

### 1. Backend Setup & Startup

From the project root:

```powershell
# 1. Activate virtual environment (or use direct path)
.\.venv\Scripts\python.exe -m pip install -r requirements.txt

# 2. Run backend test suite (Verifies health, auth, voting uniqueness, roles)
.\.venv\Scripts\python.exe -m pytest backend/tests

# 3. Start FastAPI REST backend server (Runs on port 8000)
.\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --reload --port 8000
```

- API Base URL: `http://localhost:8000/api/v1`
- Interactive OpenAPI Swagger UI: `http://localhost:8000/api/v1/docs`

---

### 2. Frontend Setup & Startup

In a second PowerShell window:

```powershell
# 1. Navigate to frontend directory
cd frontend

# 2. Run frontend unit tests (Vitest i18n & role isolation)
npm.cmd run test

# 3. Verify production bundle build
npm.cmd run build

# 4. Start Vite development server
npm.cmd run dev
```

- Web App Client: `http://localhost:5173`

---

## 🔑 Demo Login Accounts

Learnova features an **Instant Role Switcher** and demo authentication adapter for instant evaluation:

| Role | Name | Identifier / Email | Credentials |
| :--- | :--- | :--- | :--- |
| **Student** | Priya Ramanathan | EMIS: `3302010010101` | DOB: `2009-08-15` (Pass: `learnova2026`) |
| **Teacher / Staff** | Anitha Subramanian | `staff.demo@learnova.gov.in` | 1-Click Role Switch |
| **Headmaster** | Dr. K. Meenakshi Sundaram | `hm.demo@learnova.gov.in` | 1-Click Role Switch |
| **Medical Officer** | Dr. S. Vignesh M.B.B.S. | `doctor.demo@learnova.gov.in` | 1-Click Role Switch |
| **Education Officer** | Thiru R. Karunakaran (DEO)| `officer.demo@learnova.gov.in` | 1-Click Role Switch |

---

## 🗄️ Database Migrations

Database migrations and repeatable seed scripts are organized under:
- `backend/migrations/001_initial_schema.sql` (Tables, UUID primary keys, foreign keys, indexes, and constraints)
- `backend/migrations/002_seed_data.sql` (Comprehensive fictional seed data across all 5 roles, schools, announcements, courses, and funds)
- `supabase/migrations/` (Ready for Supabase CLI deployment)

---

## 🧪 Verification & Automated Tests Summary

- **Backend Pytest Suite:** 7 / 7 passed in 0.98s
  - `test_health_check`
  - `test_demo_login_all_roles`
  - `test_student_portfolio`
  - `test_one_vote_per_student_enforced` (Returns 409 Conflict on duplicate vote)
  - `test_role_authorization_isolation` (Returns 403 Forbidden on unauthorized elevation)
  - `test_career_tree_hierarchy`
  - `test_doctor_simulated_sms_flow`
- **Frontend Vitest Suite:** 3 / 3 passed in 11ms
  - Bilingual i18n dictionary parity
  - Dynamic runtime English/Tamil switcher
  - Role isolation contracts
- **TypeScript & Vite Build:** 100% clean production bundle (2,604 modules transformed).
