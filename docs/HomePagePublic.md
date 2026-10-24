# Learnova — Public Homepage Implementation

Build a complete, polished, responsive public homepage for **Learnova**, an education information and student career discovery platform.

## Existing technology
- React + Vite + TypeScript
- Tailwind CSS
- React Router
- FastAPI backend
- Supabase for authentication and PostgreSQL
- Lucide React icons

First inspect the existing repository and reuse its current structure, dependencies, API conventions, and design tokens. Do not overwrite working functionality or create a second application.

## 1. Visual direction
Create a modern EdTech SaaS experience that feels welcoming, trustworthy, student-friendly, and professional.

Use these design tokens:
- Primary teal: #087F72
- Primary hover: #075E54
- Soft teal: #DDF5EF
- Heading: #172B4D
- Light page: #F6F8FB
- Surface: #FFFFFF
- Border: #E2E8F0
- Secondary text: #475569
- Dark page: #111827
- Dark card: #1F2937
- Dark border: #374151
- Dark text: #F9FAFB
- Dark-mode accent: #2DD4BF

Use Inter for English and Noto Sans Tamil with Nirmala UI fallback for Tamil. Use consistent spacing, rounded cards, subtle borders, clear visual hierarchy, and restrained shadows. Avoid excessive gradients, excessive animation, and clutter.

## 2. Header
Create a responsive sticky navigation header with:
- Learnova logo and tagline: “Learn today. Lead tomorrow.”
- Home
- Education Updates
- School Progress
- Career Explorer
- Language toggle: English / தமிழ்
- Light/dark mode toggle
- Login button

On mobile, show a working accessible navigation menu. All links and controls must perform real actions.

## 3. Hero
Headline: “Every student deserves a brighter future.”
Supporting text: “Discover career pathways, explore educational opportunities, and follow the progress of your school community.”

Add:
- Primary CTA: “Explore Careers”
- Secondary CTA: “View Education Updates”
- A relevant, optimized student/education image or locally stored illustration
- Small trust-oriented highlights such as “Career discovery”, “Education updates”, and “School transparency”

Career CTA navigates to the public career explorer. Updates CTA scrolls to or navigates to the updates section.

## 4. Education updates
Create a data-first updates section with cards for:
- Scholarships
- Admissions
- Exams and results
- Government education schemes
- Learning resources

Each real update should display its title, category, publication date, short summary, and official source link. Do not invent government announcements, deadlines, statistics, or official endorsements.

If the backend is not connected, use clearly labeled fictional demo records. Keep the data in a separate typed mock-data file so it can later be replaced by the FastAPI API. Include loading, empty, and error states when fetching live data.

## 5. Career Explorer
Create an engaging career-discovery section with searchable sector cards:
- Engineering and Technology
- Healthcare
- Arts and Humanities
- Commerce and Business
- Science and Research
- Agriculture and Environment

Users should be able to explore a hierarchy of sectors, courses/degrees, branches, and domains. Example: Engineering → Computer Science → Data Analytics, Full-Stack Development, Cybersecurity.

Include search, category filters, useful descriptions, and a clear “Explore careers” action. Do not claim guaranteed employment or salaries.

## 6. School progress and transparency
Create a section for:
- School improvement projects
- Approved funding allocation and spending summaries
- Educational events
- Public facility improvement requests

Use only approved public information or clearly marked demo data. Do not display private student records, individual medical information, confidential complaints, or identifiable complainant details.

## 7. Awareness video
Add a responsive video section for an education awareness video. Support a configured video URL or a graceful placeholder if none is available. Do not autoplay with sound. Provide accessible controls and a caption/description.

## 8. Login entry point
The public header should have a Login action leading to a role-selection/login page for:
- Student
- Staff
- Headmaster
- Doctor
- Education Officer

Do not implement insecure authentication using real EMIS numbers and dates of birth as passwords. Use Supabase authentication or a clearly labeled demo login with fake credentials. Enforce authorization in FastAPI and database policies, not merely by hiding frontend controls.

## 9. Tamil and English
Implement a functional English/Tamil language switch using a translation library such as i18next. Translate all visible homepage text, navigation items, buttons, form labels, empty states, and accessibility labels. Do not leave untranslated hardcoded strings. Use proper Tamil font fallbacks and ensure Tamil text wraps correctly on mobile.

## 10. Theme switch
Implement working light and dark themes. Save the preference locally, initially respect the system preference, and prevent a visible flash of the wrong theme during startup. Check text contrast in both themes.

## 11. Responsive behavior and accessibility
Test widths of 360px, 768px, 1024px, and 1440px.
- No horizontal overflow
- Semantic HTML and correct heading order
- Keyboard-accessible navigation and controls
- Visible focus indicators
- Useful image alt text
- WCAG 2.2 AA contrast targets
- Reduced-motion support
- Accessible form and video controls

## 12. Code quality
Create reusable components for the header, hero, update cards, career cards, school progress cards, video section, footer, theme toggle, and language toggle.

Use typed interfaces, reusable design tokens, and a clean separation between mock data, API services, and UI components. Keep API base URLs in environment variables. Never expose Supabase service-role keys or other secrets in frontend code.

Add suitable component tests, run the build, resolve TypeScript and lint errors, and document how to start the application.

## Acceptance criteria
- The homepage is implemented in the existing application, not just shown as a mockup.
- Every CTA, navigation link, language toggle, and theme toggle works.
- The page looks polished on mobile and desktop.
- Tamil and English content both render correctly.
- Updates and school information never fabricate official facts.
- Demo content is visibly labeled.
- No private student, medical, or complaint data appears publicly.
- Existing routes and backend integrations remain intact.
- Provide a concise summary of files changed, commands run, and any remaining configuration needed.