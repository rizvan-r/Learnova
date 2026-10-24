import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import {
  MOCK_CAREER_SECTORS,
} from '../../data/mockCareerSectors'
import {
  Search,
  Compass,
  ArrowRight,
  Cpu,
  Stethoscope,
  BookOpen,
  Landmark,
  Microscope,
  Sprout,
  ChevronRight,
  Info,
  Layers,
} from 'lucide-react'

export const CareerDiscoverySection: React.FC = () => {
  const { t, i18n } = useTranslation()

  const [activeSectorId, setActiveSectorId] = useState<string>(MOCK_CAREER_SECTORS[0].id)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const getIcon = (name: string, color: string) => {
    const props = { className: 'w-5 h-5', style: { color } }
    switch (name) {
      case 'Cpu':
        return <Cpu {...props} />
      case 'Stethoscope':
        return <Stethoscope {...props} />
      case 'BookOpen':
        return <BookOpen {...props} />
      case 'Landmark':
        return <Landmark {...props} />
      case 'Microscope':
        return <Microscope {...props} />
      case 'Sprout':
        return <Sprout {...props} />
      default:
        return <Compass {...props} />
    }
  }

  const activeSector = useMemo(() => {
    return (
      MOCK_CAREER_SECTORS.find((s) => s.id === activeSectorId) ||
      MOCK_CAREER_SECTORS[0]
    )
  }, [activeSectorId])

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return activeSector.courses
    const q = searchQuery.toLowerCase()
    return activeSector.courses.filter((course) => {
      const matchDegree =
        course.degreeName.toLowerCase().includes(q) ||
        course.degreeName_ta.toLowerCase().includes(q)
      const matchBranches = course.branches.some(
        (b) =>
          b.branchName.toLowerCase().includes(q) ||
          b.branchName_ta.toLowerCase().includes(q) ||
          b.domains.some((d) => d.toLowerCase().includes(q)) ||
          b.domains_ta.some((d) => d.toLowerCase().includes(q))
      )
      return matchDegree || matchBranches
    })
  }, [activeSector, searchQuery])

  return (
    <section id="career-explorer" className="space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {t('careerHome.badge', 'Pathway Orientation')}
            </span>
            <Badge variant="outline" size="sm" className="text-gray-500 dark:text-gray-400">
              6 Core Sectors
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            {t('careerHome.title', 'Career Explorer & Degree Pathways')}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
            {t(
              'careerHome.subtitle',
              'Explore educational qualification hierarchies from foundational higher secondary streams to degrees, specialized branches, and emerging modern domains.'
            )}
          </p>
        </div>

        {/* Action Button to Full Career Explorer */}
        <Link to="/career" className="shrink-0">
          <Button
            variant="outline"
            className="border-[#087F72] text-[#087F72] hover:bg-teal-50 dark:border-[#2DD4BF] dark:text-[#2DD4BF] dark:hover:bg-teal-950/40 text-xs sm:text-sm font-semibold"
          >
            <span>{t('careerHome.viewFullRoadmaps', 'Open Interactive Explorer')}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>

      {/* 6 Sector Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MOCK_CAREER_SECTORS.map((sector) => {
          const isSelected = sector.id === activeSectorId
          const isTamil = i18n.language === 'ta'
          const title = isTamil ? sector.title_ta : sector.title

          return (
            <button
              key={sector.id}
              onClick={() => {
                setActiveSectorId(sector.id)
                setSearchQuery('')
              }}
              className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-white dark:bg-gray-800 border-[#087F72] dark:border-[#2DD4BF] shadow-md ring-2 ring-[#087F72]/20 dark:ring-[#2DD4BF]/20'
                  : 'bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 hover:border-gray-300'
              }`}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${sector.accentColor}18` }}
              >
                {getIcon(sector.iconName, sector.accentColor)}
              </div>
              <div>
                <p className="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-snug">
                  {title}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                  {sector.courses.length} Degree Tracks
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Sector Deep Dive Hierarchy Panel */}
      <Card className="p-6 md:p-8 space-y-6 border-[#087F72]/30 dark:border-[#2DD4BF]/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#087F72] dark:text-[#2DD4BF]">
                {t('careerHome.hierarchyFlow', 'Sector Hierarchy & Degree Architecture')}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              {i18n.language === 'ta' ? activeSector.title_ta : activeSector.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
              {i18n.language === 'ta' ? activeSector.description_ta : activeSector.description}
            </p>
          </div>

          {/* Inline search within sector */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('careerHome.searchTracks', 'Search degrees or domains...')}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#087F72]"
            />
          </div>
        </div>

        {/* Hierarchy tree display: Degree -> Branch -> Domains */}
        <div className="space-y-5">
          {filteredCourses.map((course, idx) => {
            const isTamil = i18n.language === 'ta'
            const degreeName = isTamil ? course.degreeName_ta : course.degreeName

            return (
              <div
                key={idx}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 bg-gray-50/70 dark:bg-gray-850 space-y-4"
              >
                {/* Level 1: Degree / Course */}
                <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                  <div className="w-6 h-6 rounded-md bg-[#087F72] text-white flex items-center justify-center text-xs">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <span>{degreeName}</span>
                </div>

                {/* Level 2 & 3: Branches & Domains */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {course.branches.map((branch, bIdx) => {
                    const branchName = isTamil ? branch.branchName_ta : branch.branchName
                    const domainsList = isTamil ? branch.domains_ta : branch.domains

                    return (
                      <div
                        key={bIdx}
                        className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/80 dark:border-gray-700/80 shadow-xs space-y-2.5"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800 dark:text-gray-200">
                          <ChevronRight className="w-3.5 h-3.5 text-[#087F72] dark:text-[#2DD4BF]" />
                          <span>{branchName}</span>
                        </div>

                        {/* Domains list */}
                        <div className="flex flex-wrap gap-1.5">
                          {domainsList.map((domain, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[11px] font-medium bg-gray-100 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md border border-gray-200/60 dark:border-gray-600/60"
                            >
                              {domain}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Ethical disclaimer required by Section 5 */}
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{t('careerHome.disclaimerTitle', 'Educational Guidance Notice:')}</strong>{' '}
            {t(
              'careerHome.disclaimerBody',
              'This career roadmap displays curricula, eligibility pathways, and degree specializations for student informational awareness. Learnova does not claim guaranteed employment, university admission, or specific salary outcomes.'
            )}
          </p>
        </div>
      </Card>
    </section>
  )
}
