import React, { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import {
  MOCK_EDUCATION_UPDATES,
  UpdateCategory,
} from '../../data/mockEducationUpdates'
import {
  Search,
  ExternalLink,
  Calendar,
  Building,
  GraduationCap,
  BookOpen,
  FileText,
  Award,
  Sparkles,
  Info,
} from 'lucide-react'

export const EducationUpdatesSection: React.FC = () => {
  const { t, i18n } = useTranslation()

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading] = useState<boolean>(false)

  const categories: Array<{ id: string; label: string; icon: React.ReactNode }> = [
    { id: 'All', label: t('updates.filterAll', 'All Updates'), icon: <Sparkles className="w-4 h-4" /> },
    { id: 'Scholarships', label: t('updates.filterScholarships', 'Scholarships'), icon: <Award className="w-4 h-4" /> },
    { id: 'Admissions', label: t('updates.filterAdmissions', 'Admissions'), icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'Exams and results', label: t('updates.filterExams', 'Exams & Results'), icon: <FileText className="w-4 h-4" /> },
    { id: 'Government education schemes', label: t('updates.filterSchemes', 'Govt Schemes'), icon: <Building className="w-4 h-4" /> },
    { id: 'Learning resources', label: t('updates.filterResources', 'Learning Resources'), icon: <BookOpen className="w-4 h-4" /> },
  ]

  const filteredUpdates = useMemo(() => {
    return MOCK_EDUCATION_UPDATES.filter((item) => {
      const matchCat =
        selectedCategory === 'All' || item.category === (selectedCategory as UpdateCategory)

      const isTamil = i18n.language === 'ta'
      const title = isTamil ? item.title_ta || item.title : item.title
      const summary = isTamil ? item.summary_ta || item.summary : item.summary
      const source = item.official_source

      const matchSearch =
        searchQuery.trim() === '' ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        source.toLowerCase().includes(searchQuery.toLowerCase())

      return matchCat && matchSearch
    })
  }, [selectedCategory, searchQuery, i18n.language])

  const getCategoryColor = (cat: UpdateCategory) => {
    switch (cat) {
      case 'Scholarships':
        return 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'
      case 'Admissions':
        return 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800'
      case 'Exams and results':
        return 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800'
      case 'Government education schemes':
        return 'bg-teal-50 text-[#087F72] border-teal-200 dark:bg-teal-950/50 dark:text-[#2DD4BF] dark:border-teal-800'
      case 'Learning resources':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  return (
    <section id="education-updates" className="space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#DDF5EF] text-[#087F72] dark:bg-teal-950/60 dark:text-[#2DD4BF]">
              <Info className="w-3.5 h-3.5" />
              {t('updates.badgeOfficial', 'Education Portal Feed')}
            </span>
            <Badge variant="outline" size="sm" className="text-gray-500 dark:text-gray-400">
              {t('common.demoRecords', 'Simulated Demo Feed')}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            {t('updates.sectionTitle', 'Education Updates & Official Circulars')}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
            {t(
              'updates.sectionSubtitle',
              'Verified notifications for scholarships, state board admissions, examination schedules, and student welfare schemes across Tamil Nadu.'
            )}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('updates.searchPlaceholder', 'Filter circulars or schemes...')}
            className="w-full pl-9 pr-3.5 py-2 text-xs md:text-sm rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#087F72] dark:focus:ring-[#2DD4BF]"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#087F72] text-white shadow-xs dark:bg-[#2DD4BF] dark:text-gray-950 font-bold'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* Updates Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="p-5 animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            </Card>
          ))}
        </div>
      ) : filteredUpdates.length === 0 ? (
        <Card className="text-center py-12 px-4 border-dashed">
          <Info className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-base">
            {t('updates.emptyTitle', 'No notifications matching your search')}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {t('updates.emptyDesc', 'Try clearing your search query or selecting a different category.')}
          </p>
          <button
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('All')
            }}
            className="mt-4 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#087F72] text-white hover:bg-[#075E54] cursor-pointer"
          >
            {t('updates.resetFilters', 'Reset Filters')}
          </button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUpdates.map((item) => {
            const isTamil = i18n.language === 'ta'
            const title = isTamil ? item.title_ta || item.title : item.title
            const summary = isTamil ? item.summary_ta || item.summary : item.summary

            return (
              <Card
                key={item.id}
                className="flex flex-col justify-between p-5 hover:shadow-md transition-shadow hover:border-[#087F72]/50 dark:hover:border-[#2DD4BF]/50"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.published_at}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 leading-snug">
                    {title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700/60 mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[170px]">
                    <Building className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.official_source}</span>
                  </div>

                  <a
                    href={item.official_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F72] dark:text-[#2DD4BF] hover:underline cursor-pointer"
                  >
                    <span>{t('home.officialSource', 'Official Portal')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </section>
  )
}
