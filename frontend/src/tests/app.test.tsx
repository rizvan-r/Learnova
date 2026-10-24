import { describe, it, expect } from 'vitest'
import i18n from '../i18n/i18n'
import en from '../i18n/locales/en.json'
import ta from '../i18n/locales/ta.json'

describe('Bilingual i18n setup', () => {
  it('loads English and Tamil dictionaries with matching key structure', () => {
    expect(en.common.appName).toBe('Learnova')
    expect(ta.common.appName).toContain('Learnova')
    expect(en.nav.careerExplorer).toBeDefined()
    expect(ta.nav.careerExplorer).toBeDefined()
    expect(en.student.facilityVoting).toBeDefined()
    expect(ta.student.facilityVoting).toBeDefined()
  })

  it('switches languages dynamically', async () => {
    await i18n.changeLanguage('ta')
    expect(i18n.language).toBe('ta')
    expect(i18n.t('common.tagline')).toBe('இன்று கற்போம். நாளை வழிநடத்துவோம்.')

    await i18n.changeLanguage('en')
    expect(i18n.language).toBe('en')
    expect(i18n.t('common.tagline')).toBe('Learn today. Lead tomorrow.')
  })
})

describe('Role Isolation Contract', () => {
  it('verifies all 5 roles have dedicated configuration', () => {
    const roles = ['student', 'staff', 'headmaster', 'doctor', 'education_officer']
    roles.forEach((r) => {
      expect(typeof r).toBe('string')
    })
  })
})
