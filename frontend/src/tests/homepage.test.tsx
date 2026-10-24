import { describe, it, expect } from 'vitest'
import { MOCK_EDUCATION_UPDATES } from '../data/mockEducationUpdates'
import { MOCK_CAREER_SECTORS } from '../data/mockCareerSectors'
import {
  MOCK_SCHOOL_PROJECTS,
  MOCK_FUND_SUMMARY,
  MOCK_EDUCATIONAL_EVENTS,
  MOCK_FACILITY_PROPOSALS,
} from '../data/mockSchoolProgress'
import en from '../i18n/locales/en.json'
import ta from '../i18n/locales/ta.json'

describe('Public Homepage Data Specifications (HomePagePublic.md)', () => {
  it('verifies education updates cover required categories with official source links', () => {
    expect(MOCK_EDUCATION_UPDATES.length).toBeGreaterThanOrEqual(5)

    const categories = new Set(MOCK_EDUCATION_UPDATES.map((u) => u.category))
    expect(categories.has('Scholarships')).toBe(true)
    expect(categories.has('Admissions')).toBe(true)
    expect(categories.has('Exams and results')).toBe(true)
    expect(categories.has('Government education schemes')).toBe(true)
    expect(categories.has('Learning resources')).toBe(true)

    MOCK_EDUCATION_UPDATES.forEach((update) => {
      expect(update.title).toBeTruthy()
      expect(update.title_ta).toBeTruthy()
      expect(update.summary).toBeTruthy()
      expect(update.official_source).toBeTruthy()
      expect(update.official_link.startsWith('http')).toBe(true)
      expect(update.is_demo).toBe(true)
    })
  })

  it('verifies 6 core career sectors with degree, branch, and domain hierarchy', () => {
    expect(MOCK_CAREER_SECTORS.length).toBe(6)

    const expectedSectorIds = [
      'engineering-technology',
      'healthcare',
      'arts-humanities',
      'commerce-business',
      'science-research',
      'agriculture-environment',
    ]

    expectedSectorIds.forEach((id) => {
      const found = MOCK_CAREER_SECTORS.find((s) => s.id === id)
      expect(found).toBeDefined()
      expect(found!.courses.length).toBeGreaterThan(0)

      found!.courses.forEach((course) => {
        expect(course.degreeName).toBeTruthy()
        expect(course.branches.length).toBeGreaterThan(0)
        course.branches.forEach((branch) => {
          expect(branch.branchName).toBeTruthy()
          expect(branch.domains.length).toBeGreaterThan(0)
        })
      })
    })
  })

  it('verifies school progress and transparency public datasets', () => {
    // Projects
    expect(MOCK_SCHOOL_PROJECTS.length).toBeGreaterThanOrEqual(4)
    MOCK_SCHOOL_PROJECTS.forEach((p) => {
      expect(p.progressPercentage).toBeGreaterThanOrEqual(0)
      expect(p.progressPercentage).toBeLessThanOrEqual(100)
      expect(p.budgetSanctioned).toBeGreaterThan(0)
    })

    // Funds
    expect(MOCK_FUND_SUMMARY.totalSanctioned).toBeGreaterThan(0)
    expect(MOCK_FUND_SUMMARY.totalSpent).toBeGreaterThan(0)
    expect(MOCK_FUND_SUMMARY.remainingBalance).toBe(
      MOCK_FUND_SUMMARY.totalSanctioned - MOCK_FUND_SUMMARY.totalSpent
    )

    // Events & Proposals
    expect(MOCK_EDUCATIONAL_EVENTS.length).toBeGreaterThanOrEqual(3)
    expect(MOCK_FACILITY_PROPOSALS.length).toBeGreaterThanOrEqual(3)
  })

  it('verifies bilingual homepage copy keys match between English and Tamil', () => {
    expect(en.home.heroTitleMain).toBe('Every student deserves a brighter future.')
    expect(ta.home.heroTitleMain).toBe('ஒவ்வொரு மாணவரும் ஒளிமயமான எதிர்காலத்திற்கு தகுதியானவர்.')

    expect(en.home.exploreCareersCTA).toBe('Explore Careers')
    expect(ta.home.exploreCareersCTA).toBe('தொழில் வழிகளை ஆராய்க')

    expect(en.home.viewUpdatesCTA).toBe('View Education Updates')
    expect(ta.home.viewUpdatesCTA).toBe('கல்வி அறிவிப்புகளைப் பார்க்க')

    expect(en.updates.sectionTitle).toBeDefined()
    expect(ta.updates.sectionTitle).toBeDefined()

    expect(en.careerHome.title).toBeDefined()
    expect(ta.careerHome.title).toBeDefined()

    expect(en.progress.title).toBeDefined()
    expect(ta.progress.title).toBeDefined()
  })
})
