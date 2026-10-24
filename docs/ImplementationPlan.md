# MASTER IMPLEMENTATION PROMPT — LEARNOVA

## 1. Your role

Act as a senior full-stack engineer, UI/UX designer, database architect and application security engineer. Build a complete, functional, bilingual education governance web application named **Learnova**.

Do not merely provide instructions or sample snippets. Inspect the existing repository, create and edit the actual project files, implement the application, run available tests, fix errors and document any remaining manual setup.

Preserve working code. Before modifying existing files, inspect their contents and understand the existing architecture.

## 2. Project objective

Learnova is a college-project/hackathon prototype that demonstrates how students, school staff, headmasters, doctors and education officers can collaborate through a transparent education platform.

Use fictional seed data. Simulate sensitive integrations and workflows. Do not connect to actual government EMIS databases, real children's medical records, real payroll systems or real parent phone numbers.

All five roles must have usable dashboards and role-specific permissions.

## 3. Mandatory technology stack

- Frontend: React, Vite, TypeScript.
- Styling: Tailwind CSS.
- Routing: React Router.
- Data fetching: TanStack Query.
- Forms: React Hook Form and Zod.
- Icons: Lucide React.
- Charts: Recharts.
- Maps: Leaflet and OpenStreetMap.
- Internationalization: i18next and react-i18next.
- Backend: Python, FastAPI and Pydantic.
- Authentication/database: Supabase Auth and PostgreSQL.
- File storage: private Supabase Storage.
- Testing: Vitest, React Testing Library, pytest and API integration tests.

Use compatible, supported package versions. Generate lockfiles. Keep frontend, backend and database migrations organized separately.

## 4. Architecture

Create a frontend, backend, database migration and test structure.

The React frontend communicates with FastAPI through versioned REST endpoints under /api/v1.

Use Supabase Auth for actual authenticated sessions. FastAPI must validate access tokens and load trusted account status, role, school assignment and region assignment.

Implement role-based authorization through reusable backend dependencies and resource-specific checks.

Never trust a role, school ID, student ID, reviewer ID, verification flag, credit score or financial balance supplied by the frontend.

Keep the Supabase secret/service-role key exclusively on the server. Never expose it through Vite environment variables, browser requests, HTML, source maps or logs.

Support a development-only authentication adapter for fictional EMIS and staff identifiers. Keep it completely separate from production authentication. Never use DOB alone as a real authentication secret. Provide clearly labelled demo login controls and prevent demo authentication from being enabled in production.

## 5. Public homepage

Build a polished public landing page with:

- Learnova branding and tagline.
- Education awareness video section with captions and language support.
- Government education announcements and official-source links.
- Public, approved education and school funding summaries.
- About, contact, accessibility and login navigation.
- Tamil/English language switch.
- Responsive mobile and desktop layouts.
- Loading, empty and error states.

Seed clearly labelled fictional notices. Never present invented notices as real government orders. Official updates must display their source and publication date.

## 6. Five roles and dashboards

### A. Student

Login prototype: fictional EMIS identifier and a demo credential.

Features:
- Personal academic portfolio and achievements.
- Authorized school staff and headmaster directory.
- Approved school funding summaries and expenditure purposes.
- Common facility issue voting.
- Private complaint submission with reference tracking.
- Career Explorer with sector, course/degree, branch and domain hierarchy.
- Education announcements and notifications.

Common complaint categories include classroom projectors, cameras, sports equipment, cleanliness, drinking water and meals.

Enforce one vote per eligible student per issue at the database level. Display real vote totals from PostgreSQL.

Separate anonymous complaint identity from the visible complaint record. Provide a complaint escalation route if the complaint concerns the headmaster.

### B. Staff

Features:
- Own profile and authorized school/student information.
- School fund summaries.
- Complaint submission with document, image, audio and video attachments.
- School and classroom event publishing.
- Student activity recording.
- Digital teaching evidence at least once every two weeks.
- Task calendar, deadlines, completion records and evidence review.
- Own performance credits and review history.

Uploads must use private storage, file type and size validation, authorization and safe file access.

### C. Headmaster

Features:
- School-wide overview and authorized student/staff profiles.
- School funding and allocation summaries.
- Fund requests with purpose, amount and evidence.
- School improvement posts and before/after evidence.
- College/company collaboration tracker.
- Anonymous complaint review without complainant identity.
- Staff task review and school performance summaries.

Configure two college/company collaboration activities during the first six months of the academic year as the proposed demo target.

The HM must not gain access to complainant identity merely because they administer the school.

### D. Doctor

Features:
- Assigned school list and monthly visit calendar.
- Simulated visit completion.
- Fictional health-screening records.
- Follow-up status and restricted record access.
- Mock parent SMS notification workflow.

Use only fictional medical records. The notification system must use a mock provider that records simulated delivery status. Do not send real SMS messages.

### E. Education officer

Features:
- Region-wise assigned school directory.
- Complaint tracking, escalation and overdue cases.
- Inspection scheduling and completion reports.
- Photo evidence with optional browser geolocation.
- Verification of complaint resolutions.
- Fund request review.
- Officer task and performance credit dashboard.

Configure at least two inspections per school per academic year as a proposed demonstration target. Store evidence verification status and audit history.

Do not treat GPS metadata as conclusive proof of authenticity.

## 7. Career Explorer

Create a searchable hierarchical career database:

Sector → Course/Degree → Branch → Career Domain.

Seed examples from medical, engineering, arts and science, agriculture, law, design, education and vocational fields.

Examples of CSE domains:
- Full-stack development.
- Data analytics.
- Cybersecurity.
- Artificial intelligence and machine learning.
- Cloud and DevOps.

Every detail page should support eligibility, duration, relevant entrance examinations, required skills, possible career paths, scholarships, approximate costs and official links.

Demand rankings must be labelled with a date, region and credible source. Do not hardcode rankings as permanently accurate.

## 8. Funds and financial transparency

Implement school allocations, receipts, expenditures, purposes, supporting documents, remaining balances and review status.

Separate overall government education expenditure from individual school grants.

Calculate financial summaries from validated records. Do not accept balances directly from the frontend.

Restrict allocation creation, financial transactions, reviews and approvals to authorized roles. Maintain immutable or append-only audit records for sensitive financial changes.

Seed plausible but fictional amounts and prominently label the data as a demonstration.

## 9. Performance credit system

Implement configurable role-specific review criteria and two review periods:

- First six months: activities, tasks, collaborations or inspections, depending on the role.
- Next six months: public examination outcomes where relevant, improvement measures, verified results and role-specific responsibilities.

Use fictional scores. Require evidence and authorized review before awarding credits.

Include review history, feedback, disputes and appeals.

Never automatically change real salaries or payroll. Do not equate a raw pass percentage with individual teacher quality. Treat scores as prototype performance assessments subject to contextual factors and human review.

## 10. Database

Create incremental SQL migrations for:

- schools
- profiles
- student_records
- staff_records
- announcements
- fund_allocations
- fund_transactions
- complaints
- complaint_private_data
- complaint_votes
- evidence
- courses
- school_events
- staff_tasks
- performance_reviews
- school_inspections
- demo_health_records
- audit_logs

Use UUID primary keys, foreign keys, constraints, unique indexes, timestamps and useful query indexes.

Link profiles to Supabase Auth identities. Assign roles through trusted provisioning; never permit a user to change their own role.

Enable RLS on all exposed application tables. Explicitly manage grants as well as policies.

Design and test separate policies for anonymous visitors, students, staff, headmasters, doctors and education officers.

Protect private complaint identities, health records, audit logs, fund approvals and reviewer-only fields.

Do not grant unrestricted write access to browser roles. Provide migrations that can be reapplied reliably and a repeatable fictional seed-data script.

## 11. API contract

Implement typed and documented FastAPI endpoints under /api/v1, including:

- GET /health
- GET /me
- GET /dashboard
- GET /announcements
- GET /schools
- GET /schools/{id}/staff
- GET /students/me/portfolio
- GET /schools/{id}/funds
- POST /funds/requests
- POST /funds/allocations
- POST /funds/transactions
- GET /complaints
- POST /complaints
- POST /complaints/{id}/votes
- PATCH /complaints/{id}/status
- POST /complaints/{id}/assign
- POST /uploads/presign
- POST /uploads/{id}/verify
- GET /courses/tree
- GET /tasks
- POST /tasks
- POST /tasks/{id}/submit
- POST /tasks/{id}/review
- GET /performance/me
- GET /inspections
- POST /inspections
- POST /inspections/{id}/complete
- GET /doctor/visits
- POST /doctor/health-records
- POST /doctor/notifications/mock-send
- GET /audit-logs

Add any required schemas or endpoints without breaking these contracts.

Use appropriate HTTP status codes, consistent error responses, input validation, pagination, filters, logging and API documentation.

Implement database operations through a service/repository layer. Use transactions for multi-step operations that must remain consistent.

## 12. Security requirements

- Verify access tokens cryptographically or through a trusted Supabase Auth verification method.
- Reject expired or invalid tokens.
- Enforce role, school, region and record-level permissions on the server.
- Never expose privileged database credentials.
- Restrict private file access using authorization and short-lived signed URLs.
- Validate upload content types, sizes and filenames.
- Prevent duplicate votes with database constraints.
- Prevent users from self-assigning roles, reviewers, credits or evidence verification.
- Separate anonymous complainant identity from ordinary complaint access.
- Prevent unauthorized doctors from accessing records outside their assignments.
- Restrict audit logs to authorized reviewers.
- Avoid logging tokens, passwords, complaint identities or medical details.
- Apply rate limiting to authentication and sensitive endpoints.
- Use environment-specific configuration, safe CORS rules and clear error messages.
- Include tests proving that unauthorized actions fail.

Do not implement fake authentication as a shortcut in normal operation.

## 13. Bilingual UI

Create complete English and Tamil translation files.

Use translation keys for all navigation, headings, buttons, forms, validation errors, empty states, statuses, charts and notifications.

The language switch must update the whole interface without requiring a page reload.

Persist the user's preference appropriately and support Tamil Unicode correctly.

Preserve the original language of official documents where a verified translation is unavailable.

## 14. UI and UX requirements

Create a polished, unique, student-friendly design with:
- A warm, accessible education-focused visual identity.
- Consistent typography, spacing, buttons and cards.
- Responsive sidebars and navigation.
- Role-specific dashboard layouts.
- Searchable and filterable tables.
- Useful data visualizations.
- Clear status indicators and progress timelines.
- Accessible form controls and confirmation dialogs.
- Loading skeletons, empty states, error handling and success messages.
- Responsive mobile, tablet and desktop layouts.

Avoid excessive gradients, distracting animation, fake data presented as live data and oversized decorative components.

Do not use one generic dashboard for every role.

## 15. Testing

Create automated frontend and backend tests.

Test:
- Application startup and health endpoints.
- Authentication success and failure.
- Role and school isolation.
- Student portfolio ownership.
- Anonymous complaint identity protection.
- Duplicate vote prevention.
- Invalid and unauthorized file uploads.
- Fund transaction validation.
- Course hierarchy queries.
- Task completion and credit approval.
- Doctor record access.
- Inspection completion and evidence verification.
- Tamil/English switching.
- Empty, loading and error states.

Include both successful requests and deliberate unauthorized requests.

Use fictional test identities. Tests must not require real phone numbers, real student data or external SMS delivery.

## 16. Project execution workflow

Work in this order:

Phase 1: Inspect the repository, establish the project structure, dependencies, configuration and public homepage.

Phase 2: Implement database migrations, fictional seed data, Supabase Auth integration, FastAPI authentication and role permissions.

Phase 3: Implement the student dashboard and complete complaint/voting workflow.

Phase 4: Implement funds, announcements and career exploration.

Phase 5: Implement staff and headmaster dashboards, tasks, events and evidence workflows.

Phase 6: Implement doctor and education officer dashboards using simulated integrations.

Phase 7: Implement performance reviews, credit calculations and audit logging.

Phase 8: Complete responsive design, accessibility, automated testing and demo documentation.

At the end of each phase:
1. Run the relevant tests and type checks.
2. Fix failures before proceeding.
3. Verify frontend-to-backend integration.
4. Update the README and phase checklist.
5. Report completed features, test results, environment setup required and remaining work.

Do not claim a test passed unless you actually ran it. If Supabase credentials are unavailable, implement the integration and clearly document what requires manual configuration.

## 17. Required deliverables

Produce:
- A complete working frontend.
- A complete FastAPI backend.
- SQL migrations and fictional seed data.
- Supabase authentication integration.
- Tested role-based access controls.
- English and Tamil translation files.
- API documentation.
- Automated tests.
- `.env.example` files without secrets.
- A complete README with Windows PowerShell setup instructions.
- Clearly labelled demo accounts for all five roles.
- Instructions for starting both servers.
- A database reset and seed-data procedure.
- A final checklist of implemented, tested and pending features.

Start by inspecting the existing repository. Then implement Phase 1 in the actual codebase. Do not stop after producing a plan or a static UI. Continue through the phases systematically, verifying each one and fixing errors before declaring completion.
