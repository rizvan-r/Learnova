import React, { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { CareerDomainItem } from '../../api/client'
import { api } from '../../api/client'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import {
  Search,
  Award,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

export const CareerExplorer: React.FC = () => {
  const { t, i18n } = useTranslation()

  const [domains, setDomains] = useState<CareerDomainItem[]>([])
  const [selectedDomain, setSelectedDomain] = useState<CareerDomainItem | null>(null)
  const [search, setSearch] = useState('')
  const [selectedSector, setSelectedSector] = useState<string>('All')

  const loadDomains = useCallback(async (query?: string) => {
    try {
      const data = await api.getCareerDomains(query)
      setDomains(data)
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      loadDomains(search)
    }, 250)
    return () => clearTimeout(timer)
  }, [search, loadDomains])

  const sectors = ['All', 'Engineering & Technology', 'Medical & Healthcare', 'Agriculture & Life Sciences']

  const filteredDomains = domains.filter((d) => {
    if (selectedSector === 'All') return true
    return d.sector.toLowerCase() === selectedSector.toLowerCase()
  })

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#087F72] via-[#075E54] to-[#172B4D] text-white p-8 rounded-3xl shadow-sm space-y-4">
        <Badge variant="brand" className="bg-white/20 text-white border-none text-xs">
          {t('career.title')}
        </Badge>
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
          {t('career.title')}
        </h1>
        <p className="text-sm md:text-base text-teal-100 max-w-2xl leading-relaxed">
          {t('career.subtitle')}
        </p>

        {/* Search Input Bar */}
        <div className="pt-2 max-w-xl">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('career.searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 shadow-md text-sm"
            />
          </div>
        </div>
      </div>

      {/* Sector Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {sectors.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSector(s)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedSector === s
                ? 'bg-[#087F72] text-white dark:bg-[#2DD4BF] dark:text-gray-900 shadow-xs'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Domain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDomains.map((d) => (
          <Card
            key={d.id}
            onClick={() => setSelectedDomain(d)}
            className="flex flex-col justify-between hover:border-[#087F72] dark:hover:border-[#2DD4BF] hover:shadow-md transition-all cursor-pointer group p-5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-teal-700 dark:text-teal-300">{d.degree_course}</span>
                <Badge variant="brand">{d.demand_tag}</Badge>
              </div>

              <div>
                <span className="text-[11px] text-gray-400 block mb-0.5">{d.branch}</span>
                <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 group-hover:text-[#087F72] dark:group-hover:text-[#2DD4BF] transition-colors">
                  {i18n.language === 'ta' && d.domain_name_ta ? d.domain_name_ta : d.domain_name}
                </h3>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {i18n.language === 'ta' && d.description_ta ? d.description_ta : d.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {d.required_skills.slice(0, 3).map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700 text-[11px] text-gray-700 dark:text-gray-300 font-mono"
                  >
                    {s}
                  </span>
                ))}
                {d.required_skills.length > 3 && (
                  <span className="px-1.5 py-0.5 text-[11px] text-gray-400">+{d.required_skills.length - 3}</span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{d.duration}</span>
              </div>
              <span className="font-semibold text-[#087F72] dark:text-[#2DD4BF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Pathway
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Domain Detail Modal */}
      <Modal
        isOpen={Boolean(selectedDomain)}
        onClose={() => setSelectedDomain(null)}
        title={selectedDomain?.domain_name || 'Career Domain Details'}
        maxWidth="lg"
      >
        {selectedDomain && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700 text-xs">
              <div>
                <span className="text-gray-500">Hierarchy:</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100 ml-1">
                  {selectedDomain.sector} → {selectedDomain.degree_course} → {selectedDomain.branch}
                </span>
              </div>
              <Badge variant="success">{selectedDomain.demand_tag}</Badge>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {i18n.language === 'ta' && selectedDomain.description_ta
                ? selectedDomain.description_ta
                : selectedDomain.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 space-y-1">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">{t('career.eligibility')}</span>
                <p className="text-xs text-gray-600 dark:text-gray-400">{selectedDomain.eligibility}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-700/40 border border-gray-200 dark:border-gray-700 space-y-1">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 block">{t('career.approxCost')}</span>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold text-teal-700 dark:text-teal-300">
                  {selectedDomain.approx_cost}
                </p>
              </div>
            </div>

            {/* Entrance Examinations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('career.entranceExams')}</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.entrance_exams.map((exam, i) => (
                  <Badge key={i} variant="info">{exam}</Badge>
                ))}
              </div>
            </div>

            {/* Required Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('career.skills')}</h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDomain.required_skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs font-mono text-gray-800 dark:text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Possible Career Roles */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">{t('career.careers')}</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDomain.career_paths.map((career, i) => (
                  <Badge key={i} variant="brand">{career}</Badge>
                ))}
              </div>
            </div>

            {/* Government Scholarships */}
            <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/50 dark:border-teal-800/50 space-y-1.5">
              <h4 className="text-xs font-bold text-teal-900 dark:text-teal-200 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                {t('career.scholarships')}
              </h4>
              <ul className="list-disc list-inside text-xs text-teal-800 dark:text-teal-300 space-y-1">
                {selectedDomain.scholarships.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Credible Source & Demand Notice */}
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-400">
              <span>Source: {selectedDomain.demand_source}</span>
              <div className="flex items-center gap-2">
                {selectedDomain.official_links.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#087F72] dark:text-[#2DD4BF] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Portal Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
