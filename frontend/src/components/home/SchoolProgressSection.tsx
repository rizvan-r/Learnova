import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import {
  MOCK_SCHOOL_PROJECTS,
  MOCK_FUND_SUMMARY,
  MOCK_EDUCATIONAL_EVENTS,
  MOCK_FACILITY_PROPOSALS,
} from '../../data/mockSchoolProgress'
import {
  Building2,
  Landmark,
  Calendar,
  ThumbsUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Layers,
} from 'lucide-react'

export const SchoolProgressSection: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [activeTab, setActiveTab] = useState<'projects' | 'funds' | 'events' | 'facilities'>('projects')
  const [votedProposals, setVotedProposals] = useState<Record<string, number>>({})

  const handleUpvote = (id: string, current: number) => {
    if (votedProposals[id]) return
    setVotedProposals((prev) => ({ ...prev, [id]: current + 1 }))
  }

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val)
  }

  return (
    <section id="school-progress" className="space-y-6 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              {t('progress.badge', 'Public Accountability')}
            </span>
            <Badge variant="outline" size="sm" className="text-gray-500 dark:text-gray-400">
              {t('common.demoRecords', 'Simulated Public Ledger')}
            </Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            {t('progress.title', 'School Progress & Fund Transparency')}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1 max-w-2xl">
            {t(
              'progress.subtitle',
              'Track sanctioned government grants, monitor smart infrastructure upgrades, and participate in community school improvement proposals.'
            )}
          </p>
        </div>

        <Link to="/funds" className="shrink-0">
          <Button
            variant="outline"
            className="border-purple-600 text-purple-700 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-300 dark:hover:bg-purple-950/40 text-xs sm:text-sm font-semibold"
          >
            <span>{t('progress.viewFullLedger', 'Explore Full Ledger')}</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {[
          {
            id: 'projects',
            label: t('progress.tabProjects', 'Improvement Projects'),
            icon: <Building2 className="w-4 h-4" />,
            count: MOCK_SCHOOL_PROJECTS.length,
          },
          {
            id: 'funds',
            label: t('progress.tabFunds', 'Fund Allocation Summary'),
            icon: <Landmark className="w-4 h-4" />,
            count: '₹75L',
          },
          {
            id: 'events',
            label: t('progress.tabEvents', 'Educational Events'),
            icon: <Calendar className="w-4 h-4" />,
            count: MOCK_EDUCATIONAL_EVENTS.length,
          },
          {
            id: 'facilities',
            label: t('progress.tabFacilities', 'Public Facility Proposals'),
            icon: <Layers className="w-4 h-4" />,
            count: MOCK_FACILITY_PROPOSALS.length,
          },
        ].map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs dark:bg-purple-500 dark:text-gray-950'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full ${
                  isActive
                    ? 'bg-white/20 text-white dark:bg-black/20 dark:text-gray-950'
                    : 'bg-gray-100 dark:bg-gray-750 text-gray-600 dark:text-gray-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Tab 1: School Improvement Projects */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_SCHOOL_PROJECTS.map((prj) => {
            const isTamil = i18n.language === 'ta'
            const title = isTamil ? prj.title_ta : prj.title

            return (
              <Card key={prj.id} className="p-6 space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-200/60 dark:border-purple-800/60">
                      {prj.category}
                    </span>
                    <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mt-2 leading-snug">
                      {title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{prj.schoolName}</p>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                      prj.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : prj.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}
                  >
                    {prj.status === 'Completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {prj.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-medium text-gray-600 dark:text-gray-400">
                    <span>Physical Milestone Progress</span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {prj.progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#087F72] transition-all duration-500"
                      style={{ width: `${prj.progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Budget metrics */}
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block text-[11px]">
                      Sanctioned Budget
                    </span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {formatCurrency(prj.budgetSanctioned)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 dark:text-gray-400 block text-[11px]">
                      Est. Completion
                    </span>
                    <span className="font-bold text-gray-900 dark:text-gray-100">
                      {prj.completionDate}
                    </span>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Tab 2: Fund Allocation Summary */}
      {activeTab === 'funds' && (
        <Card className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-gray-100 dark:border-gray-700">
            <div className="bg-purple-50/70 dark:bg-purple-950/40 p-4 rounded-2xl border border-purple-200/60 dark:border-purple-800/60">
              <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 block">
                Total Sanctioned Grants ({MOCK_FUND_SUMMARY.fiscalYear})
              </span>
              <span className="text-2xl font-black text-purple-900 dark:text-purple-100 mt-1 block">
                {formatCurrency(MOCK_FUND_SUMMARY.totalSanctioned)}
              </span>
            </div>

            <div className="bg-blue-50/70 dark:bg-blue-950/40 p-4 rounded-2xl border border-blue-200/60 dark:border-blue-800/60">
              <span className="text-xs font-semibold text-blue-700 dark:text-blue-300 block">
                Verified Expenditure
              </span>
              <span className="text-2xl font-black text-blue-900 dark:text-blue-100 mt-1 block">
                {formatCurrency(MOCK_FUND_SUMMARY.totalSpent)}
              </span>
            </div>

            <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/60 dark:border-emerald-800/60">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 block">
                Remaining Unspent Balance
              </span>
              <span className="text-2xl font-black text-emerald-900 dark:text-emerald-100 mt-1 block">
                {formatCurrency(MOCK_FUND_SUMMARY.remainingBalance)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider">
              Category-Wise Fund Utilization
            </h4>

            <div className="space-y-4">
              {MOCK_FUND_SUMMARY.allocations.map((item, idx) => {
                const percent = Math.round((item.spent / item.allocated) * 100)
                const isTamil = i18n.language === 'ta'
                const categoryLabel = isTamil ? item.category_ta : item.category

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <span className="font-bold text-gray-900 dark:text-gray-100">
                        {categoryLabel}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Spent: <strong>{formatCurrency(item.spent)}</strong> of {formatCurrency(item.allocated)} ({percent}%)
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Tab 3: Educational Events */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_EDUCATIONAL_EVENTS.map((evt) => {
            const isTamil = i18n.language === 'ta'
            const title = isTamil ? evt.title_ta : evt.title
            const desc = isTamil ? evt.description_ta : evt.description

            return (
              <Card key={evt.id} className="p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-0.5 rounded-full">
                      {evt.category}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-600" />
                      {evt.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 leading-snug">
                    {title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p className="font-medium text-gray-800 dark:text-gray-200">{evt.location}</p>
                  <p className="text-[11px]">Expected: {evt.attendeeEstimate}</p>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Tab 4: Public Facility Improvement Requests */}
      {activeTab === 'facilities' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_FACILITY_PROPOSALS.map((fac) => {
            const isTamil = i18n.language === 'ta'
            const title = isTamil ? fac.title_ta : fac.title
            const votes = votedProposals[fac.id] !== undefined ? votedProposals[fac.id] : fac.upvotes
            const hasVoted = !!votedProposals[fac.id]

            return (
              <Card key={fac.id} className="p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                      {fac.facilityType}
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                      {fac.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 leading-snug">
                    {title}
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400">{fac.schoolName}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    Logged: {fac.submittedDate}
                  </span>

                  <button
                    onClick={() => handleUpvote(fac.id, fac.upvotes)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      hasVoted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 hover:bg-purple-100'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{votes} Upvotes</span>
                  </button>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Privacy Guarantee Note required by Section 6 */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <p>
          <strong>Public Information Transparency:</strong> All displayed records are approved public project summaries and fund allocations. In accordance with student data privacy protocols, private academic portfolios, individual medical records, and confidential grievances are strictly excluded from public view.
        </p>
      </div>
    </section>
  )
}
