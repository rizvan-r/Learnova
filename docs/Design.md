# LEARNOVA — COMPLETE UI DESIGN SYSTEM AND IMPLEMENTATION PROMPT

## ROLE

Act as a senior UI/UX designer, design-system engineer and React frontend developer. Implement the complete Learnova frontend in the actual repository. Do not stop after generating a mockup, a static landing page or a written plan.

First inspect the existing codebase and preserve functional features. Then build the design system, reusable components, all five role dashboards and the public website.

## 1. PROJECT IDENTITY

Product name: Learnova.

Tagline: Learn today. Lead tomorrow.

Purpose: A bilingual education governance platform focused on student opportunities, school improvement, education funding transparency, complaints, teaching activities and inspections.

Visual direction: Modern EdTech SaaS.

Design priorities:
- Student-friendly career discovery.
- Clear data visualization.
- Trustworthy funding and complaint interfaces.
- Professional staff and officer dashboards.
- Excellent Tamil and English support.
- Responsive light and dark themes.

Avoid generic admin templates, excessive gradients, glassmorphism everywhere, oversized decorative graphics and unnecessary animation.

## 2. TECHNOLOGY STACK

- React + Vite + TypeScript.
- Tailwind CSS.
- React Router.
- TanStack Query.
- React Hook Form + Zod.
- i18next + react-i18next.
- Lucide React.
- Recharts.
- Supabase JavaScript client.
- Existing FastAPI backend at /api/v1.

Use compatible package versions and maintain the package lockfile. Do not replace the existing backend architecture or create duplicate frontend applications.

## 3. DESIGN TOKENS

Implement centralized CSS variables.

Light mode:
- Brand: #087F72
- Brand hover: #075E54
- Brand soft: #DDF5EF
- Navy/headings: #172B4D
- Page background: #F6F8FB
- Card background: #FFFFFF
- Borders: #E2E8F0
- Secondary text: #475569
- Success: #15803D
- Warning: #B45309
- Danger: #B91C1C
- Information: #1D4ED8

Dark mode:
- Page background: #111827
- Sidebar: #0B1220
- Card surface: #1F2937
- Raised surface: #273449
- Borders: #374151
- Primary text: #F9FAFB
- Secondary text: #CBD5E1
- Brand accent: #2DD4BF
- Success: #4ADE80
- Warning: #FBBF24
- Danger: #F87171
- Information: #60A5FA

Typography:
- English: Inter.
- Tamil: Noto Sans Tamil with Nirmala UI and sans-serif fallbacks.
- Hero heading: 40–48px.
- Dashboard title: 28–32px.
- Section title: 20–24px.
- Card title: 16–18px.
- Body: 14–16px.
- Metadata: 12–13px.

Spacing uses a 4px base scale. Use 12px card radii, 16px feature-card radii, 44–48px interactive control heights and consistent responsive padding.

Use CSS variables for semantic tokens. Do not hardcode independent colors in every component.

## 4. APPLICATION SHELL

Create a reusable AppShell with:
- Expandable desktop sidebar.
- Top navigation bar.
- Page title and breadcrumbs where appropriate.
- Search, notifications and profile menu.
- Language switch.
- Light/dark theme toggle.
- Responsive mobile navigation.
- Main content area with consistent width and spacing.

Sidebar:
- Expanded width: approximately 248px.
- Collapsed width: approximately 76px.
- Active links use brand color and an accessible active indicator.
- Navigation entries depend on the user's role.

Persist the theme preference and initialize it without an incorrect-theme flash. Respect system preferences until the user chooses a theme.

Do not expose navigation items that a role cannot use. Still enforce authorization in the backend.

## 5. REUSABLE COMPONENT LIBRARY

Implement and document reusable components:
- Button and IconButton.
- Input, Textarea, Select and DatePicker.
- Card and StatCard.
- Badge and StatusBadge.
- Avatar and ProfileMenu.
- Modal, Drawer and ConfirmationDialog.
- DataTable with sorting, filtering and pagination.
- SearchBar and FilterBar.
- Tabs, DropdownMenu and Tooltip.
- Breadcrumbs and PageHeader.
- FileUpload with progress and validation.
- Timeline and ActivityFeed.
- ChartCard.
- Skeleton, EmptyState and ErrorState.
- Toast notifications.
- Accessible form error messages.

Every interactive component must have loading, disabled, hover, focus and error states as appropriate.

Use semantic HTML, accessible names, keyboard navigation and visible focus indicators. Do not communicate status through color alone.

## 6. PUBLIC HOMEPAGE

Build a data-first public homepage with:
1. Learnova logo and navigation.
2. Tamil/English switch and theme control.
3. Hero headline and prominent login action.
4. Latest education update summary.
5. Approved education indicators and funding cards.
6. Announcement feed with dates and official source links.
7. Awareness video with captions.
8. School improvement highlights.
9. Career and course exploration cards.
10. Login entry points for all five roles.
11. Footer with privacy, accessibility and source information.

Use real API data where available. Clearly label all fictional sample content. Do not invent government orders or present sample statistics as actual government figures.

The homepage must look complete even when the API is empty or unavailable.

## 7. FIVE ROLE DASHBOARDS

### Student dashboard

Include:
- Welcome panel.
- Academic portfolio and achievements.
- Career recommendations and searchable course explorer.
- Sector → degree/course → branch → domain navigation.
- Facility complaint voting.
- Personal complaint form and status timeline.
- Authorized school staff directory.
- Approved school fund summaries.
- Education announcements and school events.

Make career discovery the most prominent feature. Use clear cards, category filters and domain detail pages.

### Staff dashboard

Include:
- Task summary and deadlines.
- Student activity management.
- Fortnightly digital-teaching activity tracker.
- School/class event publishing.
- Complaint form with private file attachments.
- Task evidence submission and approval status.
- Performance credit history.
- School announcements and fund summaries.

### Headmaster dashboard

Include:
- School overview and permitted student/staff information.
- Allocation, expenditure and remaining-balance visualizations.
- Fund request submission and request history.
- Anonymous complaint queue with no complainant identity.
- Staff task review and evidence approvals.
- College/company collaboration tracker.
- School improvement posts and verified evidence.

### Doctor dashboard

Include:
- Assigned schools.
- Monthly visit schedule.
- Visit completion form.
- Fictional health record management.
- Follow-up status.
- Mock SMS notification status.

Use only fictional health records. Do not connect a real SMS provider or actual medical systems.

### Education officer dashboard

Include:
- Region-level school overview.
- Searchable school directory.
- Complaint escalation and resolution queue.
- Inspection schedule and history.
- Location-tagged evidence review.
- Fund request review.
- Task completion and audit history.

Include evidence review states such as pending, verified and rejected.

## 8. COMPLAINT WORKFLOW

Implement a complete UI workflow:
1. Select complaint category and school/class context.
2. Add a description.
3. Select anonymous or identified submission where supported.
4. Attach permitted evidence.
5. Submit and display a reference number.
6. Show the complaint timeline and current status.
7. Display voting counts for eligible common complaints.
8. Allow authorized reviewers to assign, investigate and resolve.
9. Allow officers to upload resolution evidence and verify completion.

Show only the information appropriate to the current role. Anonymity must be enforced by the backend and database, not merely hidden in the frontend.

## 9. FUND TRANSPARENCY

Build:
- Allocation cards.
- Receipt and expenditure charts.
- Remaining-balance indicators.
- Transaction tables.
- Purpose and evidence detail panels.
- Fund request forms and approval timelines.
- Fiscal-year filters.

Clearly distinguish sanctioned, received, spent and remaining amounts.

Do not calculate authoritative financial balances from arbitrary frontend input. Use validated API responses.

Use fictional demo values until verified real data sources are configured.

## 10. CAREER EXPLORER

Build a student-first course discovery experience:
- Search input.
- Sector category cards.
- Course and degree hierarchy.
- Branch and career-domain lists.
- Domain detail pages.
- Required skills and eligibility.
- Course duration and relevant entrance examinations.
- Scholarship and official resource links.
- Related domains and career paths.

Seed medical, engineering, arts and science, agriculture, law, design, education and vocational examples.

Support engineering branches such as CSE and mechanical engineering, with CSE domains including full-stack development, data analytics, cybersecurity, AI/ML, cloud and DevOps.

Demand rankings must show source, region and update date. Do not claim live demand data without a verified data provider.

## 11. TAMIL AND ENGLISH

Implement complete translation dictionaries in:
- src/i18n/locales/en.json
- src/i18n/locales/ta.json

Use translation keys for all navigation, buttons, headings, forms, validation, status badges, empty states, tables, charts, tooltips and notifications.

Language switching must update the entire interface immediately without reloading the page.

Preserve language preference for authenticated users and provide a local preference for visitors.

Check Tamil font rendering, wrapping, line height and input layout at mobile and desktop widths.

Do not mix hardcoded English labels into otherwise translated screens.

## 12. DARK MODE

Support a global light/dark theme switch.

Use centralized CSS variables for page, surface, raised surface, borders, text, brand, status and chart colors.

Check all components in both themes, including:
- Sidebar and navigation.
- Cards and charts.
- Inputs and dropdowns.
- Tables and pagination.
- Modal and drawer overlays.
- Upload previews.
- Error, empty and success states.
- Tamil text.
- Focus indicators.

Persist the user's selection and prevent a theme flash during initial rendering.

## 13. API AND AUTHENTICATION

Integrate with the existing FastAPI /api/v1 backend.

Create typed API clients and feature-specific hooks. Use TanStack Query for loading, caching, invalidation and error handling.

Implement authenticated route guards and session handling using Supabase Auth.

Handle 401, 403, 404, 409, 422 and server errors gracefully.

The frontend must never trust client-supplied role information to grant access. The backend remains authoritative for every protected operation.

Do not place service-role keys or private secrets in frontend environment variables.

Use fictional demo data only through an explicitly labelled demo environment.

## 14. RESPONSIVE DESIGN

Desktop:
- Persistent sidebar.
- Multi-column dashboard grids.
- Full data tables when space permits.

Tablet:
- Collapsible sidebar.
- Reduced column count.
- Flexible filters and charts.

Mobile:
- Compact navigation.
- Single-column cards.
- Horizontally scrollable tabs when necessary.
- Touch-friendly controls.
- Tables that use responsive row cards or accessible horizontal scrolling.
- Forms that fit small screens.
- No accidental horizontal overflow.

Test at approximately 360px, 768px, 1024px and 1440px widths.

## 15. ACCESSIBILITY AND QUALITY

Target WCAG 2.2 AA where practical.

Include:
- Semantic landmarks.
- Keyboard-accessible controls.
- Visible focus states.
- Appropriate text contrast.
- Screen-reader labels.
- Form error associations.
- Accessible modal focus handling.
- Reduced-motion support.
- Captions for awareness videos.
- Non-color status indicators.

Use realistic loading skeletons, empty states and useful error messages. Avoid dead buttons, decorative controls that appear interactive, and placeholder links that lead nowhere.

## 16. TESTING

Use Vitest and React Testing Library.

Test:
- Component rendering.
- Navigation and route guards.
- Theme switching and persistence.
- Tamil/English switching.
- Form validation.
- Loading and error states.
- Role-specific navigation.
- Complaint form and status display.
- Career hierarchy navigation.
- Fund visualization.
- Responsive component behavior where practical.
- Unauthorized responses from the API.

Run linting, TypeScript checks and tests. Fix errors before marking a feature complete.

## 17. IMPLEMENTATION ORDER

Phase 1: Inspect repository and establish design tokens, fonts, global styles and reusable components.

Phase 2: Build application shell, routing, theme switching and internationalization.

Phase 3: Build the public homepage and login experience.

Phase 4: Build the student dashboard and career explorer.

Phase 5: Build the staff and headmaster dashboards.

Phase 6: Build doctor and education officer dashboards.

Phase 7: Integrate complaints, voting, funds, tasks, uploads and inspection APIs.

Phase 8: Complete responsive behavior, accessibility, loading/error states and automated tests.

Phase 9: Update README with setup instructions, environment variables, test commands and remaining backend configuration.

After each phase, run the relevant checks and fix failures before proceeding.

Do not replace functional backend code with mock APIs. Do not declare features complete until they work end to end or are explicitly documented as blocked by missing configuration.

## FINAL DELIVERABLE

Produce a cohesive, responsive Learnova frontend with a complete design system, five role dashboards, bilingual UI, global light/dark switching, reusable components, data-driven visualizations, API integration and tests.

Begin by inspecting the current repository. Then implement Phase 1 directly in the codebase and continue systematically through the remaining phases.
